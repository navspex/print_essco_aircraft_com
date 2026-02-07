/**
 * ESSCO Print Calculator - Server-Side PDF Analysis API
 * Cloudflare Pages Function with R2 native bindings
 * 
 * Handles large PDFs that crash browser-side PDF.js
 * Uses pdf-lib for page count, dimensions, AND color detection
 * Color detection: inspects page resource color spaces (no rendering)
 *   - DeviceRGB / DeviceCMYK / ICCBased(N>1) = color page
 *   - DeviceGray / CalGray only = B&W page
 * Uploads to R2 simultaneously so file is ready for production
 * 
 * Created: February 7, 2026
 * Requires: Workers Paid plan ($5/mo) for 30-second CPU limit
 */

import { PDFDocument, PDFName, PDFDict, PDFArray, PDFStream } from 'pdf-lib';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

const PAGE_SIZES = {
  LETTER_HEIGHT: 792,   // 11 inches in points
  TABLOID_HEIGHT: 1224, // 17 inches in points
  TOLERANCE: 10,
};

const COLOR_SPACES = new Set([
  'DeviceRGB', 'DeviceCMYK', 'CalRGB', 'CalCMYK', 'Lab',
]);

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    if (!env.PRINT_ESSCO_STORAGE) {
      return jsonResponse({ success: false, error: 'Storage not configured' }, 500, corsHeaders);
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return jsonResponse({ success: false, error: 'No file provided' }, 400, corsHeaders);
    }

    if (!(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      return jsonResponse({ success: false, error: 'Only PDF files are allowed' }, 400, corsHeaders);
    }

    if (file.size > MAX_FILE_SIZE) {
      return jsonResponse({ success: false, error: 'File size exceeds 500MB limit' }, 400, corsHeaders);
    }

    const fileContent = await file.arrayBuffer();

    // Upload to R2 first — file is safe regardless of analysis outcome
    const timestamp = Date.now();
    const randomId = crypto.randomUUID();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 50);
    const fileKey = `uploads/${timestamp}-${randomId}-${sanitizedName}`;

    await env.PRINT_ESSCO_STORAGE.put(fileKey, fileContent, {
      httpMetadata: { contentType: 'application/pdf' },
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        analyzedServerSide: 'true',
      },
    });

    // Analyze PDF
    let analysisResult;
    try {
      analysisResult = await analyzePDF(fileContent);
    } catch (analysisError) {
      console.error('PDF analysis failed:', analysisError);
      return jsonResponse({
        success: true,
        partial: true,
        error: 'Could not fully analyze PDF structure.',
        fileKey,
        fileName: file.name,
        fileSize: file.size,
        totalPages: 0,
        bwPages: 0,
        colorPages: 0,
        standardPages: 0,
        foldoutPages: 0,
        hasOversizedPages: false,
        oversizedPageNumbers: [],
      }, 200, corsHeaders);
    }

    return jsonResponse({
      success: true,
      partial: false,
      fileKey,
      fileName: file.name,
      fileSize: file.size,
      ...analysisResult,
    }, 200, corsHeaders);

  } catch (error) {
    console.error('Analyze-pdf error:', error);
    return jsonResponse({
      success: false,
      error: error.message || 'Analysis failed',
    }, 500, corsHeaders);
  }
}

/**
 * Full PDF analysis: page count, dimensions, color detection
 */
async function analyzePDF(arrayBuffer) {
  const pdfDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });

  const pageCount = pdfDoc.getPageCount();
  const pages = [];
  let bwPages = 0;
  let colorPages = 0;
  let foldoutPages = 0;
  let standardPages = 0;
  let hasOversizedPages = false;
  const oversizedPageNumbers = [];

  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();

    const maxDim = Math.max(width, height);
    const isFoldout = maxDim > PAGE_SIZES.LETTER_HEIGHT + PAGE_SIZES.TOLERANCE;
    const isOversized = maxDim > PAGE_SIZES.TABLOID_HEIGHT + PAGE_SIZES.TOLERANCE;
    const isColor = detectPageColor(page);

    pages.push({
      pageNumber: i + 1,
      width,
      height,
      isColor,
      isFoldout,
    });

    if (isColor) { colorPages++; } else { bwPages++; }
    if (isOversized) { hasOversizedPages = true; oversizedPageNumbers.push(i + 1); }
    if (isFoldout) { foldoutPages++; } else { standardPages++; }
  }

  return {
    totalPages: pageCount,
    pages,
    bwPages,
    colorPages,
    standardPages,
    foldoutPages,
    hasOversizedPages,
    oversizedPageNumbers,
  };
}

/**
 * Detect color by inspecting page Resources for color spaces.
 * No rendering needed — reads PDF internal structure only.
 */
function detectPageColor(page) {
  try {
    const node = page.node;
    const resources = node.get(PDFName.of('Resources'));
    if (!resources || !(resources instanceof PDFDict)) return false;

    // Check explicit ColorSpace entries
    if (checkColorSpaceDict(resources)) return true;

    // Check XObjects (images, form XObjects)
    if (checkXObjects(resources)) return true;

    return false;
  } catch (err) {
    // Can't inspect → assume B&W (won't overcharge customer)
    return false;
  }
}

function checkColorSpaceDict(resources) {
  try {
    const csDict = resources.get(PDFName.of('ColorSpace'));
    if (!csDict || !(csDict instanceof PDFDict)) return false;
    for (const [, value] of csDict.entries()) {
      if (isColorValue(value)) return true;
    }
    return false;
  } catch { return false; }
}

function checkXObjects(resources) {
  try {
    const xobjects = resources.get(PDFName.of('XObject'));
    if (!xobjects || !(xobjects instanceof PDFDict)) return false;

    for (const [, value] of xobjects.entries()) {
      if (value instanceof PDFStream) {
        const dict = value.dict;
        if (!dict) continue;

        const cs = dict.get(PDFName.of('ColorSpace'));
        if (cs && isColorValue(cs)) return true;

        // Form XObjects have nested Resources
        const subtype = dict.get(PDFName.of('Subtype'));
        if (subtype && subtype.toString() === '/Form') {
          const formRes = dict.get(PDFName.of('Resources'));
          if (formRes instanceof PDFDict && checkColorSpaceDict(formRes)) return true;
        }
      }
    }
    return false;
  } catch { return false; }
}

function isColorValue(value) {
  try {
    // Direct name: /DeviceRGB etc.
    if (value instanceof PDFName) {
      const name = value.toString().replace('/', '');
      return COLOR_SPACES.has(name);
    }

    // Array: [/ICCBased stream], [/Indexed /DeviceRGB ...], etc.
    if (value instanceof PDFArray) {
      const first = value.get(0);
      if (!(first instanceof PDFName)) return false;
      const name = first.toString().replace('/', '');

      if (name === 'ICCBased') {
        const stream = value.get(1);
        if (stream instanceof PDFStream) {
          const n = stream.dict.get(PDFName.of('N'));
          if (n) {
            const nVal = typeof n.numberValue === 'function' ? n.numberValue() :
                         typeof n.value === 'function' ? n.value() : null;
            if (nVal !== null) return nVal > 1; // 1=gray, 3=RGB, 4=CMYK
          }
          const alt = stream.dict.get(PDFName.of('Alternate'));
          if (alt) return isColorValue(alt);
        }
        return false;
      }

      if (name === 'Indexed' || name === 'Separation' || name === 'DeviceN') {
        return value.size() > 1 ? isColorValue(value.get(1)) : false;
      }

      if (name === 'Pattern' && value.size() > 1) {
        return isColorValue(value.get(1));
      }

      return COLOR_SPACES.has(name);
    }

    // Fallback string check
    const str = value?.toString?.() || '';
    for (const cs of COLOR_SPACES) {
      if (str.includes(cs)) return true;
    }
    return false;
  } catch { return false; }
}

function jsonResponse(data, status, corsHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

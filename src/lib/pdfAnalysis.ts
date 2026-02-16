// ESSCO POD Calculator - PDF Analysis Module
// V36 - Large files use PDF.js getOperatorList() for color detection (no canvas rendering)
// Small files (≤25MB): browser PDF.js pixel sampling via canvas (proven, accurate)
// Large files (>25MB): browser PDF.js operator list scanning (no canvas, no memory explosion)
// Both paths: same library (pdfjs-dist), same result shape, zero server dependency

import { getDocument, GlobalWorkerOptions, OPS } from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Configure PDF.js worker - use CDN for reliability
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

// Files larger than this use operator list scanning instead of canvas rendering
export const LARGE_FILE_THRESHOLD = 25 * 1024 * 1024; // 25MB

export interface PageAnalysis {
  pageNumber: number;
  width: number;  // in points (72 points = 1 inch)
  height: number;
  isColor: boolean;
  isFoldout: boolean; // 11x17 or larger
}

export interface PDFAnalysisResult {
  success: boolean;
  error?: string;
  
  // Document info
  fileName: string;
  fileSize: number; // bytes
  totalPages: number;
  
  // Page analysis
  pages: PageAnalysis[];
  
  // Summary counts (what pricing needs)
  bwPages: number;
  colorPages: number;
  standardPages: number;  // 8.5x11
  foldoutPages: number;   // 11x17 to 36" (can auto-price)
  
  // Large format details
  largeFormatPages?: {
    pageNumber: number;
    widthInches: number;
    heightInches: number;
    isColor: boolean;
  }[];
  
  // Validation
  hasOversizedPages: boolean; // Larger than 36" (needs manual quote)
  oversizedPageNumbers: number[];
}

// Standard page sizes in points (72 points = 1 inch)
const PAGE_SIZES = {
  LETTER_WIDTH: 612,   // 8.5 inches
  LETTER_HEIGHT: 792,  // 11 inches
  TABLOID_WIDTH: 792,  // 11 inches (ledger/11x17)
  TABLOID_HEIGHT: 1224, // 17 inches
  LARGE_FORMAT_MAX_WIDTH: 2592, // 36 inches (KIP 860 capability)
  TOLERANCE: 10,       // Allow small variations
};

// PDF.js OPS that indicate color content (not grayscale)
// These are the operator constants from pdfjs-dist
const COLOR_OPS = new Set([
  OPS.setFillRGBColor,       // rg - RGB fill
  OPS.setStrokeRGBColor,     // RG - RGB stroke
  OPS.setFillCMYKColor,      // k  - CMYK fill
  OPS.setStrokeCMYKColor,    // K  - CMYK stroke
]);

// OPS that MAY indicate color depending on their arguments
// setFillColorN / setStrokeColorN use the current color space
// setFillColorSpace / setStrokeColorSpace declare which space is active
const COLOR_SPACE_OPS = new Set([
  OPS.setFillColorSpace,     // cs
  OPS.setStrokeColorSpace,   // CS
]);

const GENERIC_COLOR_OPS = new Set([
  OPS.setFillColor,          // sc  (uses current color space)
  OPS.setFillColorN,         // scn (uses current color space, pattern)
  OPS.setStrokeColor,        // SC
  OPS.setStrokeColorN,       // SCN
]);

/**
 * Determine if a page is a foldout (11x17 tabloid)
 */
function isFoldoutPage(width: number, height: number): boolean {
  const maxDim = Math.max(width, height);
  return maxDim > PAGE_SIZES.LETTER_HEIGHT + PAGE_SIZES.TOLERANCE;
}

/**
 * Determine if a page is oversized (larger than KIP 860 can print: 36" wide)
 */
function isOversizedPage(width: number, height: number): boolean {
  const maxDim = Math.max(width, height);
  return maxDim > PAGE_SIZES.LARGE_FORMAT_MAX_WIDTH + PAGE_SIZES.TOLERANCE;
}

// ─── SMALL FILE PATH: Canvas pixel sampling ────────────────────────────

/**
 * Analyze a single page for color content via canvas pixel sampling.
 * Renders page at 0.3x scale and samples pixels for RGB channel divergence.
 * Accurate but memory-intensive — only used for files ≤25MB.
 */
async function analyzePageColorByPixels(page: PDFPageProxy): Promise<boolean> {
  try {
    const scale = 0.3;
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return false;
    
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
    
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    const sampleRate = Math.max(50, Math.floor(pixels.length / 4000));
    let colorPixelCount = 0;
    const threshold = 15;
    
    for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      
      if (a < 128) continue;
      if (r > 245 && g > 245 && b > 245) continue;
      if (r < 10 && g < 10 && b < 10) continue;
      
      const maxChannel = Math.max(r, g, b);
      const minChannel = Math.min(r, g, b);
      
      if (maxChannel - minChannel > threshold) {
        colorPixelCount++;
        if (colorPixelCount > 3) {
          return true;
        }
      }
    }
    
    return false;
  } catch (err) {
    console.warn('Pixel color detection failed for page, assuming B&W:', err);
    return false;
  }
}

// ─── LARGE FILE PATH: Operator list scanning ───────────────────────────

/**
 * Detect color on a page by scanning its operator list.
 * No canvas, no rendering, no pixel buffers — just reads the PDF drawing commands.
 * 
 * Checks for:
 * 1. Direct color operators (setFillRGBColor, setFillCMYKColor, etc.)
 * 2. Color space declarations followed by generic color set commands
 * 3. Filters out pure grayscale values from RGB operators (r===g===b)
 * 
 * Conservative: assumes B&W if unable to parse. Won't overcharge the customer.
 */
async function analyzePageColorByOperators(page: PDFPageProxy): Promise<boolean> {
  try {
    const opList = await page.getOperatorList();
    const { fnArray, argsArray } = opList;
    
    // Track whether the active fill/stroke color space is a color one
    let fillSpaceIsColor = false;
    let strokeSpaceIsColor = false;
    
    for (let i = 0; i < fnArray.length; i++) {
      const op = fnArray[i];
      const args = argsArray[i];
      
      // Direct RGB/CMYK operators — definite color indicators
      if (COLOR_OPS.has(op)) {
        // For RGB ops, check if it's actually a gray value (r === g === b)
        if (op === OPS.setFillRGBColor || op === OPS.setStrokeRGBColor) {
          if (args && args.length >= 3) {
            const r = args[0], g = args[1], b = args[2];
            // If all channels are equal (or very close), it's grayscale expressed as RGB
            if (Math.abs(r - g) < 0.01 && Math.abs(g - b) < 0.01) {
              continue; // Gray value, not color
            }
          }
          return true; // Non-gray RGB = color page
        }
        // CMYK ops are always color
        return true;
      }
      
      // Color space declarations — track which space is active
      if (COLOR_SPACE_OPS.has(op)) {
        if (args && args.length > 0) {
          const spaceName = String(args[0] || '');
          const isColorSpace = spaceName.includes('RGB') || 
                               spaceName.includes('CMYK') ||
                               spaceName.includes('Lab') ||
                               spaceName.includes('CalRGB') ||
                               spaceName.includes('ICCBased'); // could be gray but usually color
          
          if (op === OPS.setFillColorSpace) {
            fillSpaceIsColor = isColorSpace;
          } else {
            strokeSpaceIsColor = isColorSpace;
          }
        }
      }
      
      // Generic color ops — only color if the active space is a color space
      if (GENERIC_COLOR_OPS.has(op)) {
        if (op === OPS.setFillColor || op === OPS.setFillColorN) {
          if (fillSpaceIsColor) return true;
        }
        if (op === OPS.setStrokeColor || op === OPS.setStrokeColorN) {
          if (strokeSpaceIsColor) return true;
        }
      }
    }
    
    return false;
  } catch (err) {
    console.warn('Operator color detection failed for page, assuming B&W:', err);
    return false;
  }
}

// ─── MAIN ANALYSIS FUNCTION ─────────────────────────────────────────────

/**
 * Analyze a PDF file for printing.
 * Automatically picks the right color detection method based on file size:
 *   ≤25MB → canvas pixel sampling (accurate, needs DOM/canvas)
 *   >25MB → operator list scanning (fast, no rendering, no memory explosion)
 * 
 * Both paths produce identical PDFAnalysisResult shape.
 */
export type AnalysisPhase = 'loading' | 'analyzing';
export type ProgressCallback = (phase: AnalysisPhase, current: number, total: number) => void;

export async function analyzePDF(file: File, onProgress?: ProgressCallback): Promise<PDFAnalysisResult> {
  const result: PDFAnalysisResult = {
    success: false,
    fileName: file.name,
    fileSize: file.size,
    totalPages: 0,
    pages: [],
    bwPages: 0,
    colorPages: 0,
    standardPages: 0,
    foldoutPages: 0,
    largeFormatPages: [],
    hasOversizedPages: false,
    oversizedPageNumbers: [],
  };
  
  try {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      result.error = 'File must be a PDF';
      return result;
    }
    
    const MAX_SIZE = 500 * 1024 * 1024; // 500MB
    if (file.size > MAX_SIZE) {
      result.error = 'File size exceeds 500MB limit';
      return result;
    }
    
    const isLargeFile = file.size > LARGE_FILE_THRESHOLD;
    const colorMethod = isLargeFile ? 'operators' : 'pixels';
    
    console.log(`PDF analysis: ${(file.size / 1024 / 1024).toFixed(1)}MB — using ${colorMethod} color detection`);
    
    onProgress?.('loading', 0, 0);
    const arrayBuffer = await file.arrayBuffer();
    onProgress?.('loading', 1, 2);
    const pdf: PDFDocumentProxy = await getDocument({ data: arrayBuffer }).promise;
    onProgress?.('loading', 2, 2);
    
    result.totalPages = pdf.numPages;
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      onProgress?.('analyzing', pageNum, pdf.numPages);
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      
      const width = viewport.width;
      const height = viewport.height;
      const foldout = isFoldoutPage(width, height);
      const oversized = isOversizedPage(width, height);
      
      // Pick color detection method based on file size
      const isColor = isLargeFile 
        ? await analyzePageColorByOperators(page)
        : await analyzePageColorByPixels(page);
      
      const pageAnalysis: PageAnalysis = {
        pageNumber: pageNum,
        width,
        height,
        isColor,
        isFoldout: foldout,
      };
      
      result.pages.push(pageAnalysis);
      
      if (isColor) {
        result.colorPages++;
      } else {
        result.bwPages++;
      }
      
      if (foldout) {
        result.foldoutPages++;
        // Track large format details for pricing
        result.largeFormatPages!.push({
          pageNumber: pageNum,
          widthInches: width / 72,
          heightInches: height / 72,
          isColor
        });
      } else {
        result.standardPages++;
      }
      
      if (oversized) {
        result.hasOversizedPages = true;
        result.oversizedPageNumbers.push(pageNum);
      }
      
      // Clean up page resources to prevent memory buildup on large documents
      page.cleanup();
    }
    
    result.success = true;
    
  } catch (error) {
    console.error('PDF analysis error:', error);
    result.error = error instanceof Error ? error.message : 'Failed to analyze PDF';
  }
  
  return result;
}

/**
 * Quick page count only (faster, for initial upload feedback)
 */
export async function getPageCount(file: File): Promise<{ success: boolean; pageCount: number; error?: string }> {
  try {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return { success: false, pageCount: 0, error: 'File must be a PDF' };
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    
    return { success: true, pageCount: pdf.numPages };
    
  } catch (error) {
    return { 
      success: false, 
      pageCount: 0, 
      error: error instanceof Error ? error.message : 'Failed to read PDF' 
    };
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


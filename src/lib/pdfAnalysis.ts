// ESSCO POD Calculator - PDF Analysis Module
// Uses PDF.js for automatic page counting, size detection, and color analysis
// V36 - Large file color detection via getOperatorList() (no canvas rendering)
// Small files (≤25MB): browser PDF.js canvas pixel sampling (accurate)
// Large files (>25MB): browser PDF.js operator list scanning (fast, no crash)
// Both paths are 100% browser-side, zero server dependencies

import { getDocument, OPS, GlobalWorkerOptions } from 'pdfjs-dist';
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
  foldoutPages: number;   // 11x17 or larger
  
  // Validation
  hasOversizedPages: boolean; // Larger than 11x17
  oversizedPageNumbers: number[];
}

// Standard page sizes in points (72 points = 1 inch)
const PAGE_SIZES = {
  LETTER_WIDTH: 612,   // 8.5 inches
  LETTER_HEIGHT: 792,  // 11 inches
  TABLOID_WIDTH: 792,  // 11 inches
  TABLOID_HEIGHT: 1224, // 17 inches
  TOLERANCE: 10,       // Allow small variations
};

function isFoldoutPage(width: number, height: number): boolean {
  const maxDim = Math.max(width, height);
  return maxDim > PAGE_SIZES.LETTER_HEIGHT + PAGE_SIZES.TOLERANCE;
}

function isOversizedPage(width: number, height: number): boolean {
  const maxDim = Math.max(width, height);
  return maxDim > PAGE_SIZES.TABLOID_HEIGHT + PAGE_SIZES.TOLERANCE;
}

// ============================================================
// COLOR DETECTION METHOD 1: Canvas pixel sampling (small files)
// Renders each page at low res, samples pixels for color
// Accurate but memory-heavy — crashes on 100MB+ scanned PDFs
// ============================================================

async function analyzePageColorByCanvas(page: PDFPageProxy): Promise<boolean> {
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
          canvas.width = 0;
          canvas.height = 0;
          return true;
        }
      }
    }
    
    canvas.width = 0;
    canvas.height = 0;
    return false;
  } catch (err) {
    console.warn('Canvas color detection failed for page, assuming B&W:', err);
    return false;
  }
}

// ============================================================
// COLOR DETECTION METHOD 2: Operator list scanning (large files)
// Reads PDF drawing commands without rendering to canvas
// Looks for RGB/CMYK color operators in the page stream
// Fast, lightweight, no memory explosion on huge files
// ============================================================

const COLOR_OPS = new Set([
  OPS.setFillRGBColor,      // rg - RGB fill
  OPS.setStrokeRGBColor,    // RG - RGB stroke
  OPS.setFillCMYKColor,     // k  - CMYK fill
  OPS.setStrokeCMYKColor,   // K  - CMYK stroke
]);

async function analyzePageColorByOperators(page: PDFPageProxy): Promise<boolean> {
  try {
    const opList = await page.getOperatorList();
    const fnArray = opList.fnArray;
    const argsArray = opList.argsArray;

    for (let i = 0; i < fnArray.length; i++) {
      const op = fnArray[i];

      if (COLOR_OPS.has(op)) {
        // For RGB ops, verify it's not gray (r==g==b)
        if (op === OPS.setFillRGBColor || op === OPS.setStrokeRGBColor) {
          const args = argsArray[i];
          if (args && args.length >= 3) {
            const r = args[0], g = args[1], b = args[2];
            if (r === g && g === b) continue; // Gray via RGB — skip
          }
        }
        return true;
      }

      // setFillColorN / setStrokeColorN with 3+ different args = color
      if ((op === OPS.setFillColorN || op === OPS.setStrokeColorN) && argsArray[i]) {
        const args = argsArray[i];
        if (args.length >= 3) {
          const nums = args.filter((v: any) => typeof v === 'number');
          if (nums.length >= 3) {
            const allSame = nums.slice(0, 3).every((v: number) => v === nums[0]);
            if (!allSame) return true;
          }
        }
      }
    }

    return false;
  } catch (err) {
    console.warn('Operator color detection failed for page, assuming B&W:', err);
    return false;
  }
}

// ============================================================
// MAIN ANALYSIS FUNCTION
// ============================================================

/**
 * Analyze PDF — auto-picks color detection method by file size
 * ≤25MB: canvas pixel sampling (most accurate)
 * >25MB: operator list scanning (fast, no crash)
 */
export async function analyzePDF(file: File): Promise<PDFAnalysisResult> {
  const useFastMethod = file.size > LARGE_FILE_THRESHOLD;
  
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
    hasOversizedPages: false,
    oversizedPageNumbers: [],
  };
  
  try {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      result.error = 'File must be a PDF';
      return result;
    }
    
    const MAX_SIZE = 500 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      result.error = 'File size exceeds 500MB limit';
      return result;
    }
    
    if (useFastMethod) {
      console.log(`Large file (${(file.size / 1024 / 1024).toFixed(1)}MB) — using operator list color detection`);
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf: PDFDocumentProxy = await getDocument({ data: arrayBuffer }).promise;
    
    result.totalPages = pdf.numPages;
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      
      const width = viewport.width;
      const height = viewport.height;
      const foldout = isFoldoutPage(width, height);
      const oversized = isOversizedPage(width, height);
      
      const isColor = useFastMethod
        ? await analyzePageColorByOperators(page)
        : await analyzePageColorByCanvas(page);
      
      result.pages.push({
        pageNumber: pageNum,
        width,
        height,
        isColor,
        isFoldout: foldout,
      });
      
      if (isColor) { result.colorPages++; } else { result.bwPages++; }
      if (foldout) { result.foldoutPages++; } else { result.standardPages++; }
      if (oversized) {
        result.hasOversizedPages = true;
        result.oversizedPageNumbers.push(pageNum);
      }
      
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
 * Quick page count only
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

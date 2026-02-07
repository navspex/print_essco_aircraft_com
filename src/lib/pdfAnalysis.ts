// ESSCO POD Calculator - PDF Analysis Module
// Uses PDF.js for automatic page counting, size detection, and color analysis
// V35 - Added server-side analysis for large files (>25MB)
// Small files: browser PDF.js with pixel-level color detection (existing)
// Large files: server Worker with color space metadata detection (new)

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Configure PDF.js worker - use CDN for reliability
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

// Files larger than this route to server-side analysis
export const SERVER_ANALYSIS_THRESHOLD = 25 * 1024 * 1024; // 25MB

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

  // Server-side analysis metadata
  serverAnalyzed?: boolean;  // true if analyzed by Cloudflare Worker
  r2FileKey?: string;        // file already in R2 (skip duplicate upload)
  partial?: boolean;         // true if server couldn't fully parse
}

// Standard page sizes in points (72 points = 1 inch)
const PAGE_SIZES = {
  LETTER_WIDTH: 612,   // 8.5 inches
  LETTER_HEIGHT: 792,  // 11 inches
  TABLOID_WIDTH: 792,  // 11 inches
  TABLOID_HEIGHT: 1224, // 17 inches
  TOLERANCE: 10,       // Allow small variations
};

/**
 * Determine if a page is a foldout (11x17 tabloid)
 */
function isFoldoutPage(width: number, height: number): boolean {
  const maxDim = Math.max(width, height);
  return maxDim > PAGE_SIZES.LETTER_HEIGHT + PAGE_SIZES.TOLERANCE;
}

/**
 * Determine if a page is oversized (larger than 11x17)
 */
function isOversizedPage(width: number, height: number): boolean {
  const maxDim = Math.max(width, height);
  return maxDim > PAGE_SIZES.TABLOID_HEIGHT + PAGE_SIZES.TOLERANCE;
}

/**
 * Analyze a single page for color content
 * Samples pixels from the rendered page to detect color
 */
async function analyzePageForColor(page: PDFPageProxy): Promise<boolean> {
  try {
    // Render at low resolution for speed (we just need color detection)
    const scale = 0.3; // Lower scale for faster analysis
    const viewport = page.getViewport({ scale });
    
    // Create offscreen canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return false;
    
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    
    // Render page
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
    
    // Sample pixels to detect color
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    // Sample every Nth pixel for performance
    const sampleRate = Math.max(50, Math.floor(pixels.length / 4000)); // ~1000 samples max
    let colorPixelCount = 0;
    const threshold = 15; // RGB channels must differ by this much to be "color"
    
    for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      
      // Skip transparent pixels
      if (a < 128) continue;
      
      // Skip white/near-white pixels
      if (r > 245 && g > 245 && b > 245) continue;
      
      // Skip black/near-black pixels
      if (r < 10 && g < 10 && b < 10) continue;
      
      // Check if pixel has color (R, G, B differ significantly)
      const maxChannel = Math.max(r, g, b);
      const minChannel = Math.min(r, g, b);
      
      if (maxChannel - minChannel > threshold) {
        colorPixelCount++;
        // If we find enough color pixels, page is color
        if (colorPixelCount > 3) {
          return true;
        }
      }
    }
    
    return false;
  } catch (err) {
    console.warn('Color detection failed for page, assuming B&W:', err);
    return false;
  }
}

/**
 * Browser-side PDF analysis (files ≤25MB)
 * Full pixel-level color detection via canvas rendering
 */
export async function analyzePDF(file: File): Promise<PDFAnalysisResult> {
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
    serverAnalyzed: false,
  };
  
  try {
    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      result.error = 'File must be a PDF';
      return result;
    }
    
    // Validate file size (500MB max)
    const MAX_SIZE = 500 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      result.error = 'File size exceeds 500MB limit';
      return result;
    }
    
    // Load PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdf: PDFDocumentProxy = await getDocument({ data: arrayBuffer }).promise;
    
    result.totalPages = pdf.numPages;
    
    // Analyze each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      
      const width = viewport.width;
      const height = viewport.height;
      const foldout = isFoldoutPage(width, height);
      const oversized = isOversizedPage(width, height);
      
      // Check for color
      const isColor = await analyzePageForColor(page);
      
      const pageAnalysis: PageAnalysis = {
        pageNumber: pageNum,
        width,
        height,
        isColor,
        isFoldout: foldout,
      };
      
      result.pages.push(pageAnalysis);
      
      // Update counts
      if (isColor) {
        result.colorPages++;
      } else {
        result.bwPages++;
      }
      
      if (foldout) {
        result.foldoutPages++;
      } else {
        result.standardPages++;
      }
      
      if (oversized) {
        result.hasOversizedPages = true;
        result.oversizedPageNumbers.push(pageNum);
      }
    }
    
    result.success = true;
    
  } catch (error) {
    console.error('PDF analysis error:', error);
    result.error = error instanceof Error ? error.message : 'Failed to analyze PDF';
  }
  
  return result;
}

/**
 * Server-side PDF analysis (files >25MB)
 * Sends file to Cloudflare Worker for analysis + R2 upload in one request
 * Worker uses pdf-lib color space metadata detection (no rendering needed)
 * Returns same PDFAnalysisResult shape as browser analysis
 */
export async function analyzeServerSide(file: File): Promise<PDFAnalysisResult> {
  const emptyResult: PDFAnalysisResult = {
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
    serverAnalyzed: true,
  };

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/analyze-pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return { ...emptyResult, error: `Server error: ${response.status}` };
    }

    const data = await response.json();

    if (!data.success) {
      return { ...emptyResult, error: data.error || 'Server analysis failed' };
    }

    return {
      success: true,
      fileName: file.name,
      fileSize: file.size,
      totalPages: data.totalPages || 0,
      pages: (data.pages || []).map((p: any) => ({
        pageNumber: p.pageNumber,
        width: p.width,
        height: p.height,
        isColor: p.isColor || false,
        isFoldout: p.isFoldout || false,
      })),
      bwPages: data.bwPages || 0,
      colorPages: data.colorPages || 0,
      standardPages: data.standardPages || 0,
      foldoutPages: data.foldoutPages || 0,
      hasOversizedPages: data.hasOversizedPages || false,
      oversizedPageNumbers: data.oversizedPageNumbers || [],
      serverAnalyzed: true,
      r2FileKey: data.fileKey,
      partial: data.partial || false,
    };
  } catch (error) {
    console.error('Server-side analysis error:', error);
    return {
      ...emptyResult,
      error: error instanceof Error ? error.message : 'Network error during analysis',
    };
  }
}

/**
 * Smart router — picks browser or server analysis based on file size
 * ≤25MB: browser PDF.js (pixel-level color detection)
 * >25MB: server Worker (color space metadata detection)
 */
export async function smartAnalyzePDF(file: File): Promise<PDFAnalysisResult> {
  if (file.size > SERVER_ANALYSIS_THRESHOLD) {
    console.log(`Large file (${(file.size / 1024 / 1024).toFixed(1)}MB) — routing to server`);
    return analyzeServerSide(file);
  }
  console.log(`File (${(file.size / 1024 / 1024).toFixed(1)}MB) — using browser analysis`);
  return analyzePDF(file);
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

// ESSCO POD Calculator - Main Component
// Orchestrates PDF upload, analysis, pricing, and order submission
// V35 - Server-side PDF analysis for large files, large file message, saddle stitch for letter ≤60pg, 3-hole $1, terms link fix

import { useState, useCallback } from 'react';
import { 
  Upload, FileCheck, AlertCircle, Loader2, 
  Package, DollarSign, CheckCircle, Info, AlertTriangle,
  Phone, Mail
} from 'lucide-react';
import { smartAnalyzePDF, formatFileSize, SERVER_ANALYSIS_THRESHOLD, type PDFAnalysisResult } from '../../lib/pdfAnalysis';
import { 
  calculatePrice, formatPrice, getTierDescription,
  BINDING_OPTIONS, COVER_OPTIONS, TAB_SET_PRICE,
  type BindingType, type CoverType, type PricingBreakdown
} from '../../lib/pricing';

type CalculatorStep = 'upload' | 'analyzing' | 'configure' | 'submitting' | 'checkout_opened' | 'error';

interface OrderConfig {
  copies: number;
  binding: BindingType;
  cover: CoverType;
  hasTabs: boolean;
  printMode: 'single' | 'double';
  isBooklet: boolean;
  bookletBinding: 'saddle' | 'threeRing' | 'comb' | 'perfect';
}

export default function Calculator() {
  // State
  const [step, setStep] = useState<CalculatorStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<PDFAnalysisResult | null>(null);
  const [config, setConfig] = useState<OrderConfig>({
    copies: 1,
    binding: 'none',
    cover: 'none',
    hasTabs: false,
    printMode: 'double',
    isBooklet: false,
    bookletBinding: 'saddle',
  });
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [r2FileKey, setR2FileKey] = useState<string | null>(null);

  // Calculate pricing whenever config or analysis changes
  const updatePricing = useCallback((analysisData: PDFAnalysisResult, orderConfig: OrderConfig) => {
    const result = calculatePrice({
      bwPages: analysisData.bwPages,
      colorPages: analysisData.colorPages,
      copies: orderConfig.copies,
      binding: orderConfig.binding,
      cover: orderConfig.cover,
      hasTabs: orderConfig.hasTabs,
      foldoutPages: analysisData.foldoutPages,
    });
    setPricing(result);
  }, []);

  // Handle file selection
  const handleFile = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setStep('analyzing');

    try {
      // smartAnalyzePDF routes to browser (≤25MB) or server (>25MB)
      const result = await smartAnalyzePDF(selectedFile);
      
      if (!result.success) {
        setError(result.error || 'Failed to analyze PDF');
        setStep('error');
        return;
      }

      if (result.hasOversizedPages) {
        setError(`Pages ${result.oversizedPageNumbers.join(', ')} exceed maximum size (11×17). Please contact us for oversized printing.`);
        setStep('error');
        return;
      }

      setAnalysis(result);
      updatePricing(result, config);
      setStep('configure');
      
      // If server analyzed, file is already in R2 — grab the key
      if (result.serverAnalyzed && result.r2FileKey) {
        setR2FileKey(result.r2FileKey);
      } else {
        // Upload to R2 immediately after browser analysis (non-blocking)
        // File is "in the system" before customer finishes configuring
        uploadPdfToStorageEarly(selectedFile).then(uploadResult => {
          if (uploadResult.success && uploadResult.fileKey) {
            setR2FileKey(uploadResult.fileKey);
          }
          // Don't fail the flow if upload fails - we'll retry at checkout
        });
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze PDF');
      setStep('error');
    }
  }, [config, updatePricing]);

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.toLowerCase().endsWith('.pdf'))) {
      handleFile(droppedFile);
    } else {
      setError('Please upload a PDF file');
    }
  }, [handleFile]);

  // Config change handler
  const handleConfigChange = useCallback((updates: Partial<OrderConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    if (analysis) {
      updatePricing(analysis, newConfig);
    }
  }, [config, analysis, updatePricing]);

  // Upload PDF to R2 storage (early - called right after analysis)
  const uploadPdfToStorageEarly = async (fileToUpload: File): Promise<{ success: boolean; fileKey?: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        return { success: true, fileKey: data.fileKey };
      } else {
        return { success: false, error: data.error || 'Upload failed' };
      }
    } catch (err) {
      return { success: false, error: 'Network error during upload' };
    }
  };

  // Upload PDF to R2 storage (fallback - if early upload failed)
  const uploadPdfToStorage = async (): Promise<{ success: boolean; fileKey?: string; error?: string }> => {
    // If we already uploaded early, return that key
    if (r2FileKey) {
      return { success: true, fileKey: r2FileKey };
    }
    
    if (!file) return { success: false, error: 'No file selected' };
    
    setUploadProgress('Uploading PDF...');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        return { success: true, fileKey: data.fileKey };
      } else {
        return { success: false, error: data.error || 'Upload failed' };
      }
    } catch (err) {
      return { success: false, error: 'Network error during upload' };
    }
  };

  // Submit to Shopify Draft Order
  const handleSubmit = useCallback(async () => {
    if (!analysis || !pricing || !file) return;
    
    if (pricing.requiresManualQuote) {
      // Don't submit - show contact info
      return;
    }

    setStep('submitting');
    setUploadProgress('Uploading PDF...');

    try {
      // Step 1: Upload PDF to R2
      const uploadResult = await uploadPdfToStorage();
      
      if (!uploadResult.success) {
        setError(uploadResult.error || 'Failed to upload PDF');
        setStep('error');
        return;
      }
      
      setUploadProgress('Creating order...');

      // Step 2: Create Draft Order with file key
      const response = await fetch('/api/create-draft-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: pricing.totalPrice,
          quantity: config.copies,
          documentName: file.name,
          pageCount: analysis.totalPages,
          bwPages: analysis.bwPages,
          colorPages: analysis.colorPages,
          bindingType: config.isBooklet 
            ? (analysis.totalPages <= 60 
                ? 'Saddle Stitch (Booklet)' 
                : config.bookletBinding === 'threeRing' ? 'Half-Size 3-Ring Binder'
                : config.bookletBinding === 'comb' ? 'Comb Binding (Booklet)'
                : 'Perfect Binding (Booklet)')
            : BINDING_OPTIONS[config.binding].label,
          coverType: COVER_OPTIONS[config.cover].label,
          hasTabs: config.hasTabs,
          foldoutCount: analysis.foldoutPages,
          printMode: config.printMode,
          shippingWeightGrams: pricing.totalWeightGrams,
          // Booklet info
          isBooklet: config.isBooklet,
          pageSize: config.isBooklet ? '5.5" × 8.5"' : '8.5" × 11"',
          // R2 file key for production team
          pdfFileKey: uploadResult.fileKey,
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        // Open Shopify checkout in new tab (preserves calculator state if user hits back)
        window.open(data.checkoutUrl, '_blank');
        // Show "checkout opened" state instead of resetting
        setStep('checkout_opened');
        setUploadProgress('');
      } else {
        setError(data.error || 'Failed to create order');
        setStep('error');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setStep('error');
    }
  }, [analysis, pricing, file, config]);

  // Reset calculator
  const handleReset = useCallback(() => {
    setStep('upload');
    setFile(null);
    setAnalysis(null);
    setPricing(null);
    setError(null);
    setUploadProgress('');
    setR2FileKey(null);
    setConfig({
      copies: 1,
      binding: 'none',
      cover: 'none',
      hasTabs: false,
      printMode: 'double',
      isBooklet: false,
      bookletBinding: 'saddle',
    });
  }, []);

  // ==================== RENDER COMPONENTS ====================

  // Upload Step
  const renderUpload = () => (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
        ${dragActive 
          ? 'border-amber-400 bg-amber-500/10' 
          : 'border-slate-600 hover:border-amber-500/50 bg-slate-800/30'
        }
      `}
    >
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload className="w-8 h-8 text-amber-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {dragActive ? 'Drop your PDF here' : 'Upload Your PDF'}
      </h3>
      <p className="text-slate-400 mb-4">
        Drag and drop or click to browse
      </p>
      <p className="text-slate-500 text-sm">
        Maximum file size: 500MB • PDF files only
      </p>
    </div>
  );

  // Analyzing Step
  const renderAnalyzing = () => (
    <div className="text-center py-12">
      <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your PDF...</h3>
      <p className="text-slate-400">
        {file && file.size > SERVER_ANALYSIS_THRESHOLD
          ? 'Uploading and analyzing on our server — large files welcome'
          : 'Counting pages, detecting colors, checking sizes'}
      </p>
      {file && (
        <>
          <p className="text-slate-500 text-sm mt-4">
            {file.name} • {formatFileSize(file.size)}
          </p>
          {file.size > 10 * 1024 * 1024 && (
            <p className="text-amber-400 text-sm mt-2 flex items-center justify-center gap-1">
              <Info size={14} />
              Large file — this may take a moment, please stand by
            </p>
          )}
        </>
      )}
    </div>
  );

  // Configure Step
  const renderConfigure = () => {
    if (!analysis || !pricing) return null;

    return (
      <div className="space-y-6">
        {/* PDF Analysis Summary */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-1 truncate">{file?.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{formatFileSize(file?.size || 0)}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Total Pages</span>
                  <p className="text-white font-semibold">{analysis.totalPages}</p>
                </div>
                <div>
                  <span className="text-slate-500">B&W Pages</span>
                  <p className="text-white font-semibold">{analysis.bwPages}</p>
                </div>
                <div>
                  <span className="text-slate-500">Color Pages</span>
                  <p className="text-white font-semibold">{analysis.colorPages}</p>
                </div>
                <div>
                  <span className="text-slate-500">Page Size</span>
                  <p className={`font-semibold ${config.isBooklet ? 'text-amber-400' : 'text-white'}`}>
                    {config.isBooklet ? '5.5" × 8.5"' : '8.5" × 11"'}
                  </p>
                </div>
                {analysis.foldoutPages > 0 && (
                  <div>
                    <span className="text-slate-500">Fold-outs (11×17)</span>
                    <p className="text-white font-semibold">{analysis.foldoutPages}</p>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white text-sm underline flex-shrink-0"
            >
              Change file
            </button>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Options */}
          <div className="space-y-4">
            {/* Copies */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Number of Copies
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={config.copies}
                onChange={(e) => handleConfigChange({ copies: Math.max(1, Math.min(100, parseInt(e.target.value) || 1)) })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-slate-500 text-xs mt-1">Volume discounts apply automatically (max 100)</p>
            </div>

            {/* Print Mode */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Print Mode
              </label>
              <div className="flex gap-4">
                {(['single', 'double'] as const).map((mode) => (
                  <label key={mode} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="printMode"
                      checked={config.printMode === mode}
                      onChange={() => handleConfigChange({ printMode: mode })}
                      className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-white capitalize">{mode}-sided</span>
                  </label>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                <Info size={12} />
                Price is per PDF page regardless of print mode
              </p>
            </div>

            {/* Booklet Size Option */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={config.isBooklet}
                  onChange={(e) => {
                    const isBooklet = e.target.checked;
                    // Auto-set binding based on page count
                    const bookletBinding = analysis && analysis.totalPages > 60 ? 'threeRing' : 'saddle';
                    handleConfigChange({ isBooklet, bookletBinding });
                  }}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500 rounded"
                />
                <span className="text-white">Print as booklet (5.5" × 8.5")</span>
              </label>
              <p className="text-slate-500 text-xs flex items-center gap-1 ml-6">
                <Info size={12} />
                Default is letter size (8.5" × 11")
              </p>
              
              {/* Booklet binding options - only show if booklet checked AND >60 pages */}
              {config.isBooklet && analysis && analysis.totalPages > 60 && (
                <div className="mt-4 ml-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <p className="text-amber-400 text-xs mb-2 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    {analysis.totalPages} pages exceeds saddle stitch limit (60 pages). Select binding:
                  </p>
                  <div className="space-y-2">
                    {([
                      { key: 'threeRing', label: 'Half-Size 3-Ring Binder' },
                      { key: 'comb', label: 'Comb Binding' },
                      { key: 'perfect', label: 'Perfect Binding' },
                    ] as const).map((opt) => (
                      <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="bookletBinding"
                          checked={config.bookletBinding === opt.key}
                          onChange={() => handleConfigChange({ bookletBinding: opt.key })}
                          className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-white text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Show saddle stitch confirmation for ≤60 pages */}
              {config.isBooklet && analysis && analysis.totalPages <= 60 && (
                <p className="mt-2 ml-6 text-green-400 text-xs flex items-center gap-1">
                  <CheckCircle size={12} />
                  Saddle stitch binding (stapled spine) included
                </p>
              )}
            </div>

            {/* Binding */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Binding
              </label>
              <div className="space-y-2">
                {(Object.entries(BINDING_OPTIONS) as [BindingType, typeof BINDING_OPTIONS[BindingType]][]).map(([key, opt]) => {
                  // Hide saddle stitch for letter size docs over 60 pages
                  if (key === 'saddle' && !config.isBooklet && analysis.totalPages > 60) {
                    return null;
                  }
                  return (
                    <label key={key} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700/50">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="binding"
                          checked={config.binding === key}
                          onChange={() => handleConfigChange({ binding: key })}
                          className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-white">{opt.label}</span>
                      </div>
                      <span className="text-slate-400 text-sm">
                        {formatPrice(opt.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Cover */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cover
              </label>
              <div className="space-y-2">
                {(Object.entries(COVER_OPTIONS) as [CoverType, typeof COVER_OPTIONS[CoverType]][]).map(([key, opt]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-slate-700/50">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cover"
                        checked={config.cover === key}
                        onChange={() => handleConfigChange({ cover: key })}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-white">{opt.label}</span>
                    </div>
                    <span className="text-slate-400 text-sm">
                      {opt.price === 0 ? 'FREE' : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.hasTabs}
                    onChange={(e) => handleConfigChange({ hasTabs: e.target.checked })}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500 rounded"
                  />
                  <span className="text-white">Add Index Tabs (5-tab set)</span>
                </div>
                <span className="text-slate-400 text-sm">{formatPrice(TAB_SET_PRICE)}</span>
              </label>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 h-fit md:sticky md:top-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Price Breakdown
            </h3>

            <div className="space-y-3 text-sm">
              {/* Page costs */}
              {pricing.bwPagesCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {analysis.bwPages} B&W × {config.copies} @ {formatPrice(pricing.bwRate)}
                  </span>
                  <span className="text-white">{formatPrice(pricing.bwPagesCost)}</span>
                </div>
              )}
              {pricing.colorPagesCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {analysis.colorPages} Color × {config.copies} @ {formatPrice(pricing.colorRate)}
                  </span>
                  <span className="text-white">{formatPrice(pricing.colorPagesCost)}</span>
                </div>
              )}

              {/* Add-ons */}
              {pricing.bindingCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {BINDING_OPTIONS[config.binding].label} × {config.copies}
                  </span>
                  <span className="text-white">{formatPrice(pricing.bindingCost)}</span>
                </div>
              )}
              {pricing.coverCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {COVER_OPTIONS[config.cover].label} × {config.copies}
                  </span>
                  <span className="text-white">{formatPrice(pricing.coverCost)}</span>
                </div>
              )}
              {pricing.tabsCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Index Tabs × {config.copies}</span>
                  <span className="text-white">{formatPrice(pricing.tabsCost)}</span>
                </div>
              )}

              {/* Tier discount info */}
              {pricing.tierApplied > 1 && (
                <div className="flex items-center gap-2 text-green-400 text-xs py-2">
                  <CheckCircle size={14} />
                  <span>Volume discount: {getTierDescription(pricing.tierApplied)}</span>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-slate-600 pt-3 mt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400">{formatPrice(pricing.totalPrice)}</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Est. weight: {pricing.shippingWeightLbs} lbs • Shipping calculated at checkout
                </p>
              </div>
            </div>

            {/* Manual Quote Warning */}
            {pricing.requiresManualQuote ? (
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-400 font-medium text-sm">{pricing.quoteReason}</p>
                    <p className="text-slate-400 text-sm mt-2">Contact us for a custom quote:</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <a href="tel:877-318-1555" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1">
                        <Phone size={14} /> 877-318-1555
                      </a>
                      <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1">
                        <Mail size={14} /> esscosupport@aol.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Page Size Confirmation */}
                <div className={`mt-6 mb-3 py-2 px-4 rounded-lg text-sm font-medium text-center ${
                  config.isBooklet 
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300' 
                    : 'bg-slate-700/60 border border-slate-600 text-slate-300'
                }`}>
                  📄 Printing at <span className="font-bold text-white">{config.isBooklet ? '5.5" × 8.5" (Booklet)' : '8.5" × 11" (Letter)'}</span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Package size={20} />
                  Proceed to Checkout
                </button>
              </>
            )}

            <p className="text-slate-500 text-xs mt-3 text-center">
              By proceeding, you agree to our{' '}
              <a href="https://www.esscoaircraft.com/policies/terms-of-service" className="text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">Terms</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Submitting Step
  const renderSubmitting = () => (
    <div className="text-center py-12">
      <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Processing Your Order...</h3>
      <p className="text-slate-400">{uploadProgress || 'Please wait...'}</p>
    </div>
  );

  // Checkout Opened Step
  const renderCheckoutOpened = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Your Order is Open in Another Tab</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        Complete your checkout in the Shopify tab. Your quote details are below for reference.
      </p>
      
      {/* Quote Summary */}
      {analysis && pricing && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6 text-left max-w-md mx-auto">
          <h4 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
            <DollarSign size={18} />
            Quote Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Document:</span>
              <span className="text-white truncate ml-2 max-w-[200px]">{file?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pages:</span>
              <span className="text-white">{analysis.totalPages} ({analysis.bwPages} B&W, {analysis.colorPages} color)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Size:</span>
              <span className="text-white">{config.isBooklet ? '5.5" × 8.5" (Booklet)' : '8.5" × 11" (Letter)'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Copies:</span>
              <span className="text-white">{config.copies}</span>
            </div>
            <div className="flex justify-between border-t border-slate-700 pt-2 mt-2">
              <span className="text-slate-300 font-medium">Total:</span>
              <span className="text-amber-400 font-bold">{formatPrice(pricing.totalPrice)}</span>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={handleReset}
        className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300"
      >
        Start New Quote
      </button>
    </div>
  );

  // Error Step
  const renderError = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Something Went Wrong</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">{error}</p>
      <button
        onClick={handleReset}
        className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Try Again
      </button>
      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-slate-500 text-sm mb-2">Need help? Contact us:</p>
        <div className="flex justify-center gap-4">
          <a href="tel:877-318-1555" className="text-amber-400 hover:text-amber-300">877-318-1555</a>
          <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:text-amber-300">esscosupport@aol.com</a>
        </div>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div className="max-w-4xl mx-auto">
      {step === 'upload' && renderUpload()}
      {step === 'analyzing' && renderAnalyzing()}
      {step === 'configure' && renderConfigure()}
      {step === 'submitting' && renderSubmitting()}
      {step === 'checkout_opened' && renderCheckoutOpened()}
      {step === 'error' && renderError()}
    </div>
  );
}




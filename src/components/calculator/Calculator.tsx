// ESSCO POD Calculator - Main Component
// Orchestrates PDF upload, analysis, pricing, and order submission

import { useState, useCallback } from 'react';
import { 
  Upload, FileCheck, AlertCircle, Loader2, FileText, 
  Package, DollarSign, CheckCircle, Info, AlertTriangle,
  Phone, Mail
} from 'lucide-react';
import { analyzePDF, formatFileSize, type PDFAnalysisResult } from '../../lib/pdfAnalysis';
import { 
  calculatePrice, formatPrice, getTierDescription,
  BINDING_OPTIONS, COVER_OPTIONS, TAB_SET_PRICE,
  type BindingType, type CoverType, type PricingBreakdown
} from '../../lib/pricing';

type CalculatorStep = 'upload' | 'analyzing' | 'configure' | 'review' | 'submitting' | 'success' | 'error';

interface OrderConfig {
  copies: number;
  binding: BindingType;
  cover: CoverType;
  hasTabs: boolean;
  printMode: 'single' | 'double';
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
  });
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

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
      const result = await analyzePDF(selectedFile);
      
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
    if (droppedFile?.type === 'application/pdf') {
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

  // Submit to Shopify Draft Order
  const handleSubmit = useCallback(async () => {
    if (!analysis || !pricing || !file) return;
    
    if (pricing.requiresManualQuote) {
      // Don't submit - show contact info
      return;
    }

    setStep('submitting');

    try {
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
          bindingType: BINDING_OPTIONS[config.binding].label,
          coverType: COVER_OPTIONS[config.cover].label,
          hasTabs: config.hasTabs,
          foldoutCount: analysis.foldoutPages,
          printMode: config.printMode,
          shippingWeightGrams: pricing.totalWeightGrams,
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        // Redirect to Shopify checkout
        window.location.href = data.checkoutUrl;
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
    setConfig({
      copies: 1,
      binding: 'none',
      cover: 'none',
      hasTabs: false,
      printMode: 'double',
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
      <p className="text-slate-400">Counting pages, detecting colors, checking sizes</p>
      {file && (
        <p className="text-slate-500 text-sm mt-4">
          {file.name} • {formatFileSize(file.size)}
        </p>
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
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">{file?.name}</h3>
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
              className="text-slate-400 hover:text-white text-sm underline"
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
              <p className="text-slate-500 text-xs mt-1">Volume discounts apply automatically</p>
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

            {/* Binding */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Binding
              </label>
              <div className="space-y-2">
                {(Object.entries(BINDING_OPTIONS) as [BindingType, typeof BINDING_OPTIONS[BindingType]][]).map(([key, opt]) => (
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
                      {opt.price === 0 ? 'FREE' : formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
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
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 h-fit sticky top-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Price Breakdown
            </h3>

            <div className="space-y-3 text-sm">
              {/* Page costs */}
              {pricing.bwPagesCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {analysis.bwPages} B&W pages × {config.copies} copies @ {formatPrice(pricing.bwRate)}
                  </span>
                  <span className="text-white">{formatPrice(pricing.bwPagesCost)}</span>
                </div>
              )}
              {pricing.colorPagesCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {analysis.colorPages} Color pages × {config.copies} copies @ {formatPrice(pricing.colorRate)}
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
                  <span>Volume discount applied: {getTierDescription(pricing.tierApplied)}</span>
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
                    <p className="text-slate-400 text-sm mt-2">Please contact us for a custom quote:</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <a href="tel:877-318-1555" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1">
                        <Phone size={14} /> 877-318-1555
                      </a>
                      <a href="mailto:dale@esscoaircraft.com" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1">
                        <Mail size={14} /> dale@esscoaircraft.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Package size={20} />
                Proceed to Checkout
              </button>
            )}

            <p className="text-slate-500 text-xs mt-3 text-center">
              By proceeding, you agree to our{' '}
              <a href="/pages/copyright-disclaimers" className="text-amber-400 hover:underline">Terms</a>
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
      <h3 className="text-xl font-semibold text-white mb-2">Creating Your Order...</h3>
      <p className="text-slate-400">Preparing your checkout</p>
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
          <a href="mailto:dale@esscoaircraft.com" className="text-amber-400 hover:text-amber-300">dale@esscoaircraft.com</a>
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
      {step === 'error' && renderError()}
    </div>
  );
}

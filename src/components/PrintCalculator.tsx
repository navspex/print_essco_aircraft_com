import React, { useState, useMemo } from 'react';

// Pricing structure
const PRICING = {
  print: {
    bw: {
      single: { tier1: 0.15, tier2: 0.12, tier3: 0.10 },
      double: { tier1: 0.25, tier2: 0.20, tier3: 0.17 },
    },
    color: {
      single: { tier1: 0.45, tier2: 0.37, tier3: 0.32 },
      double: { tier1: 0.75, tier2: 0.62, tier3: 0.54 },
    },
  },
  binding: {
    none: 0,
    spiral: 3.50,
    comb: 2.50,
    perfect: 8.00,
  },
  foldout: {
    bw: { tier1: 6.00, tier2: 5.25, tier3: 4.50 },
    color: { tier1: 8.00, tier2: 7.00, tier3: 6.00 },
  },
  lamination: {
    letter: { '3mil': 2.00, '5mil': 2.50, '10mil': 3.50 },
    legal: { '3mil': 2.50, '5mil': 3.00, '10mil': 4.00 },
    ledger: { '3mil': 5.00, '5mil': 6.00, '10mil': 7.50 },
  },
  addons: {
    heavyCover: 2.00,
    dividerTab: 1.50,
  },
};

// Get tier based on page count
const getTier = (pages: number): 'tier1' | 'tier2' | 'tier3' => {
  if (pages >= 500) return 'tier3';
  if (pages >= 100) return 'tier2';
  return 'tier1';
};

const PrintCalculator: React.FC = () => {
  // Form state
  const [pageCount, setPageCount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [printType, setPrintType] = useState<'bw' | 'color'>('bw');
  const [colorPages, setColorPages] = useState<number>(0);
  const [sides, setSides] = useState<'single' | 'double'>('double');
  const [binding, setBinding] = useState<'none' | 'spiral' | 'comb' | 'perfect'>('spiral');
  const [foldoutCount, setFoldoutCount] = useState<number>(0);
  const [foldoutType, setFoldoutType] = useState<'bw' | 'color'>('bw');
  const [laminationSize, setLaminationSize] = useState<'none' | 'letter' | 'legal' | 'ledger'>('none');
  const [laminationThickness, setLaminationThickness] = useState<'3mil' | '5mil' | '10mil'>('3mil');
  const [laminationCount, setLaminationCount] = useState<number>(0);
  const [heavyCover, setHeavyCover] = useState<boolean>(false);
  const [dividerTabs, setDividerTabs] = useState<number>(0);
  const [pdfUploaded, setPdfUploaded] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  // Calculate pricing
  const pricing = useMemo(() => {
    const tier = getTier(pageCount);
    
    // Print cost calculation
    let printCost = 0;
    if (printType === 'bw') {
      printCost = pageCount * PRICING.print.bw[sides][tier];
    } else {
      // Mixed: color pages at color rate, rest at B&W
      const bwPages = pageCount - colorPages;
      printCost = (bwPages * PRICING.print.bw[sides][tier]) + 
                  (colorPages * PRICING.print.color[sides][tier]);
    }
    
    // Binding cost
    const bindingCost = PRICING.binding[binding];
    
    // Foldout cost
    const foldoutCost = foldoutCount * PRICING.foldout[foldoutType][tier];
    
    // Lamination cost
    let laminationCost = 0;
    if (laminationSize !== 'none' && laminationCount > 0) {
      laminationCost = laminationCount * PRICING.lamination[laminationSize][laminationThickness];
    }
    
    // Addons
    const heavyCoverCost = heavyCover ? PRICING.addons.heavyCover : 0;
    const dividerTabsCost = dividerTabs * PRICING.addons.dividerTab;
    
    // Per-copy subtotal
    const perCopySubtotal = printCost + bindingCost + foldoutCost + laminationCost + heavyCoverCost + dividerTabsCost;
    
    // Total with quantity
    const subtotal = perCopySubtotal * quantity;
    
    return {
      printCost: printCost * quantity,
      bindingCost: bindingCost * quantity,
      foldoutCost: foldoutCost * quantity,
      laminationCost: laminationCost * quantity,
      heavyCoverCost: heavyCoverCost * quantity,
      dividerTabsCost: dividerTabsCost * quantity,
      perCopySubtotal,
      subtotal,
      tier,
    };
  }, [pageCount, quantity, printType, colorPages, sides, binding, foldoutCount, foldoutType, laminationSize, laminationThickness, laminationCount, heavyCover, dividerTabs]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setPdfUploaded(true);
      // In production, this would upload to Google Drive and get page count
      // For now, user enters page count manually
    }
  };

  const isOverQuoteThreshold = pricing.subtotal > 500;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6">
        <h3 className="text-2xl font-bold">Print Calculator</h3>
        <p className="text-slate-300 mt-1">Configure your print job and get instant pricing</p>
      </div>

      <div className="p-6 md:p-8">
        {/* Step 1: Upload PDF */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Upload Your Document
          </h4>
          
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {pdfUploaded ? (
                <div>
                  <p className="text-green-600 font-semibold">{fileName}</p>
                  <p className="text-sm text-slate-500 mt-1">Click to upload a different file</p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-700 font-medium">Drop your PDF here or click to browse</p>
                  <p className="text-sm text-slate-500 mt-1">Maximum file size: 100MB</p>
                </div>
              )}
            </label>
          </div>
          
          {/* Manual page count entry */}
          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">Total PDF Pages:</label>
            <input
              type="number"
              min="0"
              value={pageCount || ''}
              onChange={(e) => setPageCount(parseInt(e.target.value) || 0)}
              className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="0"
            />
            <span className="text-sm text-slate-500">
              {pageCount >= 500 ? '(500+ tier pricing)' : pageCount >= 100 ? '(100-499 tier pricing)' : '(1-99 tier pricing)'}
            </span>
          </div>
        </div>

        {/* Step 2: Quantity */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Quantity
          </h4>
          
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">Number of Copies:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Step 3: Print Options */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            Print Options
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Print Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Print Type</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setPrintType('bw')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    printType === 'bw'
                      ? 'border-amber-500 bg-amber-50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  Black & White
                </button>
                <button
                  onClick={() => setPrintType('color')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    printType === 'color'
                      ? 'border-amber-500 bg-amber-50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  Color/Mixed
                </button>
              </div>
              
              {printType === 'color' && (
                <div className="mt-3">
                  <label className="text-sm text-slate-600">Number of color pages:</label>
                  <input
                    type="number"
                    min="0"
                    max={pageCount}
                    value={colorPages || ''}
                    onChange={(e) => setColorPages(Math.min(pageCount, parseInt(e.target.value) || 0))}
                    className="ml-2 w-20 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>
            
            {/* Sides */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Printing Sides</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSides('single')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    sides === 'single'
                      ? 'border-amber-500 bg-amber-50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  Single-Sided
                </button>
                <button
                  onClick={() => setSides('double')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    sides === 'double'
                      ? 'border-amber-500 bg-amber-50 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  Double-Sided
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Binding */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            Binding
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'none', label: 'No Binding', price: '$0.00' },
              { value: 'spiral', label: 'Spiral', price: '$3.50' },
              { value: 'comb', label: 'Comb', price: '$2.50' },
              { value: 'perfect', label: 'Perfect', price: '$8.00' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setBinding(option.value as typeof binding)}
                className={`py-4 px-3 rounded-lg border-2 font-medium transition-all text-center ${
                  binding === option.value
                    ? 'border-amber-500 bg-amber-50 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-sm text-slate-500">{option.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Fold-Out Pages */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">5</span>
            Fold-Out Pages
          </h4>
          
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Number of fold-outs:</label>
              <input
                type="number"
                min="0"
                value={foldoutCount || ''}
                onChange={(e) => setFoldoutCount(parseInt(e.target.value) || 0)}
                className="ml-2 w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            {foldoutCount > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setFoldoutType('bw')}
                  className={`py-2 px-4 rounded-lg border-2 text-sm font-medium ${
                    foldoutType === 'bw'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200'
                  }`}
                >
                  B&W ($6.00-4.50)
                </button>
                <button
                  onClick={() => setFoldoutType('color')}
                  className={`py-2 px-4 rounded-lg border-2 text-sm font-medium ${
                    foldoutType === 'color'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200'
                  }`}
                >
                  Color ($8.00-6.00)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Step 6: Lamination */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">6</span>
            Lamination
          </h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Page Size</label>
              <select
                value={laminationSize}
                onChange={(e) => setLaminationSize(e.target.value as typeof laminationSize)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="none">No Lamination</option>
                <option value="letter">Letter (8.5x11)</option>
                <option value="legal">Legal (8.5x14)</option>
                <option value="ledger">Ledger (11x17)</option>
              </select>
            </div>
            
            {laminationSize !== 'none' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Thickness</label>
                  <select
                    value={laminationThickness}
                    onChange={(e) => setLaminationThickness(e.target.value as typeof laminationThickness)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="3mil">3 mil (Standard)</option>
                    <option value="5mil">5 mil (Medium)</option>
                    <option value="10mil">10 mil (Heavy)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pages to Laminate</label>
                  <input
                    type="number"
                    min="0"
                    value={laminationCount || ''}
                    onChange={(e) => setLaminationCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 7: Add-ons */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">7</span>
            Add-ons
          </h4>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={heavyCover}
                onChange={(e) => setHeavyCover(e.target.checked)}
                className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
              />
              <span className="text-slate-700">Heavy Card Stock Cover (+$2.00)</span>
            </label>
            
            <div className="flex items-center gap-3">
              <label className="text-slate-700">Professional Divider Tabs:</label>
              <input
                type="number"
                min="0"
                value={dividerTabs || ''}
                onChange={(e) => setDividerTabs(parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-500">($1.50 each)</span>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Printing ({pageCount} pages × {quantity} copies)</span>
              <span className="font-medium">${pricing.printCost.toFixed(2)}</span>
            </div>
            
            {pricing.bindingCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Binding ({binding} × {quantity})</span>
                <span className="font-medium">${pricing.bindingCost.toFixed(2)}</span>
              </div>
            )}
            
            {pricing.foldoutCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Fold-outs ({foldoutCount} × {quantity})</span>
                <span className="font-medium">${pricing.foldoutCost.toFixed(2)}</span>
              </div>
            )}
            
            {pricing.laminationCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Lamination ({laminationCount} pages × {quantity})</span>
                <span className="font-medium">${pricing.laminationCost.toFixed(2)}</span>
              </div>
            )}
            
            {pricing.heavyCoverCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Heavy Cover × {quantity}</span>
                <span className="font-medium">${pricing.heavyCoverCost.toFixed(2)}</span>
              </div>
            )}
            
            {pricing.dividerTabsCost > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600">Divider Tabs ({dividerTabs} × {quantity})</span>
                <span className="font-medium">${pricing.dividerTabsCost.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-slate-300 pt-3 mt-3">
              <div className="flex justify-between text-base">
                <span className="text-slate-600">Per Copy</span>
                <span className="font-medium">${pricing.perCopySubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 mt-2">
                <span>Total ({quantity} {quantity === 1 ? 'copy' : 'copies'})</span>
                <span className="text-amber-600">${pricing.subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        {isOverQuoteThreshold ? (
          <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-6 text-center">
            <p className="text-slate-800 mb-4">
              Orders over $500 receive personalized quotes with potential volume discounts.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg">
              Request Custom Quote
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              disabled={pageCount === 0}
              className={`flex-1 py-4 px-8 rounded-lg text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-3 ${
                pageCount === 0
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-900'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Checkout with PayPal
            </button>
            
            <button className="flex-1 py-4 px-8 rounded-lg text-lg font-bold border-2 border-slate-300 text-slate-700 hover:border-slate-400 transition-all flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Request Quote Instead
            </button>
          </div>
        )}
        
        <p className="text-center text-sm text-slate-500 mt-4">
          🔒 Secure checkout • Files deleted after 7 days • Questions? Call 877-318-1555
        </p>
      </div>
    </div>
  );
};

export default PrintCalculator;

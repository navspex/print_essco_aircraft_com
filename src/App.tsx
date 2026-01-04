import React, { useState, useCallback } from 'react';
import Header from './components/Header';

// ==================== PRICING CONSTANTS ====================
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
  quoteThreshold: 500,
};

function getPriceTier(pageCount: number): 'tier1' | 'tier2' | 'tier3' {
  if (pageCount >= 500) return 'tier3';
  if (pageCount >= 100) return 'tier2';
  return 'tier1';
}

// ==================== CALCULATOR COMPONENT ====================
const PrintCalculator: React.FC = () => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [printType, setPrintType] = useState<'bw' | 'color'>('bw');
  const [sides, setSides] = useState<'single' | 'double'>('double');
  const [binding, setBinding] = useState<'none' | 'spiral' | 'comb' | 'perfect'>('spiral');
  const [colorPages, setColorPages] = useState<number>(0);
  const [foldoutCount, setFoldoutCount] = useState<number>(0);
  const [foldoutType, setFoldoutType] = useState<'bw' | 'color'>('bw');
  const [laminationCount, setLaminationCount] = useState<number>(0);
  const [laminationSize, setLaminationSize] = useState<'letter' | 'legal' | 'ledger'>('letter');
  const [laminationThickness, setLaminationThickness] = useState<'3mil' | '5mil' | '10mil'>('3mil');
  const [heavyCover, setHeavyCover] = useState<boolean>(false);
  const [dividerTabs, setDividerTabs] = useState<number>(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const calculatePrice = useCallback(() => {
    if (pageCount === 0) return { subtotal: 0, perUnit: 0, breakdown: [] };

    const tier = getPriceTier(pageCount);
    const breakdown: { label: string; amount: number }[] = [];

    let bwPages = pageCount;
    let colorPagesCount = 0;

    if (printType === 'color') {
      colorPagesCount = pageCount;
      bwPages = 0;
    } else if (colorPages > 0) {
      colorPagesCount = Math.min(colorPages, pageCount);
      bwPages = pageCount - colorPagesCount;
    }

    let printCost = 0;
    if (bwPages > 0) {
      const bwRate = PRICING.print.bw[sides][tier];
      printCost += bwPages * bwRate;
      breakdown.push({ label: `B&W ${sides}-sided (${bwPages} pg × $${bwRate.toFixed(2)})`, amount: bwPages * bwRate });
    }
    if (colorPagesCount > 0) {
      const colorRate = PRICING.print.color[sides][tier];
      printCost += colorPagesCount * colorRate;
      breakdown.push({ label: `Color ${sides}-sided (${colorPagesCount} pg × $${colorRate.toFixed(2)})`, amount: colorPagesCount * colorRate });
    }

    const bindingCost = PRICING.binding[binding];
    if (bindingCost > 0) {
      breakdown.push({ label: `${binding.charAt(0).toUpperCase() + binding.slice(1)} binding`, amount: bindingCost });
    }

    let foldoutCost = 0;
    if (foldoutCount > 0) {
      const foldoutRate = PRICING.foldout[foldoutType][tier];
      foldoutCost = foldoutCount * foldoutRate;
      breakdown.push({ label: `Fold-outs (${foldoutCount} × $${foldoutRate.toFixed(2)})`, amount: foldoutCost });
    }

    let laminationCost = 0;
    if (laminationCount > 0) {
      const lamRate = PRICING.lamination[laminationSize][laminationThickness];
      laminationCost = laminationCount * lamRate;
      breakdown.push({ label: `Lamination ${laminationSize} ${laminationThickness} (${laminationCount} × $${lamRate.toFixed(2)})`, amount: laminationCost });
    }

    let addonCost = 0;
    if (heavyCover) {
      addonCost += PRICING.addons.heavyCover;
      breakdown.push({ label: 'Heavy card stock cover', amount: PRICING.addons.heavyCover });
    }
    if (dividerTabs > 0) {
      const tabCost = dividerTabs * PRICING.addons.dividerTab;
      addonCost += tabCost;
      breakdown.push({ label: `Divider tabs (${dividerTabs} × $${PRICING.addons.dividerTab.toFixed(2)})`, amount: tabCost });
    }

    const perUnit = printCost + bindingCost + foldoutCost + laminationCost + addonCost;
    const subtotal = perUnit * quantity;

    return { subtotal, perUnit, breakdown };
  }, [pageCount, quantity, printType, sides, binding, colorPages, foldoutCount, foldoutType, laminationCount, laminationSize, laminationThickness, heavyCover, dividerTabs]);

  const { subtotal, perUnit, breakdown } = calculatePrice();
  const requiresQuote = subtotal > PRICING.quoteThreshold;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-slate-900 text-white p-6">
        <h3 className="text-2xl font-bold">Print Calculator</h3>
        <p className="text-slate-300 mt-1">Configure your order and see instant pricing</p>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-amber-500 transition-colors">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {pdfFile ? (
                  <div>
                    <p className="text-slate-800 font-semibold">{pdfFile.name}</p>
                    <p className="text-sm text-slate-500 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-800 font-semibold">Upload Your PDF</p>
                    <p className="text-sm text-slate-500 mt-1">Click or drag file here</p>
                  </div>
                )}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Page Count *</label>
                <input
                  type="number"
                  min="1"
                  value={pageCount || ''}
                  onChange={(e) => setPageCount(parseInt(e.target.value) || 0)}
                  placeholder="Enter pages"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Print Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPrintType('bw')}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${printType === 'bw' ? 'border-amber-500 bg-amber-50 text-slate-900' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-semibold">Black & White</span>
                  <span className="block text-sm text-slate-500 mt-1">From $0.10/page</span>
                </button>
                <button
                  onClick={() => setPrintType('color')}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${printType === 'color' ? 'border-amber-500 bg-amber-50 text-slate-900' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-semibold">Full Color</span>
                  <span className="block text-sm text-slate-500 mt-1">From $0.32/page</span>
                </button>
              </div>
            </div>

            {printType === 'bw' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Color Pages (optional)</label>
                <input
                  type="number"
                  min="0"
                  max={pageCount}
                  value={colorPages || ''}
                  onChange={(e) => setColorPages(parseInt(e.target.value) || 0)}
                  placeholder="Number of color pages"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <p className="text-xs text-slate-500 mt-1">Enter count of pages that need color printing</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Print Sides</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSides('single')}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${sides === 'single' ? 'border-amber-500 bg-amber-50 text-slate-900' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-semibold">Single-Sided</span>
                </button>
                <button
                  onClick={() => setSides('double')}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${sides === 'double' ? 'border-amber-500 bg-amber-50 text-slate-900' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <span className="font-semibold">Double-Sided</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Binding Option</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'spiral', label: 'Spiral', price: '$3.50' },
                  { value: 'comb', label: 'Comb', price: '$2.50' },
                  { value: 'perfect', label: 'Perfect', price: '$8.00' },
                  { value: 'none', label: 'No Binding', price: '$0.00' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBinding(opt.value as typeof binding)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${binding === opt.value ? 'border-amber-500 bg-amber-50 text-slate-900' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <span className="font-semibold">{opt.label}</span>
                    <span className="block text-sm text-slate-500">{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Fold-Out Pages</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  min="0"
                  value={foldoutCount || ''}
                  onChange={(e) => setFoldoutCount(parseInt(e.target.value) || 0)}
                  placeholder="Count"
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <select
                  value={foldoutType}
                  onChange={(e) => setFoldoutType(e.target.value as 'bw' | 'color')}
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="bw">B&W ($4.50-$6.00)</option>
                  <option value="color">Color ($6.00-$8.00)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lamination</label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  min="0"
                  value={laminationCount || ''}
                  onChange={(e) => setLaminationCount(parseInt(e.target.value) || 0)}
                  placeholder="Count"
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <select
                  value={laminationSize}
                  onChange={(e) => setLaminationSize(e.target.value as typeof laminationSize)}
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="letter">Letter</option>
                  <option value="legal">Legal</option>
                  <option value="ledger">Ledger</option>
                </select>
                <select
                  value={laminationThickness}
                  onChange={(e) => setLaminationThickness(e.target.value as typeof laminationThickness)}
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="3mil">3 mil</option>
                  <option value="5mil">5 mil</option>
                  <option value="10mil">10 mil</option>
                </select>
              </div>
            </div>

            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Add-Ons</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heavyCover}
                    onChange={(e) => setHeavyCover(e.target.checked)}
                    className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                  />
                  <span className="flex-1 font-medium">Heavy Card Stock Cover</span>
                  <span className="text-slate-500">$2.00</span>
                </label>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                  <span className="flex-1 font-medium">Divider Tabs</span>
                  <input
                    type="number"
                    min="0"
                    value={dividerTabs || ''}
                    onChange={(e) => setDividerTabs(parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <span className="text-slate-500">× $1.50</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-50 rounded-xl p-6 sticky top-24">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h4>

              {pageCount > 0 ? (
                <>
                  <div className="space-y-2 mb-6">
                    {breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="text-slate-900">${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-4 mb-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Per Unit Cost</span>
                      <span className="font-semibold text-slate-900">${perUnit.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span className="text-slate-600">Quantity</span>
                    <span className="text-slate-900">× {quantity}</span>
                  </div>

                  <div className="border-t-2 border-slate-900 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Total</span>
                      <span className="text-3xl font-bold text-amber-600">${subtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">+ shipping (calculated at checkout)</p>
                  </div>

                  {pageCount >= 100 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        ✓ Volume discount applied ({pageCount >= 500 ? 'Tier 3' : 'Tier 2'} pricing)
                      </p>
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    {requiresQuote ? (
                      <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-lg transition-all">
                        Request Quote
                      </button>
                    ) : (
                      <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H8.887l-.994 7.27a.64.64 0 0 1-.633.543H7.076z"/>
                        </svg>
                        Pay with PayPal
                      </button>
                    )}
                    {requiresQuote && (
                      <p className="text-center text-sm text-slate-500">
                        Orders over $500 require a personalized quote
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-slate-500">Enter page count to see pricing</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* HERO */}
      <section className="min-h-[70vh] flex items-center bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Airport-Based Aviation Specialists
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Professional Aviation<br />Document Printing
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Upload your PDF. Get instant pricing. Same-day production available.
            </p>
            <a href="#calculator" className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Your Document
            </a>
            <p className="text-gray-400 text-sm mt-8">
              ✓ Cutoff 4pm EST for same-day &nbsp;•&nbsp; ✓ No minimum order &nbsp;•&nbsp; ✓ No account required
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STATS BAR */}
      <section className="bg-slate-800 py-10 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-gray-300 text-sm">Positive eBay Feedback</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">17,000+</div>
              <div className="text-gray-300 text-sm">Customer Reviews</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">70</div>
              <div className="text-gray-300 text-sm">Years in Business</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">180,000+</div>
              <div className="text-gray-300 text-sm">Manuals Archived</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">70 Years of Aviation Printing Excellence</h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Since 1955, ESSCO Aircraft has been the trusted partner for aviation documentation.
              We've printed technical manuals for flight schools, aircraft maintenance facilities,
              factories, shipyards, and hospitals across North America. Our family-owned business
              operates from <strong>KLPR Lorain County Regional Airport</strong> in Ohio.
            </p>
            <div className="flex justify-center mt-8">
              <a href="https://www.ebay.com/fdbk/feedback_profile/esscoaircraft" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                <img src="/ebay-verified-seller-17000-positive-reviews.jpg" alt="ESSCO Aircraft eBay Feedback - 100% Positive Rating" className="h-20 w-auto mx-auto" />
                <p className="text-sm text-gray-600 mt-3 text-center font-medium">Verified on eBay →</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Clear, Competitive Pricing</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
            Volume discounts automatically applied. No hidden fees, no minimum orders. Orders over $500 receive personalized quotes.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-slate-800 text-white p-5 text-center">
                <h3 className="text-xl font-bold">Black & White Printing</h3>
                <p className="text-slate-300 text-sm mt-1">Per page pricing</p>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-slate-600 font-semibold">Type</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">1-99</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">100-499</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">500+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-slate-800">Single-Sided</td>
                      <td className="text-center text-slate-700">$0.15</td>
                      <td className="text-center text-slate-700">$0.12</td>
                      <td className="text-center text-amber-600 font-bold">$0.10</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-slate-800">Double-Sided</td>
                      <td className="text-center text-slate-700">$0.25</td>
                      <td className="text-center text-slate-700">$0.20</td>
                      <td className="text-center text-amber-600 font-bold">$0.17</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-amber-500 text-slate-900 p-5 text-center">
                <h3 className="text-xl font-bold">Color Printing</h3>
                <p className="text-slate-700 text-sm mt-1">Per page pricing</p>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-slate-600 font-semibold">Type</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">1-99</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">100-499</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">500+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-slate-800">Single-Sided</td>
                      <td className="text-center text-slate-700">$0.45</td>
                      <td className="text-center text-slate-700">$0.37</td>
                      <td className="text-center text-amber-600 font-bold">$0.32</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-slate-800">Double-Sided</td>
                      <td className="text-center text-slate-700">$0.75</td>
                      <td className="text-center text-slate-700">$0.62</td>
                      <td className="text-center text-amber-600 font-bold">$0.54</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Binding & Finishing Options</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$3.50</div>
                <div className="text-slate-600 text-sm mt-1">Spiral Binding</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$2.50</div>
                <div className="text-slate-600 text-sm mt-1">Comb Binding</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$8.00</div>
                <div className="text-slate-600 text-sm mt-1">Perfect Binding</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$2.00</div>
                <div className="text-slate-600 text-sm mt-1">Heavy Cover</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Why Print With ESSCO?</h2>
          <p className="text-lg text-slate-700 text-center max-w-3xl mx-auto mb-12">
            Our facility at KLPR Lorain County Regional Airport houses over <strong>$100,000</strong> in commercial-grade printing equipment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '✓', title: 'Commercial-Grade Quality', desc: 'Every document printed on professional equipment to exacting standards.' },
              { icon: '$', title: 'Transparent Pricing', desc: 'No hidden fees or surprise charges. See your exact cost before ordering.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Same-day production available. We respect your operational schedule.' },
              { icon: '🔒', title: 'Secure Handling', desc: 'All proprietary and sensitive documentation handled with care.' },
              { icon: '👥', title: 'No Job Too Small', desc: 'We treat every customer with equal priority, from single manuals to bulk orders.' },
              { icon: '💬', title: 'Expert Guidance', desc: 'Advice on paper selection, binding, and finishing from specialists.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-2xl">{item.icon}</div>
                <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">How Our Process Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From upload to delivery in four simple steps</p>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { num: '1', title: 'Upload Your PDF', desc: 'Upload your print-ready PDF through our secure system.' },
              { num: '2', title: 'Get Instant Quote', desc: 'Our calculator shows your exact price with all options.' },
              { num: '3', title: 'Approve & Pay', desc: 'Review your quote and pay securely via PayPal.' },
              { num: '4', title: 'We Print & Ship', desc: 'Production starts immediately, fast shipping nationwide.' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-slate-900">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section id="calculator" className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Get Your Instant Quote</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">Upload your PDF and configure your print options. See your exact price before you order.</p>
          <div className="max-w-5xl mx-auto">
            <PrintCalculator />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'What file formats do you accept?', a: 'We accept PDF files for all print jobs. For best results, ensure your PDF is print-ready with embedded fonts and high-resolution images (300 DPI minimum).' },
              { q: 'How long does production take?', a: 'Standard turnaround is 1-2 business days for most orders. Same-day production is available for orders placed before 4pm EST.' },
              { q: 'Do you ship internationally?', a: 'Yes! We ship worldwide. Domestic US orders typically ship via USPS or UPS. International shipping is available to most countries.' },
              { q: 'Can I get a sample before ordering?', a: 'For large orders, we\'re happy to provide a sample section before full production. Contact us to discuss sample options.' },
              { q: 'What\'s your quality guarantee?', a: 'We stand behind every print job. If you\'re not satisfied with the quality, contact us within 7 days and we\'ll make it right.' },
              { q: 'What paper stock do you use?', a: 'Standard printing uses 24lb bright white paper. We also offer 28lb and 32lb options, plus heavy card stock for covers.' },
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-xl shadow-lg group">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-amber-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Print?</h2>
          <p className="text-slate-800 text-lg mb-8 max-w-2xl mx-auto">
            Upload your document now and get an instant quote. No account required, no minimum order, and same-day production available.
          </p>
          <a href="#calculator" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Start Your Order
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ESSCO Aircraft</h3>
              <p className="text-sm leading-relaxed">Family-owned aviation document specialists since 1955. Located at KLPR Lorain County Regional Airport, Ohio.</p>
              <div className="mt-4"><span className="text-amber-400 font-semibold">70 Years Strong</span></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="tel:877-318-1555" className="hover:text-amber-400 transition">📞 877-318-1555 (Toll Free)</a></li>
                <li><a href="mailto:dale@esscoaircraft.com" className="hover:text-amber-400 transition">✉️ dale@esscoaircraft.com</a></li>
                <li>📍 KLPR Lorain County Regional Airport, Ohio</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="https://www.esscoaircraft.com" className="hover:text-amber-400 transition">Main Store</a></li>
                <li><a href="https://www.ebay.com/str/esscoaircraft" className="hover:text-amber-400 transition" target="_blank" rel="noopener noreferrer">eBay Store</a></li>
                <li><a href="#pricing" className="hover:text-amber-400 transition">Pricing</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2025 ESSCO Aircraft. All rights reserved. Serving aviation since 1955.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

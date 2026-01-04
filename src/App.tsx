import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import { Calculator, Lock, ShieldCheck, Star, Package, Zap, Plane, Upload, CheckCircle, ChevronRight, ChevronDown, ChevronUp, FileText, Link2, FoldVertical, Layers, Plus, Phone, Mail, Clock, CreditCard, Award } from 'lucide-react';

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

// ==================== FUNCTIONAL CALCULATOR ====================
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
    if (printType === 'color') { colorPagesCount = pageCount; bwPages = 0; }
    else if (colorPages > 0) { colorPagesCount = Math.min(colorPages, pageCount); bwPages = pageCount - colorPagesCount; }
    let printCost = 0;
    if (bwPages > 0) { const bwRate = PRICING.print.bw[sides][tier]; printCost += bwPages * bwRate; breakdown.push({ label: `B&W ${sides}-sided (${bwPages} pg × $${bwRate.toFixed(2)})`, amount: bwPages * bwRate }); }
    if (colorPagesCount > 0) { const colorRate = PRICING.print.color[sides][tier]; printCost += colorPagesCount * colorRate; breakdown.push({ label: `Color ${sides}-sided (${colorPagesCount} pg × $${colorRate.toFixed(2)})`, amount: colorPagesCount * colorRate }); }
    const bindingCost = PRICING.binding[binding];
    if (bindingCost > 0) breakdown.push({ label: `${binding.charAt(0).toUpperCase() + binding.slice(1)} binding`, amount: bindingCost });
    let foldoutCost = 0;
    if (foldoutCount > 0) { const foldoutRate = PRICING.foldout[foldoutType][tier]; foldoutCost = foldoutCount * foldoutRate; breakdown.push({ label: `Fold-outs (${foldoutCount} × $${foldoutRate.toFixed(2)})`, amount: foldoutCost }); }
    let laminationCost = 0;
    if (laminationCount > 0) { const lamRate = PRICING.lamination[laminationSize][laminationThickness]; laminationCost = laminationCount * lamRate; breakdown.push({ label: `Lamination ${laminationSize} ${laminationThickness} (${laminationCount} × $${lamRate.toFixed(2)})`, amount: laminationCost }); }
    let addonCost = 0;
    if (heavyCover) { addonCost += PRICING.addons.heavyCover; breakdown.push({ label: 'Heavy card stock cover', amount: PRICING.addons.heavyCover }); }
    if (dividerTabs > 0) { const tabCost = dividerTabs * PRICING.addons.dividerTab; addonCost += tabCost; breakdown.push({ label: `Divider tabs (${dividerTabs} × $${PRICING.addons.dividerTab.toFixed(2)})`, amount: tabCost }); }
    const perUnit = printCost + bindingCost + foldoutCost + laminationCost + addonCost;
    const subtotal = perUnit * quantity;
    return { subtotal, perUnit, breakdown };
  }, [pageCount, quantity, printType, sides, binding, colorPages, foldoutCount, foldoutType, laminationCount, laminationSize, laminationThickness, heavyCover, dividerTabs]);

  const { subtotal, perUnit, breakdown } = calculatePrice();
  const requiresQuote = subtotal > PRICING.quoteThreshold;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file && file.type === 'application/pdf') setPdfFile(file); };

  return (
    <div className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="bg-amber-500 text-slate-900 p-6">
        <h3 className="text-2xl font-bold">Print Calculator</h3>
        <p className="text-slate-800 mt-1">Configure your order and see instant pricing</p>
      </div>
      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-500 rounded-xl p-6 text-center hover:border-amber-500 transition-colors bg-slate-700/50">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                {pdfFile ? (<div><p className="text-white font-semibold">{pdfFile.name}</p><p className="text-sm text-slate-400 mt-1">Click to change file</p></div>) : (<div><p className="text-white font-semibold">Upload Your PDF</p><p className="text-sm text-slate-400 mt-1">Click or drag file here</p></div>)}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold text-slate-300 mb-2">Page Count *</label><input type="number" min="1" value={pageCount || ''} onChange={(e) => setPageCount(parseInt(e.target.value) || 0)} placeholder="Enter pages" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /></div>
              <div><label className="block text-sm font-semibold text-slate-300 mb-2">Quantity *</label><input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /></div>
            </div>
            <div><label className="block text-sm font-semibold text-slate-300 mb-2">Print Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPrintType('bw')} className={`p-4 rounded-lg border-2 text-center transition-all ${printType === 'bw' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}><span className="font-semibold">Black & White</span><span className="block text-sm text-slate-400 mt-1">From $0.10/page</span></button>
                <button onClick={() => setPrintType('color')} className={`p-4 rounded-lg border-2 text-center transition-all ${printType === 'color' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}><span className="font-semibold">Full Color</span><span className="block text-sm text-slate-400 mt-1">From $0.32/page</span></button>
              </div>
            </div>
            {printType === 'bw' && (<div><label className="block text-sm font-semibold text-slate-300 mb-2">Color Pages (optional)</label><input type="number" min="0" max={pageCount} value={colorPages || ''} onChange={(e) => setColorPages(parseInt(e.target.value) || 0)} placeholder="Number of color pages" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /><p className="text-xs text-slate-400 mt-1">Enter count of pages that need color printing</p></div>)}
            <div><label className="block text-sm font-semibold text-slate-300 mb-2">Print Sides</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setSides('single')} className={`p-3 rounded-lg border-2 text-center transition-all ${sides === 'single' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}><span className="font-semibold">Single-Sided</span></button>
                <button onClick={() => setSides('double')} className={`p-3 rounded-lg border-2 text-center transition-all ${sides === 'double' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}><span className="font-semibold">Double-Sided</span></button>
              </div>
            </div>
            <div><label className="block text-sm font-semibold text-slate-300 mb-2">Binding Option</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ value: 'spiral', label: 'Spiral', price: '$3.50' },{ value: 'comb', label: 'Comb', price: '$2.50' },{ value: 'perfect', label: 'Perfect', price: '$8.00' },{ value: 'none', label: 'No Binding', price: '$0.00' }].map((opt) => (<button key={opt.value} onClick={() => setBinding(opt.value as typeof binding)} className={`p-3 rounded-lg border-2 text-center transition-all ${binding === opt.value ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}><span className="font-semibold">{opt.label}</span><span className="block text-sm text-slate-400">{opt.price}</span></button>))}
              </div>
            </div>
            <div className="border-t border-slate-600 pt-6"><label className="block text-sm font-semibold text-slate-300 mb-2">Fold-Out Pages</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" min="0" value={foldoutCount || ''} onChange={(e) => setFoldoutCount(parseInt(e.target.value) || 0)} placeholder="Count" className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                <select value={foldoutType} onChange={(e) => setFoldoutType(e.target.value as 'bw' | 'color')} className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"><option value="bw">B&W ($4.50-$6.00)</option><option value="color">Color ($6.00-$8.00)</option></select>
              </div>
            </div>
            <div><label className="block text-sm font-semibold text-slate-300 mb-2">Lamination</label>
              <div className="grid grid-cols-3 gap-4">
                <input type="number" min="0" value={laminationCount || ''} onChange={(e) => setLaminationCount(parseInt(e.target.value) || 0)} placeholder="Count" className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                <select value={laminationSize} onChange={(e) => setLaminationSize(e.target.value as typeof laminationSize)} className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"><option value="letter">Letter</option><option value="legal">Legal</option><option value="ledger">Ledger</option></select>
                <select value={laminationThickness} onChange={(e) => setLaminationThickness(e.target.value as typeof laminationThickness)} className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"><option value="3mil">3 mil</option><option value="5mil">5 mil</option><option value="10mil">10 mil</option></select>
              </div>
            </div>
            <div className="border-t border-slate-600 pt-6"><label className="block text-sm font-semibold text-slate-300 mb-3">Add-Ons</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer"><input type="checkbox" checked={heavyCover} onChange={(e) => setHeavyCover(e.target.checked)} className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500 bg-slate-700 border-slate-600" /><span className="flex-1 font-medium text-slate-300">Heavy Card Stock Cover</span><span className="text-slate-400">$2.00</span></label>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-600"><span className="flex-1 font-medium text-slate-300">Divider Tabs</span><input type="number" min="0" value={dividerTabs || ''} onChange={(e) => setDividerTabs(parseInt(e.target.value) || 0)} placeholder="0" className="w-20 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-center text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" /><span className="text-slate-400">× $1.50</span></div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-slate-900/80 rounded-xl p-6 sticky top-24 border border-slate-700">
              <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
              {pageCount > 0 ? (<>
                <div className="space-y-2 mb-6">{breakdown.map((item, idx) => (<div key={idx} className="flex justify-between text-sm"><span className="text-slate-400">{item.label}</span><span className="text-white">${item.amount.toFixed(2)}</span></div>))}</div>
                <div className="border-t border-slate-600 pt-4 mb-2"><div className="flex justify-between"><span className="text-slate-400">Per Unit Cost</span><span className="font-semibold text-white">${perUnit.toFixed(2)}</span></div></div>
                <div className="flex justify-between mb-4"><span className="text-slate-400">Quantity</span><span className="text-white">× {quantity}</span></div>
                <div className="border-t-2 border-amber-500 pt-4"><div className="flex justify-between items-center"><span className="text-lg font-bold text-white">Total</span><span className="text-3xl font-bold text-amber-400">${subtotal.toFixed(2)}</span></div><p className="text-xs text-slate-500 mt-2">+ shipping (calculated at checkout)</p></div>
                {pageCount >= 100 && (<div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg"><p className="text-sm text-green-400 font-medium">✓ Volume discount applied ({pageCount >= 500 ? 'Tier 3' : 'Tier 2'} pricing)</p></div>)}
                <div className="mt-6 space-y-3">
                  {requiresQuote ? (<button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-lg transition-all">Request Quote</button>) : (<button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H8.887l-.994 7.27a.64.64 0 0 1-.633.543H7.076z"/></svg>Pay with PayPal</button>)}
                  {requiresQuote && (<p className="text-center text-sm text-slate-500">Orders over $500 require a personalized quote</p>)}
                </div>
              </>) : (<div className="text-center py-8"><Calculator className="w-16 h-16 mx-auto text-slate-600 mb-4" /><p className="text-slate-500">Enter page count to see pricing</p></div>)}
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
    <div className="min-h-screen bg-slate-900">
      <Header />

      {/* ==================== HERO (Rev 56 Content) - Opacity 0.70 ==================== */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative text-center px-5 py-16 md:py-20 max-w-5xl mx-auto">
          <h1 className="mb-8 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
            UPLOAD ANY PDF.<br />GET INSTANT PRICING.<br />PROCESSED IN 24 HOURS.
          </h1>
          <p className="mx-auto mb-8 text-white text-lg md:text-xl leading-relaxed max-w-3xl" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>
            Training guides, service docs, operations manuals, and more - we've been printing them since 1955. Professional binding, fast turnaround.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <Calculator size={24} strokeWidth={2.5} />
            <span className="flex flex-col items-center gap-0 leading-tight"><span>Upload any Document</span><span>For an Instant Quote →</span></span>
          </button>
          <p className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400"><Lock size={14} /><span>No credit card required - Takes 30 seconds</span></p>
          <p className="text-white text-base mt-6 italic" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>No minimums. No setup fees. Quantity discounts. No account required.</p>
          <p className="text-slate-400 text-xs mt-3 italic lowercase">*cutoff time 4PM for next day processing</p>
        </div>
      </section>

      {/* ==================== TRUST STATS (Rev 56 Content) - Opacity 0.75 ==================== */}
      <section className="bg-slate-800 py-12 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">We've printed manuals for flight schools, factories, shipyards, and hospitals.</p>
          <div className="flex flex-col md:flex-row justify-around gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center font-bold text-3xl text-amber-400 mb-1"><ShieldCheck size={28} className="text-green-500 mr-2" />100% Positive</div>
              <div className="text-slate-400 text-sm">eBay Feedback</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center font-bold text-3xl text-amber-400 mb-1"><Star size={28} className="text-amber-400 mr-2" />17,000+</div>
              <div className="text-slate-400 text-sm">Customer Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center font-bold text-3xl text-amber-400 mb-1"><Package size={28} className="text-blue-400 mr-2" />34,000+</div>
              <div className="text-slate-400 text-sm">Orders Completed</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Lock size={16} className="text-green-500" />Secure Upload</span>
            <span className="flex items-center gap-2"><Zap size={16} className="text-amber-400" />Same-Day Available</span>
            <span className="flex items-center gap-2"><Plane size={16} className="text-blue-400" />Aviation Specialists</span>
          </div>
          <p className="mt-6 font-medium text-lg text-white">⭐⭐⭐⭐⭐ 5.0/5.0 rating across all categories</p>
          <p className="mt-2 text-slate-400">Family-owned since 1955 · 180,000+ aviation manuals archived</p>
        </div>
      </section>

      {/* ==================== EBAY BADGE (Rev 56 Content) - Opacity 0.65 ==================== */}
      <section className="bg-slate-850 py-12" style={{ backgroundColor: '#1a2332' }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <a href="https://www.ebay.com/fdbk/feedback_profile/esscoaircraft" target="_blank" rel="noopener noreferrer">
            <img src="/ebay-verified-seller-17000-positive-reviews.jpg" alt="eBay verified seller with 17000 positive reviews" className="w-full max-w-2xl mx-auto rounded-lg transition-transform duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)' }} />
          </a>
          <p className="italic text-slate-500 text-sm mt-4">Verified seller since 2006</p>
        </div>
      </section>

      {/* ==================== PRICING (Rev 56 Content) - Opacity 0.70 ==================== */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Clear, Competitive Pricing</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">No hidden fees. No surprises. Just honest pricing for professional printing services.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-slate-300"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium">Volume Discounts</span></div>
            <div className="flex items-center gap-2 text-slate-300"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium">No Setup Fees</span></div>
            <div className="flex items-center gap-2 text-slate-300"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium">Same-Day Available</span></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <div className="bg-slate-700 text-white p-4 text-center"><h3 className="text-xl font-bold flex items-center justify-center gap-2"><FileText size={20} />Print Rates (Per Page)</h3><p className="text-slate-400 text-sm mt-1">Volume discounts automatically applied</p></div>
              <div className="p-4"><table className="w-full"><thead><tr className="border-b border-slate-600"><th className="text-left py-2 text-slate-400 text-sm">Type</th><th className="text-center py-2 text-slate-400 text-sm">1-99</th><th className="text-center py-2 text-slate-400 text-sm">100-499</th><th className="text-center py-2 text-slate-400 text-sm">500+</th></tr></thead><tbody><tr className="border-b border-slate-700"><td className="py-3 text-white">Black & White</td><td className="text-center text-slate-300">$0.32</td><td className="text-center text-slate-300">$0.26</td><td className="text-center text-amber-400 font-bold">$0.21</td></tr><tr><td className="py-3 text-white">Full Color</td><td className="text-center text-slate-300">$0.89</td><td className="text-center text-slate-300">$0.69</td><td className="text-center text-amber-400 font-bold">$0.49</td></tr></tbody></table></div>
            </div>
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <div className="bg-amber-500 text-slate-900 p-4 text-center"><h3 className="text-xl font-bold flex items-center justify-center gap-2"><Link2 size={20} />Binding Options</h3></div>
              <div className="p-4"><table className="w-full"><tbody><tr className="border-b border-slate-700"><td className="py-3 text-white">Spiral Binding <span className="px-2 py-0.5 bg-green-900 text-green-400 text-xs font-medium rounded-full ml-2">Most Popular</span></td><td className="text-right text-amber-400 font-semibold">$3.50</td></tr><tr className="border-b border-slate-700"><td className="py-3 text-white">Comb Binding</td><td className="text-right text-slate-300">$2.50</td></tr><tr className="border-b border-slate-700"><td className="py-3 text-white">Perfect Binding</td><td className="text-right text-slate-300">$8.00</td></tr><tr><td className="py-3 text-white">3-Ring Ready (No Binding)</td><td className="text-right text-green-400">FREE</td></tr></tbody></table></div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-8 bg-blue-900/30 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div><h4 className="font-bold text-white mb-2">Large Orders Over $500</h4><p className="text-slate-300">Need a custom quote for high-volume orders? Orders exceeding $500 qualify for personalized pricing and dedicated support. Simply configure your order below and we'll provide a custom quote within 24 hours.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CALCULATOR SECTION - Opacity 0.75 ==================== */}
      <section id="calculator" className="py-16" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Get Your Instant Quote</h2>
            <p className="text-slate-400 text-lg">Upload your PDF and get pricing in seconds</p>
          </div>
          <PrintCalculator />
          <p className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500"><Lock size={14} className="text-green-500" /><span>Secure upload - Files auto-delete after 7 days</span></p>
        </div>
      </section>

      {/* ==================== FINAL CTA - Gold accent ==================== */}
      <section className="bg-amber-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to see your exact price?</h2>
          <a href="#calculator" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-lg hover:shadow-xl">SEE MY PRICE →</a>
        </div>
      </section>

      {/* ==================== FOOTER (Rev 56 Content) ==================== */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>About ESSCO Aircraft</h3>
              <p className="text-sm leading-relaxed mb-4">Over 50 years of providing quality aircraft manuals and aviation memorabilia. Our extensive library contains over 180,000 items.</p>
            </div>
            <div><h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Customer Service</h3><ul className="space-y-2 text-sm"><li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact Us</a></li><li><a href="#orders" className="hover:text-amber-400 transition-colors">Order Status</a></li><li><a href="#account" className="hover:text-amber-400 transition-colors">My Account</a></li><li><a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li></ul></div>
            <div><h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Store Policies</h3><ul className="space-y-2 text-sm"><li><a href="#shipping" className="hover:text-amber-400 transition-colors">Shipping Policy</a></li><li><a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a></li><li><a href="#refunds" className="hover:text-amber-400 transition-colors">Refund Policy</a></li></ul></div>
            <div><h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Helpful Links</h3><ul className="space-y-2 text-sm"><li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li><li><a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a></li><li><a href="#buy-manuals" className="hover:text-amber-400 transition-colors">We Buy Manuals</a></li><li><a href="#shop" className="hover:text-amber-400 transition-colors">Shop All</a></li></ul></div>
          </div>
        </div>
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                <a href="tel:877-318-1555" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Phone className="w-4 h-4" />877-318-1555</a>
                <a href="mailto:esscosupport@aol.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Mail className="w-4 h-4" />esscosupport@aol.com</a>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />Monday-Friday, 9am-4pm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 py-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-sm"><ShieldCheck size={20} className="text-green-500" /><span>Secure Checkout</span></div>
          <div className="flex items-center gap-2 text-sm"><CreditCard size={20} className="text-blue-400" /><span>PayPal Accepted</span></div>
          <div className="flex items-center gap-2 text-sm"><Award size={20} className="text-amber-400" /><span>70 Years Trusted</span></div>
        </div>
        <div className="border-t border-slate-800"><div className="max-w-7xl mx-auto px-4 py-4"><p className="text-sm text-center">© {new Date().getFullYear()} ESSCO Aircraft. All rights reserved.</p></div></div>
      </footer>
    </div>
  );
}

export default App;

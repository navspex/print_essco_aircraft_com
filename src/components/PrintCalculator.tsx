import { useState, useCallback, useMemo } from 'react';
import { Calculator, Upload } from 'lucide-react';

// ==================== KISS PRICING - Per PDF Page ====================
// Single/double sided = SAME PRICE (production instruction only)
const PRICING = {
  print: {
    bw: { tier1: 0.32, tier2: 0.24, tier3: 0.21 },
    color: { tier1: 0.89, tier2: 0.59, tier3: 0.49 },
  },
  tiers: {
    tier1: { min: 1, max: 50 },
    tier2: { min: 51, max: 1000 },
    tier3: { min: 1001, max: 10000 },
  },
  binding: { none: 0, spiral: 3.50, comb: 2.50, perfect: 8.00 },
  foldout: { bw: { tier1: 6.00, tier2: 5.25, tier3: 4.50 }, color: { tier1: 8.00, tier2: 7.00, tier3: 6.00 } },
  lamination: {
    letter: { '3mil': 2.00, '5mil': 2.50, '10mil': 3.50 },
    legal: { '3mil': 2.50, '5mil': 3.00, '10mil': 4.00 },
    ledger: { '3mil': 5.00, '5mil': 6.00, '10mil': 7.50 },
  },
  addons: { heavyCover: 2.00, dividerTab: 1.50 },
  quoteThreshold: 500,
  weightThreshold: 25, // lbs - orders over this require quote
};

// Weight constants (in pounds)
const WEIGHT = {
  paperPerSheet: 0.01, // ~20lb bond = 0.01 lb per sheet
  spiralBinding: 0.15,
  combBinding: 0.12,
  perfectBinding: 0.25,
  heavyCover: 0.05,
  dividerTab: 0.02,
  foldoutPage: 0.02,
  laminatedPage: 0.015,
  packagingBase: 0.25, // box/envelope base weight
};

function getPriceTier(pageCount: number): 'tier1' | 'tier2' | 'tier3' {
  if (pageCount >= 1001) return 'tier3';
  if (pageCount >= 51) return 'tier2';
  return 'tier1';
}

// US States for shipping dropdown
const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

const PrintCalculator: React.FC = () => {
  // Calculator state
  const [pageCount, setPageCount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [colorPages, setColorPages] = useState<number>(0);
  const [sides, setSides] = useState<'single' | 'double'>('double');
  const [binding, setBinding] = useState<'none' | 'spiral' | 'comb' | 'perfect'>('spiral');
  const [foldoutCount, setFoldoutCount] = useState<number>(0);
  const [foldoutType, setFoldoutType] = useState<'bw' | 'color'>('bw');
  const [laminationCount, setLaminationCount] = useState<number>(0);
  const [laminationSize, setLaminationSize] = useState<'letter' | 'legal' | 'ledger'>('letter');
  const [laminationThickness, setLaminationThickness] = useState<'3mil' | '5mil' | '10mil'>('3mil');
  const [heavyCover, setHeavyCover] = useState<boolean>(false);
  const [dividerTabs, setDividerTabs] = useState<number>(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Customer info state
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showShipping, setShowShipping] = useState<boolean>(false);

  // Calculate weight for order
  const calculateWeight = useCallback(() => {
    if (pageCount === 0) return 0;
    
    // Calculate sheets (double-sided = half the sheets)
    const sheetsPerCopy = sides === 'double' ? Math.ceil(pageCount / 2) : pageCount;
    const totalSheets = sheetsPerCopy * quantity;
    
    let weight = 0;
    
    // Paper weight
    weight += totalSheets * WEIGHT.paperPerSheet;
    
    // Binding weight per copy
    const bindingWeight = 
      binding === 'spiral' ? WEIGHT.spiralBinding :
      binding === 'comb' ? WEIGHT.combBinding :
      binding === 'perfect' ? WEIGHT.perfectBinding : 0;
    weight += bindingWeight * quantity;
    
    // Heavy cover
    if (heavyCover) {
      weight += WEIGHT.heavyCover * quantity;
    }
    
    // Divider tabs
    weight += dividerTabs * WEIGHT.dividerTab * quantity;
    
    // Foldout pages (heavier paper)
    weight += foldoutCount * WEIGHT.foldoutPage * quantity;
    
    // Laminated pages
    weight += laminationCount * WEIGHT.laminatedPage * quantity;
    
    // Packaging
    weight += WEIGHT.packagingBase;
    
    return Math.round(weight * 100) / 100; // Round to 2 decimal places
  }, [pageCount, quantity, sides, binding, heavyCover, dividerTabs, foldoutCount, laminationCount]);

  // Calculate pricing
  const calculatePrice = useCallback(() => {
    if (pageCount === 0) return { subtotal: 0, perUnit: 0, breakdown: [] };
    const tier = getPriceTier(pageCount);
    const breakdown: { label: string; amount: number }[] = [];

    // KISS: Price per PDF page (single/double = same rate)
    const bwPages = Math.max(0, pageCount - foldoutCount - colorPages);
    const colorPagesCount = Math.min(colorPages, pageCount - foldoutCount);

    let printCost = 0;
    if (bwPages > 0) {
      const bwRate = PRICING.print.bw[tier];
      printCost += bwPages * bwRate;
      breakdown.push({ label: `B&W (${bwPages} PDF pages × $${bwRate.toFixed(2)})`, amount: bwPages * bwRate });
    }
    if (colorPagesCount > 0) {
      const colorRate = PRICING.print.color[tier];
      printCost += colorPagesCount * colorRate;
      breakdown.push({ label: `Color (${colorPagesCount} PDF pages × $${colorRate.toFixed(2)})`, amount: colorPagesCount * colorRate });
    }

    const bindingCost = PRICING.binding[binding];
    if (bindingCost > 0) breakdown.push({ label: `${binding.charAt(0).toUpperCase() + binding.slice(1)} binding`, amount: bindingCost });

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
      breakdown.push({ label: `Lamination (${laminationCount} × $${lamRate.toFixed(2)})`, amount: laminationCost });
    }

    let addonCost = 0;
    if (heavyCover) { addonCost += PRICING.addons.heavyCover; breakdown.push({ label: 'Heavy card stock cover', amount: PRICING.addons.heavyCover }); }
    if (dividerTabs > 0) { const tabCost = dividerTabs * PRICING.addons.dividerTab; addonCost += tabCost; breakdown.push({ label: `Divider tabs (${dividerTabs} × $1.50)`, amount: tabCost }); }

    const perUnit = printCost + bindingCost + foldoutCost + laminationCost + addonCost;
    const subtotal = perUnit * quantity;
    return { subtotal, perUnit, breakdown };
  }, [pageCount, quantity, colorPages, binding, foldoutCount, foldoutType, laminationCount, laminationSize, laminationThickness, heavyCover, dividerTabs]);

  const { subtotal, perUnit, breakdown } = calculatePrice();
  const estimatedWeight = calculateWeight();
  const requiresQuote = subtotal > PRICING.quoteThreshold || estimatedWeight > PRICING.weightThreshold;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError(null);
    }
  };

  // Validate shipping form
  const isShippingValid = useMemo(() => {
    return email.trim() !== '' &&
           firstName.trim() !== '' &&
           lastName.trim() !== '' &&
           address1.trim() !== '' &&
           city.trim() !== '' &&
           state !== '' &&
           zip.trim() !== '';
  }, [email, firstName, lastName, address1, city, state, zip]);

  // Handle checkout
  const handleCheckout = async () => {
    if (!isShippingValid) {
      setError('Please fill in all required shipping fields');
      setShowShipping(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Backend expects specific format - see functions/api/create-draft-order.js
      const orderData = {
        customer: {
          email,
          firstName,
          lastName,
          company,
          phone,
        },
        shipping: {
          address1,
          address2,
          city,
          state,
          zip,
          country: 'US',
        },
        lineItems: [{
          title: `Print Job - ${pageCount} pages × ${quantity} copies`,
          price: subtotal.toFixed(2),
          quantity: 1,
          properties: {
            pageCount,
            copies: quantity,
            colorPages,
            sides,
            binding,
            foldoutCount,
            foldoutType,
            laminationCount,
            laminationSize,
            laminationThickness,
            heavyCover,
            dividerTabs,
            estimatedWeight: `${estimatedWeight} lbs`,
            fileName: pdfFile?.name || 'No file uploaded',
          },
        }],
        totalPrice: subtotal.toFixed(2),
        estimatedWeight,
      };

      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create order');
      }

      // Redirect to Shopify checkout
      if (result.invoiceUrl) {
        window.location.href = result.invoiceUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quote request
  const handleQuoteRequest = () => {
    const subject = encodeURIComponent('Print Quote Request');
    const body = encodeURIComponent(`
Print Quote Request
==================
Pages: ${pageCount}
Copies: ${quantity}
Color Pages: ${colorPages}
Sides: ${sides}
Binding: ${binding}
Fold-outs: ${foldoutCount} (${foldoutType})
Lamination: ${laminationCount} pages (${laminationSize}, ${laminationThickness})
Heavy Cover: ${heavyCover ? 'Yes' : 'No'}
Divider Tabs: ${dividerTabs}
Estimated Weight: ${estimatedWeight} lbs
Estimated Total: $${subtotal.toFixed(2)}
${pdfFile ? `File: ${pdfFile.name}` : ''}

Contact Info:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Company: ${company}
    `.trim());
    
    window.location.href = `mailto:dale@esscoaircraft.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="bg-amber-500 text-slate-900 p-6">
        <h3 className="text-2xl font-bold">Print Calculator</h3>
        <p className="text-slate-800 mt-1">Upload your PDF and configure options</p>
      </div>
      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* PDF Upload */}
            <div className="border-2 border-dashed border-slate-500 rounded-xl p-6 text-center hover:border-amber-500 transition-colors bg-slate-700/50">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                {pdfFile ? (
                  <div>
                    <p className="text-white font-semibold">{pdfFile.name}</p>
                    <p className="text-sm text-slate-400 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-semibold">Upload Your PDF</p>
                    <p className="text-sm text-slate-400 mt-1">Click or drag file here</p>
                  </div>
                )}
              </label>
            </div>

            {/* Page Count & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">PDF Page Count *</label>
                <input type="number" min="1" value={pageCount || ''} onChange={(e) => setPageCount(parseInt(e.target.value) || 0)} placeholder="Total pages" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Quantity (copies) *</label>
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
            </div>

            {/* Color Pages */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">How many pages need COLOR printing?</label>
              <input type="number" min="0" max={pageCount} value={colorPages || ''} onChange={(e) => setColorPages(parseInt(e.target.value) || 0)} placeholder="0 = all B&W" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              <p className="text-xs text-slate-400 mt-1">Leave blank or 0 for all black & white</p>
            </div>

            {/* Print Sides - Production instruction only, same price */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Print Sides <span className="text-slate-500 font-normal">(same price)</span></label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setSides('single')} className={`p-3 rounded-lg border-2 text-center transition-all ${sides === 'single' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}>
                  <span className="font-semibold">Single-Sided</span>
                  <span className="block text-xs text-slate-400">1 page per sheet</span>
                </button>
                <button onClick={() => setSides('double')} className={`p-3 rounded-lg border-2 text-center transition-all ${sides === 'double' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}>
                  <span className="font-semibold">Double-Sided</span>
                  <span className="block text-xs text-slate-400">2 pages per sheet</span>
                </button>
              </div>
            </div>

            {/* Binding */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Binding Option</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setBinding('spiral')} className={`p-3 rounded-lg border-2 text-center transition-all ${binding === 'spiral' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}>
                  <span className="font-semibold">Spiral</span>
                  <span className="block text-sm text-slate-400">$3.50</span>
                </button>
                <button onClick={() => setBinding('comb')} className={`p-3 rounded-lg border-2 text-center transition-all ${binding === 'comb' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}>
                  <span className="font-semibold">Comb</span>
                  <span className="block text-sm text-slate-400">$2.50</span>
                </button>
                <button onClick={() => setBinding('perfect')} className={`p-3 rounded-lg border-2 text-center transition-all ${binding === 'perfect' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}>
                  <span className="font-semibold">Perfect</span>
                  <span className="block text-xs text-slate-400">(glued spine)</span>
                  <span className="block text-sm text-slate-400">$8.00</span>
                </button>
                <button onClick={() => setBinding('none')} className={`p-3 rounded-lg border-2 text-center transition-all ${binding === 'none' ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-slate-600 hover:border-slate-500 text-slate-300'}`}>
                  <span className="font-semibold">No Binding</span>
                  <span className="block text-sm text-slate-400">$0.00</span>
                </button>
              </div>
            </div>

            {/* Fold-Outs */}
            <div className="border-t border-slate-600 pt-6">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Fold-Out Pages (11×17)</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" min="0" value={foldoutCount || ''} onChange={(e) => setFoldoutCount(parseInt(e.target.value) || 0)} placeholder="Count" className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                <select value={foldoutType} onChange={(e) => setFoldoutType(e.target.value as 'bw' | 'color')} className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="bw">B&W</option>
                  <option value="color">Color</option>
                </select>
              </div>
            </div>

            {/* Lamination */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Lamination (optional)</label>
              <div className="grid grid-cols-3 gap-4">
                <input type="number" min="0" value={laminationCount || ''} onChange={(e) => setLaminationCount(parseInt(e.target.value) || 0)} placeholder="Pages" className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                <select value={laminationSize} onChange={(e) => setLaminationSize(e.target.value as typeof laminationSize)} className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="letter">Letter</option>
                  <option value="legal">Legal</option>
                  <option value="ledger">Ledger</option>
                </select>
                <select value={laminationThickness} onChange={(e) => setLaminationThickness(e.target.value as typeof laminationThickness)} className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                  <option value="3mil">3 mil</option>
                  <option value="5mil">5 mil</option>
                  <option value="10mil">10 mil</option>
                </select>
              </div>
            </div>

            {/* Add-Ons */}
            <div className="border-t border-slate-600 pt-6">
              <label className="block text-sm font-semibold text-slate-300 mb-3">Add-Ons</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer">
                  <input type="checkbox" checked={heavyCover} onChange={(e) => setHeavyCover(e.target.checked)} className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500 bg-slate-700 border-slate-600" />
                  <span className="flex-1 font-medium text-slate-300">Heavy Card Stock Cover</span>
                  <span className="text-slate-400">$2.00</span>
                </label>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-600">
                  <span className="flex-1 font-medium text-slate-300">Divider Tabs</span>
                  <input type="number" min="0" value={dividerTabs || ''} onChange={(e) => setDividerTabs(parseInt(e.target.value) || 0)} placeholder="0" className="w-20 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-center text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  <span className="text-slate-400">× $1.50</span>
                </div>
              </div>
            </div>

            {/* Shipping Form (Collapsible) */}
            <div className="border-t border-slate-600 pt-6">
              <button 
                onClick={() => setShowShipping(!showShipping)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-lg font-semibold text-white">Shipping Information</span>
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${showShipping ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showShipping && (
                <div className="mt-4 space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">First Name *</label>
                      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Last Name *</label>
                      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                  </div>
                  
                  {/* Company (optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Company <span className="text-slate-500 font-normal">(optional)</span></label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Street Address *</label>
                    <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="123 Main Street" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Apt, Suite, etc. <span className="text-slate-500 font-normal">(optional)</span></label>
                    <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  
                  {/* City, State, Zip */}
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                      <label className="block text-sm font-semibold text-slate-300 mb-2">City *</label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-300 mb-2">State *</label>
                      <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                        <option value="">Select</option>
                        {US_STATES.map(s => <option key={s.code} value={s.code}>{s.code}</option>)}
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-slate-300 mb-2">ZIP *</label>
                      <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} maxLength={10} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                  </div>
                  
                  {/* Phone (optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Phone <span className="text-slate-500 font-normal">(optional)</span></label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-slate-900/80 rounded-xl p-6 sticky top-24 border border-slate-700">
              <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
              {pageCount > 0 ? (
                <>
                  <div className="space-y-2 mb-6">
                    {breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white">${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-600 pt-4 mb-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Per Copy Cost</span>
                      <span className="font-semibold text-white">${perUnit.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Quantity</span>
                    <span className="text-white">× {quantity}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-400">Est. Weight</span>
                    <span className="text-white">{estimatedWeight} lbs</span>
                  </div>
                  <div className="border-t-2 border-amber-500 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-3xl font-bold text-amber-400">${subtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">+ shipping (calculated at checkout)</p>
                  </div>
                  
                  {pageCount >= 51 && (
                    <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg">
                      <p className="text-sm text-green-400 font-medium">✓ Volume discount applied ({pageCount >= 1001 ? 'Tier 3' : 'Tier 2'} pricing)</p>
                    </div>
                  )}
                  
                  {/* Error Display */}
                  {error && (
                    <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 space-y-3">
                    {requiresQuote ? (
                      <>
                        <button 
                          onClick={handleQuoteRequest}
                          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-lg transition-all"
                        >
                          Request Quote
                        </button>
                        <p className="text-center text-sm text-slate-500">
                          {subtotal > PRICING.quoteThreshold && 'Orders over $500'}
                          {subtotal > PRICING.quoteThreshold && estimatedWeight > PRICING.weightThreshold && ' or '}
                          {estimatedWeight > PRICING.weightThreshold && 'over 25 lbs'}
                          {' require a personalized quote'}
                        </p>
                      </>
                    ) : (
                      <button 
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H8.887l-.994 7.27a.64.64 0 0 1-.633.543H7.076z"/>
                            </svg>
                            Proceed to Checkout
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-16 h-16 mx-auto text-slate-600 mb-4" />
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

export default PrintCalculator;


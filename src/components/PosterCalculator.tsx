import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import {
  Upload, ChevronUp, Zap, CheckCircle, Phone, Mail, Clock,
  Award, ShieldCheck, CreditCard, HelpCircle, Maximize2, Frame, Sparkles, Truck,
  Minus, Plus, ShoppingCart, RotateCcw, FileText, Image, X, AlertTriangle,
  Calculator, Loader2, DollarSign, AlertCircle
} from 'lucide-react';

// ==================== TYPES ====================
type CalcStep = 'upload' | 'configure' | 'submitting' | 'checkout_opened' | 'error';

interface ShippingTube {
  id: string;
  label: string;
  lengthIn: number;
  price: number;
}

// ==================== PRICING DATA ====================
const SHIPPING_TUBES: Record<string, ShippingTube> = {
  small:  { id: 'small',  label: '24" Shipping Tube',  lengthIn: 24, price: 9.95  },
  medium: { id: 'medium', label: '36" Shipping Tube',  lengthIn: 36, price: 14.95 },
  large:  { id: 'large',  label: '48" Shipping Tube',  lengthIn: 48, price: 19.95 },
};

const POSTER_SIZES = [
  { id: '18x24', label: '18" × 24"', tag: 'Small Poster',   width: 18, height: 24, price: 12, tubeId: 'small' },
  { id: '24x36', label: '24" × 36"', tag: 'Standard',       width: 24, height: 36, price: 25, popular: true, tubeId: 'medium' },
  { id: '36x48', label: '36" × 48"', tag: 'Large Format',   width: 36, height: 48, price: 40, tubeId: 'large' },
  { id: 'custom', label: 'Custom Size', tag: 'Up to 60" wide', width: 60, height: 80, price: 65, tubeId: 'large' },
];

const ADD_ONS = [
  { id: 'lamination', label: 'Gloss Lamination', price: 15, description: 'UV-resistant, wipe-clean protective coating' },
  { id: 'foamboard',  label: 'Foam Board Mount', price: 20, description: 'Rigid 3/16" foam core — ready to hang or display' },
];

// ==================== HELPERS ====================
const fmt = (n: number) => `$${n.toFixed(2)}`;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/tiff', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ==================== COMPONENT ====================
export default function PosterCalculator() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageNaturalSize, setImageNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [r2FileKey, setR2FileKey] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState('');

  const [selectedSize, setSelectedSize] = useState<string>('24x36');
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState<Record<string, boolean>>({ lamination: false, foamboard: false });

  const [step, setStep] = useState<CalcStep>('upload');
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // ==================== R2 UPLOAD ====================
  const uploadToStorageEarly = useCallback(async (f: File): Promise<{ success: boolean; fileKey?: string; error?: string }> => {
    try {
      const urlResp = await fetch('/api/get-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: f.name, fileSize: f.size, contentType: f.type || 'application/octet-stream' }),
      });
      const urlData = await urlResp.json();
      if (!urlData.success || !urlData.uploadUrl) return { success: false, error: 'Failed to get upload URL' };

      const putResp = await fetch(urlData.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': f.type || 'application/octet-stream' },
        body: f,
      });
      return putResp.ok
        ? { success: true, fileKey: urlData.fileKey }
        : { success: false, error: 'R2 PUT failed' };
    } catch {
      return { success: false, error: 'Network error during upload' };
    }
  }, []);

  const ensureUploaded = useCallback(async (): Promise<{ success: boolean; fileKey?: string; error?: string }> => {
    if (r2FileKey) return { success: true, fileKey: r2FileKey };
    if (!file) return { success: false, error: 'No file selected' };
    setUploadProgress('Uploading file...');
    return await uploadToStorageEarly(file);
  }, [r2FileKey, file, uploadToStorageEarly]);

  // ==================== FILE HANDLING ====================
  const handleFile = useCallback((f: File) => {
    setFileError(null);
    if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(jpe?g|png|tiff?|webp|pdf)$/i)) {
      setFileError('Please upload a JPG, PNG, TIFF, WebP, or PDF file.');
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError('File exceeds 100 MB limit. Please compress or contact us for large files.');
      return;
    }

    setFile(f);
    setStep('configure');
    setError(null);
    setR2FileKey(null);

    // Fire R2 upload IMMEDIATELY in parallel with preview generation
    uploadToStorageEarly(f).then((result) => {
      if (result.success && result.fileKey) setR2FileKey(result.fileKey);
    });

    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        const img = new window.Image();
        img.onload = () => setImageNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
        img.src = dataUrl;
      };
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
      setImageNaturalSize(null);
    }
  }, [uploadToStorageEarly]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleReset = useCallback(() => {
    setStep('upload'); setFile(null); setPreview(null); setImageNaturalSize(null);
    setFileError(null); setR2FileKey(null); setUploadProgress('');
    setSelectedSize('24x36'); setQuantity(1);
    setAddOns({ lamination: false, foamboard: false }); setError(null);
  }, []);

  // ==================== PRICING ====================
  const sizeData = POSTER_SIZES.find((s) => s.id === selectedSize)!;
  const tube = SHIPPING_TUBES[sizeData.tubeId];
  const addOnTotal = ADD_ONS.reduce((sum, a) => sum + (addOns[a.id] ? a.price : 0), 0);
  const unitPrintPrice = sizeData.price + addOnTotal;
  const printSubtotal = unitPrintPrice * quantity;
  const orderTotal = printSubtotal + tube.price;

  // ==================== DPI CHECK ====================
  const getQuality = (): { level: 'good' | 'ok' | 'low'; msg: string } | null => {
    if (!imageNaturalSize) return null;
    const dpi = Math.min(imageNaturalSize.w / sizeData.width, imageNaturalSize.h / sizeData.height);
    if (dpi >= 150) return { level: 'good', msg: `${Math.round(dpi)} DPI — excellent print quality` };
    if (dpi >= 72) return { level: 'ok', msg: `${Math.round(dpi)} DPI — acceptable for viewing distance` };
    return { level: 'low', msg: `${Math.round(dpi)} DPI — may appear pixelated. Consider a smaller size.` };
  };
  const quality = getQuality();

  // ==================== SHOPIFY DRAFT ORDER ====================
  const handleSubmit = useCallback(async () => {
    if (!file) return;
    setStep('submitting');
    setUploadProgress('Uploading file...');

    try {
      const uploadResult = await ensureUploaded();
      if (!uploadResult.success) { setError(uploadResult.error || 'Upload failed'); setStep('error'); return; }

      setUploadProgress('Creating order...');
      const addOnsList = ADD_ONS.filter(a => addOns[a.id]).map(a => a.label);

      const response = await fetch('/api/create-draft-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Line item: per-unit price × quantity (shipping separate)
          totalPrice: unitPrintPrice,
          quantity: quantity,
          documentName: file.name,
          pageCount: 1,
          bwPages: 0,
          colorPages: 1,
          bindingType: 'Poster Print',
          coverType: addOnsList.length > 0 ? addOnsList.join(' + ') : 'Standard',
          hasTabs: false,
          printMode: 'single-sided',
          pageSize: sizeData.label,
          isBooklet: false,
          pdfFileKey: uploadResult.fileKey,
          shippingWeightGrams: Math.round(quantity * 200 + tube.lengthIn * 10),
          // Poster-specific metadata
          posterSize: sizeData.label,
          posterSizeId: sizeData.id,
          addOns: addOnsList.join(', ') || 'None',
          lamination: addOns.lamination ? 'Yes' : 'No',
          foamBoard: addOns.foamboard ? 'Yes' : 'No',
          shippingTube: `${tube.label} (${tube.lengthIn}" tube)`,
          shippingTubePrice: tube.price,
          imageWidth: imageNaturalSize?.w || 0,
          imageHeight: imageNaturalSize?.h || 0,
          dpiEstimate: imageNaturalSize ? Math.round(Math.min(imageNaturalSize.w / sizeData.width, imageNaturalSize.h / sizeData.height)) : 0,
          // Shopify shippingLine — creates actual shipping charge in checkout
          shippingTitle: `Shipping — ${tube.label}`,
          shippingCost: tube.price,
        }),
      });

      const data = await response.json();
      if (data.success && data.checkoutUrl) {
        window.open(data.checkoutUrl, '_blank');
        setStep('checkout_opened');
        setUploadProgress('');
      } else {
        setError(data.error || 'Failed to create order');
        setStep('error');
      }
    } catch {
      setError('Network error. Please try again.');
      setStep('error');
    }
  }, [file, ensureUploaded, unitPrintPrice, sizeData, quantity, addOns, tube, imageNaturalSize]);

  // ==================== RENDER HELPERS ====================
  const renderUpload = () => (
    <section className="py-16 md:py-24 bg-slate-900">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Upload Your Poster Image
        </h2>
        <div
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${dragActive ? 'border-amber-400 bg-amber-500/10' : 'border-slate-600 hover:border-amber-500/50 bg-slate-800/30'}`}
        >
          <input type="file" accept=".jpg,.jpeg,.png,.tiff,.tif,.webp,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Upload className="w-8 h-8 text-amber-400" /></div>
          <h3 className="text-xl font-semibold text-white mb-2">{dragActive ? 'Drop your image here' : 'Drag & Drop or Click to Browse'}</h3>
          <p className="text-slate-400 mb-4">JPG, PNG, TIFF, WebP, or PDF</p>
          <p className="text-slate-500 text-sm">Maximum file size: 100 MB</p>
          {fileError && (
            <div className="mt-4 bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
              <AlertTriangle size={16} className="flex-shrink-0" />{fileError}
            </div>
          )}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <a href="/posters" className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center gap-3 hover:border-amber-500/40 transition-all">
            <Image size={18} className="text-amber-400 flex-shrink-0" />
            <div><p className="text-white text-sm font-medium">Poster Sizes & Specs</p><p className="text-slate-500 text-xs">View all sizes, paper info, add-ons</p></div>
          </a>
          <a href="/" className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center gap-3 hover:border-amber-500/40 transition-all">
            <Calculator size={18} className="text-amber-400 flex-shrink-0" />
            <div><p className="text-white text-sm font-medium">PDF / Manual Calculator</p><p className="text-slate-500 text-xs">Upload documents for binding quotes</p></div>
          </a>
        </div>
      </div>
    </section>
  );

  const renderConfigure = () => (
    <section className="py-12 md:py-16 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: PREVIEW */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">1</span>
              Your Image
            </h2>
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-700/50 border-b border-slate-600">
                <div className="flex items-center gap-3 min-w-0">
                  <Image size={18} className="text-amber-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{file?.name}</p>
                    <p className="text-slate-500 text-xs">
                      {file ? formatFileSize(file.size) : ''}
                      {imageNaturalSize && ` • ${imageNaturalSize.w} × ${imageNaturalSize.h} px`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {r2FileKey
                    ? <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle size={12} /> Uploaded</span>
                    : <span className="text-slate-500 text-xs flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Uploading...</span>
                  }
                  <button onClick={handleReset} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-600 transition-colors" title="Remove file"><X size={18} /></button>
                </div>
              </div>
              <div className="p-6 flex items-center justify-center min-h-[320px] bg-slate-900/50">
                {preview ? (
                  <div className="relative max-w-full max-h-[400px]">
                    <img src={preview} alt="Poster preview" className="max-w-full max-h-[400px] object-contain rounded-lg shadow-2xl border border-slate-600" />
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-600">{sizeData.label}</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">PDF uploaded — no browser preview</p>
                    <p className="text-slate-500 text-xs mt-1">We'll review your file before printing</p>
                  </div>
                )}
              </div>
              {quality && (
                <div className={`px-4 py-3 border-t flex items-center gap-2 text-sm ${
                  quality.level === 'good' ? 'border-green-800 bg-green-900/20 text-green-400' :
                  quality.level === 'ok' ? 'border-amber-800 bg-amber-900/20 text-amber-400' :
                  'border-red-800 bg-red-900/20 text-red-400'
                }`}>
                  {quality.level === 'good' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  {quality.msg}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CONFIG & PRICE */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">2</span>
              Choose Size & Options
            </h2>

            {/* SIZE CARDS */}
            <div className="space-y-3 mb-6">
              {POSTER_SIZES.map((size) => (
                <button key={size.id} onClick={() => setSelectedSize(size.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${selectedSize === size.id ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedSize === size.id ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>
                      {size.id === 'custom' ? <Maximize2 size={18} /> : <Frame size={18} />}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{size.label}</p>
                      <p className="text-slate-500 text-xs">{size.tag}</p>
                    </div>
                    {size.popular && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase rounded-full">Popular</span>}
                  </div>
                  <span className={`text-lg font-bold ${selectedSize === size.id ? 'text-amber-400' : 'text-slate-400'}`}>${size.price}</span>
                </button>
              ))}
            </div>

            {/* QUANTITY */}
            <div className="flex items-center justify-between bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
              <span className="text-white font-semibold">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"><Minus size={16} /></button>
                <input type="number" min={1} max={999} value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))} className="w-16 text-center bg-slate-900 border border-slate-600 rounded-lg text-white text-lg font-bold py-1.5 focus:border-amber-500 focus:outline-none" />
                <button onClick={() => setQuantity(Math.min(999, quantity + 1))} className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"><Plus size={16} /></button>
              </div>
            </div>

            {/* ADD-ONS */}
            <div className="space-y-3 mb-6">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Add-Ons</h3>
              {ADD_ONS.map((addon) => (
                <label key={addon.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${addOns[addon.id] ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={addOns[addon.id]} onChange={() => setAddOns((p) => ({ ...p, [addon.id]: !p[addon.id] }))} className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer" />
                    <div><p className="text-white font-medium text-sm">{addon.label}</p><p className="text-slate-500 text-xs">{addon.description}</p></div>
                  </div>
                  <span className="text-amber-400 font-bold text-sm">+${addon.price}</span>
                </label>
              ))}
            </div>

            {/* SHIPPING — auto-selected tube */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-blue-400" />
                  <div><p className="text-white font-medium text-sm">{tube.label}</p><p className="text-slate-500 text-xs">Heavy-duty cardboard • USPS Priority Mail</p></div>
                </div>
                <span className="text-white font-bold text-sm">{fmt(tube.price)}</span>
              </div>
            </div>

            {/* PRICE SUMMARY */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-slate-300 text-sm"><span>{sizeData.label} poster</span><span>{fmt(sizeData.price)} × {quantity}</span></div>
                {ADD_ONS.filter((a) => addOns[a.id]).map((a) => (
                  <div key={a.id} className="flex justify-between text-slate-300 text-sm"><span>{a.label}</span><span>{fmt(a.price)} × {quantity}</span></div>
                ))}
                <div className="flex justify-between text-slate-300 text-sm"><span>Shipping ({tube.label})</span><span>{fmt(tube.price)}</span></div>
                <div className="border-t border-slate-600 pt-3 flex justify-between items-end">
                  <span className="text-white font-bold text-lg">Order Total</span>
                  <span className="text-amber-400 font-bold text-3xl">{fmt(orderTotal)}</span>
                </div>
                {quantity > 1 && <p className="text-slate-500 text-xs text-right">{fmt(unitPrintPrice)} each + {fmt(tube.price)} shipping</p>}
              </div>
              <div className="p-5 bg-slate-700/30 border-t border-slate-700">
                <button onClick={handleSubmit} className="block w-full text-center py-4 rounded-xl font-bold uppercase tracking-wide text-lg transition-all duration-300 shadow-xl bg-amber-500 hover:bg-amber-400 text-slate-900 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/50" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  <span className="flex items-center justify-center gap-2"><ShoppingCart size={22} />Checkout — {fmt(orderTotal)}</span>
                </button>
                <p className="text-center text-slate-500 text-xs mt-3">Opens secure Shopify checkout in a new tab</p>
              </div>
            </div>

            {quantity >= 5 && (
              <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-sm text-blue-300 flex items-start gap-3">
                <HelpCircle size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div><p className="font-semibold text-white">Volume Discount Available</p><p>Orders of 5+ qualify for discounted pricing. <a href="mailto:esscosupport@aol.com?subject=Poster%20Volume%20Quote" className="text-amber-400 hover:underline">Contact us</a> for a custom quote.</p></div>
              </div>
            )}
            <button onClick={handleReset} className="mt-4 w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors"><RotateCcw size={14} /> Start over with a new file</button>
          </div>
        </div>
      </div>
    </section>
  );

  const renderSubmitting = () => (
    <section className="py-24 bg-slate-900">
      <div className="max-w-md mx-auto px-4 text-center">
        <Loader2 className="w-12 h-12 text-amber-400 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Processing Your Order...</h3>
        <p className="text-slate-400">{uploadProgress || 'Please wait...'}</p>
      </div>
    </section>
  );

  const renderCheckoutOpened = () => (
    <section className="py-16 bg-slate-900">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-400" /></div>
        <h3 className="text-xl font-semibold text-white mb-2">Checkout Open in Another Tab</h3>
        <p className="text-slate-400 mb-6 max-w-sm mx-auto">Complete your payment in the Shopify tab. Your order details are below for reference.</p>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6 text-left">
          <h4 className="text-amber-400 font-semibold mb-3 flex items-center gap-2"><DollarSign size={18} /> Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">File:</span><span className="text-white truncate ml-2 max-w-[200px]">{file?.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Poster Size:</span><span className="text-white">{sizeData.label}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Quantity:</span><span className="text-white">{quantity}</span></div>
            {ADD_ONS.filter((a) => addOns[a.id]).map((a) => (
              <div key={a.id} className="flex justify-between"><span className="text-slate-400">{a.label}:</span><span className="text-white">{fmt(a.price)}/ea</span></div>
            ))}
            <div className="flex justify-between"><span className="text-slate-400">Shipping:</span><span className="text-white">{tube.label} ({fmt(tube.price)})</span></div>
            <div className="flex justify-between border-t border-slate-700 pt-2 mt-2"><span className="text-slate-300 font-medium">Total:</span><span className="text-amber-400 font-bold">{fmt(orderTotal)}</span></div>
          </div>
        </div>
        <button onClick={handleReset} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300">Start New Order</button>
      </div>
    </section>
  );

  const renderError = () => (
    <section className="py-24 bg-slate-900">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-8 h-8 text-red-400" /></div>
        <h3 className="text-xl font-semibold text-white mb-2">Something Went Wrong</h3>
        <p className="text-slate-400 mb-6 max-w-sm mx-auto">{error}</p>
        <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">Try Again</button>
        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className="text-slate-500 text-sm mb-2">Need help? Contact us:</p>
          <div className="flex justify-center gap-4">
            <a href="tel:877-318-1555" className="text-amber-400 hover:text-amber-300">877-318-1555</a>
            <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:text-amber-300">esscosupport@aol.com</a>
          </div>
        </div>
      </div>
    </section>
  );

  // ==================== PAGE SHELL ====================
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <style>{`
        .bg-zoom-container { position: relative; overflow: hidden; }
        .bg-zoom-layer { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform 8s ease-out; z-index: 0; }
        .bg-zoom-container:hover .bg-zoom-layer { transform: scale(1.10); }
      `}</style>

      <Header />

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/poster-hero-bg.jpg)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-900/65"></div>
          <div className="relative z-20 text-center px-5 py-10 md:py-14 max-w-4xl mx-auto">
            <h1 className="mb-3 text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              POSTER CALCULATOR
            </h1>
            <p className="mx-auto text-white text-lg leading-relaxed max-w-2xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}>
              Upload your image, choose a size, and check out instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-3 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-amber-400" />Premium Photo Paper</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-400" />24-Hour Turnaround</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-400" />Secure Shopify Checkout</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        {step === 'upload' && renderUpload()}
        {step === 'configure' && renderConfigure()}
        {step === 'submitting' && renderSubmitting()}
        {step === 'checkout_opened' && renderCheckoutOpened()}
        {step === 'error' && renderError()}
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <section className="py-10 bg-slate-800 border-t border-slate-700 transition-all duration-500 hover:bg-slate-700 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div><Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" /><h3 className="text-white font-bold text-sm mb-1">Premium Glossy Photo Paper</h3><p className="text-slate-400 text-xs">200gsm+ with vivid fade-resistant inks</p></div>
              <div><ShieldCheck className="w-8 h-8 text-green-400 mx-auto mb-2" /><h3 className="text-white font-bold text-sm mb-1">HP DesignJet XL 3800</h3><p className="text-slate-400 text-xs">Up to 2400 × 1200 DPI resolution</p></div>
              <div><Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" /><h3 className="text-white font-bold text-sm mb-1">Heavy-Duty Tube Shipping</h3><p className="text-slate-400 text-xs">Printed in 24 hours, shipped via USPS Priority</p></div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FOOTER ==================== */}
                      <footer className="bg-slate-950 text-slate-400 pt-12 pb-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>ESSCO Aircraft</h3>
                <p className="text-sm leading-relaxed">Professional aviation document printing since 1955. Serving pilots, mechanics, flight schools, and corporate flight departments nationwide.</p>
                <p className="text-sm leading-relaxed mt-3">250,000+ orders completed &middot; 180,000-title archive</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Printing</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-amber-400 transition-colors">Print-On-Demand Calculator</a></li>
                  <li><a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a></li>
                  <li><a href="/checklist-printing" className="hover:text-amber-400 transition-colors">Checklist Printing</a></li>
                  <li><a href="/large-format-printing" className="hover:text-amber-400 transition-colors">Large Format Printing</a></li>
                  <li><a href="/posters" className="text-amber-400">Poster Printing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/binding-options" className="hover:text-amber-400 transition-colors">Binding Options</a></li>
                  <li><a href="/file-preparation-guide" className="hover:text-amber-400 transition-colors">File Preparation Guide</a></li>
                  <li><a href="/document-preservation" className="hover:text-amber-400 transition-colors">Document Preservation</a></li>
                  <li><a href="/flight-school-materials" className="hover:text-amber-400 transition-colors">Flight School Materials</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Customer Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.esscoaircraft.com/collections/aircraft-manuals" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Browse Manual Inventory</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/faqs" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">About Us</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/international-shipping" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Shipping Policy</a></li>
                  <li><a href="https://www.esscoaircraft.com/policies/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Refund Policy</a></li>
                  <li><a href="https://www.esscoaircraft.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
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
          <div className="border-t border-slate-800"><div className="max-w-7xl mx-auto px-4 py-4"><p className="text-sm text-center">&copy; {new Date().getFullYear()} ESSCO Aircraft. All rights reserved.</p></div></div>
        </footer>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

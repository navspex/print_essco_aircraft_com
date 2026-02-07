import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { Upload, ChevronUp, Lock, Zap, Plane, CheckCircle, Phone, Mail, Clock, Award, ShieldCheck, HelpCircle, Maximize2, Frame, Sparkles, Truck, Minus, Plus, ShoppingCart, RotateCcw, FileText, Image, X, AlertTriangle, Calculator } from 'lucide-react';

// ==================== PRICING DATA ====================
const POSTER_SIZES = [
  { id: '18x24', label: '18" × 24"', tag: 'Small Poster', width: 18, height: 24, price: 12 },
  { id: '24x36', label: '24" × 36"', tag: 'Standard', width: 24, height: 36, price: 25, popular: true },
  { id: '36x48', label: '36" × 48"', tag: 'Large Format', width: 36, height: 48, price: 40 },
  { id: 'custom', label: 'Custom Size', tag: 'Up to 60" wide', width: 60, height: 80, price: 65 },
];

const ADD_ONS = [
  { id: 'lamination', label: 'Gloss Lamination', price: 15, description: 'UV-resistant, wipe-clean protective coating' },
  { id: 'foamboard', label: 'Foam Board Mount', price: 20, description: 'Rigid 3/16" foam core — ready to hang or display' },
];

// ==================== HELPER: FORMAT CURRENCY ====================
const fmt = (n: number) => `$${n.toFixed(2)}`;

// ==================== POSTER CALCULATOR PAGE ====================
export default function PosterCalculator() {
  // Upload state
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageNaturalSize, setImageNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Config state
  const [selectedSize, setSelectedSize] = useState<string>('24x36');
  const [quantity, setQuantity] = useState(1);
  const [addOns, setAddOns] = useState<Record<string, boolean>>({ lamination: false, foamboard: false });

  // UI state
  const [showScrollTop, setShowScrollTop] = useState(false);
  const previewImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // ==================== IMAGE HANDLING ====================
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/tiff', 'image/webp', 'application/pdf'];
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

  const handleFile = useCallback((f: File) => {
    setFileError(null);

    if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(jpe?g|png|tiff?|webp|pdf)$/i)) {
      setFileError('Please upload a JPG, PNG, TIFF, WebP, or PDF file.');
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError('File exceeds 100MB limit. Please compress or contact us for large files.');
      return;
    }

    setFile(f);

    // Generate preview for images (not PDFs)
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        // Get natural dimensions
        const img = new window.Image();
        img.onload = () => {
          setImageNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(f);
    } else {
      // PDF — no browser preview, show placeholder
      setPreview(null);
      setImageNaturalSize(null);
    }
  }, []);

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
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const resetAll = useCallback(() => {
    setFile(null);
    setPreview(null);
    setImageNaturalSize(null);
    setFileError(null);
    setSelectedSize('24x36');
    setQuantity(1);
    setAddOns({ lamination: false, foamboard: false });
  }, []);

  // ==================== PRICING CALCULATION ====================
  const sizeData = POSTER_SIZES.find(s => s.id === selectedSize)!;
  const basePrice = sizeData.price;
  const addOnTotal = ADD_ONS.reduce((sum, a) => sum + (addOns[a.id] ? a.price : 0), 0);
  const unitPrice = basePrice + addOnTotal;
  const totalPrice = unitPrice * quantity;

  // ==================== DPI / QUALITY CHECK ====================
  const getQualityWarning = (): { level: 'good' | 'ok' | 'low'; msg: string } | null => {
    if (!imageNaturalSize) return null;
    const posterW = sizeData.width;
    const posterH = sizeData.height;
    // Calculate DPI based on how the image maps to the poster
    const dpiW = imageNaturalSize.w / posterW;
    const dpiH = imageNaturalSize.h / posterH;
    const effectiveDpi = Math.min(dpiW, dpiH);

    if (effectiveDpi >= 150) return { level: 'good', msg: `${Math.round(effectiveDpi)} DPI — excellent print quality` };
    if (effectiveDpi >= 72) return { level: 'ok', msg: `${Math.round(effectiveDpi)} DPI — acceptable for viewing distance` };
    return { level: 'low', msg: `${Math.round(effectiveDpi)} DPI — may appear pixelated at this size. Consider a smaller poster size.` };
  };

  const quality = getQualityWarning();

  // ==================== FORMAT FILE SIZE ====================
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ==================== BUILD ORDER EMAIL ====================
  const buildOrderEmail = () => {
    const addOnsList = ADD_ONS.filter(a => addOns[a.id]).map(a => a.label).join(', ') || 'None';
    const subject = encodeURIComponent(`Poster Order — ${sizeData.label} × ${quantity}`);
    const body = encodeURIComponent(
      `Hi ESSCO,\n\nI'd like to order a poster.\n\n` +
      `Size: ${sizeData.label}\n` +
      `Quantity: ${quantity}\n` +
      `Add-ons: ${addOnsList}\n` +
      `Estimated Total: ${fmt(totalPrice)}\n\n` +
      `File: ${file?.name || '(will attach)'}\n` +
      `File Size: ${file ? formatFileSize(file.size) : 'N/A'}\n\n` +
      `(Please attach your image file to this email)\n`
    );
    return `mailto:esscosupport@aol.com?subject=${subject}&body=${body}`;
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <style>{`
        .bg-zoom-container { position: relative; overflow: hidden; }
        .bg-zoom-layer {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: transform 8s ease-out; z-index: 0;
        }
        .bg-zoom-container:hover .bg-zoom-layer { transform: scale(1.10); }
      `}</style>

      <ScrollReveal>
        <Header />
      </ScrollReveal>

      {/* ==================== HERO ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/poster-hero-bg.jpg)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-900/65"></div>
          <div className="relative z-20 text-center px-5 py-12 md:py-16 max-w-4xl mx-auto">
            <h1 className="mb-4 text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
              POSTER CALCULATOR
            </h1>
            <p className="mx-auto text-white text-lg leading-relaxed max-w-2xl" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>
              Upload your image, choose a size, and see your price instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-amber-400" />Premium Photo Paper</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-400" />24-Hour Turnaround</span>
              <span className="flex items-center gap-1.5"><Truck size={14} className="text-blue-400" />Free Tube Shipping</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CALCULATOR ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-12 md:py-16 bg-slate-900">
          <div className="max-w-6xl mx-auto px-4">

            {/* TWO-COLUMN LAYOUT: Left = Upload/Preview | Right = Config/Pricing */}
            <div className="grid lg:grid-cols-2 gap-8">

              {/* ====== LEFT COLUMN: UPLOAD & PREVIEW ====== */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">1</span>
                  Upload Your Image
                </h2>

                {!file ? (
                  /* ---- DROP ZONE ---- */
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                      dragActive
                        ? 'border-amber-400 bg-amber-500/10'
                        : 'border-slate-600 hover:border-amber-500/50 bg-slate-800/30'
                    }`}
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.tiff,.tif,.webp,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {dragActive ? 'Drop your image here' : 'Upload Your Image'}
                    </h3>
                    <p className="text-slate-400 mb-4">Drag and drop or click to browse</p>
                    <p className="text-slate-500 text-sm">JPG, PNG, TIFF, WebP, or PDF • Max 100MB</p>

                    {fileError && (
                      <div className="mt-4 bg-red-900/30 border border-red-700 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                        <AlertTriangle size={16} className="flex-shrink-0" />
                        {fileError}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ---- PREVIEW ---- */
                  <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    {/* File info bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-700/50 border-b border-slate-600">
                      <div className="flex items-center gap-3 min-w-0">
                        <Image size={18} className="text-amber-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{file.name}</p>
                          <p className="text-slate-500 text-xs">
                            {formatFileSize(file.size)}
                            {imageNaturalSize && ` • ${imageNaturalSize.w} × ${imageNaturalSize.h} px`}
                          </p>
                        </div>
                      </div>
                      <button onClick={resetAll} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-600 transition-colors" title="Remove file">
                        <X size={18} />
                      </button>
                    </div>

                    {/* Image preview area */}
                    <div className="p-6 flex items-center justify-center min-h-[320px] bg-slate-900/50">
                      {preview ? (
                        <div className="relative max-w-full max-h-[400px]">
                          <img
                            ref={previewImgRef}
                            src={preview}
                            alt="Poster preview"
                            className="max-w-full max-h-[400px] object-contain rounded-lg shadow-2xl border border-slate-600"
                          />
                          {/* Size overlay badge */}
                          <div className="absolute bottom-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-600">
                            {sizeData.label}
                          </div>
                        </div>
                      ) : (
                        /* PDF placeholder */
                        <div className="text-center">
                          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400 text-sm">PDF uploaded — no browser preview available</p>
                          <p className="text-slate-500 text-xs mt-1">We'll review your file before printing</p>
                        </div>
                      )}
                    </div>

                    {/* Quality indicator */}
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
                )}
              </div>

              {/* ====== RIGHT COLUMN: CONFIGURE & PRICE ====== */}
              <div>
                {/* SIZE SELECTION */}
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">2</span>
                  Choose Size & Options
                </h2>

                <div className="space-y-3 mb-6">
                  {POSTER_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedSize === size.id
                          ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedSize === size.id ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-400'
                        }`}>
                          {size.id === 'custom' ? <Maximize2 size={18} /> : <Frame size={18} />}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{size.label}</p>
                          <p className="text-slate-500 text-xs">{size.tag}</p>
                        </div>
                        {size.popular && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase rounded-full">Popular</span>
                        )}
                      </div>
                      <span className={`text-lg font-bold ${selectedSize === size.id ? 'text-amber-400' : 'text-slate-400'}`}>
                        ${size.price}
                      </span>
                    </button>
                  ))}
                </div>

                {/* QUANTITY */}
                <div className="flex items-center justify-between bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
                  <span className="text-white font-semibold">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center bg-slate-900 border border-slate-600 rounded-lg text-white text-lg font-bold py-1.5 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(999, quantity + 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* ADD-ONS */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Add-Ons</h3>
                  {ADD_ONS.map((addon) => (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        addOns[addon.id]
                          ? 'border-amber-500/50 bg-amber-500/5'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={addOns[addon.id]}
                          onChange={() => setAddOns(prev => ({ ...prev, [addon.id]: !prev[addon.id] }))}
                          className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <div>
                          <p className="text-white font-medium text-sm">{addon.label}</p>
                          <p className="text-slate-500 text-xs">{addon.description}</p>
                        </div>
                      </div>
                      <span className="text-amber-400 font-bold text-sm">+${addon.price}</span>
                    </label>
                  ))}
                  {/* Free shipping - always shown */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <Truck size={20} className="text-green-400" />
                      <div>
                        <p className="text-white font-medium text-sm">Protective Tube Shipping</p>
                        <p className="text-slate-500 text-xs">Heavy-duty cardboard tube — always included</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-bold text-sm">FREE</span>
                  </div>
                </div>

                {/* ==================== PRICE SUMMARY ==================== */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between text-slate-300 text-sm">
                      <span>{sizeData.label} poster</span>
                      <span>{fmt(basePrice)} × {quantity}</span>
                    </div>
                    {ADD_ONS.filter(a => addOns[a.id]).map(a => (
                      <div key={a.id} className="flex justify-between text-slate-300 text-sm">
                        <span>{a.label}</span>
                        <span>{fmt(a.price)} × {quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-slate-400 text-sm">
                      <span>Tube Shipping</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="border-t border-slate-600 pt-3 flex justify-between items-end">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-amber-400 font-bold text-3xl">{fmt(totalPrice)}</span>
                    </div>
                    {quantity > 1 && (
                      <p className="text-slate-500 text-xs text-right">{fmt(unitPrice)} each</p>
                    )}
                  </div>

                  {/* ORDER CTA */}
                  <div className="p-5 bg-slate-700/30 border-t border-slate-700">
                    <a
                      href={buildOrderEmail()}
                      className={`block w-full text-center py-4 rounded-xl font-bold uppercase tracking-wide text-lg transition-all duration-300 shadow-xl ${
                        file
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/50'
                          : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      }`}
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                      onClick={(e) => { if (!file) e.preventDefault(); }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart size={22} />
                        {file ? 'Place Poster Order →' : 'Upload an image to continue'}
                      </span>
                    </a>
                    <p className="text-center text-slate-500 text-xs mt-3">
                      Opens your email with order details pre-filled. Attach your image file to the email.
                    </p>
                  </div>
                </div>

                {/* RESET */}
                {file && (
                  <button
                    onClick={resetAll}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors"
                  >
                    <RotateCcw size={14} />
                    Start over
                  </button>
                )}

                {quantity >= 5 && (
                  <div className="mt-4 bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-sm text-blue-300 flex items-start gap-3">
                    <HelpCircle size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Volume Discount Available</p>
                      <p>Orders of 5+ posters qualify for discounted pricing. <a href="mailto:esscosupport@aol.com?subject=Poster%20Volume%20Quote" className="text-amber-400 hover:underline">Contact us</a> for a custom quote.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ==================== CROSS-LINKS ==================== */}
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              <a href="/posters" className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 flex items-center gap-4 transition-all duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 group">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Image size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">← Back to Poster Sizes & Info</p>
                  <p className="text-slate-500 text-xs">View all sizes, specs, and add-on details</p>
                </div>
              </a>
              <a href="/" className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 flex items-center gap-4 transition-all duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 group">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Calculator size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Print-On-Demand Calculator</p>
                  <p className="text-slate-500 text-xs">Upload PDF manuals & documents for instant binding quotes</p>
                </div>
              </a>
            </div>

          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST / SPECS BAR ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-10 bg-slate-800 border-t border-slate-700 transition-all duration-500 hover:bg-slate-700 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="text-white font-bold text-sm mb-1">Premium Glossy Photo Paper</h3>
                <p className="text-slate-400 text-xs">200gsm+ with vivid fade-resistant inks</p>
              </div>
              <div>
                <ShieldCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-bold text-sm mb-1">HP DesignJet XL 3800</h3>
                <p className="text-slate-400 text-xs">Up to 2400 × 1200 DPI resolution</p>
              </div>
              <div>
                <Truck className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-bold text-sm mb-1">Free Tube Shipping</h3>
                <p className="text-slate-400 text-xs">Printed in 24 hours, shipped same day</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== MINIMAL FOOTER ==================== */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="tel:877-318-1555" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Phone className="w-4 h-4" />877-318-1555</a>
              <a href="mailto:esscosupport@aol.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Mail className="w-4 h-4" />esscosupport@aol.com</a>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />Mon-Fri 9am-4pm EST</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><Lock size={12} className="text-green-500" />Secure</span>
              <span className="flex items-center gap-1"><Award size={12} className="text-amber-400" />70 Years</span>
              <span className="flex items-center gap-1"><Plane size={12} className="text-blue-400" />Aviation Specialists</span>
            </div>
          </div>
          <p className="text-xs text-center mt-4 text-slate-600">© {new Date().getFullYear()} ESSCO Aircraft. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

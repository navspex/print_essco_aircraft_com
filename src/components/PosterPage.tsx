import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { Ruler, Layers, Truck, ChevronUp, Lock, ShieldCheck, Zap, Plane, CheckCircle, Phone, Mail, Clock, CreditCard, Award, HelpCircle, Maximize2, Frame, Sparkles, ShoppingCart, FileText, Calculator, Upload } from 'lucide-react';

// ==================== POSTER SIZE DATA ====================
const posterSizes = [
  {
    size: '18" × 24"',
    price: 12,
    label: 'Small Poster',
    description: 'Perfect for cockpit quick-reference charts, training aids, and office displays.',
    popular: false,
  },
  {
    size: '24" × 36"',
    price: 25,
    label: 'Standard Poster',
    description: 'The go-to wall poster size. Ideal for safety procedures, checklists, and aircraft diagrams.',
    popular: true,
  },
  {
    size: '36" × 48"',
    price: 40,
    label: 'Large Format',
    description: 'Training room size. Great for maintenance diagrams, schematics, and classroom visuals.',
    popular: false,
  },
  {
    size: 'Custom Size',
    price: 65,
    label: 'Oversized / Banner',
    description: 'Any size up to 60" wide, any length. Banners, hangar displays, and custom dimensions.',
    popular: false,
  },
];

const addOns = [
  { name: 'Gloss Lamination', price: 15, description: 'Protective UV-resistant coating. Wipes clean. Resists hangar oils and fingerprints.' },
  { name: 'Foam Board Mount', price: 20, description: 'Rigid 3/16" foam core backing. Ready to hang or display on an easel. Professional presentation.' },
  { name: 'Tube Shipping', price: 0, description: 'Heavy-duty cardboard tube protects your poster in transit. Always free.' },
];

// ==================== POSTERS PAGE ====================
export default function PostersPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: Set document title and meta tags
    document.title = 'Aviation Poster & Large Format Printing | Custom Sizes | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Custom aviation poster printing — aircraft profiles, cockpit charts, safety procedures. Gloss lamination and foam board mounting available. Since 1955.' },
      { property: 'og:title', content: 'Aviation Poster & Large Format Printing' },
      { property: 'og:description', content: 'Custom aviation poster printing — aircraft profiles, cockpit charts, safety procedures. Gloss lamination and foam board mounting available. Since 1955.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/poster-hero-bg.jpg' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/posters' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aviation Poster & Large Format Printing' },
      { name: 'twitter:description', content: 'Custom aviation poster printing — aircraft profiles, cockpit charts, safety procedures. Gloss lamination and foam board mounting available. Since 1955.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/poster-hero-bg.jpg' },
    ];
    const createdMetas: HTMLMetaElement[] = [];
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) meta.setAttribute('property', tag.property);
      if (tag.name) meta.setAttribute('name', tag.name);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
      createdMetas.push(meta);
    });

    // Canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/posters');
    document.head.appendChild(canonicalLink);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      createdMetas.forEach(meta => document.head.removeChild(meta));
      document.head.removeChild(canonicalLink);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Global CSS for background zoom effect - matches landing page */}
      <style>{`
        .bg-zoom-container { position: relative; overflow: hidden; }
        .bg-zoom-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 8s ease-out;
          z-index: 0;
        }
        .bg-zoom-container:hover .bg-zoom-layer {
          transform: scale(1.10);
        }
      `}</style>

      <Header />

      {/* ==================== HERO - POSTERS ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/poster-hero-bg.jpg)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-900/60"></div>
          <div className="relative z-20 text-center px-5 py-16 md:py-24 max-w-5xl mx-auto">
            <div className="bg-slate-700/85 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-bold uppercase rounded-full tracking-wider border border-amber-500/30">New Service</span>
              </div>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                AVIATION POSTERS<br />& LARGE FORMAT PRINTS
              </h1>
              <p className="mx-auto text-white text-lg md:text-xl leading-relaxed max-w-3xl" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>
                Cockpit diagrams, training aids, safety procedures, aircraft schematics, and custom banners — printed on premium glossy photo paper with vibrant, fade-resistant inks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/posters/calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload size={24} strokeWidth={2.5} />
                <span>Upload Image & Get Price →</span>
              </a>
              <a href="#poster-pricing" className="text-amber-400 hover:text-amber-300 font-semibold text-sm underline underline-offset-4 transition-colors">
                View all sizes & pricing ↓
              </a>
            </div>
            <p className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400"><Lock size={14} /><span>Same quality. Same team. Same 24-hour turnaround.</span></p>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CROSS-LINK BANNER: MANUAL PRINTING ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-slate-300 text-sm">Need manuals, training guides, or multi-page documents printed & bound?</span>
            <a href="/" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm uppercase tracking-wide px-5 py-2 rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <FileText size={16} strokeWidth={2.5} />
              Upload PDF → Get Instant Quote
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST BAR (matches landing) ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-8 bg-slate-900 border-y border-slate-700 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
              <span className="flex items-center gap-2"><Sparkles size={16} className="text-amber-400" />Premium Glossy Photo Paper</span>
              <span className="flex items-center gap-2"><Zap size={16} className="text-amber-400" />24-Hour Turnaround</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-blue-400" />Free Tube Shipping</span>
              <span className="flex items-center gap-2"><Plane size={16} className="text-blue-400" />Aviation Specialists Since 1955</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== POSTER SIZE & PRICING CARDS ==================== */}
      <ScrollReveal delay={100}>
        <section id="poster-pricing" className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Choose Your Poster Size</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Professional large format printing on premium glossy photo paper. All posters include vibrant full-color printing and free protective tube shipping.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {posterSizes.map((poster) => (
                <div
                  key={poster.size}
                  className={`relative bg-slate-800 rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.03] ${
                    poster.popular ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-700 hover:border-amber-500/50'
                  }`}
                >
                  {poster.popular && (
                    <div className="bg-amber-500 text-slate-900 text-center py-1.5 text-sm font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      {poster.size === 'Custom Size' ? (
                        <Maximize2 className="w-8 h-8 text-amber-400" />
                      ) : (
                        <Frame className="w-8 h-8 text-amber-400" />
                      )}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>{poster.size}</h3>
                    <p className="text-slate-500 text-sm mb-4">{poster.label}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-amber-400">${poster.price}</span>
                      <span className="text-slate-500 text-sm ml-1">per print</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{poster.description}</p>
                    <a
                      href="/posters/calculator"
                      className={`block w-full py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:scale-[1.02] ${
                        poster.popular
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-900'
                          : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                      }`}
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Start Your Order →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Notes */}
            <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <p className="text-slate-300 text-sm">All prices include full-color printing on premium glossy photo paper and free tube shipping. Volume discounts available — <a href="mailto:esscosupport@aol.com?subject=Poster%20Volume%20Quote" className="text-amber-400 hover:underline">contact us</a> for orders of 5+ posters.</p>
            </div>

            {/* Cross-link to Calculator */}
            <div className="max-w-4xl mx-auto mt-6 bg-slate-700/50 rounded-xl p-5 border border-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Printing a multi-page manual or document?</p>
                  <p className="text-slate-400 text-xs">Upload any PDF and get an instant price — binding, color, B&W — all calculated automatically.</p>
                </div>
              </div>
              <a href="/" className="flex-shrink-0 bg-slate-600 hover:bg-amber-500 hover:text-slate-900 text-white font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-lg transition-all duration-300" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Try the Calculator →
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== ADD-ONS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Optional Add-Ons</h2>
              <p className="text-lg text-slate-400">Protect and present your poster with professional finishing options.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon) => (
                <div key={addon.name} className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 text-center transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <div className="w-14 h-14 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {addon.price === 0 ? <Truck className="w-7 h-7 text-green-400" /> : <Layers className="w-7 h-7 text-amber-400" />}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{addon.name}</h3>
                  <div className="mb-3">
                    {addon.price === 0 ? (
                      <span className="text-green-400 font-bold text-xl">FREE</span>
                    ) : (
                      <span className="text-amber-400 font-bold text-xl">+${addon.price}</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHAT WE PRINT - USE CASES ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/print_room.png)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-800/80"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>What We Print</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">From the cockpit to the classroom, our large format prints serve aviation professionals across every discipline.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Cockpit Instrument Diagrams', desc: 'Panel layouts, instrument reference charts, and avionics system diagrams for quick cockpit reference.' },
                { title: 'Safety & Emergency Procedures', desc: 'Evacuation routes, emergency checklists, and safety placards printed for durability and clarity.' },
                { title: 'Aircraft Schematics', desc: 'Wiring diagrams, hydraulic systems, and structural layouts at full readable scale.' },
                { title: 'Training Room Visuals', desc: 'Curriculum posters, regulatory reference charts, and instructional aids for flight schools.' },
                { title: 'Hangar & Shop Banners', desc: 'Custom banners for FBOs, maintenance facilities, and aviation events up to 60" wide.' },
                { title: 'Custom Aviation Art', desc: 'Your own photos, illustrations, or graphics printed at poster scale on premium photo paper.' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Cross-link inline */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-slate-300 text-sm">Looking for ready-made cockpit posters? <a href="https://www.esscoaircraft.com/collections/cockpit-posters" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors">Browse our Cockpit Poster Collection →</a></p>
              <p className="text-slate-400 text-sm">Have a multi-page document, training guide, or operations manual instead?</p>
              <a href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                <FileText size={16} />
                Use our Print-On-Demand Calculator for instant document pricing →
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== HOW IT WORKS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>How Poster Ordering Works</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Three steps from your file to your wall.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/40">
                  <span className="text-slate-900 font-bold text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>1</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Upload Your Image</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Use our <a href="/posters/calculator" className="text-amber-400 hover:underline">Poster Calculator</a> to upload your high-resolution image. We accept PNG, JPG, TIFF, WebP, and PDF formats. We'll check quality before printing.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/40">
                  <span className="text-slate-900 font-bold text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>2</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Choose Size & Options</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Tell us your size, quantity, and any add-ons (lamination, foam board). We'll confirm your order details and total.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/40">
                  <span className="text-slate-900 font-bold text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>3</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">We Print & Ship</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Your poster is printed on our HP DesignJet XL 3800 and shipped in a protective tube within 24 hours. Free shipping included.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== SPECS & QUALITY ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Print Quality & Specifications</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                <Ruler className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">Paper & Print</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Premium glossy photo paper (200gsm+)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>HP DesignJet XL 3800 wide-format printer</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Vivid, fade-resistant pigment inks</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Up to 2400 × 1200 dpi resolution</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Maximum width: 60 inches, any length</span></li>
                </ul>
              </div>

              <div className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                <ShieldCheck className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">File Requirements</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Accepted formats: PDF, PNG, JPG, TIFF</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Recommended: 150 DPI minimum at print size</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>CMYK or RGB color space accepted</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>We'll check file quality before printing</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Free file review — no charge if we can't print it</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={200}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/FAQ_background.jpg)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-800/75"></div>
          <div className="relative z-20 max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}><HelpCircle className="w-10 h-10 text-amber-400" />Poster FAQs</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'What paper do you print posters on?', a: 'Premium glossy photo paper, 200gsm+. It produces vibrant colors with a professional, semi-rigid finish. Matte options available on request.' },
                { q: 'Can I send any image file?', a: 'We accept PDF, PNG, JPG, and TIFF files. For best results, provide images at 150 DPI or higher at your desired print size. We\'ll review every file before printing and contact you if there are any quality concerns.' },
                { q: 'How long does shipping take?', a: 'Posters are printed within 24 hours and shipped in a protective tube via USPS or UPS. Domestic delivery typically takes 3-5 business days after shipment.' },
                { q: 'Do you offer lamination?', a: 'Yes! Gloss lamination is available for $15 per poster. It adds a UV-resistant, wipe-clean protective layer — ideal for shop and hangar environments where posters encounter oils, dust, and handling.' },
                { q: 'What\'s the maximum size you can print?', a: 'Our HP DesignJet XL 3800 prints up to 60 inches wide with virtually unlimited length. Standard sizes are 18×24, 24×36, and 36×48, but we can do any custom dimension within that width.' },
                { q: 'Can I order multiple copies?', a: 'Absolutely. Volume discounts are available for orders of 5+ posters. Email us at esscosupport@aol.com with your quantity and we\'ll provide a custom quote.' },
              ].map((faq, idx) => (
                <details key={idx} className="bg-slate-700/85 rounded-xl border border-slate-600">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white list-none rounded-xl">{faq.q}<svg className="w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></summary>
                  <div className="px-5 pb-5 text-slate-300">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CROSS-LINK STRIP: DOCUMENT PRINTING ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Calculator size={18} className="text-amber-400" />
            <span className="text-slate-300 text-sm">Looking for document & manual printing with binding?</span>
            <a href="/" className="text-amber-400 hover:text-amber-300 font-bold text-sm underline underline-offset-2 transition-colors">
              Use our Print-On-Demand Calculator →
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CTA - ORDER NOW ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-900 border-t border-slate-700 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Order Your Poster?</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">Email your file to us with your size selection and any add-ons. We'll confirm your order and have it printed within 24 hours.</p>

            <a href="/posters/calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <ShoppingCart size={24} strokeWidth={2.5} />
              BUILD YOUR POSTER ORDER →
            </a>

            <p className="mt-6 text-slate-500 text-sm">Or call <a href="tel:877-318-1555" className="text-amber-400 hover:underline">877-318-1555</a> • Email <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:underline">esscosupport@aol.com</a></p>
            <p className="mt-2 text-slate-600 text-xs">Monday-Friday 9am-4pm EST</p>

            {/* Cross-link to POD Calculator - prominent */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Need Documents or Manuals Printed?</p>
                    <p className="text-slate-400 text-sm">Upload any PDF → get instant pricing → printed & shipped in 24 hours. Binding options, volume discounts, same team.</p>
                  </div>
                </div>
                <a href="/" className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold uppercase tracking-wide px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  Go to Calculator →
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-10 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-sm">Secure File Handling</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Plane className="w-5 h-5 text-blue-400" />
                <span className="text-sm">70 Years Aviation Experience</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FOOTER ==================== */}
      <ScrollReveal delay={300}>
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
      </ScrollReveal>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}


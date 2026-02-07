import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { Image, Ruler, Layers, Truck, ChevronUp, Lock, ShieldCheck, Zap, Plane, CheckCircle, Phone, Mail, Clock, CreditCard, Award, HelpCircle, Maximize2, Frame, Sparkles, ShoppingCart } from 'lucide-react';

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
    return () => window.removeEventListener('scroll', handleScroll);
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

      <ScrollReveal>
        <Header />
      </ScrollReveal>

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
            <a href="#poster-pricing" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Image size={24} strokeWidth={2.5} />
              <span>View Sizes & Pricing →</span>
            </a>
            <p className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400"><Lock size={14} /><span>Same quality. Same team. Same 24-hour turnaround.</span></p>
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
                      href="mailto:esscosupport@aol.com?subject=Poster%20Order%20-%20" 
                      className={`block w-full py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:scale-[1.02] ${
                        poster.popular
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-900'
                          : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                      }`}
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Order This Size
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Notes */}
            <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <p className="text-slate-300 text-sm">All prices include full-color printing on premium glossy photo paper and free tube shipping. Volume discounts available — <a href="mailto:esscosupport@aol.com?subject=Poster%20Volume%20Quote" className="text-amber-400 hover:underline">contact us</a> for orders of 5+ posters.</p>
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
                <h3 className="text-white font-bold text-lg mb-2">Send Us Your File</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Email your high-resolution image, PDF, or design file to <a href="mailto:esscosupport@aol.com?subject=Poster%20Order" className="text-amber-400 hover:underline">esscosupport@aol.com</a>. We accept PDF, PNG, JPG, and TIFF formats.</p>
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

      {/* ==================== CTA - ORDER NOW ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-900 border-t border-slate-700 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Order Your Poster?</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">Email your file to us with your size selection and any add-ons. We'll confirm your order and have it printed within 24 hours.</p>

            <a href="mailto:esscosupport@aol.com?subject=Poster%20Order&body=Hi%20ESSCO%2C%0A%0AI'd%20like%20to%20order%20a%20poster.%0A%0ASize%3A%20%0AQuantity%3A%20%0ALamination%3A%20Yes%2FNo%0AFoam%20Board%3A%20Yes%2FNo%0A%0A(Please%20attach%20your%20file)" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <ShoppingCart size={24} strokeWidth={2.5} />
              ORDER YOUR POSTER →
            </a>

            <p className="mt-6 text-slate-500 text-sm">Or call <a href="tel:877-318-1555" className="text-amber-400 hover:underline">877-318-1555</a> • Email <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:underline">esscosupport@aol.com</a></p>
            <p className="mt-2 text-slate-600 text-xs">Monday-Friday 9am-4pm EST</p>

            {/* Also link back to manual printing */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <p className="text-slate-400 mb-3">Need manuals or documents printed instead?</p>
              <a href="/" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">← Back to Print-On-Demand Calculator</a>
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

      {/* ==================== FOOTER (matches landing page) ==================== */}
      <ScrollReveal delay={300}>
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>About ESSCO Aircraft</h3>
                <p className="text-sm leading-relaxed mb-4">Over 70 years of providing quality aircraft manuals and aviation memorabilia. Our extensive library contains over 180,000 items.</p>
                <div className="flex gap-4 mt-4">
                  <a href="https://twitter.com/esscoaircraft" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="https://www.pinterest.com/esscoaircraft/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                  <a href="https://instagram.com/esscoaircraft" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                  <a href="https://www.youtube.com/user/esscoaircraft/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Customer Service</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.esscoaircraft.com/pages/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/order-status" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Order Status</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/my-account" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">My Account</a></li>
                  <li><a href="https://www.esscoaircraft.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Our Services</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-amber-400 transition-colors">Print-On-Demand Calculator</a></li>
                  <li><a href="/posters" className="text-amber-400">Posters & Large Format</a></li>
                  <li><a href="https://www.esscoaircraft.com/collections/aircraft-manuals" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Shop All Manuals →</a></li>
                  <li><a href="https://www.esscoaircraft.com/policies/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Refund Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Helpful Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.esscoaircraft.com/pages/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">About Us</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/faqs" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/international-shipping" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Shipping Policy</a></li>
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
          <div className="border-t border-slate-800"><div className="max-w-7xl mx-auto px-4 py-4"><p className="text-sm text-center">© {new Date().getFullYear()} ESSCO Aircraft. All rights reserved.</p></div></div>
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

import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { BookOpen, ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Users, Archive, Upload, ArrowRight } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Aviation Manual Printing",
  "description": "Professional aviation manual printing services including POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing.",
  "provider": {
    "@type": "Organization",
    "name": "ESSCO Aircraft",
    "url": "https://print.esscoaircraft.com",
    "foundingDate": "1955",
    "telephone": "877-318-1555",
    "email": "esscosupport@aol.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "serviceType": "Aviation Document Printing",
  "image": "https://print.esscoaircraft.com/images/aviation-manual-hero.jpg"
};

export default function AviationManualPrinting() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: Set document title and meta tags
    document.title = 'Aviation Manual Printing Services | POH, AFM, Maintenance Manuals | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Professional aviation manual printing — POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing. Since 1955.' },
      { property: 'og:title', content: 'Aviation Manual Printing Services' },
      { property: 'og:description', content: 'Professional aviation manual printing — POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing. Since 1955.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/aviation-manual-hero.jpg' },
      { property: 'og:image:width', content: '2000' },
      { property: 'og:image:height', content: '1125' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/aviation-manual-printing' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aviation Manual Printing Services' },
      { name: 'twitter:description', content: 'Professional aviation manual printing — POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing. Since 1955.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/aviation-manual-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/aviation-manual-printing');
    document.head.appendChild(canonicalLink);

    // Inject schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(script);
      createdMetas.forEach(meta => document.head.removeChild(meta));
      document.head.removeChild(canonicalLink);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <Header />
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
        .bg-zoom-container h1, .bg-zoom-container h2, .bg-zoom-container h3,
        .bg-zoom-container p, .bg-zoom-container span {
          text-shadow: 0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <ScrollReveal>
        <div className="pt-2 pb-1 px-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Aviation Manual Printing</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/aviation-manual-hero.jpg)' }}></div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Since 1955 — 250,000+ Orders Completed</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Aviation Manual<br />Printing Services
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Professional printing for Pilot Operating Handbooks, Aircraft Flight Manuals, maintenance documents, and STC supplements. Upload your PDF and get an instant quote.
              </p>
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your PDF — Get Instant Pricing
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST BAR ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-slate-300">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" />100% Satisfaction Guarantee</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" />Same-Day Production Available</span>
            <span className="flex items-center gap-2"><Printer className="w-4 h-4 text-blue-400" />70 Years Aviation Print Experience</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHAT WE PRINT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>What Aviation Documents Do We Print?</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">If it flies, we've printed the manual for it. From single-engine trainers to corporate jets, our shop handles every type of aviation document.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <BookOpen className="w-8 h-8 text-amber-400" />, title: 'Pilot Operating Handbooks (POH)', desc: 'Complete POH reprints for Cessna, Piper, Beechcraft, Mooney, and more. Exact reproductions of original manufacturer documents.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'Aircraft Flight Manuals (AFM)', desc: 'FAA-approved flight manuals for type-certificated aircraft. We match the original format, binding, and tab structure.' },
                { icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Maintenance Manuals & IPC', desc: 'Illustrated Parts Catalogs, maintenance manuals, and structural repair manuals. Full-size or reduced format printing.' },
                { icon: <Archive className="w-8 h-8 text-amber-400" />, title: 'STC Supplements', desc: 'Supplemental Type Certificate documentation, installation manuals, and amendment packages. Bound separately or integrated into existing manuals.' },
                { icon: <Users className="w-8 h-8 text-amber-400" />, title: 'Training & Operations Manuals', desc: 'Part 91/135/121 operations manuals, company SOPs, training syllabi, and crew reference documents for flight departments.' },
                { icon: <ShieldCheck className="w-8 h-8 text-amber-400" />, title: 'Weight & Balance / MEL', desc: 'Weight and balance supplements, Minimum Equipment Lists, and aircraft-specific reference documents. Critical cockpit reference material.' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHY ESSCO ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/aviation-manual-shop.jpg)' }}></div>
                    <div className="relative z-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Why Pilots and Mechanics Trust ESSCO</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">We're not a generic copy shop. ESSCO Aircraft has specialized in aviation document printing since 1955 — we understand the difference between a POH and a parts catalog, and we know what your checkride examiner expects to see in the cockpit.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: '70 Years in Aviation', detail: 'Founded in 1955, we\'ve printed manuals for virtually every general aviation aircraft in production. Our team understands aviation document standards inside and out.' },
                { label: '250,000+ Orders', detail: 'With hundreds of thousands of completed orders and 100% positive feedback, our track record speaks for itself. Same quality whether you order one manual or one hundred.' },
                { label: 'Multiple Binding Options', detail: 'Coil binding, comb binding, 3-ring punched, or perfect binding — we\'ll match your original manual\'s format or recommend the best option for cockpit use.' },
                { label: 'Fast Turnaround', detail: 'Same-day production is available on most orders. Standard orders ship within 1-2 business days. We know a grounded aircraft costs money.' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.label}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-300 text-sm mb-2">Not sure which binding works best for your manual?</p>
              <a href="/binding-options" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                <Layers size={16} /> Compare All Binding Options →
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>How to Order Your Aviation Manual</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Three steps from your PDF to a professionally bound manual.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Upload Your PDF', desc: 'Use our Print-On-Demand Calculator to upload your manual PDF. We accept any page count, any size. Our system automatically detects color vs. black & white pages for accurate pricing.' },
                { step: '2', title: 'Choose Binding & Options', desc: 'Select your binding type, paper weight, and quantity. Need tab dividers? Laminated covers? We\'ll match your original manual format or customize to your specs.' },
                { step: '3', title: 'We Print & Ship', desc: 'Your manual enters production immediately. Most orders ship within 1-2 business days. Every manual is quality-checked before it leaves our shop.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/40">
                    <span className="text-slate-900 font-bold text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Get Your Instant Quote
              </a>
              <p className="text-slate-500 text-sm mt-3">Need help preparing your file? Check our <a href="/file-preparation-guide" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">File Preparation Guide</a>.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== COMMON QUESTIONS ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: 'Can you print my POH if the original is out of print?', a: 'Yes. If you have a PDF or scan of the original, we can reproduce it faithfully. Many of our customers bring us deteriorating originals that need archival-quality reprints. For document restoration options, see our document preservation services.' },
                { q: 'What binding should I choose for a cockpit manual?', a: 'For cockpit use, we typically recommend coil binding (lays flat, flips 360°) or 3-ring punched (easy to update individual pages). We\'ll help you match the original manufacturer format if that\'s what you prefer.' },
                { q: 'Do you print color pages and black & white pages in the same manual?', a: 'Absolutely. Our calculator automatically detects which pages are color and which are black & white, so you only pay color pricing for the pages that need it. Most POHs are a mix of both.' },
                { q: 'How fast can I get my manual?', a: 'Same-day production is available on most orders placed before noon. Standard production is 1-2 business days. Shipping time depends on your location — we ship USPS Priority and UPS Ground.' },
                { q: 'Can you print large fold-out pages like schematics or wiring diagrams?', a: 'Yes. For manuals with oversized pages, we can print fold-outs or direct you to our large format printing service for full-size schematics and diagrams.' },
              ].map((item) => (
                <div key={item.q} className="bg-slate-700/80 rounded-xl p-6 border border-slate-600">
                  <h3 className="text-white font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CROSS-LINKS ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-12 bg-slate-900 transition-all duration-500 hover:bg-slate-800">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>Related Services</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <a href="/checklist-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <FileText className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Checklist Printing</h3>
                <p className="text-slate-400 text-sm">Custom cockpit checklists, emergency procedures, and laminated quick-reference cards.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/large-format-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Printer className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Large Format Printing</h3>
                <p className="text-slate-400 text-sm">Schematics, wiring diagrams, and blueprints printed at full readable scale.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/binding-options" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Layers className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Binding Options</h3>
                <p className="text-slate-400 text-sm">Compare coil, comb, 3-ring, and perfect binding for your aviation manuals.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Compare options <ArrowRight size={14} /></span>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FINAL CTA ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800 border-t border-slate-700 transition-all duration-500 hover:bg-slate-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Print Your Manual?</h2>
            <p className="text-lg text-slate-300 mb-8">Upload your PDF and get an instant price. No account required, no minimums, no hassle.</p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Upload PDF & Get Quote
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== RELATED SERVICES ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/binding-options" className="bg-slate-900 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-white mb-3">Binding Options</h3>
                <p className="text-slate-400 text-sm mb-4">Compare binding methods for your aviation manuals. Coil, comb, 3-ring, perfect binding, and saddle stitch explained.</p>
                <span className="text-amber-400 text-sm font-semibold">Learn More →</span>
              </a>
              <a href="/document-preservation" className="bg-slate-900 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-white mb-3">Document Preservation</h3>
                <p className="text-slate-400 text-sm mb-4">Preserve deteriorating vintage manuals with professional reprints. 180,000-title archive access.</p>
                <span className="text-amber-400 text-sm font-semibold">Learn More →</span>
              </a>
              <a href="/file-preparation-guide" className="bg-slate-900 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-white mb-3">File Preparation Guide</h3>
                <p className="text-slate-400 text-sm mb-4">Optimize your PDFs for printing. Learn about resolution, page setup, and common file issues.</p>
                <span className="text-amber-400 text-sm font-semibold">Learn More →</span>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FOOTER ==================== */}
      <ScrollReveal delay={100}>
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
                  <li><a href="/aviation-manual-printing" className="text-amber-400">Aviation Manual Printing</a></li>
                  <li><a href="/checklist-printing" className="hover:text-amber-400 transition-colors">Checklist Printing</a></li>
                  <li><a href="/large-format-printing" className="hover:text-amber-400 transition-colors">Large Format Printing</a></li>
                  <li><a href="/posters" className="hover:text-amber-400 transition-colors">Poster Printing</a></li>
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
            <div className="flex items-center gap-2 text-sm"><Award size={20} className="text-amber-400" /><span>Veteran-Owned & Woman-Owned</span></div>
          </div>
          <div className="border-t border-slate-800"><div className="max-w-7xl mx-auto px-4 py-4"><p className="text-sm text-center">&copy; {new Date().getFullYear()} ESSCO Aircraft. Veteran-Owned & Woman-Owned. All rights reserved.</p></div></div>
        </footer>
      </ScrollReveal>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}


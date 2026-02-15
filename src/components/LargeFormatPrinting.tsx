import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { Maximize2, ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Upload, ArrowRight, Ruler, Cpu, Wrench } from 'lucide-react';

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Large Format Aviation Printing",
  "description": "Large format printing for aviation schematics, wiring diagrams, blueprints, CAD drawings, and fold-out pages. Up to 36 inches wide on KIP 860 wide format printer, any length.",
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
  "serviceType": "Large Format Aviation Printing",
  "image": "https://print.esscoaircraft.com/images/large-format-hero.jpg"
};

export default function LargeFormatPrinting() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: OG and Twitter meta tags for social sharing
    const metaTags = [
      { name: 'description', content: 'Large format printing for aviation schematics, wiring diagrams, CAD drawings, and blueprints. Up to 36\" wide on KIP 860 wide format printer. Upload your file for instant pricing.' },
      { property: 'og:title', content: 'Large Format Aviation Printing | Schematics & Blueprints' },
      { property: 'og:description', content: 'Large format printing for aviation schematics, wiring diagrams, CAD drawings, and blueprints. Up to 36\" wide on KIP 860 wide format printer. Upload your file for instant pricing.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/large-format-hero.jpg' },
      { property: 'og:image:width', content: '2000' },
      { property: 'og:image:height', content: '1125' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/large-format-printing' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Large Format Aviation Printing | Schematics & Blueprints' },
      { name: 'twitter:description', content: 'Large format printing for aviation schematics, wiring diagrams, CAD drawings, and blueprints. Up to 36\" wide on KIP 860 wide format printer. Upload your file for instant pricing.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/large-format-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/large-format-printing');
    document.head.appendChild(canonicalLink);

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

      {/* ==================== HERO ==================== */}
      <ScrollReveal>
        <div className="pt-2 pb-1 px-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Large Format Printing</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/large-format-hero.jpg)' }}></div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Wide Format — Up to 36" Wide, Any Length</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Large Format<br />Aviation Printing
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Schematics, wiring diagrams, CAD drawings, and blueprints printed at full readable scale on our HP DesignJet wide-format press. When the details matter, print it full size.
              </p>
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your File — Get Instant Pricing
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST BAR ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Maximize2 className="w-4 h-4 text-blue-400" />Up to 36" Wide</span>
            <span className="flex items-center gap-2"><Printer className="w-4 h-4 text-amber-400" />KIP 860 Wide Format Printer</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-500" />Same-Day Production Available</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHAT WE PRINT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>What Large Format Documents Do We Print?</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Some aviation documents were never meant to be read on letter-size paper. When legibility matters — for maintenance, training, or compliance — print them at the scale they were designed for.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Cpu className="w-8 h-8 text-amber-400" />, title: 'Wiring Diagrams', desc: 'Avionics wiring schematics, electrical system diagrams, and interconnect drawings printed at full D-size or E-size for readable wire labels and junction references.' },
                { icon: <Wrench className="w-8 h-8 text-amber-400" />, title: 'Structural Drawings', desc: 'Airframe structural repair diagrams, station diagrams, and zone charts. Critical for sheet metal work where measurements must be verifiable at full scale.' },
                { icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Hydraulic & Pneumatic Schematics', desc: 'System diagrams for hydraulic, pneumatic, fuel, and environmental control systems. Color-coded line tracing stays readable at full size.' },
                { icon: <Ruler className="w-8 h-8 text-amber-400" />, title: 'CAD Drawings & Blueprints', desc: 'Engineering drawings, modification blueprints, and STC installation diagrams. We accept PDF, DWF, and rasterized CAD formats.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'Fold-Out Manual Pages', desc: 'Replacement fold-out pages for existing manuals. We match the original fold dimensions and paper weight so they integrate seamlessly into your bound manual.' },
                { icon: <Maximize2 className="w-8 h-8 text-amber-400" />, title: 'Training Room Displays', desc: 'Wall-mounted system diagrams, cutaway illustrations, and reference charts for maintenance training rooms, classrooms, and hangar offices.' },
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

      {/* ==================== SPECS ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/large-format-printer.jpg)' }}></div>
                    <div className="relative z-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Print Specifications & Capabilities</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">Our HP DesignJet XL 3800 wide-format press handles everything from quick black & white schematics to full-color training displays.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Maximum Width: 36 Inches', detail: 'Any document up to 36" wide with unlimited length. Standard aviation drawing sizes (C, D, E, and custom) all supported.' },
                { label: 'Resolution: Up to 2400 × 1200 DPI', detail: 'Fine lines, small text callouts, and detailed schematics reproduce with razor sharpness. Wire labels and component numbers stay legible.' },
                { label: 'Color & Black/White', detail: 'Full CMYK color for system diagrams with color-coded lines, or cost-effective black & white for standard engineering drawings. Our system auto-detects.' },
                { label: 'Multiple Paper Options', detail: 'Standard bond, premium photo paper, or heavy card stock depending on the application. Lamination available for shop floor durability.' },
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

            <div className="mt-8 text-center space-y-3">
              <p className="text-slate-300 text-sm">Need a full manual printed with fold-out pages integrated?</p>
              <a href="/aviation-manual-printing" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                <FileText size={16} /> Aviation Manual Printing Services →
              </a>
              <p className="text-slate-400 text-sm">Looking for poster-size prints for display?</p>
              <a href="/posters" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                <Printer size={16} /> Poster Printing →
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>How to Order Large Format Prints</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Same fast, simple process.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Upload Your File', desc: 'Use our calculator or poster calculator to upload your PDF, PNG, or TIFF. Our system reads the page dimensions and detects color vs. black & white automatically.' },
                { step: '2', title: 'Select Size & Options', desc: 'Choose your output size, paper type, and quantity. Need lamination for a shop floor schematic? Foam board mounting for a training room display? We\'ve got you covered.' },
                { step: '3', title: 'We Print & Ship', desc: 'Large format prints ship rolled in protective tubes or flat-packed for mounted prints. Most orders ship within 1-2 business days.' },
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
              <p className="text-slate-500 text-sm mt-3">Questions about file formats? See our <a href="/file-preparation-guide" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">File Preparation Guide</a>.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Large Format Printing FAQ</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: 'What is the maximum print size?', a: 'We print up to 36 inches wide with virtually unlimited length. Standard aviation drawing sizes (ANSI C at 17"×22", D at 22"×34", E at 34"×44") are all well within our capabilities.' },
                { q: 'Can you print a fold-out page that inserts back into my existing manual?', a: 'Yes. We match the fold dimensions, paper weight, and hole-punch pattern of your existing manual so the fold-out integrates seamlessly. This is one of our most requested services.' },
                { q: 'What file formats do you accept?', a: 'PDF is preferred for the best results. We also accept PNG, TIFF, and JPEG for rasterized drawings. If you have a DWF or DXF file, export it to PDF at the desired print size before uploading.' },
                { q: 'Can you laminate large format prints?', a: 'Yes. Gloss lamination protects prints against moisture, oils, fingerprints, and UV fading — ideal for prints that will live on a hangar wall or shop floor.' },
                { q: 'How are large prints shipped?', a: 'Rolled prints ship in heavy-duty cardboard tubes. Mounted prints (foam board) ship flat-packed with corner protection. We choose the method that protects your print best.' },
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
              <a href="/aviation-manual-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <FileText className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Aviation Manual Printing</h3>
                <p className="text-slate-400 text-sm">POH, AFM, and maintenance manuals with integrated fold-out pages.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/posters" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Printer className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Poster Printing</h3>
                <p className="text-slate-400 text-sm">Aviation posters, cockpit art, and display prints up to 36" × 48".</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/checklist-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Layers className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Checklist Printing</h3>
                <p className="text-slate-400 text-sm">Laminated cockpit checklists, emergency procedures, and reference cards.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FINAL CTA ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800 border-t border-slate-700 transition-all duration-500 hover:bg-slate-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Print Full-Size?</h2>
            <p className="text-lg text-slate-300 mb-8">Upload your schematic, drawing, or diagram and get an instant price. No minimums, no account required.</p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Upload File & Get Quote
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
              <a href="/posters" className="bg-slate-900 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-white mb-3">Poster Printing</h3>
                <p className="text-slate-400 text-sm mb-4">Aircraft profiles, safety procedures, and training visuals. Sizes from 11×17 to 36×48 with optional lamination.</p>
                <span className="text-amber-400 text-sm font-semibold">Learn More →</span>
              </a>
              <a href="/aviation-manual-printing" className="bg-slate-900 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-white mb-3">Aviation Manual Printing</h3>
                <p className="text-slate-400 text-sm mb-4">POH, AFM, and maintenance manuals with professional binding. Upload PDF for instant pricing.</p>
                <span className="text-amber-400 text-sm font-semibold">Learn More →</span>
              </a>
              <a href="/file-preparation-guide" className="bg-slate-900 rounded-xl p-6 border border-slate-700 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-white mb-3">File Preparation Guide</h3>
                <p className="text-slate-400 text-sm mb-4">Optimize CAD drawings and schematics for large format printing. Resolution and page setup tips.</p>
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
                  <li><a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a></li>
                  <li><a href="/checklist-printing" className="hover:text-amber-400 transition-colors">Checklist Printing</a></li>
                  <li><a href="/large-format-printing" className="text-amber-400">Large Format Printing</a></li>
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

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}


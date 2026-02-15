import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, FileText, Printer, Upload, ArrowRight, Shield, Star, BookOpen, Wrench, Layers, Package, ClipboardList, Archive } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Military Aviation Document Printing Services",
  "description": "Print military technical manuals, NAVAIR publications, Army TMs, Air Force Technical Orders, and warbird restoration documentation. Veteran-owned, woman-owned. No minimum order. Since 1955.",
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
  "serviceType": "Military Aviation Document Printing",
  "image": "https://print.esscoaircraft.com/images/military-docs-hero.jpg"
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of military technical manuals can you print?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Any military TM you have as a PDF — Army Technical Manuals, Air Force Technical Orders, NAVAIR publications, and joint-service manuals. From single work cards to 800+ page inspection manuals. Distribution Statement A documents only (approved for public release)."
      }
    },
    {
      "@type": "Question",
      "name": "Can you print vintage or historical military aircraft manuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — this is a significant part of our business. We regularly print WWII-era TMs, Korean War maintenance manuals, and Vietnam-era technical orders for warbird restorers and aviation museums. If you have the PDF, we print it. We also maintain a 180,000-title archive of aviation publications."
      }
    },
    {
      "@type": "Question",
      "name": "What about foldout pages and oversized schematics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our KIP 860 prints documents up to 36 inches wide on bond and film paper. Military TMs with foldout wiring diagrams and structural schematics are common orders for us. Standard pages print on our Xerox Versant 4100. Both are priced automatically when you upload."
      }
    },
    {
      "@type": "Question",
      "name": "Can you print just replacement pages instead of a full manual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Upload only the pages you need — no minimum page count. Same per-page price whether you print 5 pages or 500. For 3-ring punched manuals, replacement pages drop right into your existing binder."
      }
    },
    {
      "@type": "Question",
      "name": "Are you a veteran-owned business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ESSCO Aircraft is both veteran-owned and woman-owned, operating continuously since 1955. 70 years serving the aviation community with 250,000+ orders completed."
      }
    }
  ]
};

export default function MilitaryDocumentPrinting() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    document.title = 'Military Aviation Document Printing | Technical Manuals & TOs | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Print military technical manuals, NAVAIR publications, Army TMs, Air Force Technical Orders, and warbird restoration docs. Veteran-owned, woman-owned. Upload your PDF for instant pricing.' },
      { property: 'og:title', content: 'Military Aviation Document Printing | ESSCO Aircraft' },
      { property: 'og:description', content: 'Print military technical manuals, NAVAIR publications, Army TMs, Air Force Technical Orders, and warbird restoration docs. Veteran-owned, woman-owned. Upload your PDF for instant pricing.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/military-docs-hero.jpg' },
      { property: 'og:image:width', content: '2000' },
      { property: 'og:image:height', content: '1125' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/military-document-printing' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Military Aviation Document Printing | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'Print military technical manuals, NAVAIR publications, Army TMs, Air Force Technical Orders, and warbird restoration docs. Veteran-owned, woman-owned. Upload your PDF for instant pricing.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/military-docs-hero.jpg' },
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

    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/military-document-printing');
    document.head.appendChild(canonicalLink);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(script);
      document.head.removeChild(faqScript);
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
          position: absolute; inset: 0; background-size: cover; background-position: center;
          transition: transform 8s ease-out; z-index: 0;
        }
        .bg-zoom-container:hover .bg-zoom-layer { transform: scale(1.10); }
        .bg-zoom-container h1, .bg-zoom-container h2, .bg-zoom-container h3,
        .bg-zoom-container p, .bg-zoom-container span {
          text-shadow: 0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* ==================== HERO ==================== */}
      <ScrollReveal>
        <div className="pt-2 pb-1 px-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Military Document Printing</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/military-docs-hero.jpg)' }}></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Veteran-Owned • Woman-Owned • Since 1955</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                You Found the TM.<br />We'll Print It Right.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Print Army Technical Manuals, Air Force Technical Orders, NAVAIR publications, and warbird restoration documentation. Upload your PDF, choose your binding, and we ship it. No minimum order.
              </p>
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your TM — Instant Price
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST BAR ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" />Veteran-Owned & Woman-Owned</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" />250,000+ Orders Since 1955</span>
            <span className="flex items-center gap-2"><Archive className="w-4 h-4 text-blue-400" />180,000-Title Aviation Archive</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CONTEXT — WHO THIS IS FOR ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
              For Restorers, Maintainers & Historians
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6 max-w-3xl mx-auto">
              You tracked down the TM for a 1953 H-19 Chickasaw from a library archive. Or you need the TO 1-1A-1 structural repair manual reprinted for your shop floor. Or the museum wants a clean copy of the KC-97G maintenance manual for a new exhibit.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              You already did the hard part — finding the document. We do the rest. Upload the PDF, pick your binding, and a professional-grade reproduction ships to your hangar, shop, or museum.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHAT WE PRINT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800/50 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Military Documents We Print
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">
              Distribution Statement A documents — approved for public release. If you have the PDF, we print it.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <BookOpen className="w-8 h-8 text-amber-400" />, title: 'Army Technical Manuals', desc: 'TM 1-series through TM 55-series. Operator manuals, maintenance procedures, parts catalogs, and inspection guides for every Army airframe.' },
                { icon: <Star className="w-8 h-8 text-amber-400" />, title: 'Air Force Technical Orders', desc: 'TO 1-series flight manuals through TO 33-series NDI procedures. Including the 888-page TO 33B-1-1 — our system handles files up to 104MB.' },
                { icon: <Shield className="w-8 h-8 text-amber-400" />, title: 'NAVAIR Publications', desc: 'NATOPS flight manuals, maintenance procedures, and technical directives. Standard NAVAIR numbering system — we know the format.' },
                { icon: <Wrench className="w-8 h-8 text-amber-400" />, title: 'Warbird Restoration TMs', desc: 'WWII-era flight manuals, Korean War maintenance docs, Vietnam-era technical orders. The manuals that keep P-51s, Corsairs, and Hueys flying.' },
                { icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Oversized Schematics', desc: 'Wiring diagrams, structural repair schematics, and foldout pages up to 36 inches wide on our KIP 860. Bond or film paper.' },
                { icon: <ClipboardList className="w-8 h-8 text-amber-400" />, title: 'MRO Shop Documentation', desc: 'Structural repair manuals, corrosion control procedures, weight & balance documents, and inspection checklists for contract maintenance operations.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:scale-[1.02]">
                  <div className="mb-4">{item.icon}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: <Upload className="w-8 h-8 text-amber-400" />, title: 'Upload Your TM', desc: 'Drop the PDF into our calculator. Files up to 104MB — even your largest maintenance manuals.' },
                { step: '02', icon: <Printer className="w-8 h-8 text-amber-400" />, title: 'Auto-Analyze', desc: 'Every page scanned for color vs B&W. Diagrams and text priced separately. Exact total in seconds.' },
                { step: '03', icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Pick Binding', desc: '3-ring for field manuals. Coil for the cockpit. Hardcover for archive copies. Your choice at checkout.' },
                { step: '04', icon: <Package className="w-8 h-8 text-amber-400" />, title: 'We Ship', desc: 'Credit card or PayPal. Ships to your hangar, MRO shop, museum, or home. Most orders go out next business day.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-amber-500/30 text-5xl font-bold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.step}</div>
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHY ESSCO ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800/50 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Why ESSCO for Military Documents
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Veteran-Owned & Woman-Owned', desc: 'ESSCO Aircraft has operated continuously since 1955. Veteran-owned and woman-owned — if your contract requires supplier diversity reporting, we qualify.' },
                { title: '70 Years of Aviation Documents', desc: 'We have printed aviation documentation since Eisenhower was president. We understand military TM formatting, page revision systems, and the paper weight that survives a shop floor.' },
                { title: '180,000-Title Archive', desc: 'Our parent company maintains one of the largest aviation publication inventories in the United States. If you need a TM you cannot find anywhere else, ask us.' },
                { title: 'No Minimum, No Hassle', desc: 'Print one replacement page or an entire 800-page manual. Same per-page price. Credit card checkout — no GPC card required for orders under micro-purchase threshold.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== EQUIPMENT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Built for Technical Documents
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Standard TM pages print on our <strong className="text-white">Xerox Versant 4100</strong> production press with automatic color detection — color diagrams and B&W text priced separately on every page. Oversized schematics, wiring diagrams, and foldout pages print on our <strong className="text-white">KIP 860</strong> at up to 36 inches wide using LED toner technology on bond and film paper.
            </p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Get Your Instant Quote
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800/50 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-amber-500/30 transition-all duration-300">
                  <h3 className="text-white font-bold text-lg mb-3">{faq.name}</h3>
                  <p className="text-slate-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FINAL CTA ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-gradient-to-b from-slate-800/50 to-slate-900 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Your TM Deserves Better Than a Copier
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              You spent weeks tracking down that manual. Get it printed on production equipment that does it justice. Upload your PDF and we handle the rest.
            </p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Upload Your PDF — Get Instant Pricing
            </a>
            <p className="mt-4 text-slate-500 text-sm">Questions? Call <a href="tel:877-318-1555" className="text-amber-400 hover:underline">877-318-1555</a> • Email <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:underline">esscosupport@aol.com</a></p>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FOOTER ==================== */}
      <ScrollReveal>
        <footer className="bg-slate-950 text-slate-400 pt-12">
          <div className="max-w-7xl mx-auto px-4 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Print Services</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="text-amber-400">Print-On-Demand Calculator</a></li>
                  <li><a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a></li>
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
                  <li><a href="/corporate-flight-departments" className="hover:text-amber-400 transition-colors">Corporate Flight Departments</a></li>
                  <li><a href="/military-document-printing" className="text-amber-400">Military Document Printing</a></li>
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
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>About ESSCO</h3>
                <p className="text-sm leading-relaxed mb-3">Veteran-owned and woman-owned since 1955. 70 years serving the aviation community.</p>
                <p className="text-sm leading-relaxed">250,000+ orders completed with 100% positive feedback.</p>
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

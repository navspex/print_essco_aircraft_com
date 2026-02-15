import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, FileText, Printer, Upload, ArrowRight, Building2, Briefcase, Globe, ClipboardCheck, Lock, Users, Layers, Star } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Corporate Flight Department Printing Services",
  "description": "Print Part 135 operations manuals, GOM documents, MEL binders, AAIP programs, and compliance documentation for corporate flight departments. Veteran-owned, woman-owned. No minimum order.",
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
  "serviceType": "Corporate Aviation Document Printing",
  "image": "https://print.esscoaircraft.com/images/corporate-flight-hero.jpg"
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can we order without a purchase order or vendor setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Upload your PDF, pick binding, and pay with a credit card or PayPal. No PO required, no vendor application, no net-30 setup. Your department manager can order directly in under five minutes."
      }
    },
    {
      "@type": "Question",
      "name": "How fast can you turn around a manual reprint after a revision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload the revised PDF, checkout, and most orders ship next business day. No re-quoting, no setup fees. Same press, same quality, new content."
      }
    },
    {
      "@type": "Question",
      "name": "What binding do you recommend for Part 135 manuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3-ring punched for manuals that receive interim page changes. Coil binding for cockpit reference copies that need to lay flat. Both are available at checkout with no price difference."
      }
    },
    {
      "@type": "Question",
      "name": "Are you a certified veteran-owned or woman-owned business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ESSCO Aircraft is both veteran-owned and woman-owned. We have served the aviation community since 1955 — 70 years of continuous operation."
      }
    },
    {
      "@type": "Question",
      "name": "How are our uploaded files handled?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uploaded files are stored in private encrypted cloud storage with presigned download links that expire after 7 days. Files are never publicly accessible."
      }
    }
  ]
};

export default function CorporateFlightDepartments() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    document.title = 'Corporate Flight Department Printing | Part 135 Operations Manuals | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation. Veteran-owned, woman-owned. No minimum order. Upload your PDF for instant pricing.' },
      { property: 'og:title', content: 'Corporate Flight Department Printing | ESSCO Aircraft' },
      { property: 'og:description', content: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation. Veteran-owned, woman-owned. No minimum order. Upload your PDF for instant pricing.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/corporate-flight-hero.jpg' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/corporate-flight-departments' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Corporate Flight Department Printing | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation. Veteran-owned, woman-owned. No minimum order. Upload your PDF for instant pricing.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/corporate-flight-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/corporate-flight-departments');
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
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Corporate Flight Departments</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/corporate-flight-hero.jpg)' }}></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Veteran-Owned • Woman-Owned • Since 1955</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Your Ops Manuals.<br />Printed Tomorrow.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                No purchase orders. No vendor setup. No two-week wait. Upload your Part 135 manual PDF, pick your binding, and check out in five minutes. Most orders ship next business day.
              </p>
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your Manual — Instant Price
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
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-blue-400" />Private Encrypted File Storage</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== THE PROBLEM ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Your Current Reprint Process Is Broken
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              Your FAA examiner just approved a GOM revision. Now you need 12 copies for the fleet by Friday. Your current vendor wants a purchase order, a quote approval, and a 10-business-day lead time. You end up at FedEx Office explaining what 3-ring punched means to a college student.
            </p>
            <p className="text-lg text-white font-semibold">
              There is a better way.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== THE SOLUTION — HOW IT WORKS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800/50 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Upload. Configure. Ship.
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">
              Our calculator scans every page of your PDF, detects color vs B&W automatically, and gives you an exact price in seconds. No phone calls. No quote requests. No sales reps.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: <Upload className="w-8 h-8 text-amber-400" />, title: 'Upload PDF', desc: 'Drop your GOM, MEL, training manual — any PDF up to 104MB. Our system handles it.' },
                { step: '02', icon: <Printer className="w-8 h-8 text-amber-400" />, title: 'Auto-Detect', desc: 'Every page scanned. Color and B&W priced separately. No guessing, no overcharging.' },
                { step: '03', icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Pick Binding', desc: '3-ring punched for revisable manuals. Coil for cockpit. Tabs and covers available.' },
                { step: '04', icon: <ArrowRight className="w-8 h-8 text-amber-400" />, title: 'Ships Tomorrow', desc: 'Secure Shopify checkout. Credit card or PayPal. Most orders ship next business day.' },
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

      {/* ==================== WHAT WE PRINT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Every Document Your Flight Department Needs
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">
              If it's a PDF, we print it. Same per-page price whether you order one copy or fifty.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Briefcase className="w-8 h-8 text-amber-400" />, title: 'General Operations Manuals', desc: 'GOM documents meeting 14 CFR 135.23. 3-ring punched for interim changes or coil bound for reference copies.' },
                { icon: <ClipboardCheck className="w-8 h-8 text-amber-400" />, title: 'MEL & Compliance Docs', desc: 'Minimum Equipment Lists, compliance statements, AAIP programs. Tab-divided with clear section breaks.' },
                { icon: <Users className="w-8 h-8 text-amber-400" />, title: 'Crew Training Manuals', desc: 'Recurrent training, CRM materials, initial training programs. Print one copy for review or a full crew set.' },
                { icon: <Globe className="w-8 h-8 text-amber-400" />, title: 'International Ops & RVSM', desc: 'Flight operations manuals, IOMs, hazmat programs, SMS documentation for international operations.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'EFB Backup Copies', desc: 'Printed backup of your Electronic Flight Bag manuals per 14 CFR 135.21. Ready when the iPad is not.' },
                { icon: <Building2 className="w-8 h-8 text-amber-400" />, title: 'FBO & Charter Ops', desc: 'Standard operating procedures, customer service manuals, safety documentation. Any PDF, any binding, any quantity.' },
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

      {/* ==================== WHY ESSCO ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800/50 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Why Flight Departments Switch to ESSCO
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Zero Procurement Friction', desc: 'No vendor applications. No net-30 setup. No purchase orders under micro-purchase threshold. Your chief pilot can order directly with a company card.' },
                { title: 'Revision-Day Turnaround', desc: 'FAA approves your update Tuesday morning? Upload the new PDF Tuesday afternoon, it ships Wednesday. Two minutes to reorder — same price, same quality, new content.' },
                { title: 'Veteran-Owned & Woman-Owned', desc: 'ESSCO Aircraft has operated continuously since 1955. If your organization tracks supplier diversity, we check both boxes.' },
                { title: 'Confidential File Handling', desc: 'Your ops manuals are stored in private encrypted cloud storage. Download links expire in 7 days. 70 years of handling sensitive aviation documentation.' },
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
              Commercial-Grade Equipment
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Standard manuals print on our <strong className="text-white">Xerox Versant 4100</strong> production press — the same machine commercial print shops use. Automatic color detection means you only pay color rates on pages that actually have color. Oversized schematics and aircraft diagrams print on our <strong className="text-white">KIP 860</strong> at up to 36 inches wide.
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
              Stop Waiting on Your Print Vendor
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Upload your PDF, choose your binding, and checkout in under five minutes. Your manuals ship tomorrow.
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
                  <li><a href="/corporate-flight-departments" className="text-amber-400">Corporate Flight Departments</a></li>
                  <li><a href="/military-document-printing" className="hover:text-amber-400 transition-colors">Military Document Printing</a></li>
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

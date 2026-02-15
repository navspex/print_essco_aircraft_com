import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Upload, ArrowRight, Building2, Briefcase, Globe, ClipboardCheck, Lock, Users } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Corporate Flight Department Printing Services",
  "description": "Print Part 135 operations manuals, GOM documents, MEL binders, AAIP programs, and compliance documentation for corporate flight departments. No minimum order. Upload your PDF for instant pricing.",
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
      "name": "Can you print FAA-approved Part 135 operations manuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We print General Operations Manuals, compliance statements, training manuals, MEL binders, and all Part 135 required documentation. You provide the FAA-approved PDF and we produce exact reproductions on our Xerox Versant 4100 press. We handle documents from single-pilot certificates through full Part 135 air carrier operations."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle revision cycles for operations manuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your revised PDF to our calculator and reorder in about two minutes. No phone calls, no quote requests, no waiting for a sales rep. When the FAA approves your manual revision, you can have updated copies printed and shipped the same day. Most flight departments reorder after each annual revision or when regulatory changes require updates."
      }
    },
    {
      "@type": "Question",
      "name": "What binding works best for operations manuals that need page updates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3-ring punched binding is the standard for Part 135 manuals that require interim page changes between full revisions. This lets your team insert updated pages without reprinting the entire manual. For reference copies that won't be revised, coil binding provides a more durable option that lays flat on the flight deck."
      }
    },
    {
      "@type": "Question",
      "name": "Can you print large-format documents like aircraft diagrams and schematics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our KIP 860 handles technical documents up to 36 inches wide on bond and film paper. This covers aircraft system diagrams, wiring schematics, and maintenance planning documents. For standard-size manuals, our Xerox Versant 4100 handles everything up to 13x19 inches with automatic color detection."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer confidential handling for proprietary flight department documents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your uploaded files are stored in a private, encrypted cloud storage bucket. Files are not publicly accessible and download links expire after 7 days. We have been handling sensitive aviation documentation for 70 years and understand the confidentiality requirements of corporate flight operations."
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

    // SEO: Set document title and meta tags
    document.title = 'Corporate Flight Department Printing | Part 135 Operations Manuals | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation for corporate flight departments. No minimum order. Upload your PDF for instant pricing.' },
      { property: 'og:title', content: 'Corporate Flight Department Printing | ESSCO Aircraft' },
      { property: 'og:description', content: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation for corporate flight departments. No minimum order. Upload your PDF for instant pricing.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/corporate-flight-hero.jpg' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/corporate-flight-departments' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Corporate Flight Department Printing | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'Print Part 135 operations manuals, GOM documents, MEL binders, and compliance documentation for corporate flight departments. No minimum order. Upload your PDF for instant pricing.' },
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

    // Canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/corporate-flight-departments');
    document.head.appendChild(canonicalLink);

    // Inject schema
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
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Corporate Flight Departments</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/corporate-flight-hero.jpg)' }}></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Since 1955 — 250,000+ Orders Completed</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Corporate Flight Department<br />Document Printing
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Print Part 135 operations manuals, GOM documents, MEL binders, AAIP programs, and all compliance documentation. No minimum order, no setup fees. Upload your PDF and get instant pricing.
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
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" />No Minimum Order</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" />Same-Day Production Available</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-blue-400" />Private Encrypted Storage</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHAT WE PRINT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
              What We Print for Flight Departments
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">
              From Part 135 certification through daily operations — every document your flight department needs, printed on professional equipment and shipped next day.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Briefcase className="w-8 h-8 text-amber-400" />, title: 'General Operations Manuals', desc: 'GOM documents meeting 14 CFR 135.23 requirements. 3-ring punched for interim page changes or coil bound for reference copies.' },
                { icon: <ClipboardCheck className="w-8 h-8 text-amber-400" />, title: 'Compliance Statements', desc: 'FAA compliance documentation addressing Parts 91, 119, and 135. Printed and bound to your specifications for POI submission.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'MEL & AAIP Binders', desc: 'Minimum Equipment Lists and Approved Aircraft Inspection Programs. Tab-divided with clear section breaks for quick reference.' },
                { icon: <Users className="w-8 h-8 text-amber-400" />, title: 'Training Manuals', desc: 'Crew training programs, recurrent training documentation, and CRM materials. Print one copy or fifty — same price per page.' },
                { icon: <Globe className="w-8 h-8 text-amber-400" />, title: 'International Ops Manuals', desc: 'Flight Operations Manuals for RVSM, ICAO compliance, and international procedures. IOMs with hazmat and SMS sections included.' },
                { icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Emergency Response Plans', desc: 'ERP documents, safety management system documentation, and hazardous materials training programs printed and ready for distribution.' },
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
              Why Flight Departments Choose ESSCO
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'No Vendor Approval Process', desc: 'Upload your PDF, get instant pricing, and order immediately. No purchase orders, no net-30 applications, no sales calls. Your department manager can order directly.' },
                { title: 'Revision-Ready Workflow', desc: 'When the FAA approves your manual update, upload the new PDF and reorder in two minutes. No re-quoting, no setup fees. Same Xerox Versant 4100 press quality every time.' },
                { title: 'Confidential File Handling', desc: 'Your operations manuals are stored in private encrypted cloud storage. Download links expire after 7 days. We have handled sensitive aviation documentation since 1955.' },
                { title: 'Any Quantity, Same Price', desc: 'Print one manual for your POI review or twenty for the entire flight crew. No volume minimums, no tiered pricing games. The per-page rate is the per-page rate.' },
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

      {/* ==================== HOW IT WORKS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center uppercase tracking-wider mb-12" style={{ fontFamily: "'Oswald', sans-serif" }}>
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: <Upload className="w-8 h-8 text-amber-400" />, title: 'Upload PDF', desc: 'Drop your operations manual PDF into our calculator. We handle files up to 104MB — even your largest TMs.' },
                { step: '02', icon: <Printer className="w-8 h-8 text-amber-400" />, title: 'Auto-Detect', desc: 'Our system scans every page, detects color vs B&W, and calculates your exact price. No surprises.' },
                { step: '03', icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Choose Options', desc: 'Select binding, covers, and tabs. 3-ring punched for revisable manuals or coil for permanent reference.' },
                { step: '04', icon: <ArrowRight className="w-8 h-8 text-amber-400" />, title: 'We Ship', desc: 'Secure checkout through Shopify. Most orders ship next business day via USPS or UPS.' },
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

      {/* ==================== EQUIPMENT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800/50 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-8" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Professional Equipment
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your operations manuals are printed on a <strong className="text-white">Xerox Versant 4100</strong> production press — the same equipment used by commercial print shops. Automatic color detection prices each page accurately. For oversized schematics and aircraft diagrams, our <strong className="text-white">KIP 860</strong> handles documents up to 36 inches wide on bond and film paper.
            </p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Get Your Instant Quote
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
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
              Ready to Print Your Operations Manuals?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Upload your PDF, choose your binding, and checkout in under five minutes. Most orders ship next business day.
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

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ClipboardList, ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Upload, ArrowRight, Droplets, AlertTriangle, Plane } from 'lucide-react';

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Aviation Checklist Printing",
  "description": "Custom aviation checklist printing including emergency procedures, normal operations, and cockpit quick-reference cards. Laminated and bound options available.",
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
  "serviceType": "Aviation Checklist Printing",
  "image": "https://print.esscoaircraft.com/images/checklist-hero.jpg"
};

export default function ChecklistPrinting() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: OG and Twitter meta tags for social sharing
    const metaTags = [
      { name: 'description', content: 'Custom aviation checklist printing. Emergency procedures, normal ops, quick-reference cards. Laminated, coil-bound, cockpit-ready. Upload your PDF for instant pricing.' },
      { property: 'og:title', content: 'Aviation Checklist Printing | Custom Cockpit Checklists' },
      { property: 'og:description', content: 'Custom aviation checklist printing. Emergency procedures, normal ops, quick-reference cards. Laminated, coil-bound, cockpit-ready. Upload your PDF for instant pricing.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/checklist-hero.jpg' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/checklist-printing' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aviation Checklist Printing | Custom Cockpit Checklists' },
      { name: 'twitter:description', content: 'Custom aviation checklist printing. Emergency procedures, normal ops, quick-reference cards. Laminated, coil-bound, cockpit-ready. Upload your PDF for instant pricing.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/checklist-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/checklist-printing');
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
      `}</style>

      {/* ==================== HERO ==================== */}
      <ScrollReveal>
        <div className="pt-2 pb-1 px-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Checklist Printing</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/checklist-hero.jpg)' }}></div>
          <div className="absolute inset-0 bg-slate-900/70 z-[1]"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-700/85 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Professional Aviation Checklist Printing</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Custom Cockpit<br />Checklists
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Emergency procedures, normal operations, and quick-reference cards printed on durable stock with optional lamination. Built to survive the cockpit environment.
              </p>
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your Checklist PDF
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST BAR ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-400" />Lamination Available</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" />Same-Day Production</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" />Cockpit-Ready Durability</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CHECKLIST TYPES ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>What Types of Checklists Do We Print?</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Whether you're a Part 91 weekend flyer or running a 135 charter operation, we print checklists that match your exact procedures and aircraft configuration.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <AlertTriangle className="w-8 h-8 text-red-400" />, title: 'Emergency Procedures', desc: 'Engine failure, fire, electrical failure, forced landing checklists. High-visibility formatting on durable card stock. The pages you need to find fast.' },
                { icon: <ClipboardList className="w-8 h-8 text-amber-400" />, title: 'Normal Operations', desc: 'Preflight, engine start, taxi, takeoff, cruise, descent, approach, and shutdown checklists. Complete flow from ramp to ramp.' },
                { icon: <Plane className="w-8 h-8 text-amber-400" />, title: 'Quick Reference Cards', desc: 'Single-sheet or folded reference cards for V-speeds, frequencies, weight & balance limits, and performance data. Sized for the kneeboard or yoke clip.' },
                { icon: <ClipboardList className="w-8 h-8 text-amber-400" />, title: 'Abnormal Procedures', desc: 'Gear malfunctions, alternator failure, vacuum system loss, and other non-normal checklists. Tabbed for instant access during workload spikes.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'Part 135/121 Crew Checklists', desc: 'Multi-crew challenge-and-response checklists formatted to your company SOP. Bulk printing for fleet standardization across your operation.' },
                { icon: <Layers className="w-8 h-8 text-amber-400" />, title: 'Multi-Page Checklist Books', desc: 'Full checklist books with tabbed sections, coil-bound for cockpit use. Lays flat on the glareshield or yoke. Same-size as your original manufacturer checklist.' },
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

      {/* ==================== DURABILITY FEATURES ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/checklist-cockpit.jpg)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-800/85"></div>
          <div className="relative z-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Built for the Cockpit Environment</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">Checklists take abuse. They get crammed into seat pockets, splashed with coffee, and thumbed through thousands of times. We print them to last.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Heavy Card Stock', detail: 'Printed on thick, rigid card stock that doesn\'t wilt or curl. Holds its shape after thousands of uses in the cockpit.' },
                { label: 'Gloss Lamination Option', detail: 'UV-resistant laminated coating protects against moisture, oils, fingerprints, and UV fading. Wipes clean with a rag.' },
                { label: 'Coil Binding for Multi-Page', detail: 'Coil-bound checklist books lay flat on the glareshield and flip 360° on a yoke clip. Won\'t lose pages like spiral notebooks.' },
                { label: 'High-Contrast Printing', detail: 'Crisp black text on white backgrounds for readability in all lighting conditions — bright sun, dim cockpit lights, or flashlight at night.' },
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
              <p className="text-slate-300 text-sm mb-2">Need a full aircraft manual printed too?</p>
              <a href="/aviation-manual-printing" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                <FileText size={16} /> Aviation Manual Printing Services →
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>How to Order Custom Checklists</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Same simple process as all our print services.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Upload Your PDF', desc: 'Use our calculator to upload your checklist file. Single-page cards, multi-page books — our system handles any format and auto-detects color vs. black & white.' },
                { step: '2', title: 'Select Options', desc: 'Choose your paper weight, lamination, binding type (for multi-page), and quantity. Need different options for different sections? Just let us know in the order notes.' },
                { step: '3', title: 'We Print & Ship', desc: 'Your checklists enter production immediately. Most orders ship within 1-2 business days in protective packaging.' },
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
              <p className="text-slate-500 text-sm mt-3">Need help with file setup? See our <a href="/file-preparation-guide" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">File Preparation Guide</a>.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Checklist Printing FAQ</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: 'Can you laminate individual checklist cards?', a: 'Yes. Single cards and folded reference sheets can be gloss-laminated on both sides. This is our most popular option for emergency procedure cards that need to survive years of cockpit use.' },
                { q: 'What size are your checklist cards?', a: 'We print any size you send us. Common aviation checklist sizes are 5.5" × 8.5" (half-letter), 8.5" × 11" (full letter), and custom kneeboard sizes. If your PDF is a specific dimension, we match it.' },
                { q: 'Can you print color-coded checklists?', a: 'Absolutely. Many operators use red for emergency, yellow for caution, and green for normal procedures. Our color printing reproduces your exact color scheme. You only pay color pricing for pages that actually contain color.' },
                { q: 'Do you offer bulk pricing for flight schools?', a: 'Yes. Flight schools ordering standardized checklist sets for their fleet get volume pricing. Upload once, order as many copies as you need. See our flight school materials page for more details.' },
                { q: 'Can you match my existing manufacturer checklist format?', a: 'If you have a PDF of your current checklist, we replicate it exactly — same dimensions, same layout, same tab positions. We specialize in faithful reproductions of aviation documents.' },
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
                <p className="text-slate-400 text-sm">POH, AFM, maintenance manuals, and STC supplements professionally printed and bound.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/large-format-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Printer className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Large Format Printing</h3>
                <p className="text-slate-400 text-sm">Schematics, wiring diagrams, and training room visuals at full readable scale.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/flight-school-materials" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Layers className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Flight School Materials</h3>
                <p className="text-slate-400 text-sm">Bulk student kits, training syllabi, and standardized checklist sets for your fleet.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Print Your Checklists?</h2>
            <p className="text-lg text-slate-300 mb-8">Upload your PDF and get an instant price. No account required, no minimums.</p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Upload PDF & Get Quote
            </a>
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
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Print Services</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-amber-400 transition-colors">Print-On-Demand Calculator</a></li>
                  <li><a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a></li>
                  <li><a href="/checklist-printing" className="text-amber-400">Checklist Printing</a></li>
                  <li><a href="/large-format-printing" className="hover:text-amber-400 transition-colors">Large Format Printing</a></li>
                  <li><a href="/posters" className="hover:text-amber-400 transition-colors">Poster Printing</a></li>
                  <li><a href="/binding-options" className="hover:text-amber-400 transition-colors">Binding Options</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/file-preparation-guide" className="hover:text-amber-400 transition-colors">File Preparation Guide</a></li>
                  <li><a href="/document-preservation" className="hover:text-amber-400 transition-colors">Document Preservation</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/faqs" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                  <li><a href="https://www.esscoaircraft.com/pages/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">About Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Industries</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/flight-school-materials" className="hover:text-amber-400 transition-colors">Flight Schools</a></li>
                  <li><a href="/corporate-flight-departments" className="hover:text-amber-400 transition-colors">Corporate Flight Departments</a></li>
                  <li><a href="/aircraft-restoration" className="hover:text-amber-400 transition-colors">Aircraft Restoration</a></li>
                  <li><a href="/military-aviation" className="hover:text-amber-400 transition-colors">Military Aviation</a></li>
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

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}


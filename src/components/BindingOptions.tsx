import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, FileText, Printer, Upload, ArrowRight, BookOpen, Archive, RefreshCw } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Aviation Manual Binding Options",
  "description": "Compare binding options for aviation manuals — coil, comb, 3-ring, perfect binding, and saddle stitch. Expert recommendations for cockpit use, shelf storage, and field reference.",
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
  "serviceType": "Aviation Manual Binding",
  "image": "https://print.esscoaircraft.com/images/binding-options-hero.jpg"
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best binding for a cockpit manual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coil binding is the most popular choice for cockpit manuals. It lays completely flat, flips 360 degrees so you can fold it back on itself, and withstands constant handling. Pilots prefer coil binding because it stays open to the page you need without holding it down."
      }
    },
    {
      "@type": "Question",
      "name": "Can you match the binding on my original manufacturer manual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We replicate original manufacturer binding formats including perfect binding, comb binding, and 3-ring punched configurations. Upload your PDF and tell us which binding style your original uses, and we will match it. Most Cessna and Piper POHs were originally perfect-bound or 3-ring punched."
      }
    },
    {
      "@type": "Question",
      "name": "What binding works best if I need to add or remove pages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three-ring punched binding is ideal when you need to insert revision pages, add supplements, or remove outdated sections. This is the standard format for manuals that receive regular updates like maintenance manuals and operations specifications."
      }
    },
    {
      "@type": "Question",
      "name": "Is saddle stitch strong enough for aviation manuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saddle stitch works well for thinner documents under 60 pages such as emergency procedure checklists, weight and balance supplements, and STC documentation. It is not recommended for full-length POHs or maintenance manuals that see heavy cockpit use."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer laminated covers with coil binding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer laminated front and back covers with coil binding for maximum durability. Laminated covers protect against oil, moisture, and constant handling in the cockpit and shop environment. This is our most popular upgrade for working aviation manuals."
      }
    }
  ]
};

export default function BindingOptions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: Set document title and meta tags
    document.title = 'Aviation Manual Binding Options | Coil, Comb, Perfect Binding | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Compare binding options for aviation manuals — coil, comb, 3-ring, perfect binding, and saddle stitch. See which binding works best for cockpit use, shelf storage, and field reference.' },
      { property: 'og:title', content: 'Aviation Manual Binding Options | ESSCO Aircraft' },
      { property: 'og:description', content: 'Compare binding options for aviation manuals — coil, comb, 3-ring, perfect binding, and saddle stitch. See which binding works best for cockpit use, shelf storage, and field reference.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/binding-options-hero.jpg' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/binding-options' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aviation Manual Binding Options | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'Compare binding options for aviation manuals — coil, comb, 3-ring, perfect binding, and saddle stitch. See which binding works best for cockpit use, shelf storage, and field reference.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/binding-options-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/binding-options');
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
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <ScrollReveal>
        <div className="pt-2 pb-1 px-4 max-w-7xl mx-auto">
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / <a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a> / Binding Options</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/binding-options-hero.jpg)' }}></div>
          <div className="absolute inset-0 bg-slate-900/70 z-[1]"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-700/85 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Since 1955 — 250,000+ Orders Completed</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Best Binding Options for<br />Aviation Manuals
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                The right binding makes the difference between a manual that works in the cockpit and one that falls apart. Here's how to choose the best binding for your aviation documents.
              </p>
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your PDF — Choose Binding at Checkout
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

      {/* ==================== DECISION MATRIX ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Which Binding Do You Need?</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Start with how your manual will be used. The best binding depends on where it lives and how often it's handled.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: <BookOpen className="w-8 h-8 text-amber-400" />, scenario: 'If your manual lives in the cockpit →', recommendation: 'Coil Binding', detail: 'Lays completely flat, flips 360°, survives constant handling. The most popular choice for POHs and cockpit reference manuals. Stays open to the page you need without holding it down.' },
                { icon: <Archive className="w-8 h-8 text-amber-400" />, scenario: 'If it sits on a shelf or in a library →', recommendation: 'Perfect Binding', detail: 'Clean, professional spine with printed title. Looks like a published book. Ideal for reference manuals, training libraries, and any manual that\'s stored more than it\'s handled.' },
                { icon: <RefreshCw className="w-8 h-8 text-amber-400" />, scenario: 'If you need to add or remove pages →', recommendation: '3-Ring Punched', detail: 'The only binding that lets you insert revision pages, add supplements, or remove outdated sections without reprinting the whole manual. Standard for maintenance manuals and ops specs.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, scenario: 'If it\'s under 60 pages →', recommendation: 'Saddle Stitch', detail: 'Staple-bound like a booklet. Clean, lightweight, and cost-effective for thin documents like emergency procedure cards, weight & balance supplements, and STC documentation.' },
              ].map((item) => (
                <div key={item.recommendation} className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <div className="mb-4">{item.icon}</div>
                  <p className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-1">{item.scenario}</p>
                  <h3 className="text-white font-bold text-xl mb-2">{item.recommendation}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== COMPARISON TABLE ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/binding-options-hero.jpg)' }}></div>
          <div className="absolute inset-0 z-10 bg-slate-800/90"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Binding Comparison for Aviation Use</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">Every binding type has trade-offs. Here's what matters for aviation manuals specifically.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="py-4 px-4 text-amber-400 font-bold uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>Feature</th>
                    <th className="py-4 px-4 text-amber-400 font-bold uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>Coil</th>
                    <th className="py-4 px-4 text-amber-400 font-bold uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>Comb</th>
                    <th className="py-4 px-4 text-amber-400 font-bold uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>3-Ring</th>
                    <th className="py-4 px-4 text-amber-400 font-bold uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>Perfect</th>
                    <th className="py-4 px-4 text-amber-400 font-bold uppercase tracking-wide text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>Saddle Stitch</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Lays flat on yoke/desk', coil: '✓', comb: '✓', ring: '✓', perfect: '—', saddle: '—' },
                    { feature: 'Flips 360°', coil: '✓', comb: '—', ring: '✓', perfect: '—', saddle: '—' },
                    { feature: 'Pages removable/replaceable', coil: '—', comb: '✓', ring: '✓', perfect: '—', saddle: '—' },
                    { feature: 'Printed spine title', coil: '—', comb: '—', ring: '—', perfect: '✓', saddle: '—' },
                    { feature: 'Best for 60+ pages', coil: '✓', comb: '✓', ring: '✓', perfect: '✓', saddle: '—' },
                    { feature: 'Best for under 60 pages', coil: '✓', comb: '—', ring: '—', perfect: '—', saddle: '✓' },
                    { feature: 'Cockpit durability', coil: '★★★', comb: '★★', ring: '★★★', perfect: '★', saddle: '★' },
                    { feature: 'Shelf presentation', coil: '★', comb: '★', ring: '★★', perfect: '★★★', saddle: '★' },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-slate-300 text-center">{row.coil}</td>
                      <td className="py-3 px-4 text-slate-300 text-center">{row.comb}</td>
                      <td className="py-3 px-4 text-slate-300 text-center">{row.ring}</td>
                      <td className="py-3 px-4 text-slate-300 text-center">{row.perfect}</td>
                      <td className="py-3 px-4 text-slate-300 text-center">{row.saddle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== MATCH YOUR MANUAL ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Which Binding Matches Your Original Manual?</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Most pilots want their reprint to match the original. Here's what manufacturers typically used.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Cessna POH / Information Manuals', detail: 'Most Cessna POHs from the 1970s onward were originally perfect-bound or 3-ring punched. If you want a cockpit-friendly upgrade, coil binding is the most popular replacement — it lays flat and survives years of use.' },
                { label: 'Piper POH / Owner\'s Handbooks', detail: 'Piper typically used perfect binding or 3-ring formats. Many owners switch to coil binding for daily cockpit use because the original perfect binding tends to crack after years of opening to the same pages.' },
                { label: 'Maintenance Manuals & IPC', detail: 'Maintenance manuals were almost always designed for 3-ring binders to accommodate revision pages. We punch for standard 3-ring binders and can match the original hole pattern and margin spacing.' },
                { label: 'STC Supplements & W&B', detail: 'These shorter documents work well with saddle stitch (under 60 pages) or comb binding (if they need to lay flat for reference). Many mechanics prefer them separate from the main manual for quick access.' },
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
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== HOW IT WORKS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>How Our Binding Process Works</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Three steps from your PDF to a professionally bound aviation manual.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Upload Your PDF', desc: 'Use our Print-On-Demand Calculator to upload your manual. Our system automatically detects color vs. black & white pages and counts every page for instant, accurate pricing.' },
                { step: '2', title: 'Select Your Binding', desc: 'Choose coil, comb, 3-ring punched, perfect binding, or saddle stitch at checkout. Not sure? Our most popular option for cockpit manuals is coil binding with laminated covers.' },
                { step: '3', title: 'We Print & Bind', desc: 'Your manual is printed on our Xerox Versant 4100 press and professionally bound in-house. Most orders ship within 1-2 business days. Quality-checked before it leaves our shop.' },
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

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: 'What is the best binding for a cockpit manual?', a: 'Coil binding is the most popular choice for cockpit manuals. It lays completely flat, flips 360 degrees so you can fold it back on itself, and withstands constant handling. Pilots prefer coil binding because it stays open to the page you need without holding it down.' },
                { q: 'Can you match the binding on my original manufacturer manual?', a: 'Yes. We replicate original manufacturer binding formats including perfect binding, comb binding, and 3-ring punched configurations. Upload your PDF and tell us which binding style your original uses, and we\'ll match it.' },
                { q: 'What binding works best if I need to add or remove pages?', a: 'Three-ring punched binding is ideal when you need to insert revision pages, add supplements, or remove outdated sections. This is the standard format for manuals that receive regular updates like maintenance manuals and operations specifications.' },
                { q: 'Is saddle stitch strong enough for aviation manuals?', a: 'Saddle stitch works well for thinner documents under 60 pages — emergency procedure checklists, weight and balance supplements, and STC documentation. It is not recommended for full-length POHs or maintenance manuals that see heavy cockpit use.' },
                { q: 'Do you offer laminated covers with coil binding?', a: 'Yes. We offer laminated front and back covers with coil binding for maximum durability. Laminated covers protect against oil, moisture, and constant handling in the cockpit and shop environment. This is our most popular upgrade for working aviation manuals.' },
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
                <BookOpen className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Aviation Manual Printing</h3>
                <p className="text-slate-400 text-sm">POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/checklist-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <FileText className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Checklist Printing</h3>
                <p className="text-slate-400 text-sm">Custom cockpit checklists, emergency procedures, and laminated quick-reference cards.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/file-preparation-guide" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Upload className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">File Preparation Guide</h3>
                <p className="text-slate-400 text-sm">Tips for preparing your aviation PDF for the best print results.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Read guide <ArrowRight size={14} /></span>
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FINAL CTA ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800 border-t border-slate-700 transition-all duration-500 hover:bg-slate-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Print & Bind Your Manual?</h2>
            <p className="text-lg text-slate-300 mb-8">Upload your PDF and choose your binding at checkout. No account required, no minimums, no hassle.</p>
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
                <p className="text-sm leading-relaxed mt-3">250,000+ orders completed &middot; 180,000-title archive</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Printing</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-amber-400 transition-colors">Print-On-Demand Calculator</a></li>
                  <li><a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a></li>
                  <li><a href="/checklist-printing" className="hover:text-amber-400 transition-colors">Checklist Printing</a></li>
                  <li><a href="/large-format-printing" className="hover:text-amber-400 transition-colors">Large Format Printing</a></li>
                  <li><a href="/posters" className="hover:text-amber-400 transition-colors">Poster Printing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/binding-options" className="text-amber-400">Binding Options</a></li>
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

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

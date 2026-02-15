import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Upload, ArrowRight, BookOpen, RefreshCw, Package, GraduationCap, ClipboardList } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Flight School Printing Services",
  "description": "Print flight training materials, ground school packets, syllabi, and student pilot kits. No minimum order. Upload your PDF for instant pricing. Part 141 and Part 61 programs.",
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
  "serviceType": "Flight Training Materials Printing",
  "image": "https://print.esscoaircraft.com/images/flight-school-hero.jpg"
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you offer volume discounts for flight schools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our per-page pricing is the same whether you order 1 copy or 100 copies. There are no minimum order requirements and no setup fees. You get the same competitive rate on every order, which makes reordering simple when new students enroll or when materials are revised."
      }
    },
    {
      "@type": "Question",
      "name": "Can you print Part 141 approved training materials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We print syllabi, training course outlines, ground school materials, and stage check documents for Part 141 flight schools. You provide the approved PDF and we produce exact reproductions. We understand the formatting requirements for FAA-approved training programs."
      }
    },
    {
      "@type": "Question",
      "name": "How do we handle annual revisions to our training materials?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your updated PDF to our calculator and reorder in about two minutes. No phone calls, no quote requests, no waiting for a sales rep. Your new version prints on the same Xerox Versant 4100 press with the same quality as the original. Most schools reorder once or twice per year."
      }
    },
    {
      "@type": "Question",
      "name": "What binding works best for student training manuals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coil binding is the most popular choice for student manuals because it lays flat for note-taking and survives being carried in flight bags. For materials that need page updates between revisions, 3-ring punched binding lets students insert supplements without reprinting the entire manual."
      }
    },
    {
      "@type": "Question",
      "name": "Can you print custom student pilot kits with multiple documents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many flight schools order bundled kits that include a syllabus, ground school manual, emergency procedures card, and stage check reference guide. Each document can have different binding and formatting. Order them together or separately at the same per-page price."
      }
    }
  ]
};

export default function FlightSchoolMaterials() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: Set document title and meta tags
    document.title = 'Flight School Printing Services | Training Materials & Syllabi | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'Print flight training materials, ground school packets, syllabi, and student pilot kits. No minimum order. Upload your PDF for instant pricing. Part 141 and Part 61 programs.' },
      { property: 'og:title', content: 'Flight School Printing Services | ESSCO Aircraft' },
      { property: 'og:description', content: 'Print flight training materials, ground school packets, syllabi, and student pilot kits. No minimum order. Upload your PDF for instant pricing. Part 141 and Part 61 programs.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/flight-school-hero.jpg' },
      { property: 'og:image:width', content: '2000' },
      { property: 'og:image:height', content: '1125' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/flight-school-materials' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Flight School Printing Services | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'Print flight training materials, ground school packets, syllabi, and student pilot kits. No minimum order. Upload your PDF for instant pricing. Part 141 and Part 61 programs.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/flight-school-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/flight-school-materials');
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
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Flight School Materials</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/flight-school-hero.jpg)' }}></div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Since 1955 — 250,000+ Orders Completed</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Flight School & Training<br />Materials Printing
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Print syllabi, ground school packets, SOP manuals, and student pilot kits. No minimum order, no setup fees. Upload your PDF and get instant pricing for any quantity.
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
            <span className="flex items-center gap-2"><Printer className="w-4 h-4 text-blue-400" />Xerox Versant 4100 Press</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== WHAT WE PRINT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>What We Print for Flight Schools</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">From day-one student packets to advanced instrument training materials — if your school uses it, we print it.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <BookOpen className="w-8 h-8 text-amber-400" />, title: 'Training Syllabi', desc: 'Private, instrument, commercial, and multi-engine syllabi. Coil-bound for easy reference during ground and flight lessons. Any page count, any format.' },
                { icon: <GraduationCap className="w-8 h-8 text-amber-400" />, title: 'Ground School Packets', desc: 'Printed lecture materials, study guides, knowledge test prep packets, and reference handouts. Organized by lesson or by subject area.' },
                { icon: <ClipboardList className="w-8 h-8 text-amber-400" />, title: 'SOP Manuals', desc: 'Standard operating procedures for your fleet, callout guides, and crew resource management materials. Formatted for cockpit and classroom use.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'ACS Study Guides', desc: 'Airman Certification Standards study materials, oral exam prep guides, and practical test reference documents. Updated to current ACS editions.' },
                { icon: <CheckCircle className="w-8 h-8 text-amber-400" />, title: 'Stage Check Materials', desc: 'Pre-solo, pre-cross-country, and end-of-stage evaluation guides. Printed for examiner and student use with clear formatting.' },
                { icon: <ShieldCheck className="w-8 h-8 text-amber-400" />, title: 'Emergency Procedure Cards', desc: 'Laminated quick-reference cards for each aircraft type in your fleet. Cockpit-ready, oil-resistant, and sized to fit in the flight bag or yoke clip.' },
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

      {/* ==================== PART 141 / PART 61 ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/flight-school-hero.jpg)' }}></div>
                    <div className="relative z-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Part 141 and Part 61 Compliant Materials</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">We understand the difference between a Part 141 training course outline and a Part 61 school syllabus — and we know that getting the formatting right matters for your FAA inspections.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Part 141 Programs', detail: 'Training course outlines, approved syllabi, stage check documentation, and standardization materials. We reproduce your FAA-approved materials exactly as formatted, with binding options that make them easy to reference during ground school and flight training.' },
                { label: 'Part 61 Programs', detail: 'Custom syllabi, lesson plans, and training records. Part 61 schools have more flexibility in format — we help you produce professional materials that reflect the quality of your program, whether you train 10 students or 200.' },
                { label: 'Multi-Location Schools', detail: 'Operate at multiple airports? Order the same materials for every location with identical quality. Our instant pricing means your satellite campuses order directly without going through a central purchasing process.' },
                { label: 'Annual FAA Audits', detail: 'When your FSDO comes calling, your training materials need to match your approved program. We produce clean, professional documents that make a strong impression during inspections and audits.' },
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

      {/* ==================== REVISION CYCLES ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Annual Revision Cycles Made Easy</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Training materials change every year. Your printing process shouldn't slow you down.</p>
            </div>

            <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <RefreshCw className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Upload Updated PDF</h3>
                  <p className="text-slate-400 text-sm">Drop your revised file into our calculator. Same process every time — no account, no rep, no waiting.</p>
                </div>
                <div>
                  <Printer className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Reorder in 2 Minutes</h3>
                  <p className="text-slate-400 text-sm">Select quantity, binding, and checkout. No phone calls, no quote requests. Pricing is instant and transparent.</p>
                </div>
                <div>
                  <Package className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Same Quality, Every Time</h3>
                  <p className="text-slate-400 text-sm">Printed on our Xerox Versant 4100 press with professional binding. Your 50th reorder looks as sharp as your first.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== VOLUME PRICING ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Volume Orders, Same Per-Page Price</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">No minimum orders. No setup fees. Whether you need 1 copy for a new instructor or 50 copies for next semester's class, the per-page price is the same.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'No Minimum Order', desc: 'Need one copy of an updated syllabus? Order one. Need to test a new training packet with a single student? Print one. We don\'t force you into bulk quantities.' },
                { title: 'Transparent Pricing', desc: 'Our calculator shows exact pricing before you order. Color pages, black & white pages, binding, and quantity — everything is priced upfront with no hidden costs.' },
                { title: 'Same Price at Scale', desc: 'Ordering 10 copies of a training manual costs the same per page as ordering 1. This makes budgeting simple and lets each instructor order what they need when they need it.' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== STUDENT PILOT KITS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Student Pilot Kits</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Build a custom training package for your students. Each document printed and bound to your specifications.</p>
            </div>

            <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold text-xl mb-4">What Schools Typically Include</h3>
                  <div className="space-y-3">
                    {[
                      'Training syllabus (coil-bound)',
                      'Ground school reference manual',
                      'Emergency procedures quick-reference card (laminated)',
                      'Stage check evaluation guide',
                      'Aircraft-specific POH supplement',
                      'Local area procedures handbook',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-4">How It Works</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Upload each document separately to our calculator. Choose binding and options for each piece. Order any combination at any quantity — each document is priced independently at the same per-page rate.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Many schools order a semester's worth of kits at once. Others order per-student as enrollments come in. Either way, the pricing and quality are identical.
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Need branded covers or custom formatting? Our system handles any PDF layout. Design your materials in Word, InDesign, or any application that exports PDF, and we'll print them exactly as designed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: 'Do you offer volume discounts for flight schools?', a: 'Our per-page pricing is the same whether you order 1 copy or 100 copies. There are no minimum order requirements and no setup fees. You get the same competitive rate on every order, which makes reordering simple when new students enroll or when materials are revised.' },
                { q: 'Can you print Part 141 approved training materials?', a: 'Yes. We print syllabi, training course outlines, ground school materials, and stage check documents for Part 141 flight schools. You provide the approved PDF and we produce exact reproductions. We understand the formatting requirements for FAA-approved training programs.' },
                { q: 'How do we handle annual revisions to our training materials?', a: 'Upload your updated PDF to our calculator and reorder in about two minutes. No phone calls, no quote requests, no waiting for a sales rep. Your new version prints on the same Xerox Versant 4100 press with the same quality as the original.' },
                { q: 'What binding works best for student training manuals?', a: 'Coil binding is the most popular choice for student manuals because it lays flat for note-taking and survives being carried in flight bags. For materials that need page updates, 3-ring punched binding lets students insert supplements without reprinting.' },
                { q: 'Can you print custom student pilot kits with multiple documents?', a: 'Yes. Many flight schools order bundled kits that include a syllabus, ground school manual, emergency procedures card, and stage check reference guide. Each document can have different binding and formatting. Order them together or separately at the same per-page price.' },
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
              <a href="/binding-options" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Layers className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Binding Options</h3>
                <p className="text-slate-400 text-sm">Compare coil, comb, 3-ring, and perfect binding for your training materials.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Compare options <ArrowRight size={14} /></span>
              </a>
              <a href="/aviation-manual-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <BookOpen className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Aviation Manual Printing</h3>
                <p className="text-slate-400 text-sm">POH, AFM, and maintenance manuals for your school's aircraft fleet.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/file-preparation-guide" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Upload className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">File Preparation Guide</h3>
                <p className="text-slate-400 text-sm">Tips for preparing your training PDFs for the best print results.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Print Your Training Materials?</h2>
            <p className="text-lg text-slate-300 mb-8">Upload your PDF and get an instant price. No account required, no minimums, no setup fees.</p>
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
                  <li><a href="/binding-options" className="hover:text-amber-400 transition-colors">Binding Options</a></li>
                  <li><a href="/file-preparation-guide" className="hover:text-amber-400 transition-colors">File Preparation Guide</a></li>
                  <li><a href="/document-preservation" className="hover:text-amber-400 transition-colors">Document Preservation</a></li>
                  <li><a href="/flight-school-materials" className="text-amber-400">Flight School Materials</a></li>
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

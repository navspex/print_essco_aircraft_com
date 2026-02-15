import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Upload, ArrowRight, BookOpen, Archive, History, Search, Camera, ExternalLink } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Aviation Manual Reprints & Document Preservation",
  "description": "Preserve deteriorating aviation manuals with professional reprints. 180,000-title archive. Digital restoration, Xerox Versant printing. Upload your PDF or browse our catalog.",
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
  "serviceType": "Aviation Document Preservation and Reprinting",
  "image": "https://print.esscoaircraft.com/images/document-preservation-hero.jpg"
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you reprint a manual that is no longer in production?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ESSCO maintains an archive of over 180,000 aviation titles accumulated over 70 years. If we have your manual in our collection, we can produce a fresh reprint. If not, you can upload your own scan or PDF and we will reproduce it professionally with enhanced clarity on our Xerox Versant 4100 press."
      }
    },
    {
      "@type": "Question",
      "name": "Will the reprint look as good as the original?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In many cases, reprints look better than the original. Our Xerox Versant 4100 press produces sharper text and more consistent color than vintage offset printing. For scanned originals, our digital processing can correct fading, yellowing, and skewed pages to produce a cleaner result than the deteriorating source material."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get a reprint of a manual from your 180,000-title archive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Browse our full catalog at esscoaircraft.com where you can search by aircraft make, model, and document type. ESSCO reprints are also available through PilotMall.com. If you cannot find your specific title, contact us at 877-318-1555 and our team will search the archive for you."
      }
    },
    {
      "@type": "Question",
      "name": "Can you reprint a manual from my own scan or photocopy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Upload your PDF scan to our Print-On-Demand Calculator for instant pricing. We print from whatever file you provide. For best results, scan at 300 DPI or higher. Even lower-quality scans often produce readable reprints on our commercial press."
      }
    },
    {
      "@type": "Question",
      "name": "Do restoration shops and type clubs use your reprint services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Aircraft restoration shops, warbird operators, antique aircraft associations, and type clubs are among our most frequent customers for document preservation. Many need original-format documentation for airworthiness compliance, insurance requirements, and authenticity during restoration projects."
      }
    }
  ]
};

export default function DocumentPreservation() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: Set document title and meta tags
    document.title = 'Aviation Manual Reprints & Document Preservation | ESSCO Aircraft — Since 1955';
    const metaTags = [
      { name: 'description', content: 'Preserve deteriorating aviation manuals with professional reprints. 180,000-title archive. Digital restoration, Xerox Versant printing. Upload your PDF or browse our catalog.' },
      { property: 'og:title', content: 'Aviation Manual Reprints & Document Preservation | ESSCO Aircraft' },
      { property: 'og:description', content: 'Preserve deteriorating aviation manuals with professional reprints. 180,000-title archive. Digital restoration, Xerox Versant printing. Upload your PDF or browse our catalog.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/document-preservation-hero.jpg' },
      { property: 'og:image:width', content: '2000' },
      { property: 'og:image:height', content: '1125' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/document-preservation' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aviation Manual Reprints & Document Preservation | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'Preserve deteriorating aviation manuals with professional reprints. 180,000-title archive. Digital restoration, Xerox Versant printing. Upload your PDF or browse our catalog.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/document-preservation-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/document-preservation');
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
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / Document Preservation</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/document-preservation-hero.jpg)' }}></div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Since 1955 — 180,000+ Titles in Our Aviation Archive</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                Aviation Document<br />Preservation & Manual Reprints
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Your deteriorating POH deserves better than a fading photocopy. Professional reprints from ESSCO's 180,000-title archive or from your own PDF — often clearer than the original.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  <Upload className="w-5 h-5" /> Upload Your PDF for Custom Reprint
                </a>
                <a href="https://www.esscoaircraft.com" target="_blank" rel="noopener noreferrer" className="bg-slate-600 hover:bg-slate-500 text-white text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  <Search className="w-5 h-5" /> Browse Our 180K Archive
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== TRUST BAR ==================== */}
      <ScrollReveal delay={150}>
        <section className="bg-amber-500/10 border-y border-amber-500/30 py-4 transition-all duration-500 hover:bg-amber-500/15">
          <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Archive className="w-4 h-4 text-amber-400" />180,000+ Aviation Titles</span>
            <span className="flex items-center gap-2"><History className="w-4 h-4 text-green-500" />70 Years Collecting</span>
            <span className="flex items-center gap-2"><Printer className="w-4 h-4 text-blue-400" />Xerox Versant 4100 Press</span>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== THE PROBLEM ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Your 1968 POH Is Falling Apart</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">And that's not just an inconvenience — it's a safety issue.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
                <h3 className="text-white font-bold text-xl mb-4">The Reality of Aging Manuals</h3>
                <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                  <p>Pages yellow and become brittle. Binding cracks and pages fall out. Performance charts fade to the point where V-speeds and weight limits are unreadable. Emergency procedures — the pages you need most in a crisis — are often the most worn.</p>
                  <p>For vintage and antique aircraft, the original manufacturer may no longer exist. The manual is irreplaceable. And for aircraft that have changed hands multiple times, critical supplements and revision pages go missing over the decades.</p>
                  <p>A deteriorating manual isn't just hard to use — it can be a checkride failure, an insurance issue, and a genuine safety concern in the cockpit.</p>
                </div>
              </div>
              <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
                <h3 className="text-white font-bold text-xl mb-4">What Deterioration Looks Like</h3>
                <div className="space-y-3">
                  {[
                    'Yellowed pages with faded text and charts',
                    'Cracked binding with loose or missing pages',
                    'Performance charts too faded to read accurately',
                    'Coffee stains, oil marks, and cockpit wear',
                    'Missing supplements and revision pages',
                    'Photocopies of photocopies — each generation worse',
                    'Brittle paper that tears when you turn pages',
                    'Diagrams and schematics losing detail and contrast',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-slate-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== HOW WE RESTORE ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/document-preservation-hero.jpg)' }}></div>
                    <div className="relative z-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>How We Restore Aviation Manuals</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">From deteriorating original to professional reprint — often clearer than the day it was published.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', icon: <Camera className="w-8 h-8 text-amber-400" />, title: 'Scan or Upload', desc: 'Provide your original PDF, or send us the physical manual and we\'ll scan it at high resolution. We accept any file quality — even decades-old photocopies can produce usable reprints.' },
                { step: '2', icon: <Search className="w-8 h-8 text-amber-400" />, title: 'Digital Enhancement', desc: 'Our Xerox Versant 4100 press optimizes contrast, sharpens text, and corrects common scanning artifacts. Yellowed backgrounds become clean white. Faded text becomes crisp and readable.' },
                { step: '3', icon: <Printer className="w-8 h-8 text-amber-400" />, title: 'Print & Bind', desc: 'Your manual is printed on fresh, archival-quality paper and professionally bound. Choose coil, comb, 3-ring, or perfect binding — or match the original format. The result often looks better than the original.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/40">
                    <span className="text-slate-900 font-bold text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>{item.step}</span>
                  </div>
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== 180K ARCHIVE ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>180,000-Title Aviation Archive</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Seven decades of collecting have built one of the largest private aviation document archives in the country.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: '70 Years of Collecting', detail: 'Since 1955, ESSCO Aircraft has been accumulating aviation documents — POHs, AFMs, parts catalogs, service bulletins, and technical publications for virtually every general aviation aircraft ever produced. Many of these titles are no longer available from the original manufacturer.' },
                { label: 'Yankee Air Museum Connection', detail: 'ESSCO\'s archive includes materials preserved in partnership with aviation heritage organizations. These historical documents cover wartime aircraft, experimental types, and manufacturers that no longer exist — preserving aviation history one manual at a time.' },
                { label: 'PilotMall.com Partnership', detail: 'ESSCO reprints are available through PilotMall.com, one of the largest online aviation retailers. This partnership means our archive reaches pilots, mechanics, and restoration shops nationwide — social proof that our reprints meet professional aviation standards.' },
                { label: 'Browse the Full Catalog', detail: 'Search by aircraft make, model, and document type at esscoaircraft.com. If you can\'t find your specific title online, call us at 877-318-1555 — many titles are in the archive but haven\'t been digitized for the website yet.' },
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
              <a href="https://www.esscoaircraft.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                <ExternalLink size={16} /> Browse 180,000+ Titles at esscoaircraft.com →
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== CUSTOM REPRINTS ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Custom Reprints From Your PDF</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Already have a scan or PDF of your deteriorating manual? Upload it and we'll produce a professional reprint.</p>
            </div>

            <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Upload className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Upload Any PDF</h3>
                  <p className="text-slate-400 text-sm">Drop your file into our calculator. Any page count, any scan quality. Our system detects color vs. black & white automatically for accurate pricing.</p>
                </div>
                <div>
                  <Printer className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Professional Output</h3>
                  <p className="text-slate-400 text-sm">Printed on our Xerox Versant 4100 press — the same commercial equipment used for first-run production. Fresh paper, sharp text, consistent color reproduction.</p>
                </div>
                <div>
                  <Layers className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">Your Choice of Binding</h3>
                  <p className="text-slate-400 text-sm">Match the original binding format or upgrade to something more durable. Coil, comb, 3-ring, perfect binding, or saddle stitch — all available at checkout.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload Your Manual PDF
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== VINTAGE AIRCRAFT ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Vintage Aircraft Documentation</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Restoration shops, warbird operators, and type clubs trust ESSCO for documentation that meets airworthiness and authenticity standards.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <History className="w-8 h-8 text-amber-400" />, title: 'Warbird Documentation', desc: 'T-6 Texan, P-51 Mustang, B-25 Mitchell, and hundreds of other military-to-civilian types. Maintenance manuals, technical orders, and flight handbooks reproduced from archival sources.' },
                { icon: <Archive className="w-8 h-8 text-amber-400" />, title: 'Antique Aircraft Manuals', desc: 'Pre-war and early postwar aircraft from Stinson, Fairchild, Waco, Beech, and others. Many of these manuals exist only in private collections — our archive preserves them for the community.' },
                { icon: <BookOpen className="w-8 h-8 text-amber-400" />, title: 'Restoration Shop Support', desc: 'Complete documentation packages for restoration projects. POHs, parts catalogs, structural repair manuals, and service bulletins. Everything an A&P needs to return an aircraft to airworthy condition.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'Type Club Resources', desc: 'We work with Cessna, Piper, Beechcraft, Mooney, and other type clubs to provide members with accurate reproductions of original manufacturer documentation.' },
                { icon: <ShieldCheck className="w-8 h-8 text-amber-400" />, title: 'Insurance & Compliance', desc: 'Many insurance policies and annual inspections require current, legible documentation. A professional reprint satisfies these requirements where a faded photocopy may not.' },
                { icon: <Printer className="w-8 h-8 text-amber-400" />, title: 'Museum & Display Copies', desc: 'Clean, professionally bound copies for museum displays, static aircraft, and aviation heritage exhibits. We produce presentation-quality manuals that look as good as the aircraft they document.' },
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

      {/* ==================== FAQ ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {[
                { q: 'Can you reprint a manual that is no longer in production?', a: 'Yes. ESSCO maintains an archive of over 180,000 aviation titles accumulated over 70 years. If we have your manual in our collection, we can produce a fresh reprint. If not, you can upload your own scan or PDF and we\'ll reproduce it professionally with enhanced clarity.' },
                { q: 'Will the reprint look as good as the original?', a: 'In many cases, reprints look better than the original. Our Xerox Versant 4100 press produces sharper text and more consistent color than vintage offset printing. For scanned originals, our digital processing corrects fading, yellowing, and skewed pages.' },
                { q: 'How do I get a reprint from your 180,000-title archive?', a: 'Browse our full catalog at esscoaircraft.com where you can search by aircraft make, model, and document type. ESSCO reprints are also available through PilotMall.com. If you can\'t find your title, call 877-318-1555 and we\'ll search the archive.' },
                { q: 'Can you reprint from my own scan or photocopy?', a: 'Absolutely. Upload your PDF scan to our Print-On-Demand Calculator for instant pricing. We print from whatever file you provide. For best results, scan at 300 DPI or higher. Even lower-quality scans often produce readable reprints on our commercial press.' },
                { q: 'Do restoration shops and type clubs use your reprint services?', a: 'Yes. Aircraft restoration shops, warbird operators, antique aircraft associations, and type clubs are among our most frequent customers. Many need original-format documentation for airworthiness compliance, insurance requirements, and authenticity during restoration projects.' },
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
                <p className="text-slate-400 text-sm">Compare coil, comb, 3-ring, and perfect binding for your reprinted manual.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Compare options <ArrowRight size={14} /></span>
              </a>
              <a href="/aviation-manual-printing" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <BookOpen className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Aviation Manual Printing</h3>
                <p className="text-slate-400 text-sm">POH, AFM, maintenance manuals, and STC supplements. Upload your PDF for instant pricing.</p>
                <span className="text-amber-400 text-sm mt-2 inline-flex items-center gap-1">Learn more <ArrowRight size={14} /></span>
              </a>
              <a href="/file-preparation-guide" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Upload className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">File Preparation Guide</h3>
                <p className="text-slate-400 text-sm">Tips for scanning and preparing your aviation documents for the best reprint quality.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Preserve Your Aviation Manual Today</h2>
            <p className="text-lg text-slate-300 mb-8">Upload your PDF for a custom reprint, or browse our 180,000-title archive for an ESSCO reproduction.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Upload PDF & Get Quote
              </a>
              <a href="https://www.esscoaircraft.com" target="_blank" rel="noopener noreferrer" className="bg-slate-600 hover:bg-slate-500 text-white text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Search className="w-5 h-5" /> Browse Archive
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
                  <li><a href="/large-format-printing" className="hover:text-amber-400 transition-colors">Large Format Printing</a></li>
                  <li><a href="/posters" className="hover:text-amber-400 transition-colors">Poster Printing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/binding-options" className="hover:text-amber-400 transition-colors">Binding Options</a></li>
                  <li><a href="/file-preparation-guide" className="hover:text-amber-400 transition-colors">File Preparation Guide</a></li>
                  <li><a href="/document-preservation" className="text-amber-400">Document Preservation</a></li>
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

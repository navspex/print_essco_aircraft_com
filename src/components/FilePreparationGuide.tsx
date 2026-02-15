import { useState, useEffect } from 'react';
import Header from './Header';
import ScrollReveal from './ScrollReveal';
import { ChevronUp, ShieldCheck, Clock, Phone, Mail, CreditCard, Award, CheckCircle, Layers, FileText, Printer, Upload, ArrowRight, BookOpen, Archive, Monitor, Zap, AlertTriangle, Image, Settings } from 'lucide-react';

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "name": "Aviation PDF File Preparation Guide",
  "description": "How to prepare your aviation PDF for professional printing. Tips for scanned manuals, mixed page sizes, color detection, and resolution. Or just upload as-is — our system handles the rest.",
  "author": {
    "@type": "Organization",
    "name": "ESSCO Aircraft",
    "url": "https://print.esscoaircraft.com",
    "foundingDate": "1955"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ESSCO Aircraft",
    "url": "https://print.esscoaircraft.com"
  },
  "image": "https://print.esscoaircraft.com/images/file-prep-hero.jpg"
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to prepare my PDF before uploading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In most cases, no. Our system automatically detects color vs. black and white pages, counts every page, and calculates pricing instantly. You can upload your PDF as-is and get accurate results. The tips in this guide help optimize results for edge cases like scanned manuals or mixed page sizes."
      }
    },
    {
      "@type": "Question",
      "name": "What resolution should my PDF be for best print quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "300 DPI produces the best results for both text and images. However, our Xerox Versant 4100 press produces readable output from files as low as 150 DPI. If you are scanning a manual yourself, set your scanner to 300 DPI for optimal quality. Most digital PDFs from manufacturers are already at sufficient resolution."
      }
    },
    {
      "@type": "Question",
      "name": "Can you print a PDF with mixed page sizes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many aviation POHs include fold-out pages, charts at different sizes, or supplements in various formats. Our system handles mixed page sizes within a single PDF. All pages are printed at their native size by default, with options to scale to a uniform size at checkout if preferred."
      }
    },
    {
      "@type": "Question",
      "name": "What is the maximum file size I can upload?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our browser-based calculator accepts files up to 100MB, which covers the vast majority of aviation manuals including lengthy maintenance documents with many illustrations. If your file exceeds 100MB, contact us at 877-318-1555 and we can process it through our production system directly."
      }
    },
    {
      "@type": "Question",
      "name": "Does your system automatically detect color pages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our calculator scans every page in your PDF and automatically classifies each page as color or black and white. You only pay the color rate for pages that actually contain color. This is especially useful for aviation manuals where most pages are black and white with occasional color charts or diagrams."
      }
    }
  ]
};

export default function FilePreparationGuide() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    // SEO: Set document title and meta tags
    document.title = 'Aviation PDF File Preparation Guide | Print-Ready Tips | ESSCO Aircraft';
    const metaTags = [
      { name: 'description', content: 'How to prepare your aviation PDF for professional printing. Tips for scanned manuals, mixed page sizes, color detection, and resolution. Or just upload as-is — our system handles the rest.' },
      { property: 'og:title', content: 'Aviation PDF File Preparation Guide | ESSCO Aircraft' },
      { property: 'og:description', content: 'How to prepare your aviation PDF for professional printing. Tips for scanned manuals, mixed page sizes, color detection, and resolution. Or just upload as-is — our system handles the rest.' },
      { property: 'og:image', content: 'https://print.esscoaircraft.com/images/file-prep-hero.jpg' },
      { property: 'og:image:width', content: '2000' },
      { property: 'og:image:height', content: '1125' },
      { property: 'og:url', content: 'https://print.esscoaircraft.com/file-preparation-guide' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aviation PDF File Preparation Guide | ESSCO Aircraft' },
      { name: 'twitter:description', content: 'How to prepare your aviation PDF for professional printing. Tips for scanned manuals, mixed page sizes, color detection, and resolution. Or just upload as-is — our system handles the rest.' },
      { name: 'twitter:image', content: 'https://print.esscoaircraft.com/images/file-prep-hero.jpg' },
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
    canonicalLink.setAttribute('href', 'https://print.esscoaircraft.com/file-preparation-guide');
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
          <p className="text-xs text-slate-500 tracking-wide"><a href="/" className="hover:text-amber-400 transition-colors">Home</a> / File Preparation Guide</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/file-prep-hero.jpg)' }}></div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
            <div className="bg-slate-900/30 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
              <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>ESSCO Aircraft — Printing for Aviation Since 1955</p>
              <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                How to Prepare Your<br />Aviation PDF for Printing
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-4">
                Short answer: just upload it. Our system handles the rest. But if you want optimal results from a tricky file, here's what helps.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== OUR SYSTEM DOES THE HEAVY LIFTING ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Our System Does the Heavy Lifting</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Before you spend time optimizing your file, know this: our Print-On-Demand Calculator is built to handle aviation PDFs exactly as they come.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-8 h-8 text-amber-400" />, title: 'Auto Color Detection', desc: 'Our system scans every page and classifies it as color or black & white. You only pay the color rate for pages that actually contain color — no manual sorting required.' },
                { icon: <FileText className="w-8 h-8 text-amber-400" />, title: 'Auto Page Count', desc: 'Exact page count is detected instantly. No need to count pages yourself or figure out which pages are front/back. Our calculator handles it all.' },
                { icon: <Monitor className="w-8 h-8 text-amber-400" />, title: 'Instant Pricing', desc: 'Upload your PDF and see your exact price immediately. Color pages, black & white pages, binding options, and quantity — all calculated in real time.' },
                { icon: <Settings className="w-8 h-8 text-amber-400" />, title: 'Page Size Detection', desc: 'Letter, legal, tabloid, or mixed sizes — our system reads the actual page dimensions from your PDF and handles them correctly.' },
                { icon: <Printer className="w-8 h-8 text-amber-400" />, title: 'Xerox Versant 4100', desc: 'Our commercial press optimizes output automatically. It enhances contrast, corrects minor alignment issues, and produces sharp text even from lower-resolution source files.' },
                { icon: <Upload className="w-8 h-8 text-amber-400" />, title: 'Upload As-Is', desc: 'Most customers upload their PDF without any preparation and get excellent results. The guide below is for edge cases and perfectionists — not a prerequisite.' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Upload className="w-5 h-5" /> Try It Now — Upload Your PDF
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== BEST PRACTICES ==================== */}
      <ScrollReveal delay={100}>
        <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
          <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/file-prep-hero.jpg)' }}></div>
                    <div className="relative z-20 max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Best Practices for Optimal Results</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">Want the sharpest possible output? These tips help — especially for scanned documents and complex aviation manuals.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Resolution: 300 DPI Ideal', detail: '300 DPI produces the sharpest text and clearest diagrams. Our press produces readable output from files as low as 150 DPI, but charts, performance tables, and fine print look noticeably better at 300 DPI. If scanning a manual yourself, set your scanner to 300 DPI.' },
                { label: 'Page Size Consistency', detail: 'For the cleanest output, ensure all pages in your PDF are the same size (typically Letter 8.5" × 11"). If your manual has fold-out pages or mixed sizes, that\'s fine — our system handles it — but uniform sizing produces the most consistent results.' },
                { label: 'Embedded Fonts', detail: 'If your PDF was created digitally (not scanned), make sure fonts are embedded in the file. Most modern PDF creators do this automatically. Embedded fonts ensure your text prints exactly as it appears on screen, with no font substitution.' },
                { label: 'Avoid Scanned-at-Angle Issues', detail: 'When scanning a physical manual, keep pages as straight as possible on the scanner bed. Slightly skewed scans are common and our press compensates, but straight scans produce cleaner output — especially for text-heavy pages and performance charts.' },
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

      {/* ==================== AVIATION-SPECIFIC TIPS ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Aviation-Specific Tips</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">Aviation manuals have quirks that generic print guides don't cover. Here's what we've learned from printing 250,000+ aviation documents.</p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <FileText className="w-6 h-6 text-amber-400" />, title: 'Mixed Page Sizes in a Single POH', detail: 'Many Pilot Operating Handbooks include letter-size pages for text and larger fold-out pages for approach plates, airport diagrams, or performance charts. You don\'t need to split these into separate files. Upload the complete PDF as one file and our system processes each page at its native size.' },
                { icon: <Image className="w-6 h-6 text-amber-400" />, title: 'Color Covers with B&W Interior', detail: 'This is the most common format for aviation manuals — a full-color cover page followed by black & white text pages with occasional color charts. Our auto-detection handles this automatically. You only pay the color rate for the pages that actually contain color content.' },
                { icon: <Archive className="w-6 h-6 text-amber-400" />, title: 'Scanned Manuals with Yellowed Pages', detail: 'Old manuals scanned at home often have yellowed backgrounds, uneven lighting, or visible binding shadows. Our Xerox Versant 4100 press compensates for most of these artifacts during printing. The result is typically much cleaner than the scan appears on screen.' },
                { icon: <Layers className="w-6 h-6 text-amber-400" />, title: 'Multi-Section Documents', detail: 'Some manuals combine the main POH with supplements, weight & balance data, and equipment lists in a single PDF. This is fine — upload the complete file. If you want sections bound separately, upload each section as its own PDF and order them individually.' },
                { icon: <AlertTriangle className="w-6 h-6 text-amber-400" />, title: 'FAA Form Formatting', detail: 'FAA forms like 8710-1 and 337 have specific layout requirements. If your PDF includes these forms, ensure they\'re at Letter size (8.5" × 11"). Most digitally-generated FAA forms are already correct. Scanned versions may need to be checked for proper margins.' },
              ].map((item) => (
                <div key={item.title} className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FILE FORMATS ==================== */}
      <ScrollReveal delay={100}>
        <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>File Formats We Accept</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-white font-bold text-xl">PDF (Recommended)</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  PDF is our primary format and produces the best, most predictable results. Every feature of our calculator — auto color detection, page counting, instant pricing — works with PDF files. This is what we recommend for all aviation documents.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  If your manual is currently in Word, PowerPoint, or another application, export it as PDF before uploading. This preserves your exact layout, fonts, and formatting.
                </p>
              </div>
              <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                  <h3 className="text-white font-bold text-xl">Other Formats</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Our calculator is optimized for PDF files. Word documents (.docx), image files, and other formats are not auto-converted at this time. For the best experience, please convert your files to PDF before uploading.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Need help converting a file? Most applications (Word, Pages, Google Docs) have a built-in "Export as PDF" or "Print to PDF" option. If you're stuck, contact us at 877-318-1555 and we'll help.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== FILE SIZE ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Maximum File Size</h2>
            </div>

            <div className="bg-slate-700/80 rounded-xl p-8 border border-slate-600 max-w-3xl mx-auto text-center">
              <p className="text-5xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>100 MB</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Our browser-based calculator accepts PDF files up to 100MB. This covers the vast majority of aviation manuals, including lengthy maintenance documents with hundreds of illustrated pages.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Have a file larger than 100MB? Contact us at <a href="tel:877-318-1555" className="text-amber-400 hover:text-amber-300">877-318-1555</a> or <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:text-amber-300">esscosupport@aol.com</a> and we can process it through our production system directly. Large files still print beautifully — the 100MB limit is a browser constraint, not a printing constraint.
              </p>
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
                { q: 'Do I need to prepare my PDF before uploading?', a: 'In most cases, no. Our system automatically detects color vs. black & white pages, counts every page, and calculates pricing instantly. You can upload your PDF as-is and get accurate results. The tips in this guide help optimize results for edge cases like scanned manuals or mixed page sizes.' },
                { q: 'What resolution should my PDF be for best print quality?', a: '300 DPI produces the best results for both text and images. However, our Xerox Versant 4100 press produces readable output from files as low as 150 DPI. If scanning a manual yourself, set your scanner to 300 DPI for optimal quality.' },
                { q: 'Can you print a PDF with mixed page sizes?', a: 'Yes. Many aviation POHs include fold-out pages, charts at different sizes, or supplements in various formats. Our system handles mixed page sizes within a single PDF. All pages are printed at their native size by default.' },
                { q: 'What is the maximum file size I can upload?', a: 'Our browser-based calculator accepts files up to 100MB, which covers the vast majority of aviation manuals. If your file exceeds 100MB, contact us at 877-318-1555 and we can process it through our production system directly.' },
                { q: 'Does your system automatically detect color pages?', a: 'Yes. Our calculator scans every page in your PDF and classifies each as color or black & white. You only pay the color rate for pages that actually contain color. This is especially useful for aviation manuals where most pages are B&W with occasional color charts.' },
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
              <a href="/document-preservation" className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 group">
                <Archive className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">Document Preservation</h3>
                <p className="text-slate-400 text-sm">Preserve deteriorating manuals with professional reprints from our 180,000-title archive.</p>
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

      {/* ==================== SOFT CTA ==================== */}
      <ScrollReveal delay={200}>
        <section className="py-16 bg-slate-800 border-t border-slate-700 transition-all duration-500 hover:bg-slate-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Ready to Upload?</h2>
            <p className="text-lg text-slate-300 mb-8">Try our instant calculator. Upload your PDF as-is — our system handles the rest.</p>
            <a href="/#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Upload className="w-5 h-5" /> Upload PDF & Get Instant Price
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
                  <li><a href="/file-preparation-guide" className="text-amber-400">File Preparation Guide</a></li>
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

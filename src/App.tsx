import { useState, useEffect } from 'react';
import Header from './components/Header';
import ScrollReveal from './components/ScrollReveal';
import PODCalculator from './components/calculator/Calculator';
import { Calculator, Lock, ShieldCheck, Star, Package, Zap, Plane, CheckCircle, FileText, Link2, Phone, Mail, Clock, CreditCard, Award, HelpCircle, Printer, ChevronUp, Upload, Truck, Archive, MapPin, Image } from 'lucide-react';

// ==================== MAIN APP ====================
function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Global CSS for background zoom effect on all sections */}
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
        .timeline-connector {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%);
          z-index: 0;
        }
      `}</style>
      
      <ScrollReveal>
        <Header />
      </ScrollReveal>

      {/* ==================== HERO with Background Image ==================== */}
      <ScrollReveal delay={100}>
      <section className="bg-zoom-container transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
        <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/FAQ_background.jpg)' }}></div>
        <div className="absolute inset-0 z-10 bg-slate-900/50"></div>
        <div className="relative z-20 text-center px-5 py-16 md:py-20 max-w-5xl mx-auto">
          <div className="bg-slate-700/85 rounded-xl p-8 md:p-10 border border-slate-600 mb-8">
            <h1 className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
              UPLOAD ANY PDF.<br />GET INSTANT PRICING.<br />PROCESSED IN 24 HOURS.
            </h1>
            <p className="mx-auto text-white text-lg md:text-xl leading-relaxed max-w-3xl" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>
              Training guides, service docs, operations manuals, and more - we've been printing them since 1955. Professional binding, fast turnaround.
            </p>
          </div>
          {/* CTA Row: Button + Inline Emma Video */}
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Primary CTA */}
            <a href="#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Calculator size={24} strokeWidth={2.5} />
              <span className="flex flex-col items-center gap-0 leading-tight"><span>Upload any Document</span><span>For an Instant Quote →</span></span>
            </a>
            
            {/* Emma Video — Inline Player */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-600 hover:border-amber-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30">
                <video
                  className="w-full rounded-xl"
                  src="https://pub-628845eacb534e6492bffe473c1aaf94.r2.dev/video/CTA%20Take%2002%201080p.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/emma-video-thumb.png"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-slate-400 text-sm mt-2">▶ See How It Works — 81 seconds</p>
            </div>
          </div>
          
          <p className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400"><Lock size={14} /><span>No credit card required - Takes 30 seconds</span></p>
          <p className="text-white text-base mt-6 italic" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>No minimums. No setup fees. Quantity discounts. No account required.</p>
          <p className="text-slate-400 text-xs mt-3 italic lowercase">*cutoff time 4PM for next day processing</p>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== TRUST STATS (Rev 56 Content) ==================== */}
      <ScrollReveal delay={200}>
      <section className="py-12 bg-slate-900 border-y border-slate-700 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">We've printed manuals for flight schools, factories, shipyards, and hospitals.</p>
          <div className="flex flex-col md:flex-row justify-around gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center font-bold text-3xl text-amber-400 mb-1"><ShieldCheck size={28} className="text-green-500 mr-2" />100% Positive</div>
              <div className="text-slate-400 text-sm">eBay Feedback</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center font-bold text-3xl text-amber-400 mb-1"><Star size={28} className="text-amber-400 mr-2" />17,000+</div>
              <div className="text-slate-400 text-sm">Customer Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center font-bold text-3xl text-amber-400 mb-1"><Package size={28} className="text-blue-400 mr-2" />34,000+</div>
              <div className="text-slate-400 text-sm">Orders Completed</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Lock size={16} className="text-green-500" />Secure Upload</span>
            <span className="flex items-center gap-2"><Zap size={16} className="text-amber-400" />Same-Day Available</span>
            <span className="flex items-center gap-2"><Plane size={16} className="text-blue-400" />Aviation Specialists</span>
          </div>
          <p className="mt-6 font-medium text-lg text-white">⭐⭐⭐⭐⭐ 5.0/5.0 rating across all categories</p>
          <p className="mt-2 text-slate-400">Family-owned since 1955 · 180,000+ aviation manuals archived</p>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== CALCULATOR SECTION - COMING SOON PLACEHOLDER ==================== */}
      <ScrollReveal delay={100}>
      <section id="calculator" className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Get Your Instant Quote</h2>
            <p className="text-slate-400 text-lg">Upload your PDF and get pricing in seconds</p>
          </div>
          
          {/* POD Calculator Component */}
          <PODCalculator />
          
          <p className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500"><Lock size={14} className="text-green-500" /><span>Secure upload - Files auto-delete after 7 days</span></p>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={200}>
      <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Our Process Works</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">Getting your aviation documentation printed professionally has never been easier. We've streamlined our process to eliminate complexity while maintaining the personal touch that sets us apart from automated online print services. From upload to delivery, every step is designed with your convenience in mind.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 text-center transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="w-14 h-14 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Upload Your PDF</h3>
              <p className="text-slate-400 text-sm">Simply upload your print-ready PDF document through our secure online system. Files are encrypted during transfer and stored securely. We accept single files up to 500MB.</p>
            </div>
            
            <div className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 text-center transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="w-14 h-14 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Get Instant Quote</h3>
              <p className="text-slate-400 text-sm">Our system automatically calculates your exact price based on page count, color requirements, and binding options. See your total before committing—no surprises.</p>
            </div>
            
            <div className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 text-center transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="w-14 h-14 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Approve & Pay</h3>
              <p className="text-slate-400 text-sm">Review your quote and specifications. Once you approve, pay securely online using credit card or PayPal. Orders over $500 can arrange terms.</p>
            </div>
            
            <div className="bg-slate-700/80 rounded-xl p-6 border border-slate-600 text-center transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="w-14 h-14 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">We Print & Ship</h3>
              <p className="text-slate-400 text-sm">Your job enters production immediately. Most orders ship within 1-2 business days with tracking provided. Same-day production available before 4pm EST.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-400 flex items-center justify-center gap-2"><HelpCircle className="w-5 h-5" /><span><strong>Need Help?</strong> Our team is available Monday-Friday 8am-5pm EST at <a href="tel:877-318-1555" className="text-amber-400 hover:underline">877-318-1555</a> or email <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:underline">esscosupport@aol.com</a>. We're happy to answer questions about file preparation, paper options, or anything else.</span></p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== PRICING (KISS - Per PDF Page) ==================== */}
      <ScrollReveal delay={100}>
      <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Clear, Competitive Pricing</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Price per PDF page. Volume discounts automatic. No hidden fees.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-slate-300"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium">Volume Discounts</span></div>
            <div className="flex items-center gap-2 text-slate-300"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium">No Setup Fees</span></div>
            <div className="flex items-center gap-2 text-slate-300"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium">Same-Day Available</span></div>
          </div>
          
          {/* Simplified Pricing Table */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <div className="bg-slate-700 text-white p-4 text-center"><h3 className="text-xl font-bold flex items-center justify-center gap-2"><FileText size={20} />Print Rates (Per PDF Page)</h3></div>
              <div className="p-4">
                <table className="w-full">
                  <thead><tr className="border-b border-slate-600"><th className="text-left py-2 text-slate-400 text-sm">Type</th><th className="text-center py-2 text-slate-400 text-sm">1-50</th><th className="text-center py-2 text-slate-400 text-sm">51-1000</th><th className="text-center py-2 text-slate-400 text-sm">1001+</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-slate-700"><td className="py-3 text-white">Black & White</td><td className="text-center text-slate-300">$0.32</td><td className="text-center text-slate-300">$0.24</td><td className="text-center text-amber-400 font-bold">$0.21</td></tr>
                    <tr><td className="py-3 text-white">Full Color</td><td className="text-center text-slate-300">$0.89</td><td className="text-center text-slate-300">$0.59</td><td className="text-center text-amber-400 font-bold">$0.49</td></tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 mt-3 text-center">Single or double-sided = same price per page</p>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <div className="bg-amber-500 text-slate-900 p-4 text-center"><h3 className="text-xl font-bold flex items-center justify-center gap-2"><Link2 size={20} />Binding Options</h3></div>
              <div className="p-4">
                <table className="w-full"><tbody>
                  <tr className="border-b border-slate-700"><td className="py-3 text-white">Spiral Binding <span className="px-2 py-0.5 bg-green-900 text-green-400 text-xs font-medium rounded-full ml-2">Popular</span></td><td className="text-right text-amber-400 font-semibold">$3.50</td></tr>
                  <tr className="border-b border-slate-700"><td className="py-3 text-white">Comb Binding</td><td className="text-right text-slate-300">$2.50</td></tr>
                  <tr className="border-b border-slate-700"><td className="py-3 text-white">Perfect Binding <span className="text-slate-500 text-xs">(glued spine)</span></td><td className="text-right text-slate-300">$8.00</td></tr>
                  <tr><td className="py-3 text-white">3-Ring Ready (No Binding)</td><td className="text-right text-green-400">FREE</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-8 bg-blue-900/30 border border-blue-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div><h4 className="font-bold text-white mb-2">Large Orders Over $500</h4><p className="text-slate-300">Orders exceeding $500 qualify for personalized pricing and dedicated support. Configure your order below and we'll provide a custom quote within 24 hours.</p></div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== POSTER PRINTING CROSS-LINK ==================== */}
      <ScrollReveal delay={150}>
        <section className="py-8 bg-slate-900 transition-all duration-500 hover:bg-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Image className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Need a Poster or Large Format Print?</p>
                  <p className="text-slate-400 text-sm">Cockpit diagrams, schematics, training aids, banners — printed on premium glossy photo paper. Starting at $12.</p>
                </div>
              </div>
              <a href="/posters" className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold uppercase tracking-wide px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-lg" style={{ fontFamily: "'Oswald', sans-serif" }}>
                View Poster Sizes →
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ==================== PROFESSIONAL EQUIPMENT SECTION ==================== */}
      <ScrollReveal delay={200}>
      <section className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
        <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/print_room.png)' }}></div>
        <div className="absolute inset-0 z-10 bg-slate-800/75"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Equipment, Professional Results</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">Our facility at KLPR Lorain County Regional Airport houses over $100,000 in commercial-grade printing and finishing equipment. We've invested in the same professional machinery used by commercial print shops and major publishers because aviation professionals deserve nothing less than exceptional quality.</p>
          </div>
          
          {/* Equipment Image Strip */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-12 max-w-6xl mx-auto">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="/images/equip-xerox-versant.png" alt="Xerox Versant 4100 Press" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="/images/equip-hp-designjet.png" alt="HP DesignJet XL 3800" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="/images/equip-horizon-binder.png" alt="Horizon BQ-160 Binder" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="/images/equip-triumph-cutter.png" alt="TRIUMPH 4315 Guillotine Cutter" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="/images/equip-roll-laminator.png" alt="Commercial Roll Laminator" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src="/images/equip-archive-library.png" alt="180,000+ Document Archive" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <Printer className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-xl mb-3">Professional Equipment</h3>
              <p className="text-slate-300 leading-relaxed">Our $100,000+ facility features commercial-grade printing and finishing equipment including the Xerox Versant 4100 Press, HP Designjet XL 3800, Horizon BQ-160 Binder, TRIUMPH 4315 Guillotine Cutter, and commercial roll laminator. We use the same professional machinery trusted by major publishers and commercial print shops nationwide.</p>
            </div>
            
            <div className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <Archive className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-xl mb-3">Archive Access</h3>
              <p className="text-slate-300 leading-relaxed">With 180,000+ aviation technical documents in our archive library, we maintain one of the most comprehensive collections of aircraft manuals, maintenance procedures, and regulatory documentation in the industry. Our organized archive system allows us to quickly locate and reproduce legacy documentation when original copies are no longer available from manufacturers.</p>
            </div>
            
            <div className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <Zap className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-xl mb-3">Fast Turnaround</h3>
              <p className="text-slate-300 leading-relaxed">Most orders ship within 1-2 business days with same-day production available for rush jobs. Orders placed before 4pm EST can be produced the same day and shipped next business day via your preferred carrier. We understand that downtime costs money in aviation, so we prioritize quick turnaround without sacrificing quality.</p>
            </div>
            
            <div className="bg-slate-700/90 rounded-xl p-6 border border-slate-600 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
              <MapPin className="w-12 h-12 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-xl mb-3">Airport Location</h3>
              <p className="text-slate-300 leading-relaxed">Operating from KLPR Lorain County Regional Airport gives us unique insight into aviation industry needs. We're surrounded by aircraft maintenance facilities, flight schools, and aviation businesses daily, which keeps us connected to the real-world documentation requirements of the aviation community we serve.</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== WHY AVIATION PROFESSIONALS CHOOSE ESSCO ==================== */}
      <ScrollReveal delay={100}>
      <section className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Aviation Professionals Choose ESSCO</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">For seven decades, ESSCO Aircraft has been the go-to source for aviation documentation printing. Our reputation wasn't built overnight—it's the result of consistent quality, fair pricing, and personalized service that treats every customer like family. We understand that aviation documentation isn't just paperwork; it's critical information that keeps aircraft flying safely and operations running smoothly.</p>
          </div>
          
          {/* Timeline - Alternating Above/Below */}
          <div className="relative py-8 mb-12 hidden md:block">
            {/* Horizontal Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-4 gap-4 relative">
              {/* Milestone 1 - Above */}
              <div className="flex flex-col items-center">
                <div className="mb-8 text-center">
                  <p className="text-slate-300 text-sm mb-2 px-2">ESSCO Aircraft founded as a family-owned aviation business serving the Northeast Ohio aviation community.</p>
                  <h3 className="text-2xl font-bold text-amber-400">1955</h3>
                </div>
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 border-4 border-slate-900 z-10">
                  <span className="text-slate-900 font-bold text-lg">1</span>
                </div>
                <div className="h-20"></div>
              </div>
              
              {/* Milestone 2 - Below */}
              <div className="flex flex-col items-center">
                <div className="h-20"></div>
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 border-4 border-slate-900 z-10">
                  <span className="text-slate-900 font-bold text-lg">2</span>
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-amber-400">2006</h3>
                  <p className="text-slate-300 text-sm mt-2 px-2">Launched online printing services, becoming one of the first aviation specialists on eBay with verified seller status.</p>
                </div>
              </div>
              
              {/* Milestone 3 - Above */}
              <div className="flex flex-col items-center">
                <div className="mb-8 text-center">
                  <p className="text-slate-300 text-sm mb-2 px-2">Invested $100,000+ in commercial printing equipment to serve growing demand from aviation professionals nationwide.</p>
                  <h3 className="text-2xl font-bold text-amber-400">2015</h3>
                </div>
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 border-4 border-slate-900 z-10">
                  <span className="text-slate-900 font-bold text-lg">3</span>
                </div>
                <div className="h-20"></div>
              </div>
              
              {/* Milestone 4 - Below */}
              <div className="flex flex-col items-center">
                <div className="h-20"></div>
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 border-4 border-slate-900 z-10">
                  <span className="text-slate-900 font-bold text-lg">4</span>
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold text-amber-400">Today</h3>
                  <p className="text-slate-300 text-sm mt-2 px-2">Completed 34,000+ orders with 100% positive feedback, maintaining our family's commitment to aviation excellence.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline - Mobile (Vertical) */}
          <div className="md:hidden space-y-6 mb-12">
            {[
              { num: 1, year: '1955', text: 'ESSCO Aircraft founded as a family-owned aviation business serving the Northeast Ohio aviation community.' },
              { num: 2, year: '2006', text: 'Launched online printing services, becoming one of the first aviation specialists on eBay with verified seller status.' },
              { num: 3, year: '2015', text: 'Invested $100,000+ in commercial printing equipment to serve growing demand from aviation professionals nationwide.' },
              { num: 4, year: 'Today', text: 'Completed 34,000+ orders with 100% positive feedback, maintaining our family\'s commitment to aviation excellence.' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 flex-shrink-0">
                  <span className="text-slate-900 font-bold">{item.num}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400">{item.year}</h3>
                  <p className="text-slate-300 text-sm mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Our Promise & What Sets Us Apart */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-amber-400" />Our Promise to You</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>Every document printed on commercial-grade equipment to exacting standards</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>No job too small or too large—we treat every customer with equal priority</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>Transparent pricing with no hidden fees or surprise charges</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>Fast turnaround times that respect your operational schedule</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>Secure handling of all proprietary and sensitive documentation</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /><span>Expert guidance on paper selection, binding, and finishing options</span></li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Star className="w-6 h-6 text-amber-400" />What Sets Us Apart</h3>
              <p className="text-slate-300 mb-4">Unlike generic print shops, we specialize exclusively in aviation and technical documentation. We understand FAA requirements, aircraft maintenance documentation standards, and the importance of clear, durable manuals that withstand daily shop floor use.</p>
              <p className="text-slate-300">Our airport-based location isn't just convenient—it keeps us immersed in the aviation community we serve, ensuring we always understand your needs.</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== EBAY BADGE ==================== */}
      <ScrollReveal delay={200}>
      <section className="bg-zoom-container py-12 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
        <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/trust_background.png)' }}></div>
        <div className="absolute inset-0 z-10 bg-slate-900/55"></div>
        <div className="relative z-20 max-w-4xl mx-auto px-5 text-center">
          <img src="/images/ebay-feedback.jpg" alt="eBay verified seller with 17000 positive reviews" className="w-full max-w-2xl mx-auto rounded-lg" style={{ boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)' }} />
          <p className="italic text-slate-500 text-sm mt-4">Verified seller since 2006</p>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== FAQ SECTION (NEW) ==================== */}
      <ScrollReveal delay={100}>
      <section id="faq" className="bg-zoom-container py-16 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.01] origin-center">
        <div className="bg-zoom-layer" style={{ backgroundImage: 'url(/images/print_room.png)' }}></div>
        <div className="absolute inset-0 z-10 bg-slate-800/65"></div>
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3"><HelpCircle className="w-10 h-10 text-amber-400" />Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What file formats do you accept?', a: 'We accept PDF files for all print jobs. Your PDF pages are counted and priced individually. For best results, ensure your PDF is print-ready with embedded fonts.' },
              { q: 'How is pricing calculated?', a: 'We charge per PDF page, regardless of single or double-sided printing. You tell us how many pages need color vs B&W, and our calculator shows you the exact price instantly.' },
              { q: 'How long does production take?', a: 'Standard turnaround is 24-48 hours. Same-day production is available for orders placed before 4PM EST. Large orders may require additional time.' },
              { q: 'Do you ship internationally?', a: 'Yes! We ship worldwide via USPS and UPS. Domestic orders typically arrive within 3-5 business days. International shipping times vary by destination.' },
              { q: 'What binding options do you offer?', a: 'We offer spiral binding ($3.50), comb binding ($2.50), and perfect binding with glued spine ($8.00). You can also choose no binding for 3-ring ready documents.' },
              { q: 'What about fold-out pages?', a: 'We handle 11×17 fold-out pages. Just tell us how many pages in your PDF are fold-outs, and we\'ll price them accordingly. Our team verifies before printing.' },
              { q: 'Is there a minimum order?', a: 'No minimums! We print single copies with the same care as bulk orders. Volume discounts apply automatically at 51+ and 1001+ pages.' },
              { q: 'What\'s your quality guarantee?', a: 'We stand behind every print job. If you\'re not satisfied, contact us within 7 days and we\'ll make it right. Our 100% positive eBay feedback speaks for itself.' },
            ].map((faq, idx) => (
              <details key={idx} className="bg-slate-700/85 rounded-xl border border-slate-600">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white list-none rounded-xl">{faq.q}<svg className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-5 text-slate-300">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== READY TO GET STARTED CTA ==================== */}
      <ScrollReveal delay={200}>
      <section className="py-16 bg-slate-900 border-t border-slate-700 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01] origin-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">Join thousands of aviation professionals who trust ESSCO Aircraft for their documentation printing needs. From single manuals to fleet-wide documentation projects, we deliver the quality, service, and reliability that aviation professionals demand. Our 70-year track record speaks for itself—100% positive feedback from 17,000+ verified customers, 34,000+ orders completed, and a commitment to excellence that's been passed down through three generations of family ownership.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Upload className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Upload Your Document</h3>
              <p className="text-slate-400 text-sm">Get started in seconds with our secure online upload system. Your files are encrypted and handled with complete confidentiality.</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Calculator className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Instant Pricing</h3>
              <p className="text-slate-400 text-sm">See your exact cost immediately with automatic volume discounts applied. No waiting for quotes or callbacks.</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Truck className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-slate-400 text-sm">Most orders ship within 1-2 business days with tracking provided. Same-day production available before 4pm EST.</p>
            </div>
          </div>
          
          <div className="text-center">
            <a href="#calculator" className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-10 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
              START YOUR ORDER NOW →
            </a>
            <p className="mt-4 text-slate-500 text-sm">Questions? Call <a href="tel:877-318-1555" className="text-amber-400 hover:underline">877-318-1555</a> • Email <a href="mailto:esscosupport@aol.com" className="text-amber-400 hover:underline">esscosupport@aol.com</a></p>
            <p className="mt-2 text-slate-600 text-xs">Monday-Friday 8am-4pm EST</p>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-10 pt-8 border-t border-slate-800">
            <div className="flex items-center gap-2 text-slate-400">
              <Lock className="w-5 h-5 text-green-500" />
              <span className="text-sm">Secure Upload</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Plane className="w-5 h-5 text-blue-400" />
              <span className="text-sm">70 Years Aviation Experience</span>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ==================== FOOTER - Links to Shopify (external, new tab) ==================== */}
      <ScrollReveal delay={300}>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>About ESSCO Aircraft</h3>
              <p className="text-sm leading-relaxed mb-4">Over 70 years of providing quality aircraft manuals and aviation memorabilia. Our extensive library contains over 180,000 items.</p>
              {/* Social Media Links */}
              <div className="flex gap-4 mt-4">
                <a href="https://twitter.com/esscoaircraft" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://www.pinterest.com/esscoaircraft/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Pinterest"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
                <a href="https://instagram.com/esscoaircraft" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="https://www.youtube.com/user/esscoaircraft/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.esscoaircraft.com/pages/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
                <li><a href="https://www.esscoaircraft.com/pages/order-status" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Order Status</a></li>
                <li><a href="https://www.esscoaircraft.com/pages/my-account" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">My Account</a></li>
                <li><a href="https://www.esscoaircraft.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Store Policies</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.esscoaircraft.com/pages/international-shipping" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Shipping Policy</a></li>
                <li><a href="https://www.esscoaircraft.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
                <li><a href="https://www.esscoaircraft.com/policies/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Refund Policy</a></li>
                <li><a href="https://www.esscoaircraft.com/pages/security-policy" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Security Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Print Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/#calculator" className="hover:text-amber-400 transition-colors">Print-On-Demand Calculator</a></li>
                <li><a href="/aviation-manual-printing" className="hover:text-amber-400 transition-colors">Aviation Manual Printing</a></li>
                <li><a href="/checklist-printing" className="hover:text-amber-400 transition-colors">Checklist Printing</a></li>
                <li><a href="/large-format-printing" className="hover:text-amber-400 transition-colors">Large Format Printing</a></li>
                <li><a href="/posters" className="hover:text-amber-400 transition-colors">Poster Printing</a></li>
                <li><a href="https://www.esscoaircraft.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Shop All Manuals →</a></li>
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

    </div>
  );
}

export default App;






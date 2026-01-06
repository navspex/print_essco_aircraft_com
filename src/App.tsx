import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PrintCalculator from './components/PrintCalculator';
import { Calculator, Lock, ShieldCheck, Star, Package, Zap, Plane, CheckCircle, FileText, Link2, Phone, Mail, Clock, CreditCard, Award, HelpCircle, Building2, Printer, Users, ThumbsUp, ChevronUp } from 'lucide-react';

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
      <Header />

      {/* ==================== HERO with Background Image ==================== */}
      <style>{`
        .hero-bg-zoom {
          transition: transform 8s ease-out;
        }
        .hero-section:hover .hero-bg-zoom {
          transform: scale(1.1);
        }
      `}</style>
      <section className="hero-section relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.02] origin-center">
        {/* Background image layer - separate for zoom effect */}
        <div 
          className="hero-bg-zoom absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/FAQ_background.jpg)' }}
        ></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-slate-900/75 pointer-events-none"></div>
        <div className="relative z-20 text-center px-5 py-16 md:py-20 max-w-5xl mx-auto">
          <h1 className="mb-8 text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Oswald', sans-serif", textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
            UPLOAD ANY PDF.<br />GET INSTANT PRICING.<br />PROCESSED IN 24 HOURS.
          </h1>
          <p className="mx-auto mb-8 text-white text-lg md:text-xl leading-relaxed max-w-3xl" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>
            Training guides, service docs, operations manuals, and more - we've been printing them since 1955. Professional binding, fast turnaround.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg font-bold uppercase tracking-wide px-8 py-4 rounded-lg shadow-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-amber-500/50 inline-flex items-center gap-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
            <Calculator size={24} strokeWidth={2.5} />
            <span className="flex flex-col items-center gap-0 leading-tight"><span>Upload any Document</span><span>For an Instant Quote →</span></span>
          </button>
          <p className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400"><Lock size={14} /><span>No credit card required - Takes 30 seconds</span></p>
          <p className="text-white text-base mt-6 italic" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)' }}>No minimums. No setup fees. Quantity discounts. No account required.</p>
          <p className="text-slate-400 text-xs mt-3 italic lowercase">*cutoff time 4PM for next day processing</p>
        </div>
      </section>

      {/* ==================== TRUST STATS (Rev 56 Content) ==================== */}
      <section className="py-12 bg-slate-900 border-y border-slate-700 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.02] origin-center">
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

      {/* ==================== EBAY BADGE ==================== */}
      <section className="relative py-12 group transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] origin-center" style={{ backgroundImage: 'url(/images/trust_background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-900/80 transition-all duration-500 group-hover:bg-slate-900/70"></div>
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <a href="https://www.ebay.com/fdbk/feedback_profile/esscoaircraft" target="_blank" rel="noopener noreferrer" className="block">
            <img src="/images/ebay-feedback.jpg" alt="eBay verified seller with 17000 positive reviews" className="w-full max-w-2xl mx-auto rounded-lg" style={{ boxShadow: '0 3px 12px rgba(0, 0, 0, 0.4)' }} />
          </a>
          <p className="italic text-slate-500 text-sm mt-4">Verified seller since 2006</p>
        </div>
      </section>

      {/* ==================== PRICING (KISS - Per PDF Page) ==================== */}
      <section className="py-16 bg-slate-800 transition-all duration-500 hover:bg-slate-700 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.02] origin-center">
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

      {/* ==================== WHY US SECTION (NEW) ==================== */}
      <section className="relative py-16 group transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] origin-center" style={{ backgroundImage: 'url(/images/why_us.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-800/90 transition-all duration-500 group-hover:bg-slate-800/80"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Print With ESSCO?</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">70 years of experience. Airport-based facility. Commercial-grade equipment.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <Building2 className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Airport-Based Facility</h3>
              <p className="text-slate-400 text-sm">Located at KLPR Lorain County Regional Airport in Ohio. We understand aviation documentation requirements.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <Printer className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Commercial Equipment</h3>
              <p className="text-slate-400 text-sm">Xerox Versant 4100 press, large format printers, professional laminators. Over $100,000 in equipment.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <Users className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Family-Owned Since 1955</h3>
              <p className="text-slate-400 text-sm">Four generations serving aviation. 180,000+ manuals archived. We know this business inside and out.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <Zap className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Fast Turnaround</h3>
              <p className="text-slate-400 text-sm">Same-day production available for orders before 4PM EST. Most orders ship within 24-48 hours.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <ThumbsUp className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">No Minimums</h3>
              <p className="text-slate-400 text-sm">Need just one manual? No problem. We treat every order with the same care and attention.</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <ShieldCheck className="w-10 h-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Proven Track Record</h3>
              <p className="text-slate-400 text-sm">100% positive eBay feedback. 17,000+ reviews. 34,000+ orders completed successfully.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CALCULATOR SECTION ==================== */}
      <section id="calculator" className="py-16 bg-slate-900 transition-all duration-500 hover:bg-slate-800 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.02] origin-center">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Get Your Instant Quote</h2>
            <p className="text-slate-400 text-lg">Upload your PDF and get pricing in seconds</p>
          </div>
          <PrintCalculator />
          <p className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500"><Lock size={14} className="text-green-500" /><span>Secure upload - Files auto-delete after 7 days</span></p>
        </div>
      </section>

      {/* ==================== FAQ SECTION (NEW) ==================== */}
      <section id="faq" className="relative py-16 group transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] origin-center" style={{ backgroundImage: 'url(/images/print_room.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-slate-800/90 transition-all duration-500 group-hover:bg-slate-800/80"></div>
        <div className="relative max-w-4xl mx-auto px-4">
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
              <details key={idx} className="bg-slate-700/50 rounded-xl border border-slate-600">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white list-none rounded-xl">{faq.q}<svg className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-5 pb-5 text-slate-300">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-amber-500 py-12 transition-all duration-500 hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-[1.02] origin-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to see your exact price?</h2>
          <a href="#calculator" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-lg">SEE MY PRICE →</a>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      {/* ==================== FOOTER - Links to Shopify (external, new tab) ==================== */}
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
              <h3 className="text-white font-bold text-lg uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>Helpful Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.esscoaircraft.com/pages/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">About Us</a></li>
                <li><a href="https://www.esscoaircraft.com/pages/faqs" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">FAQs</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">Print Calculator FAQs</a></li>
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
                <a href="mailto:dale@esscoaircraft.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors"><Mail className="w-4 h-4" />dale@esscoaircraft.com</a>
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-amber-500/70 hover:bg-amber-500 text-slate-900 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;





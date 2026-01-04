import React from 'react';
import Header from './components/Header';
import PrintCalculator from './components/PrintCalculator';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Keep existing Header component */}
      <Header />

      {/* ==================== HERO SECTION ==================== */}
      <section 
        className="min-h-[75vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.70), rgba(15, 23, 42, 0.70)), url('/images/hero_background.png')" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full py-20">
          <div className="max-w-3xl">
            {/* Airport badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Airport-Based Aviation Specialists
            </div>
            
            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Professional Aviation<br />Document Printing
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Upload your PDF. Get instant pricing. Same-day production available.
            </p>
            
            {/* CTA Button */}
            <a 
              href="#calculator" 
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Your Document
            </a>
            
            {/* Trust indicators */}
            <p className="text-gray-400 text-sm mt-8">
              ✓ Cutoff 4pm EST for same-day &nbsp;•&nbsp; ✓ No minimum order &nbsp;•&nbsp; ✓ No account required
            </p>
          </div>
        </div>
      </section>

      {/* ==================== TRUST STATS BAR ==================== */}
      <section className="bg-slate-800 py-10 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-gray-300 text-sm">Positive eBay Feedback</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">17,000+</div>
              <div className="text-gray-300 text-sm">Customer Reviews</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">70</div>
              <div className="text-gray-300 text-sm">Years in Business</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">180,000+</div>
              <div className="text-gray-300 text-sm">Manuals Archived</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUST / ABOUT SECTION ==================== */}
      <section 
        id="about"
        className="py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url('/images/trust_background.png')" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              70 Years of Aviation Printing Excellence
            </h2>
            
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Since 1955, ESSCO Aircraft has been the trusted partner for aviation documentation. 
              We've printed technical manuals for flight schools, aircraft maintenance facilities, 
              factories, shipyards, and hospitals across North America. Our family-owned business 
              operates from <strong>KLPR Lorain County Regional Airport</strong> in Ohio, where we maintain 
              one of the industry's most comprehensive aviation document archives and state-of-the-art 
              printing equipment.
            </p>
            
            {/* eBay Badge */}
            <div className="flex justify-center mt-8">
              <a 
                href="https://www.ebay.com/fdbk/feedback_profile/esscoaircraft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <img 
                  src="/images/ebay-feedback.jpg" 
                  alt="ESSCO Aircraft eBay Feedback - 100% Positive Rating" 
                  className="h-24 w-auto mx-auto"
                />
                <p className="text-sm text-gray-600 mt-3 text-center font-medium">
                  Verified on eBay →
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRICING SECTION ==================== */}
      <section 
        id="pricing"
        className="py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.80), rgba(15, 23, 42, 0.80)), url('/images/Pricing_background.jpg')" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Clear, Competitive Pricing
          </h2>
          
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
            Complete transparency with volume discounts automatically applied. 
            No hidden fees, no setup charges, no minimum orders. 
            Orders over $500 receive personalized quotes.
          </p>
          
          {/* Pricing Tables */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            
            {/* B&W Pricing Table */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-slate-800 text-white p-5 text-center">
                <h3 className="text-xl font-bold">Black & White Printing</h3>
                <p className="text-slate-300 text-sm mt-1">Per page pricing</p>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-slate-600 font-semibold">Page Count</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">1-99</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">100-499</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">500+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-slate-800">Single-Sided</td>
                      <td className="text-center text-slate-700">$0.15</td>
                      <td className="text-center text-slate-700">$0.12</td>
                      <td className="text-center text-amber-600 font-bold">$0.10</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-slate-800">Double-Sided</td>
                      <td className="text-center text-slate-700">$0.25</td>
                      <td className="text-center text-slate-700">$0.20</td>
                      <td className="text-center text-amber-600 font-bold">$0.17</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Color Pricing Table */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-amber-500 text-slate-900 p-5 text-center">
                <h3 className="text-xl font-bold">Color Printing</h3>
                <p className="text-slate-700 text-sm mt-1">Per page pricing</p>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-slate-600 font-semibold">Page Count</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">1-99</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">100-499</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">500+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-slate-800">Single-Sided</td>
                      <td className="text-center text-slate-700">$0.45</td>
                      <td className="text-center text-slate-700">$0.37</td>
                      <td className="text-center text-amber-600 font-bold">$0.32</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-slate-800">Double-Sided</td>
                      <td className="text-center text-slate-700">$0.75</td>
                      <td className="text-center text-slate-700">$0.62</td>
                      <td className="text-center text-amber-600 font-bold">$0.54</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Binding & Finishing Options */}
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Binding & Finishing Options</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$3.50</div>
                <div className="text-slate-600 text-sm mt-1">Spiral Binding</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$2.50</div>
                <div className="text-slate-600 text-sm mt-1">Comb Binding</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$8.00</div>
                <div className="text-slate-600 text-sm mt-1">Perfect Binding</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-2xl font-bold text-slate-800">$2.00</div>
                <div className="text-slate-600 text-sm mt-1">Heavy Cover</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US SECTION ==================== */}
      <section 
        className="py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url('/images/why_us.jpg')" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Why Print With ESSCO?
          </h2>
          
          <p className="text-lg text-slate-700 text-center max-w-3xl mx-auto mb-6">
            Our facility at KLPR Lorain County Regional Airport houses over <strong>$100,000</strong> in 
            commercial-grade printing and finishing equipment—the same professional machinery 
            used by commercial print shops.
          </p>
          
          {/* What Sets Us Apart Box */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-12 border-l-4 border-amber-500">
            <h3 className="text-xl font-bold text-slate-800 mb-4">What Sets Us Apart</h3>
            <p className="text-slate-700 leading-relaxed">
              Unlike generic print shops, we specialize exclusively in aviation and technical 
              documentation. We understand FAA requirements, aircraft maintenance documentation 
              standards, and the importance of clear, durable manuals that withstand daily shop 
              floor use. Our airport-based location isn't just convenient—it keeps us immersed 
              in the aviation community we serve.
            </p>
          </div>
          
          {/* Promise Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Commercial-Grade Quality</h4>
              <p className="text-slate-600 text-sm">Every document printed on professional equipment to exacting standards.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Transparent Pricing</h4>
              <p className="text-slate-600 text-sm">No hidden fees or surprise charges. See your exact cost before ordering.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Fast Turnaround</h4>
              <p className="text-slate-600 text-sm">Same-day production available. We respect your operational schedule.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Secure Handling</h4>
              <p className="text-slate-600 text-sm">All proprietary and sensitive documentation handled with care.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">No Job Too Small</h4>
              <p className="text-slate-600 text-sm">We treat every customer with equal priority, from single manuals to bulk orders.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Expert Guidance</h4>
              <p className="text-slate-600 text-sm">Advice on paper selection, binding, and finishing options from specialists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            How Our Process Works
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From upload to delivery in four simple steps
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-slate-900">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Upload Your PDF</h3>
              <p className="text-gray-400 text-sm">Upload your print-ready PDF through our secure system.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-slate-900">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Get Instant Quote</h3>
              <p className="text-gray-400 text-sm">Our calculator shows your exact price with all options.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-slate-900">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Approve & Pay</h3>
              <p className="text-gray-400 text-sm">Review your quote and pay securely via PayPal.</p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-slate-900">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">We Print & Ship</h3>
              <p className="text-gray-400 text-sm">Production starts immediately, fast shipping nationwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CALCULATOR SECTION ==================== */}
      <section id="calculator" className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Get Your Instant Quote
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Upload your PDF and configure your print options. See your exact price before you order.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <PrintCalculator />
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section 
        id="faq"
        className="py-20 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url('/images/FAQ_background.png')" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ 1 */}
            <details className="bg-white/95 rounded-xl shadow-lg group">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                What file formats do you accept?
                <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                We accept PDF files for all print jobs. For best results, ensure your PDF is print-ready with embedded fonts and high-resolution images (300 DPI minimum). If you have files in other formats, contact us to discuss conversion options.
              </div>
            </details>
            
            {/* FAQ 2 */}
            <details className="bg-white/95 rounded-xl shadow-lg group">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                How long does production take?
                <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Standard turnaround is 1-2 business days for most orders. Same-day production is available for orders placed before 4pm EST. Large orders or complex binding may require additional time. Rush options available—contact us for expedited service.
              </div>
            </details>
            
            {/* FAQ 3 */}
            <details className="bg-white/95 rounded-xl shadow-lg group">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                Do you ship internationally?
                <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Yes! We ship worldwide. Domestic US orders typically ship via USPS or UPS. International shipping is available to most countries. Shipping costs are calculated at checkout based on weight and destination. Contact us for bulk international shipping quotes.
              </div>
            </details>
            
            {/* FAQ 4 */}
            <details className="bg-white/95 rounded-xl shadow-lg group">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                Can I get a sample before ordering?
                <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                For large orders, we're happy to provide a sample section before full production. Contact us to discuss sample options. You can also request specific paper stock samples to evaluate quality before committing to a large print run.
              </div>
            </details>
            
            {/* FAQ 5 */}
            <details className="bg-white/95 rounded-xl shadow-lg group">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                What's your quality guarantee?
                <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                We stand behind every print job. If you're not satisfied with the quality, contact us within 7 days of receipt and we'll make it right—either by reprinting or providing a refund. Our 100% positive eBay feedback over 17,000+ reviews speaks to our commitment.
              </div>
            </details>
            
            {/* FAQ 6 */}
            <details className="bg-white/95 rounded-xl shadow-lg group">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-800 list-none">
                What paper stock do you use?
                <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Standard printing uses 24lb bright white paper, ideal for technical manuals. We also offer 28lb and 32lb options for premium feel, plus heavy card stock (80lb/100lb) for covers. Contact us for specialty paper requests.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-amber-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Print?
          </h2>
          <p className="text-slate-800 text-lg mb-8 max-w-2xl mx-auto">
            Upload your document now and get an instant quote. No account required, 
            no minimum order, and same-day production available.
          </p>
          <a 
            href="#calculator" 
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Start Your Order
          </a>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Column 1 - About */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ESSCO Aircraft</h3>
              <p className="text-sm leading-relaxed">
                Family-owned aviation document specialists since 1955. 
                Located at KLPR Lorain County Regional Airport, Ohio.
              </p>
              <div className="flex gap-4 mt-4">
                <span className="text-amber-400 font-semibold">70 Years Strong</span>
              </div>
            </div>
            
            {/* Column 2 - Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:877-318-1555" className="hover:text-amber-400 transition flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    877-318-1555 (Toll Free)
                  </a>
                </li>
                <li>
                  <a href="mailto:dale@esscoaircraft.com" className="hover:text-amber-400 transition flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    dale@esscoaircraft.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>KLPR Lorain County Regional Airport<br />Lorain, Ohio</span>
                </li>
              </ul>
            </div>
            
            {/* Column 3 - Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.esscoaircraft.com" className="hover:text-amber-400 transition" target="_blank" rel="noopener noreferrer">
                    Main Store (esscoaircraft.com)
                  </a>
                </li>
                <li>
                  <a href="https://www.ebay.com/str/esscoaircraft" className="hover:text-amber-400 transition" target="_blank" rel="noopener noreferrer">
                    eBay Store
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-amber-400 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-amber-400 transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2026 ESSCO Aircraft. All rights reserved. Serving aviation since 1955.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;

import Header from './components/Header';
import PrintCalculator from './components/PrintCalculator';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <Header />

      {/* Hero Section */}
      <section 
        className="min-h-[75vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.70), rgba(15, 23, 42, 0.70)), url('/images/hero_background.png')" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              Airport-Based Aviation Specialists
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Professional Aviation<br />Document Printing
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Upload your PDF. Get instant pricing. Same-day production available.
            </p>
            
            <a 
              href="#calculator" 
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Upload Your Document
            </a>
            
            <p className="text-gray-400 text-sm mt-8">
              ✓ Cutoff 4pm EST for same-day • ✓ No minimum order • ✓ No account required
            </p>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
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

      {/* Trust Section */}
      <section 
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
              Our family-owned business operates from KLPR Lorain County Regional Airport in Ohio.
            </p>
            
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

      {/* Pricing Section */}
      <section 
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
            Volume discounts automatically applied. No hidden fees.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* B&W Table */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-slate-800 text-white p-5 text-center">
                <h3 className="text-xl font-bold">Black & White Printing</h3>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-slate-600">Type</th>
                      <th className="text-center py-3 text-slate-600">1-99</th>
                      <th className="text-center py-3 text-slate-600">100-499</th>
                      <th className="text-center py-3 text-slate-600">500+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 text-slate-800">Single-Sided</td>
                      <td className="text-center">$0.15</td>
                      <td className="text-center">$0.12</td>
                      <td className="text-center text-amber-600 font-bold">$0.10</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-800">Double-Sided</td>
                      <td className="text-center">$0.25</td>
                      <td className="text-center">$0.20</td>
                      <td className="text-center text-amber-600 font-bold">$0.17</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Color Table */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-amber-500 text-slate-900 p-5 text-center">
                <h3 className="text-xl font-bold">Color Printing</h3>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 text-slate-600">Type</th>
                      <th className="text-center py-3 text-slate-600">1-99</th>
                      <th className="text-center py-3 text-slate-600">100-499</th>
                      <th className="text-center py-3 text-slate-600">500+</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 text-slate-800">Single-Sided</td>
                      <td className="text-center">$0.45</td>
                      <td className="text-center">$0.37</td>
                      <td className="text-center text-amber-600 font-bold">$0.32</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-800">Double-Sided</td>
                      <td className="text-center">$0.75</td>
                      <td className="text-center">$0.62</td>
                      <td className="text-center text-amber-600 font-bold">$0.54</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Get Your Instant Quote
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Configure your print options and see exact pricing.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <PrintCalculator />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ESSCO Aircraft</h3>
              <p className="text-sm">Family-owned since 1955. KLPR Airport, Ohio.</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm">877-318-1555</p>
              <p className="text-sm">dale@esscoaircraft.com</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Links</h3>
              <a href="https://www.esscoaircraft.com" className="text-sm hover:text-amber-400 block">Main Store</a>
              <a href="https://www.ebay.com/str/esscoaircraft" className="text-sm hover:text-amber-400 block">eBay Store</a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2026 ESSCO Aircraft. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;

import { Upload, Calculator, CheckCircle, ChevronRight } from 'lucide-react';

export default function PrintCalculatorPlaceholder() {
  return (
    <section id="quote" className="py-16 bg-gradient-to-br from-essco-dark-gray to-essco-maroon">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-oswald text-section-title uppercase text-white mb-4">
            Get Your Instant Quote
          </h2>
          <p className="text-gray-300 text-lg">
            Upload your PDF and get pricing in seconds
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 mb-8">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold mb-3">
                1
              </div>
              <Upload size={32} className="text-purple-600 mb-2" />
              <h3 className="font-oswald font-semibold text-lg uppercase text-essco-dark-gray">
                Upload PDF
              </h3>
              <p className="text-gray-600 text-sm text-center max-w-[150px]">
                Drop or click to upload
              </p>
              <span className="text-xs text-gray-400 mt-1">~30 seconds</span>
            </div>

            <div className="hidden md:flex items-center">
              <div className="w-16 h-0.5 bg-purple-300"></div>
              <ChevronRight size={20} className="text-purple-400 -ml-1" />
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold mb-3">
                2
              </div>
              <Calculator size={32} className="text-purple-600 mb-2" />
              <h3 className="font-oswald font-semibold text-lg uppercase text-essco-dark-gray">
                Get Quote
              </h3>
              <p className="text-gray-600 text-sm text-center max-w-[150px]">
                See instant pricing
              </p>
              <span className="text-xs text-gray-400 mt-1">Instant</span>
            </div>

            <div className="hidden md:flex items-center">
              <div className="w-16 h-0.5 bg-purple-300"></div>
              <ChevronRight size={20} className="text-purple-400 -ml-1" />
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold mb-3">
                3
              </div>
              <CheckCircle size={32} className="text-purple-600 mb-2" />
              <h3 className="font-oswald font-semibold text-lg uppercase text-essco-dark-gray">
                Order
              </h3>
              <p className="text-gray-600 text-sm text-center max-w-[150px]">
                Pay and receive prints
              </p>
              <span className="text-xs text-gray-400 mt-1">2-3 minutes</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-essco-maroon transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="font-oswald text-lg uppercase text-essco-dark-gray mb-2">
              Drop your PDF here or click to upload
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Maximum file size: 100MB
            </p>
            <button className="bg-essco-navy hover:bg-essco-navy-soft text-white font-oswald uppercase tracking-wide px-6 py-3 transition-colors">
              Select File
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
            <div className="p-3 bg-essco-light-gray rounded">
              <span className="block font-bold text-essco-dark-gray">Comb Binding</span>
              <span className="text-gray-600">From $8.99</span>
            </div>
            <div className="p-3 bg-essco-light-gray rounded">
              <span className="block font-bold text-essco-dark-gray">Spiral Binding</span>
              <span className="text-gray-600">From $9.99</span>
            </div>
            <div className="p-3 bg-essco-light-gray rounded">
              <span className="block font-bold text-essco-dark-gray">Perfect Binding</span>
              <span className="text-gray-600">From $14.99</span>
            </div>
            <div className="p-3 bg-essco-light-gray rounded">
              <span className="block font-bold text-essco-dark-gray">3-Ring Ready</span>
              <span className="text-gray-600">From $6.99</span>
            </div>
            <div className="p-3 bg-essco-light-gray rounded">
              <span className="block font-bold text-essco-dark-gray">Tab Dividers</span>
              <span className="text-gray-600">From $2.99</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

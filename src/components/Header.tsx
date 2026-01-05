import React, { useState } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { label: 'MANUALS', href: 'https://www.esscoaircraft.com/collections/aircraft-manuals', external: true },
    { label: 'BRANDS', href: 'https://www.esscoaircraft.com/collections/brand', external: true },
    { label: 'COCKPIT POSTERS', href: 'https://www.esscoaircraft.com/collections/cockpit-posters', external: true },
    { label: 'CONTACT US', href: 'https://www.esscoaircraft.com/pages/contact-us', external: true },
    { label: 'WE BUY MANUALS!', href: 'https://www.esscoaircraft.com/pages/we-buy-manuals-1', external: true },
    { label: 'NEWS', href: 'https://www.esscoaircraft.com/blogs/news-1', external: true },
  ];

  const contactInfo = [
    { icon: '🖨️', title: 'Print-On-Demand', text: 'Upload your PDF', link: '#calculator', external: false },
    { icon: '📋', title: 'We buy manuals!', text: 'Contact for a quote', link: 'https://www.esscoaircraft.com/pages/we-buy-manuals-1', external: true },
    { icon: '📞', title: 'Give Us A Call', text: '877-318-1555', link: 'tel:877-318-1555', external: false },
    { icon: '✉️', title: 'Email Us', text: 'esscosupport@aol.com', link: 'mailto:esscosupport@aol.com', external: false },
    { icon: '🕐', title: 'Hours', text: 'Monday - Friday', link: null, external: false },
  ];

  return (
    <header className="w-full">
      {/* Main Header - Sticky */}
      <div className="sticky top-0 z-50 bg-[#EFF1F6] border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Left Side: Mobile Menu + Search */}
            <div className="flex items-center gap-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-essco-dark-gray p-2 hover:text-essco-maroon transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Search Icon - Mobile (matches Shopify) */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden text-essco-dark-gray p-2 hover:text-essco-maroon transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Logo - Centered */}
            <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
              <a href="https://www.esscoaircraft.com">
                <img
                  src="https://cdn.shopify.com/s/files/1/0502/8275/8324/files/Untitled-7_743913a9-5f01-4883-bce7-85fad72c34cf.png?v=1615221053"
                  alt="ESSCO Aircraft"
                  className="h-16 md:h-20 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="font-oswald font-semibold text-sm tracking-wider text-essco-dark-gray hover:text-essco-maroon transition-colors uppercase"
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Side: Cart */}
            <div className="flex items-center">
              <a
                href="#cart"
                className="text-essco-dark-gray hover:text-essco-maroon transition-colors p-2"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search manuals..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essco-maroon focus:border-essco-maroon"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Information Bar - Compact on mobile, full on desktop */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile: Single primary CTA (matches Shopify screenshot) */}
          <div className="md:hidden py-3">
            <a
              href="#calculator"
              className="flex items-center justify-center gap-3 text-essco-dark-gray hover:text-essco-maroon transition-colors"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </span>
              <div className="text-left">
                <span className="block font-semibold text-sm">Print On Demand</span>
                <span className="block text-sm text-gray-600">Upload your PDF</span>
              </div>
            </a>
          </div>

          {/* Desktop: Full contact bar (5 columns) */}
          <div className="hidden md:grid md:grid-cols-5 gap-4 py-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center justify-center text-center">
                {item.link ? (
                  <a
                    href={item.link}
                    className="flex flex-col items-center hover:text-essco-maroon transition-colors"
                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-essco-maroon text-xl">{item.icon}</span>
                      <span className="font-semibold text-essco-dark-gray text-sm">{item.title}</span>
                    </div>
                    <span className="text-essco-dark-gray text-sm">{item.text}</span>
                  </a>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-essco-maroon text-xl">{item.icon}</span>
                      <span className="font-semibold text-essco-dark-gray text-sm">{item.title}</span>
                    </div>
                    <span className="text-essco-dark-gray text-sm">{item.text}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-essco-dark-gray hover:text-essco-maroon"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="font-oswald font-semibold text-lg text-essco-dark-gray hover:text-essco-maroon transition-colors uppercase py-2 border-b border-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Contact Info in Mobile Menu */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-oswald font-semibold text-lg text-essco-dark-gray mb-4 uppercase">Contact Us</h3>
                <div className="space-y-4">
                  <a href="tel:877-318-1555" className="flex items-center gap-3 text-essco-dark-gray hover:text-essco-maroon transition-colors">
                    <span className="text-xl">📞</span>
                    <div>
                      <span className="block font-semibold text-sm">Give Us A Call</span>
                      <span className="block text-sm">877-318-1555</span>
                    </div>
                  </a>
                  <a href="mailto:esscosupport@aol.com" className="flex items-center gap-3 text-essco-dark-gray hover:text-essco-maroon transition-colors">
                    <span className="text-xl">✉️</span>
                    <div>
                      <span className="block font-semibold text-sm">Email Us</span>
                      <span className="block text-sm">esscosupport@aol.com</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-essco-dark-gray">
                    <span className="text-xl">🕐</span>
                    <div>
                      <span className="block font-semibold text-sm">Hours</span>
                      <span className="block text-sm">Monday - Friday, 9am-4pm</span>
                    </div>
                  </div>
                  <a 
                    href="https://www.esscoaircraft.com/pages/we-buy-manuals-1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-essco-dark-gray hover:text-essco-maroon transition-colors"
                  >
                    <span className="text-xl">📋</span>
                    <div>
                      <span className="block font-semibold text-sm">We Buy Manuals!</span>
                      <span className="block text-sm">Contact for a quote</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

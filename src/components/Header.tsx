import React, { useState } from 'react';
import { Printer, DollarSign, Phone, Mail, Clock } from 'lucide-react';

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

  // 5 banner blocks matching Shopify Empire theme highlights-banners
  const bannerBlocks = [
    { 
      icon: <Printer className="w-full h-full" />, 
      heading: 'Print On Demand', 
      text: 'Upload your PDF', 
      href: '#calculator' 
    },
    { 
      icon: <DollarSign className="w-full h-full" />, 
      heading: 'We Buy Manuals!', 
      text: 'Contact for a quote', 
      href: 'mailto:esscosupport@aol.com?subject=Manual%20Purchase%20Inquiry' 
    },
    { 
      icon: <Phone className="w-full h-full" />, 
      heading: 'Give Us A Call', 
      text: '877-318-1555', 
      href: 'tel:877-318-1555' 
    },
    { 
      icon: <Mail className="w-full h-full" />, 
      heading: 'Email Us', 
      text: 'esscosupport@aol.com', 
      href: 'mailto:esscosupport@aol.com' 
    },
    { 
      icon: <Clock className="w-full h-full" />, 
      heading: 'Hours', 
      text: 'Monday - Friday 9 to 4',
      href: undefined
    },
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

      {/* Highlights Banners Bar - Horizontal scroll on mobile, 5-column on desktop */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        {/* Mobile: Horizontal scroll carousel (< 1024px) */}
        <div 
          className="lg:hidden flex overflow-x-auto py-4 px-4 gap-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style>{`.mobile-scroll::-webkit-scrollbar { display: none; }`}</style>
          {bannerBlocks.map((block, index) => (
            <BannerBlock key={index} block={block} isMobile />
          ))}
        </div>

        {/* Desktop: 5-column centered layout (≥ 1024px) */}
        <div className="hidden lg:flex justify-center py-9 px-6 max-w-[1400px] mx-auto">
          {bannerBlocks.map((block, index) => (
            <BannerBlock key={index} block={block} />
          ))}
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
                    <Phone className="w-5 h-5 text-essco-maroon" />
                    <div>
                      <span className="block font-semibold text-sm">Give Us A Call</span>
                      <span className="block text-sm">877-318-1555</span>
                    </div>
                  </a>
                  <a href="mailto:esscosupport@aol.com" className="flex items-center gap-3 text-essco-dark-gray hover:text-essco-maroon transition-colors">
                    <Mail className="w-5 h-5 text-essco-maroon" />
                    <div>
                      <span className="block font-semibold text-sm">Email Us</span>
                      <span className="block text-sm">esscosupport@aol.com</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-essco-dark-gray">
                    <Clock className="w-5 h-5 text-essco-maroon" />
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
                    <DollarSign className="w-5 h-5 text-essco-maroon" />
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

// Banner Block Component
interface BannerBlockProps {
  block: {
    icon: React.ReactNode;
    heading: string;
    text: string;
    href?: string;
  };
  isMobile?: boolean;
}

const BannerBlock: React.FC<BannerBlockProps> = ({ block, isMobile }) => {
  const content = (
    <>
      {/* Icon container */}
      <div 
        className={`
          flex-shrink-0 text-[#4c5154]
          ${isMobile ? 'w-9 h-9 mr-4' : 'w-[2.875rem] h-[2.875rem] mr-5'}
        `}
        style={{ maxWidth: '35%' }}
      >
        {block.icon}
      </div>
      
      {/* Text container */}
      <div className={`min-w-0 pr-5 leading-[1.4] ${isMobile ? 'text-sm' : 'text-base'}`}>
        <h6 
          className="m-0 text-[#4c5154] font-normal"
          style={{ 
            fontFamily: '"Roboto Condensed", sans-serif',
            fontSize: '0.875rem',
          }}
        >
          {block.heading}
        </h6>
        <p className="m-0 text-[#4c5154] text-sm">{block.text}</p>
      </div>
    </>
  );

  const baseClasses = `
    relative flex items-center text-[#4c5154] no-underline
    ${isMobile 
      ? 'flex-shrink-0 w-[15.625rem]' // 250px fixed width for mobile scroll
      : 'w-[20%]' // 5 columns = 20% each
    }
  `;

  if (block.href) {
    return (
      <a href={block.href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
};

export default Header;


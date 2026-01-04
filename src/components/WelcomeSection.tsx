import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-section bg-essco-bg">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Welcome Text */}
          <div className="space-y-6">
            <h2 className="font-oswald font-semibold text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop text-essco-maroon uppercase">
              ESSCO AIRCRAFT
            </h2>
            <div className="space-y-4 text-essco-dark-gray text-section-desc-mobile md:text-section-desc-tablet lg:text-section-desc-desktop leading-relaxed">
              <p>
                Welcome to the Essco Aircraft web site. We have been in business for over 50 years! Our aircraft manual library is one of the most extensive in the world and contains over 180,000 items. We are constantly adding to our library.
              </p>
              <p>
                If there is a manual you are looking for, and you don't see it listed on our site, please contact us via email, phone, or fax. Our staff will be happy to help you.
              </p>
              <p>
                We also BUY, SELL, or TRADE new and used aircraft manuals, collectibles, aviation memorabilia, aviation videos, aviation posters, etc., so give us a call or email us if you are looking to trade, buy or sell.
              </p>
            </div>
          </div>

          {/* We Buy Manuals Box */}
          <div className="bg-white shadow-lg overflow-hidden border-t-4 border-essco-maroon">
            <div className="p-8">
              <h3 className="font-oswald font-semibold text-2xl md:text-3xl text-essco-maroon uppercase mb-6 text-center">
                WE BUY MANUALS!
              </h3>
              <div className="mb-6 relative" style={{ paddingBottom: '42.3737%' }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0502/8275/8324/files/essco-imageforretailinfo.jpg?v=1606757202"
                  alt="Collection of vintage aviation manuals and aircraft memorabilia available for purchase"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-essco-dark-gray text-center mb-6 text-section-desc-mobile md:text-section-desc-tablet lg:text-section-desc-desktop">
                Don't throw anything away! We will buy your Aircraft Manuals and Memorabilia.
              </p>
              <div className="text-center">
                <a
                  href="https://www.esscoaircraft.com/pages/we-buy-manuals-1"
                  className="inline-block bg-essco-maroon text-white font-semibold px-8 py-3 hover:bg-opacity-90 transition-all uppercase tracking-wide"
                >
                  Contact for a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;

import React from 'react';
import { ShieldCheck, Star, Package, Lock, Zap, Plane } from 'lucide-react';

const TrustSignals: React.FC = () => {
  return (
    <section
      className="w-full bg-white border-b border-[#e5e5e5]"
      style={{ paddingTop: '50px', paddingBottom: '50px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 text-center">
        {/* Opening Statement */}
        <p
          className="mx-auto mb-7"
          style={{
            fontSize: '18px',
            color: '#444444',
            lineHeight: '1.6',
            maxWidth: '700px'
          }}
        >
          We've printed manuals for flight schools, factories, shipyards, and hospitals.
        </p>

        {/* Trust Stats Row */}
        <div
          className="flex flex-col md:flex-row justify-around mb-8"
          style={{ gap: '20px' }}
        >
          <div className="flex flex-col items-center">
            <div
              className="inline-flex items-center font-bold mb-1"
              style={{ fontSize: '32px', color: '#333333' }}
            >
              <ShieldCheck size={28} className="text-green-600 mr-2" />
              100% Positive
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              eBay Feedback
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="inline-flex items-center font-bold mb-1"
              style={{ fontSize: '32px', color: '#333333' }}
            >
              <Star size={28} className="text-yellow-500 mr-2" />
              17,000+
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              Customer Reviews
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="inline-flex items-center font-bold mb-1"
              style={{ fontSize: '32px', color: '#333333' }}
            >
              <Package size={28} className="text-blue-600 mr-2" />
              34,000+
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              Orders Completed
            </div>
          </div>
        </div>

        {/* Secondary Trust Bar */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-6 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <Lock size={16} className="text-green-600" />
            Secure Upload
          </span>
          <span className="flex items-center gap-2">
            <Zap size={16} className="text-yellow-500" />
            Same-Day Available
          </span>
          <span className="flex items-center gap-2">
            <Plane size={16} className="text-blue-600" />
            Aviation Specialists
          </span>
        </div>

        {/* Star Rating */}
        <p
          className="mb-6 font-medium"
          style={{ fontSize: '18px', color: '#333333' }}
        >
          ⭐⭐⭐⭐⭐ 5.0/5.0 rating across all categories
        </p>

        {/* Credibility Line */}
        <p
          className="mb-8"
          style={{ fontSize: '16px', color: '#666666' }}
        >
          Family-owned since 1955 · 180,000+ aviation manuals archived
        </p>

        {/* eBay Badge Image */}
        <div className="mb-3">
          <a
            href="https://www.ebay.com/fdbk/feedback_profile/esscoaircraft"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/ebay-verified-seller-17000-positive-reviews.jpg"
              alt="eBay verified seller with 17000 positive reviews"
              className="w-full max-w-full mx-auto rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              style={{
                boxShadow: '0 3px 12px rgba(0, 0, 0, 0.12)'
              }}
            />
          </a>
        </div>

        {/* Verification Badge */}
        <p
          className="italic"
          style={{ fontSize: '13px', color: '#888888', marginTop: '12px' }}
        >
          Verified seller since 2006
        </p>
      </div>

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 768px) {
          section {
            padding-top: 35px !important;
            padding-bottom: 35px !important;
          }
          section p:first-of-type {
            font-size: 16px !important;
          }
          section > div > div:nth-child(2) > div > div:first-child {
            font-size: 28px !important;
          }
          section > div > p:nth-of-type(2) {
            font-size: 16px !important;
          }
          section > div > p:nth-of-type(3) {
            font-size: 15px !important;
          }
          section img {
            padding: 0 20px;
          }
        }
        @media (min-width: 769px) {
          section > div > div:nth-child(2) {
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustSignals;


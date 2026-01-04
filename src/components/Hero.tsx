import React from 'react';
import { Calculator, Lock } from 'lucide-react';
import manualImage from '../assets/aviation-manual-spiral-binding-print-service.png';

const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: 'auto',
        backgroundImage: `url(${manualImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
      role="banner"
      aria-label="Professional aviation manual printing with spiral binding"
    >
      {/* Background opacity overlay */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1
        }}
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay for WCAG Contrast */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.55) 0%, rgba(110, 75, 108, 0.50) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Text Overlay Content */}
      <div
        className="relative text-center px-5"
        style={{ zIndex: 3, paddingTop: '40px', paddingBottom: '40px' }}
      >
          {/* Main Headline */}
          <h1
            className="mb-12"
            style={{
              color: '#FFFFFF',
              fontSize: '68px',
              fontWeight: 700,
              letterSpacing: '2.5px',
              lineHeight: '1.4',
              textTransform: 'uppercase',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)',
              fontFamily: "'Oswald', sans-serif"
            }}
          >
            UPLOAD ANY PDF.<br />
            GET INSTANT PRICING.<br />
            PROCESSED IN 24 HOURS.
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mb-12"
            style={{
              color: '#FFFFFF',
              fontSize: '24px',
              lineHeight: '1.6',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.6)',
              maxWidth: '750px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}
          >
            Training guides, service docs, operations manuals, and more - we've been printing them since 1955. Professional binding, fast turnaround.
          </p>

          {/* CTA Button */}
          <button
            className="transition-all duration-300 hero-cta-button"
            style={{
              backgroundColor: '#6e4b6c',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '22px 60px',
              border: '3px solid #FFFFFF',
              borderRadius: '6px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.8), 0 0 30px rgba(110, 75, 108, 0.4)',
              cursor: 'pointer',
              marginBottom: '20px',
              fontFamily: "'Oswald', sans-serif",
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#6e4b6c';
              e.currentTarget.style.borderColor = '#6e4b6c';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.9), 0 0 40px rgba(255, 255, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6e4b6c';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.8), 0 0 30px rgba(110, 75, 108, 0.4)';
            }}
            aria-label="Upload any document for an instant quote"
          >
            <Calculator size={24} strokeWidth={2.5} />
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', lineHeight: '1.2' }}>
              <span>Upload any Document</span>
              <span>For an Instant Quote →</span>
            </span>
          </button>

          {/* Reassurance Micro-copy */}
          <p className="flex items-center justify-center gap-2 mt-3 text-sm text-white/70">
            <Lock size={14} />
            <span>No credit card required - Takes 30 seconds</span>
          </p>

          {/* Trust Line */}
          <p
            style={{
              color: '#FFFFFF',
              fontSize: '17px',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)',
              fontStyle: 'italic',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}
          >
            No minimums. No setup fees. Quantity discounts. No account required.
          </p>

          {/* Cutoff Time Disclaimer */}
          <p
            style={{
              color: '#FFFFFF',
              fontSize: '11px',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)',
              fontStyle: 'italic',
              marginTop: '12px',
              textTransform: 'lowercase',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}
          >
            *cutoff time 4PM for next day processing
          </p>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div:nth-child(3) {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          section h1 {
            font-size: 36px !important;
            letter-spacing: 1.5px !important;
            line-height: 1.3 !important;
          }
          section p:nth-of-type(1) {
            font-size: 19px !important;
          }
          section p:nth-of-type(2) {
            font-size: 22px !important;
          }
          section p:nth-of-type(3) {
            font-size: 17px !important;
          }
          section button {
            padding: 18px 45px !important;
            font-size: 16px !important;
            margin-bottom: 16px !important;
          }
        }

        /* Desktop optimization for larger viewports */
        @media (min-width: 1920px) {
          section > div:nth-child(3) {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          section h1 {
            font-size: 72px !important;
            line-height: 1.5 !important;
            margin-bottom: 3rem !important;
          }
        }

        /* Enhanced focus states for accessibility */
        .hero-cta-button:focus {
          outline: 3px solid #FFFFFF;
          outline-offset: 4px;
        }

        /* Smooth transitions */
        .hero-cta-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default Hero;

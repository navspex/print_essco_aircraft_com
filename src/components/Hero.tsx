import React, { useState } from 'react';
import { Calculator, Lock, Play } from 'lucide-react';
import manualImage from '../assets/aviation-manual-spiral-binding-print-service.png';

const YOUTUBE_VIDEO_ID = 'f38Db1XeIQM';
const YOUTUBE_THUMB_ID = '2t8xmJP_ytU'; // original pitch thumb

const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

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

      {/* Hero Content — split layout: text left, video right */}
      <div
        className="relative hero-content-grid"
        style={{ zIndex: 3, paddingTop: '40px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}
      >
        {/* LEFT: Text + CTA */}
        <div className="hero-text-col" style={{ textAlign: 'center' }}>
          {/* Main Headline */}
          <h1
            className="mb-12 hero-headline"
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
            className="mx-auto mb-12 hero-subheadline"
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
            className="hero-trust-line"
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

        {/* RIGHT: Pitch Video (16:9) */}
        <div className="hero-video-col">
          <div className="hero-video-wrapper">
            {!videoLoaded ? (
              <button
                onClick={() => setVideoLoaded(true)}
                className="hero-video-thumbnail"
                aria-label="Play pitch video"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  background: `url(https://img.youtube.com/vi/${YOUTUBE_THUMB_ID}/maxresdefault.jpg) center/cover no-repeat`,
                  borderRadius: '12px',
                  padding: 0,
                }}
              >
                <div className="hero-video-overlay">
                  <div className="hero-play-btn">
                    <Play size={32} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '4px' }} />
                  </div>
                </div>
                <div className="hero-video-label">See How It Works</div>
              </button>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="ESSCO Print On Demand — How It Works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        .hero-content-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
          align-items: center;
          max-width: 1160px;
          margin: 0 auto;
        }

        .hero-text-col {
          text-align: center;
        }

        .hero-video-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 16:9 aspect ratio wrapper */
        .hero-video-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.15);
          background: #000;
        }

        .hero-video-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          transition: background 0.3s;
        }

        .hero-play-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(110, 75, 108, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .hero-video-thumbnail:hover .hero-video-overlay {
          background: rgba(0, 0, 0, 0.12);
        }

        .hero-video-thumbnail:hover .hero-play-btn {
          transform: scale(1.12);
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.6);
        }

        .hero-video-label {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          white-space: nowrap;
          font-family: 'Oswald', sans-serif;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Tablet: stack video above text */
        @media (max-width: 960px) {
          .hero-content-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .hero-video-col {
            order: -1;
            max-width: 420px;
            margin: 0 auto;
            width: 100%;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-content-grid {
            padding-top: 24px !important;
            padding-bottom: 24px !important;
          }

          .hero-headline {
            font-size: 36px !important;
            letter-spacing: 1.5px !important;
            line-height: 1.3 !important;
            margin-bottom: 1.5rem !important;
          }

          .hero-subheadline {
            font-size: 19px !important;
            margin-bottom: 1.5rem !important;
          }

          .hero-cta-button {
            padding: 18px 45px !important;
            font-size: 16px !important;
            margin-bottom: 16px !important;
          }

          .hero-trust-line {
            font-size: 15px !important;
          }

          .hero-video-col {
            max-width: 340px;
          }

          .hero-play-btn {
            width: 56px;
            height: 56px;
          }

          .hero-play-btn svg {
            width: 24px;
            height: 24px;
          }
        }

        /* Large desktop */
        @media (min-width: 1920px) {
          .hero-content-grid {
            padding-top: 50px !important;
            padding-bottom: 50px !important;
            grid-template-columns: 1fr 460px;
          }

          .hero-headline {
            font-size: 72px !important;
            line-height: 1.5 !important;
            margin-bottom: 3rem !important;
          }
        }

        .hero-cta-button:focus {
          outline: 3px solid #FFFFFF;
          outline-offset: 4px;
        }

        .hero-cta-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default Hero;

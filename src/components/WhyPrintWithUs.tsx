import React from 'react';
import { Zap, Scale, BookOpen, FolderOpen, Award } from 'lucide-react';

const WhyPrintWithUs: React.FC = () => {
  return (
    <section style={{ background: '#ffffff', width: '100%', padding: '50px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <h2
          className="section-heading"
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '36px',
            fontWeight: 700,
            color: '#6e4b6c',
            marginBottom: '40px',
            textAlign: 'left'
          }}
        >
          Why print with us?
        </h2>

        <div className="items-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Item 1 - Fast */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Zap size={32} color="#6e4b6c" strokeWidth={2} />
            <div>
              <h3
                className="item-heading"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '8px'
                }}
              >
                We're fast
              </h3>
              <p
                className="item-description"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '17px',
                  color: '#555555',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                  margin: 0
                }}
              >
                Upload today, we start printing tomorrow.
              </p>
            </div>
          </div>

          {/* Item 2 - No Minimums */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Scale size={32} color="#6e4b6c" strokeWidth={2} />
            <div>
              <h3
                className="item-heading"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '8px'
                }}
              >
                We don't play games with minimums
              </h3>
              <p
                className="item-description"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '17px',
                  color: '#555555',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                  margin: 0
                }}
              >
                Need 1 copy? Fine. Need 1,000? Also fine. You pay the same fair price either way.
              </p>
            </div>
          </div>

          {/* Item 3 - Technical Binding */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <BookOpen size={32} color="#6e4b6c" strokeWidth={2} />
            <div>
              <h3
                className="item-heading"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '8px'
                }}
              >
                We know how to bind technical docs
              </h3>
              <p
                className="item-description"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '17px',
                  color: '#555555',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                  margin: 0
                }}
              >
                Spiral, comb, or perfect binding. Laminated covers. Fold-outs for schematics and diagrams.
              </p>
            </div>
          </div>

          {/* Item 4 - Manual Archive */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <FolderOpen size={32} color="#6e4b6c" strokeWidth={2} />
            <div>
              <h3
                className="item-heading"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '8px'
                }}
              >
                We've probably printed your manual before
              </h3>
              <p
                className="item-description"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '17px',
                  color: '#555555',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                  margin: 0
                }}
              >
                We have 180,000 aviation and industrial manuals on file. Reprints are easy.
              </p>
            </div>
          </div>

          {/* Item 5 - Experience */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Award size={32} color="#6e4b6c" strokeWidth={2} />
            <div>
              <h3
                className="item-heading"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '8px'
                }}
              >
                We've been doing this a long time
              </h3>
              <p
                className="item-description"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '17px',
                  color: '#555555',
                  lineHeight: 1.6,
                  maxWidth: '700px',
                  margin: 0
                }}
              >
                70 years printing docs for companies that can't afford mistakes.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .section-heading {
            font-size: 28px !important;
          }
          .item-heading {
            font-size: 20px !important;
          }
          .item-description {
            font-size: 16px !important;
          }
          .items-container {
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyPrintWithUs;

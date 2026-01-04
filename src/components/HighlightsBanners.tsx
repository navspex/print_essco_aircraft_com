import React from 'react';

const HighlightsBanners: React.FC = () => {
  const highlights = [
    {
      title: '180,000+ Manuals',
      description: 'The largest collection of aircraft manuals in the world',
      icon: '📚',
    },
    {
      title: 'Family Owned',
      description: 'Serving the aviation community since 1985',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Printing Services',
      description: 'Professional printing and binding services available',
      icon: '🖨️',
    },
  ];

  return (
    <section className="py-section bg-essco-bg relative">
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-essco-bg to-transparent pointer-events-none z-10 hidden md:block"></div>

      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-essco-bg to-transparent pointer-events-none z-10 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <h3 className="font-oswald font-semibold uppercase text-essco-maroon text-xl md:text-2xl mb-3">
                {highlight.title}
              </h3>
              <p className="text-essco-dark-gray text-sm md:text-base leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsBanners;

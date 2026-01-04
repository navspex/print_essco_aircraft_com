import React from 'react';

interface Product {
  title: string;
  price: string;
  image: string;
  link: string;
}

const CustomerFavorites: React.FC = () => {
  const products: Product[] = [
    {
      title: 'Cessna 172 Flight Manual',
      price: '$89.95',
      image: 'https://images.pexels.com/photos/157806/plane-cockpit-aircraft-instruments-157806.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: 'https://www.esscoaircraft.com/collections/customer-favorites',
    },
    {
      title: 'Piper Cherokee Service Manual',
      price: '$124.95',
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: 'https://www.esscoaircraft.com/collections/customer-favorites',
    },
    {
      title: 'Boeing 737 Technical Guide',
      price: '$199.95',
      image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: 'https://www.esscoaircraft.com/collections/customer-favorites',
    },
    {
      title: 'Beechcraft Bonanza Manual',
      price: '$149.95',
      image: 'https://images.pexels.com/photos/163811/pexels-photo-163811.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: 'https://www.esscoaircraft.com/collections/customer-favorites',
    },
  ];

  return (
    <section className="py-section bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-oswald font-semibold text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop text-center flex items-center justify-center text-essco-maroon uppercase mb-12">
          Customer Favorites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer bg-white rounded p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
              <a href={product.link} className="block">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
              </a>
              <div className="p-4">
                <a href={product.link}>
                  <h3 className="font-semibold text-essco-dark-gray mb-2 hover:text-essco-maroon transition-colors">
                    {product.title}
                  </h3>
                </a>
                <p className="text-essco-maroon font-bold text-lg mb-4">{product.price}</p>
                <button className="w-full bg-essco-maroon text-white font-semibold py-2 px-4 hover:bg-opacity-90 transition-all uppercase text-sm">
                  Quick Shop
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://www.esscoaircraft.com/collections/customer-favorites"
            className="inline-block bg-essco-maroon text-white font-semibold px-8 py-3 hover:bg-opacity-90 transition-all uppercase tracking-wide"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerFavorites;

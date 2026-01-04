import { ArrowRight } from 'lucide-react';

const promos = [
  {
    title: 'Cessna Manuals',
    count: '2,500+ Items',
    image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#cessna',
    size: 'large',
  },
  {
    title: 'Piper Collection',
    count: '1,800+ Items',
    image: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#piper',
    size: 'small',
  },
  {
    title: 'Beechcraft',
    count: '1,200+ Items',
    image: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#beechcraft',
    size: 'small',
  },
  {
    title: 'Military Aviation',
    count: '3,000+ Items',
    image: 'https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-702642-76971.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#military',
    size: 'medium',
  },
  {
    title: 'Vintage Manuals',
    count: 'Rare Finds',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#vintage',
    size: 'medium',
  },
];

export default function PromoMosaicMedium() {
  return (
    <section className="py-12 bg-essco-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-oswald text-section-title uppercase text-essco-dark-gray mb-3">
            Shop By Brand
          </h2>
          <p className="text-section-desc text-gray-600">
            Over 180,000 aviation items in our inventory
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {promos.map((promo, index) => (
            <a
              key={index}
              href={promo.href}
              className={`group relative overflow-hidden rounded-lg ${
                promo.size === 'large'
                  ? 'col-span-2 row-span-2'
                  : promo.size === 'medium'
                  ? 'col-span-2 md:col-span-1'
                  : ''
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${promo.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-oswald text-lg uppercase text-white mb-1">
                  {promo.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">{promo.count}</p>
                <span className="inline-flex items-center text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse
                  <ArrowRight className="ml-1 w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

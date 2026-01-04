import { BookOpen, Plane, Image, Printer, Archive, Gift } from 'lucide-react';

const categories = [
  {
    icon: BookOpen,
    title: 'Flight Manuals',
    description: 'POH, AFM, and pilot guides',
    href: '#flight-manuals',
  },
  {
    icon: Plane,
    title: 'Service Manuals',
    description: 'Maintenance and overhaul guides',
    href: '#service-manuals',
  },
  {
    icon: Image,
    title: 'Cockpit Posters',
    description: 'Detailed instrument panels',
    href: '#posters',
  },
  {
    icon: Printer,
    title: 'Custom Printing',
    description: 'Your PDFs professionally bound',
    href: '#printing',
  },
  {
    icon: Archive,
    title: 'Vintage Collection',
    description: 'Rare and historical items',
    href: '#vintage',
  },
  {
    icon: Gift,
    title: 'Aviation Gifts',
    description: 'Perfect for pilots',
    href: '#gifts',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-essco-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-oswald text-section-title uppercase text-essco-dark-gray mb-3">
            Featured Categories
          </h2>
          <p className="text-section-desc text-gray-600">
            Find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="group bg-white p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-essco-light-gray group-hover:bg-essco-maroon rounded-full mb-4 transition-colors">
                <category.icon className="w-7 h-7 text-essco-maroon group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-oswald text-sm uppercase text-essco-dark-gray mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-gray-500">{category.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

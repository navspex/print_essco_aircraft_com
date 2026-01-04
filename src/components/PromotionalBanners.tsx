import { ArrowRight, Tag } from 'lucide-react';

const promotions = [
  {
    title: 'Shipping Options',
    description: 'We ship UPS, FEDEX, USPS, or FOB',
    cta: 'Shop Now',
    href: '#shop',
    bgColor: 'bg-essco-maroon',
  },
  {
    title: 'Bulk Discounts',
    description: 'Save 15% on 5+ copies',
    cta: 'Learn More',
    href: '#bulk',
    bgColor: 'bg-essco-navy',
  },
];

export default function PromotionalBanners() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((promo, index) => (
            <a
              key={index}
              href={promo.href}
              className={`group ${promo.bgColor} p-8 rounded-lg flex items-center justify-between transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-oswald text-xl uppercase text-white mb-1">
                    {promo.title}
                  </h3>
                  <p className="text-white/80 text-sm">{promo.description}</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center text-white font-oswald uppercase tracking-wide">
                {promo.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

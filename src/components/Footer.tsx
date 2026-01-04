import { Phone, Mail, Clock, ShieldCheck, CreditCard, Award } from 'lucide-react';

const footerSections = [
  {
    title: 'Customer Service',
    links: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'Order Status', href: '#orders' },
      { label: 'My Account', href: '#account' },
      { label: 'Privacy Policy', href: '#privacy' },
    ],
  },
  {
    title: 'Store Policies & Info',
    links: [
      { label: 'Shipping Policy', href: '#shipping' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Refund Policy', href: '#refunds' },
    ],
  },
  {
    title: 'Helpful Links',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'We Buy Manuals', href: '#buy-manuals' },
      { label: 'Shop All', href: '#shop' },
    ],
  },
];

const socialLinks = [
  { label: 'Twitter', href: '#twitter' },
  { label: 'Pinterest', href: '#pinterest' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'YouTube', href: '#youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-essco-dark-gray text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-oswald text-lg uppercase text-white mb-4">About ESSCO Aircraft</h3>
            <p className="text-sm leading-relaxed mb-4">
              Over 50 years of providing quality aircraft manuals and aviation memorabilia.
              Our extensive library contains over 180,000 items.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-oswald text-lg uppercase text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
              <a href="tel:877-318-1555" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                877-318-1555
              </a>
              <a href="mailto:esscosupport@aol.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                esscosupport@aol.com
              </a>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Monday-Friday, 9am-4pm
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 py-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <ShieldCheck size={20} className="text-green-500" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <CreditCard size={20} className="text-blue-400" />
          <span>PayPal Accepted</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Award size={20} className="text-yellow-500" />
          <span>70 Years Trusted</span>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} ESSCO Aircraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

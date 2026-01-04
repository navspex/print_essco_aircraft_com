import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, FileText, Link2, FoldVertical, Layers, Plus, Lock } from 'lucide-react';

const sectionIcons: Record<string, React.ReactNode> = {
  'print-rates': <FileText size={18} className="mr-2 text-gray-700" />,
  'binding': <Link2 size={18} className="mr-2 text-gray-700" />,
  'foldouts': <FoldVertical size={18} className="mr-2 text-gray-700" />,
  'lamination': <Layers size={18} className="mr-2 text-gray-700" />,
  'addons': <Plus size={18} className="mr-2 text-gray-700" />,
};

interface PricingSection {
  id: string;
  title: string;
  description?: string;
  rows: {
    label: string;
    tier1?: string;
    tier2?: string;
    tier3?: string;
    singlePrice?: string;
  }[];
}

const PricingTransparency: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['print-rates']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const pricingSections: PricingSection[] = [
    {
      id: 'print-rates',
      title: 'Print Rates (Per Page)',
      description: 'Volume discounts automatically applied',
      rows: [
        {
          label: 'Black & White',
          tier1: '$0.32',
          tier2: '$0.26',
          tier3: '$0.21'
        },
        {
          label: 'Full Color',
          tier1: '$0.89',
          tier2: '$0.69',
          tier3: '$0.49'
        }
      ]
    },
    {
      id: 'binding',
      title: 'Binding Options',
      rows: [
        { label: 'Spiral Binding', singlePrice: '$3.50' },
        { label: 'Comb Binding', singlePrice: '$2.50' },
        { label: 'Perfect Binding', singlePrice: '$8.00' },
        { label: '3-Ring Ready (No Binding)', singlePrice: 'FREE' }
      ]
    },
    {
      id: 'foldouts',
      title: 'Fold-Out Pages',
      description: 'Oversized pages that fold out from the manual',
      rows: [
        {
          label: 'B&W Fold-Outs',
          tier1: '$6.00',
          tier2: '$5.25',
          tier3: '$4.50'
        },
        {
          label: 'Color Fold-Outs',
          tier1: '$8.00',
          tier2: '$7.00',
          tier3: '$6.00'
        }
      ]
    },
    {
      id: 'lamination',
      title: 'Lamination (Per Page)',
      description: 'Protect important pages with durable lamination',
      rows: [
        {
          label: 'Letter Size - 3mil',
          singlePrice: '$2.00'
        },
        {
          label: 'Letter Size - 5mil',
          singlePrice: '$2.50'
        },
        {
          label: 'Letter Size - 10mil',
          singlePrice: '$3.50'
        },
        {
          label: 'Legal Size - 3mil',
          singlePrice: '$2.50'
        },
        {
          label: 'Legal Size - 5mil',
          singlePrice: '$3.00'
        },
        {
          label: 'Legal Size - 10mil',
          singlePrice: '$4.00'
        },
        {
          label: 'Ledger Size - 3mil',
          singlePrice: '$5.00'
        },
        {
          label: 'Ledger Size - 5mil',
          singlePrice: '$6.00'
        },
        {
          label: 'Ledger Size - 10mil',
          singlePrice: '$7.50'
        }
      ]
    },
    {
      id: 'addons',
      title: 'Professional Add-Ons',
      rows: [
        { label: 'Heavy Card Stock Cover', singlePrice: '$2.00' },
        { label: 'Professional Divider Tabs', singlePrice: '$1.50 each' }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Clear, Competitive Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees. No surprises. Just honest pricing for professional printing services.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium">Volume Discounts</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium">No Setup Fees</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium">Same-Day Available</span>
          </div>
        </div>

        {/* Pricing Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          {pricingSections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const hasVolumePricing = section.rows[0]?.tier1 !== undefined;

            return (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Section Header (Collapsible) */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left flex-1">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      {sectionIcons[section.id]}
                      {section.title}
                    </h3>
                    {section.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {section.description}
                      </p>
                    )}
                  </div>
                  {section.id === 'print-rates' && (
                    <span className="text-sm text-gray-500 mr-4 hidden sm:inline">
                      Example: 100 B&W pages = $26
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Pricing Table (Expandable) */}
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              {hasVolumePricing ? 'Option' : 'Service'}
                            </th>
                            {hasVolumePricing ? (
                              <>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                                  1-99 pages
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                                  100-499 pages
                                </th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                                  500+ pages
                                </th>
                              </>
                            ) : (
                              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                                Price
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 text-gray-900">
                                {row.label === 'Spiral Binding' ? (
                                  <span className="flex items-center gap-2">
                                    {row.label}
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                      Most Popular
                                    </span>
                                  </span>
                                ) : (
                                  row.label
                                )}
                              </td>
                              {hasVolumePricing ? (
                                <>
                                  <td className="py-3 px-4 text-center font-semibold text-gray-900">
                                    {row.tier1}
                                  </td>
                                  <td className="py-3 px-4 text-center font-semibold text-gray-900">
                                    {row.tier2}
                                  </td>
                                  <td className="py-3 px-4 text-center font-semibold text-gray-900">
                                    {row.tier3}
                                  </td>
                                </>
                              ) : (
                                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                                  {row.singlePrice}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Large Order Notice */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Large Orders Over $500
                </h4>
                <p className="text-gray-700">
                  Need a custom quote for high-volume orders? Orders exceeding $500 
                  qualify for personalized pricing and dedicated support. Simply 
                  configure your order below and we'll provide a custom quote within 
                  24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to Calculator */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to see your exact price?
          </p>
          <a
            href="#calculator"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            SEE MY PRICE &rarr;
          </a>
          <p className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
            <Lock size={14} className="text-green-600" />
            <span>Secure upload - Files auto-delete after 7 days</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;

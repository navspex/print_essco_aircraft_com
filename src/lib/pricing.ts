// ESSCO POD Calculator - Pricing Logic
// KISS Formula: Total = (Pages × Rate) + Binding + Cover + Tabs
// Volume pricing: Total pages determines tier for ALL pages

export interface PricingTier {
  min: number;
  max: number;
  bwRate: number;
  colorRate: number;
}

export const PRICING_TIERS: PricingTier[] = [
  { min: 1, max: 50, bwRate: 0.32, colorRate: 0.89 },
  { min: 51, max: 1000, bwRate: 0.24, colorRate: 0.59 },
  { min: 1001, max: Infinity, bwRate: 0.21, colorRate: 0.49 },
];

// Updated binding options per user spec (Jan 22, 2026)
// Spiral/Coil deferred to later
export const BINDING_OPTIONS = {
  none: { label: '3-Ring Ready (No Binding)', price: 0.00, weightGrams: 0 },
  comb: { label: 'Comb Binding', price: 2.50, weightGrams: 12 },
  perfect: { label: 'Perfect Binding (Glued Spine)', price: 8.00, weightGrams: 20 },
} as const;

export const COVER_OPTIONS = {
  none: { label: 'No Cover', price: 0.00, weightGrams: 0 },
  card: { label: 'Heavy Card Stock', price: 2.00, weightGrams: 30 }, // 15g front + 15g back
  plastic: { label: 'Clear Front / Black Back Plastic', price: 2.50, weightGrams: 30 },
} as const;

export const TAB_SET_PRICE = 5.00;
export const TAB_SET_WEIGHT_GRAMS = 10;

// Paper weight constants (researched Session 20)
export const PAPER_WEIGHT_GRAMS_PER_SHEET = 4.5; // 20lb bond standard

export type BindingType = keyof typeof BINDING_OPTIONS;
export type CoverType = keyof typeof COVER_OPTIONS;

export interface PricingInput {
  bwPages: number;
  colorPages: number;
  copies: number;
  binding: BindingType;
  cover: CoverType;
  hasTabs: boolean;
  foldoutPages?: number; // 11x17 pages (counted same as regular)
}

export interface PricingBreakdown {
  // Page costs
  bwPagesCost: number;
  colorPagesCost: number;
  totalPagesCost: number;
  
  // Per-copy add-ons (multiplied by copies)
  bindingCost: number;
  coverCost: number;
  tabsCost: number;
  
  // Totals
  subtotal: number;
  totalPrice: number;
  
  // Tier info
  tierApplied: number; // 1, 2, or 3
  bwRate: number;
  colorRate: number;
  totalPages: number;
  
  // Weight calculation
  totalWeightGrams: number;
  totalWeightLbs: number;
  shippingWeightLbs: number; // Rounded up to nearest 0.1 lb
  
  // Triggers
  requiresManualQuote: boolean;
  quoteReason?: string;
}

/**
 * Find pricing tier based on total page count
 */
function findTier(totalPages: number): PricingTier {
  return PRICING_TIERS.find(t => totalPages >= t.min && totalPages <= t.max) || PRICING_TIERS[0];
}

/**
 * Calculate shipping weight
 */
function calculateWeight(input: PricingInput): { grams: number; lbs: number; shippingLbs: number } {
  const { bwPages, colorPages, copies, binding, cover, hasTabs } = input;
  const totalPagesPerCopy = bwPages + colorPages;
  
  // Interior paper weight (all copies)
  const interiorGrams = totalPagesPerCopy * copies * PAPER_WEIGHT_GRAMS_PER_SHEET;
  
  // Cover weight (per copy)
  const coverGrams = COVER_OPTIONS[cover].weightGrams * copies;
  
  // Binding hardware (per copy)
  const bindingGrams = BINDING_OPTIONS[binding].weightGrams * copies;
  
  // Tabs (per copy)
  const tabsGrams = hasTabs ? TAB_SET_WEIGHT_GRAMS * copies : 0;
  
  const totalGrams = interiorGrams + coverGrams + bindingGrams + tabsGrams;
  const totalLbs = totalGrams / 453.592;
  const shippingLbs = Math.ceil(totalLbs * 10) / 10; // Round up to 0.1 lb
  
  return { grams: totalGrams, lbs: totalLbs, shippingLbs };
}

/**
 * Main pricing calculation function
 * KISS formula with volume pricing model
 */
export function calculatePrice(input: PricingInput): PricingBreakdown {
  const { bwPages, colorPages, copies, binding, cover, hasTabs } = input;
  
  // Total pages for volume tier calculation
  const totalPages = (bwPages + colorPages) * copies;
  
  // Find applicable tier (volume pricing - same rate for ALL pages)
  const tier = findTier(totalPages);
  const tierNumber = PRICING_TIERS.indexOf(tier) + 1;
  
  // Calculate page costs
  const bwPagesCost = bwPages * copies * tier.bwRate;
  const colorPagesCost = colorPages * copies * tier.colorRate;
  const totalPagesCost = bwPagesCost + colorPagesCost;
  
  // Calculate per-copy add-ons
  const bindingCost = BINDING_OPTIONS[binding].price * copies;
  const coverCost = COVER_OPTIONS[cover].price * copies;
  const tabsCost = hasTabs ? TAB_SET_PRICE * copies : 0;
  
  // Total
  const subtotal = totalPagesCost + bindingCost + coverCost + tabsCost;
  const totalPrice = Math.round(subtotal * 100) / 100; // Round to cents
  
  // Weight calculation
  const weight = calculateWeight(input);
  
  // Check manual quote triggers
  let requiresManualQuote = false;
  let quoteReason: string | undefined;
  
  if (totalPrice > 500) {
    requiresManualQuote = true;
    quoteReason = 'Order exceeds $500 - manual quote required';
  } else if (weight.shippingLbs > 25) {
    requiresManualQuote = true;
    quoteReason = 'Order exceeds 25 lbs - manual quote required';
  } else if (copies > 100) {
    requiresManualQuote = true;
    quoteReason = 'More than 100 copies - manual quote required';
  }
  
  return {
    bwPagesCost: Math.round(bwPagesCost * 100) / 100,
    colorPagesCost: Math.round(colorPagesCost * 100) / 100,
    totalPagesCost: Math.round(totalPagesCost * 100) / 100,
    bindingCost: Math.round(bindingCost * 100) / 100,
    coverCost: Math.round(coverCost * 100) / 100,
    tabsCost: Math.round(tabsCost * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    totalPrice,
    tierApplied: tierNumber,
    bwRate: tier.bwRate,
    colorRate: tier.colorRate,
    totalPages,
    totalWeightGrams: Math.round(weight.grams),
    totalWeightLbs: Math.round(weight.lbs * 100) / 100,
    shippingWeightLbs: weight.shippingLbs,
    requiresManualQuote,
    quoteReason,
  };
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Get tier description for display
 */
export function getTierDescription(tierNumber: number): string {
  switch (tierNumber) {
    case 1: return '1-50 pages';
    case 2: return '51-1,000 pages (volume discount)';
    case 3: return '1,001+ pages (best rate)';
    default: return '';
  }
}

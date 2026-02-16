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

// Updated binding options per user spec (Jan 23, 2026)
// V34: Added saddle stitch for ≤60 pages, 3-hole punch now $1
export const BINDING_OPTIONS = {
  none: { label: '3-Hole Punched (No Binding)', price: 1.00, weightGrams: 0 },
  saddle: { label: 'Saddle Stitch (≤60 pages)', price: 1.00, weightGrams: 5 },
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

// Large format pricing - dynamic calculation based on square footage
// KIP 860 can print up to 36" wide × unlimited length
// Pricing: $X per square foot, scales with area
export const LARGE_FORMAT_PRICING = {
  // Base rates per square foot
  BW_PER_SQ_FT: 2.80,      // ~$0.019/sq inch B&W
  COLOR_PER_SQ_FT: 6.50,   // ~$0.045/sq inch color
  
  // Minimum charge (prevents tiny pages being too cheap)
  MIN_BW_PRICE: 3.00,      // Minimum $3 B&W
  MIN_COLOR_PRICE: 5.00,   // Minimum $5 color
  
  // Maximum width KIP 860 can handle
  MAX_WIDTH_INCHES: 36,
};

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
  foldoutPages?: number; // Count of 11×17 to 36" pages
  largeFormatPages?: {
    pageNumber: number;
    widthInches: number;
    heightInches: number;
    isColor: boolean;
  }[]; // Detailed dimensions for pricing
  hasOversizedPages?: boolean; // Pages > 36" (triggers manual quote)
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
 * Calculate pricing for large format pages (11×17 to 36" wide)
 * Uses dynamic square footage calculation - ANY size within 36" width gets auto-priced
 */
function calculateLargeFormatCost(largeFormatPages: { widthInches: number; heightInches: number; isColor: boolean; }[], copies: number): number {
  if (!largeFormatPages || largeFormatPages.length === 0) return 0;
  
  let totalCost = 0;
  
  for (const page of largeFormatPages) {
    // Calculate area in square feet
    const areaSquareInches = page.widthInches * page.heightInches;
    const areaSquareFeet = areaSquareInches / 144; // 144 sq in = 1 sq ft
    
    // Calculate base cost from area
    const baseCost = page.isColor 
      ? areaSquareFeet * LARGE_FORMAT_PRICING.COLOR_PER_SQ_FT
      : areaSquareFeet * LARGE_FORMAT_PRICING.BW_PER_SQ_FT;
    
    // Apply minimum charge (prevents tiny pages being underpriced)
    const pageCost = page.isColor
      ? Math.max(baseCost, LARGE_FORMAT_PRICING.MIN_COLOR_PRICE)
      : Math.max(baseCost, LARGE_FORMAT_PRICING.MIN_BW_PRICE);
    
    totalCost += pageCost * copies;
  }
  
  return totalCost;
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
 * Now includes large format auto-pricing for pages up to 36"
 */
export function calculatePrice(input: PricingInput): PricingBreakdown {
  const { bwPages, colorPages, copies, binding, cover, hasTabs, largeFormatPages, hasOversizedPages } = input;
  
  // Separate standard pages from large format pages
  const standardBwPages = largeFormatPages ? bwPages - largeFormatPages.filter(p => !p.isColor).length : bwPages;
  const standardColorPages = largeFormatPages ? colorPages - largeFormatPages.filter(p => p.isColor).length : colorPages;
  
  // Total STANDARD pages for volume tier calculation (large format priced separately)
  const totalStandardPages = (standardBwPages + standardColorPages) * copies;
  
  // Find applicable tier for standard pages (volume pricing - same rate for ALL pages)
  const tier = findTier(totalStandardPages);
  const tierNumber = PRICING_TIERS.indexOf(tier) + 1;
  
  // Calculate STANDARD page costs
  const bwPagesCost = standardBwPages * copies * tier.bwRate;
  const colorPagesCost = standardColorPages * copies * tier.colorRate;
  const standardPagesCost = bwPagesCost + colorPagesCost;
  
  // Calculate LARGE FORMAT costs (11×17 to 36")
  const largeFormatCost = largeFormatPages ? calculateLargeFormatCost(largeFormatPages, copies) : 0;
  
  // Total pages cost
  const totalPagesCost = standardPagesCost + largeFormatCost;
  
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
  
  // Only trigger manual quote for pages LARGER than 36" (KIP 860 max)
  if (hasOversizedPages) {
    requiresManualQuote = true;
    quoteReason = `Document contains pages larger than 36" - please call 877-318-1555 for custom pricing`;
  } else if (totalPrice > 500) {
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

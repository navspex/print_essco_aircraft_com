/**
 * ESSCO Print Calculator - Shipping Weight Calculator
 * 
 * Calculates estimated shipping weight for print jobs.
 * Errs slightly high (~10%) for safety margin on shipping costs.
 * 
 * Created: January 4, 2026
 * 
 * WEIGHT CONSTANTS (verified sources):
 * - 20lb Bond Paper: 75 gsm = ~4.5g per letter sheet
 * - Using 5.0g per sheet (errs 10% high for safety)
 * - Heavy Cover Stock: 176 gsm = ~11g per letter sheet
 */

// ==================== TYPE DEFINITIONS ====================

export interface PrintJobWeightParams {
  pageCount: number;           // Total PDF pages
  quantity: number;            // Number of copies
  bindingType: 'none' | 'spiral' | 'comb' | 'perfect';
  heavyCover: boolean;
  laminationPages: number;
  laminationThickness: '3mil' | '5mil' | '10mil' | 'none';
}

export interface WeightCalculationResult {
  weightPerCopyGrams: number;
  totalWeightGrams: number;
  totalWeightLbs: number;
  totalWeightOz: number;
  requiresQuote: boolean;
  quoteReason: string | null;
  breakdown: {
    paper: number;
    binding: number;
    covers: number;
    lamination: number;
    packaging: number;
  };
}

// ==================== WEIGHT CONSTANTS ====================

/**
 * Paper weight: 5 grams per sheet
 * Based on 20lb bond @ 75gsm = 4.5g, rounded UP for safety margin
 * This accounts for potential heavier paper stock used in aviation manuals
 */
const GRAMS_PER_SHEET = 5.0;

/**
 * Binding weights in grams
 * Base weight + incremental weight per page (accounts for coil/comb size scaling)
 */
const BINDING_WEIGHTS = {
  none: { base: 0, perPage: 0 },
  spiral: { base: 30, perPage: 0.08 },  // Plastic coil, scales with doc thickness
  comb: { base: 25, perPage: 0.06 },    // Plastic comb binding
  perfect: { base: 75, perPage: 0.12 }, // Glue + spine material
};

/**
 * Cover weights in grams (for 2 covers - front + back)
 */
const COVER_WEIGHTS = {
  standard: 10,  // 2 standard covers @ 5g each
  heavy: 22,     // 2 heavy card stock covers @ 11g each
};

/**
 * Lamination weight per page in grams
 * Includes both sides of lamination pouch
 */
const LAMINATION_WEIGHTS = {
  none: 0,
  '3mil': 2,
  '5mil': 3,
  '10mil': 5,
};

/**
 * Packaging buffer: 5% of total weight
 * Accounts for box, padding, tape, label
 */
const PACKAGING_BUFFER_PERCENT = 0.05;

/**
 * Quote thresholds
 */
const QUOTE_THRESHOLD_PRICE = 500;     // Dollars
const QUOTE_THRESHOLD_WEIGHT_LBS = 15; // Pounds

// ==================== CONVERSION HELPERS ====================

const gramsToLbs = (grams: number): number => grams / 453.592;
const gramsToOz = (grams: number): number => grams / 28.3495;

// ==================== MAIN CALCULATION FUNCTION ====================

/**
 * Calculate estimated shipping weight for a print job
 * 
 * @param params - Print job configuration
 * @returns Detailed weight calculation with breakdown
 * 
 * @example
 * const weight = calculateShippingWeight({
 *   pageCount: 127,
 *   quantity: 1,
 *   bindingType: 'spiral',
 *   heavyCover: true,
 *   laminationPages: 0,
 *   laminationThickness: 'none'
 * });
 * // Returns: { totalWeightGrams: 737, totalWeightLbs: 1.62, ... }
 */
export function calculateShippingWeight(params: PrintJobWeightParams): WeightCalculationResult {
  const {
    pageCount,
    quantity,
    bindingType,
    heavyCover,
    laminationPages,
    laminationThickness
  } = params;

  // Validate inputs
  if (pageCount <= 0 || quantity <= 0) {
    return {
      weightPerCopyGrams: 0,
      totalWeightGrams: 0,
      totalWeightLbs: 0,
      totalWeightOz: 0,
      requiresQuote: false,
      quoteReason: null,
      breakdown: { paper: 0, binding: 0, covers: 0, lamination: 0, packaging: 0 }
    };
  }

  // Calculate paper weight
  const paperWeight = pageCount * GRAMS_PER_SHEET;

  // Calculate binding weight (scales with document thickness)
  const bindingConfig = BINDING_WEIGHTS[bindingType];
  const bindingWeight = bindingConfig.base + (pageCount * bindingConfig.perPage);

  // Calculate cover weight
  const coverWeight = heavyCover ? COVER_WEIGHTS.heavy : COVER_WEIGHTS.standard;

  // Calculate lamination weight
  const lamThickness = laminationThickness === 'none' ? 'none' : laminationThickness;
  const laminationWeight = laminationPages * LAMINATION_WEIGHTS[lamThickness];

  // Weight per single copy (before packaging)
  const weightPerCopyBase = paperWeight + bindingWeight + coverWeight + laminationWeight;

  // Total weight for all copies
  const totalBaseWeight = weightPerCopyBase * quantity;

  // Add packaging buffer (5%)
  const packagingWeight = Math.ceil(totalBaseWeight * PACKAGING_BUFFER_PERCENT);
  const totalWeightGrams = totalBaseWeight + packagingWeight;

  // Convert to other units
  const totalWeightLbs = gramsToLbs(totalWeightGrams);
  const totalWeightOz = gramsToOz(totalWeightGrams);

  // Check quote threshold for weight
  const requiresQuoteForWeight = totalWeightLbs > QUOTE_THRESHOLD_WEIGHT_LBS;
  let quoteReason: string | null = null;
  
  if (requiresQuoteForWeight) {
    quoteReason = `Order weight (${totalWeightLbs.toFixed(1)} lbs) exceeds ${QUOTE_THRESHOLD_WEIGHT_LBS} lb threshold`;
  }

  return {
    weightPerCopyGrams: Math.ceil(weightPerCopyBase),
    totalWeightGrams: Math.ceil(totalWeightGrams),
    totalWeightLbs: Math.round(totalWeightLbs * 100) / 100, // Round to 2 decimals
    totalWeightOz: Math.round(totalWeightOz * 100) / 100,
    requiresQuote: requiresQuoteForWeight,
    quoteReason,
    breakdown: {
      paper: Math.ceil(paperWeight * quantity),
      binding: Math.ceil(bindingWeight * quantity),
      covers: Math.ceil(coverWeight * quantity),
      lamination: Math.ceil(laminationWeight * quantity),
      packaging: packagingWeight
    }
  };
}

// ==================== QUOTE THRESHOLD CHECKER ====================

/**
 * Check if order requires a quote (either by price OR weight)
 * 
 * @param totalPrice - Order total in dollars
 * @param totalWeightLbs - Total weight in pounds
 * @returns Object with requiresQuote flag and reason
 */
export function checkQuoteThresholds(
  totalPrice: number, 
  totalWeightLbs: number
): { requiresQuote: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (totalPrice > QUOTE_THRESHOLD_PRICE) {
    reasons.push(`Order total ($${totalPrice.toFixed(2)}) exceeds $${QUOTE_THRESHOLD_PRICE}`);
  }

  if (totalWeightLbs > QUOTE_THRESHOLD_WEIGHT_LBS) {
    reasons.push(`Order weight (${totalWeightLbs.toFixed(1)} lbs) exceeds ${QUOTE_THRESHOLD_WEIGHT_LBS} lbs`);
  }

  return {
    requiresQuote: reasons.length > 0,
    reasons
  };
}

// ==================== SHOPIFY API WEIGHT FORMAT ====================

/**
 * Format weight for Shopify Draft Order API
 * Shopify accepts WeightInput with unit and value
 * 
 * @param totalWeightGrams - Total weight in grams
 * @returns Shopify WeightInput object
 */
export function formatWeightForShopify(totalWeightGrams: number): { unit: string; value: number } {
  return {
    unit: 'GRAMS',
    value: Math.ceil(totalWeightGrams)
  };
}

// ==================== EXAMPLE CALCULATIONS ====================

/**
 * Example weight calculations for reference:
 * 
 * Small Manual (50 pages, spiral, standard cover, qty 1):
 * - Paper: 50 × 5g = 250g
 * - Binding: 30 + (50 × 0.08) = 34g
 * - Covers: 10g
 * - Subtotal: 294g × 1.05 = 309g (0.68 lbs)
 * 
 * Typical POH (127 pages, spiral, heavy cover, qty 1):
 * - Paper: 127 × 5g = 635g
 * - Binding: 30 + (127 × 0.08) = 40g
 * - Covers: 22g
 * - Subtotal: 697g × 1.05 = 732g (1.61 lbs)
 * 
 * Large Manual (287 pages, perfect, heavy cover, qty 1):
 * - Paper: 287 × 5g = 1,435g
 * - Binding: 75 + (287 × 0.12) = 109g
 * - Covers: 22g
 * - Subtotal: 1,566g × 1.05 = 1,644g (3.62 lbs)
 * 
 * Training Batch (50 pages, spiral, standard, qty 10):
 * - Per copy: 294g
 * - 10 copies: 2,940g
 * - With packaging: 3,087g (6.81 lbs)
 * 
 * Heavy Order (500 pages, perfect, heavy, qty 5):
 * - Per copy: 2,697g
 * - 5 copies: 13,485g
 * - With packaging: 14,159g (31.2 lbs) → REQUIRES QUOTE (>15 lbs)
 */

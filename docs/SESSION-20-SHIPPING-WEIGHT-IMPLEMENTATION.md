# SHIPPING WEIGHT IMPLEMENTATION - SESSION 20
**ESSCO Print Calculator**  
**Date:** January 4, 2026  
**Status:** CODE COMPLETE - AWAITING SHOPIFY SETUP

---

## SUMMARY

Implemented shipping weight calculation that:
1. ✅ Calculates weight based on pages, binding, covers, lamination
2. ✅ Errs ~10% high for safety margin
3. ✅ Adds >15 lbs quote threshold (in addition to >$500)
4. ✅ Passes weight to Shopify Draft Order API
5. ✅ Enables carrier-calculated shipping (UPS/FedEx/USPS)
6. ✅ US-only shipping (country defaults to "US")

---

## QUOTE THRESHOLDS (DUAL)

| Threshold | Value | Result |
|-----------|-------|--------|
| **Price** | >$500 | → Quote Request Form |
| **Weight** | >15 lbs | → Quote Request Form |

If EITHER threshold is exceeded, customer sees quote form instead of checkout.

---

## WEIGHT CALCULATION FORMULA

```
PAPER:      pageCount × 5 grams per sheet
BINDING:    base + (pageCount × increment)
            - Spiral: 30g + (pages × 0.08g)
            - Comb: 25g + (pages × 0.06g)
            - Perfect: 75g + (pages × 0.12g)
COVERS:     Standard: 10g | Heavy: 22g
LAMINATION: 3mil: 2g/page | 5mil: 3g/page | 10mil: 5g/page
PACKAGING:  +5% buffer

TOTAL = (paper + binding + covers + lamination) × quantity × 1.05
```

---

## EXAMPLE CALCULATIONS

| Job Description | Pages | Qty | Binding | Cover | Weight | Quote? |
|-----------------|-------|-----|---------|-------|--------|--------|
| Small manual | 50 | 1 | Spiral | Std | 0.68 lbs | No |
| Typical POH | 127 | 1 | Spiral | Heavy | 1.61 lbs | No |
| Large manual | 287 | 1 | Perfect | Heavy | 3.62 lbs | No |
| Training batch | 50 | 10 | Spiral | Std | 6.81 lbs | No |
| Heavy order | 500 | 5 | Perfect | Heavy | 31.2 lbs | **YES** |

---

## FILES CREATED

### 1. `/home/claude/shipping-weight-calculator.ts`
TypeScript module with:
- `calculateShippingWeight()` - Main calculation function
- `checkQuoteThresholds()` - Dual threshold checker
- `formatWeightForShopify()` - API format helper
- Full type definitions

### 2. `/home/claude/create-draft-order.js`
Updated Cloudflare Pages Function with:
- `weight` field in lineItems
- `requiresShipping: true` flag
- Weight included in order notes
- Country defaults to "US"

---

## API PAYLOAD (UPDATED)

```json
{
  "email": "customer@example.com",
  "totalPrice": 147.50,
  "quantity": 1,
  "documentName": "Cessna 172 POH",
  "pageCount": 127,
  "bwPages": 100,
  "colorPages": 27,
  "bindingType": "Spiral Binding",
  "foldoutCount": 2,
  "laminationPages": 0,
  "heavyCover": true,
  "dividerTabs": 0,
  "shippingWeightGrams": 732,  // ← NEW FIELD
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "company": "Aviation LLC",
    "address1": "123 Runway Dr",
    "address2": "Hangar 5",
    "city": "Lorain",
    "province": "OH",
    "zip": "44053",
    "country": "US",
    "phone": "555-123-4567"
  }
}
```

---

## DALE'S ACTION ITEMS (REQUIRED)

### ⚠️ CRITICAL: Enable Carrier-Calculated Shipping

ESSCO is on **Shopify Grow** plan. Carrier-calculated shipping is NOT included by default.

**Option A: Pay $20/month**
1. Go to Shopify Help Center
2. Chat with support
3. Request: "Add carrier-calculated shipping for $20/month"

**Option B: Switch to Annual Billing (RECOMMENDED)**
1. Shopify Admin → Settings → Plan
2. Change to yearly billing
3. Get carrier-calculated shipping FREE + 10% plan discount
4. Contact support to confirm it's enabled

### Connect Carrier Accounts

After enabling carrier-calculated shipping:

1. **Shopify Admin → Settings → Shipping and delivery**
2. **Carrier accounts section → Connect carrier account**
3. Connect at least one:
   - ✅ USPS (easiest - no account needed)
   - ✅ UPS (requires UPS account)
   - ✅ FedEx (requires FedEx account)

### Configure Shipping Zone

1. **Shipping and delivery → General shipping rates**
2. **Domestic zone → Add rate**
3. Select **"Use carrier or app to calculate rates"**
4. Choose connected carriers
5. Select services (Ground, Priority, Express, etc.)

### Set Store Location

1. **Settings → Locations**
2. Ensure ESSCO's address is correct:
   - KLPR Lorain County Regional Airport
   - Correct ZIP for accurate rate calculation

---

## FRONTEND INTEGRATION (Next Step)

Once Shopify is configured, add to calculator:

```typescript
// In calculator component, after price calculation:
import { calculateShippingWeight, checkQuoteThresholds } from './shipping-weight-calculator';

const weightResult = calculateShippingWeight({
  pageCount,
  quantity,
  bindingType,
  heavyCover,
  laminationPages,
  laminationThickness
});

const quoteCheck = checkQuoteThresholds(totalPrice, weightResult.totalWeightLbs);

if (quoteCheck.requiresQuote) {
  // Show quote form instead of checkout
  setShowQuoteForm(true);
  setQuoteReasons(quoteCheck.reasons);
} else {
  // Proceed to checkout with weight
  const payload = {
    ...orderData,
    shippingWeightGrams: weightResult.totalWeightGrams
  };
  // POST to /api/create-draft-order
}
```

---

## VERIFICATION CHECKLIST

### Shopify Setup (Dale)
- [ ] Carrier-calculated shipping enabled (Option A or B)
- [ ] At least one carrier connected (USPS recommended)
- [ ] Shipping zone configured with carrier rates
- [ ] Store location address verified
- [ ] Test order placed to verify rates appear

### Code Deployment (Claude)
- [ ] Update `create-draft-order.js` in repo
- [ ] Add weight calculation to calculator component
- [ ] Add dual threshold checking
- [ ] Add quote form for threshold cases
- [ ] Test end-to-end flow

---

## EXPECTED CUSTOMER EXPERIENCE

### Normal Order (<$500, <15 lbs):
```
1. Configure print job
2. Enter email + shipping address
3. Click "Checkout"
4. Redirected to Shopify checkout
5. Customer sees real-time shipping options:
   - USPS Priority Mail: $X.XX (2-3 days)
   - UPS Ground: $X.XX (5-7 days)
   - FedEx Express: $X.XX (1-2 days)
6. Customer selects shipping, pays
7. Order appears in Shopify Admin
```

### Large Order (>$500 OR >15 lbs):
```
1. Configure print job
2. Calculator shows: "This order requires a quote"
   - Reason: "Order total exceeds $500" and/or
   - Reason: "Order weight (31.2 lbs) exceeds 15 lbs"
3. Customer fills out quote request form
4. Form submitted to dale@esscoaircraft.com
5. Dale provides custom quote with shipping
```

---

## NEXT SESSION PRIORITIES

1. **Verify Shopify carrier shipping is enabled** (Dale)
2. **Deploy updated API** (5 min)
3. **Add weight calculation to calculator** (15 min)
4. **Add quote form for threshold orders** (30 min)
5. **Add email + shipping form to calculator** (45 min)
6. **Test end-to-end flow** (30 min)

**Estimated time:** 2-3 hours (assuming Shopify is configured)

---

**CODE COMPLETE - AWAITING SHOPIFY CONFIGURATION**

Dale: Please complete the carrier-calculated shipping setup in Shopify Admin, then confirm ready to proceed with frontend integration.

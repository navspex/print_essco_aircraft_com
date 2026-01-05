# SESSION 21 ROLLOVER DOCUMENT
**ESSCO Print Calculator - print.esscoaircraft.com**  
**Date:** January 5, 2026  
**Previous Sessions:** 20 sessions completed  
**Status:** READY FOR FRONTEND INTEGRATION

---

## PASTE THIS INTO SESSION 21

```
ESSCO Print Calculator - Session 21

CONTEXT:
- 70-year aviation business at KLPR
- Building print-on-demand calculator at print.esscoaircraft.com
- Architecture: React frontend (Cloudflare Pages) + Shopify Draft Orders
- 20 sessions completed

CURRENT STATE:
✅ Marketing page LIVE: https://print.esscoaircraft.com
✅ Backend API LIVE: /api/create-draft-order (with weight field)
✅ Shipping weight calculator DEPLOYED: src/lib/shipping-weight-calculator.ts
✅ Shopify Shipping already configured (UPS/USPS calculated rates active)
❌ Calculator UI not wired to backend yet
❌ No email/shipping address form yet
❌ Checkout button not functional yet

IMMEDIATE TASK:
Wire the frontend calculator to the backend API.

PHASE 3 OBJECTIVES (This Session):
1. Add email input field to calculator
2. Add shipping address form
3. Integrate shipping weight calculator
4. Wire "Proceed to Checkout" button to /api/create-draft-order
5. Redirect to Shopify checkout URL on success
6. Add loading/error states

CRITICAL DISCOVERY (Session 20-21):
Shopify already has carrier-calculated shipping active. NO Shopify changes needed.
The Draft Order API now includes weight field for accurate shipping calculation.

REPO: https://github.com/navspex/print_essco_aircraft_com
LIVE: https://print.esscoaircraft.com

CREDENTIALS IN CLOUDFLARE ENV VARS:
- SHOPIFY_SHOP=esscoair-craft.myshopify.com
- SHOPIFY_ACCESS_TOKEN=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

GITHUB TOKEN (for API pushes):
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

NOTE: git clone is blocked by proxy, but curl to GitHub API works for file updates.

PROTOCOL:
- /STRICT /COMPLY /DOCUMENTED
- /VERIFY all APIs against current documentation
- Complete working code (not snippets)
- Push via GitHub API (curl), not git clone

START WITH: View App.tsx to see current calculator structure, then build integration.
```

---

## PROJECT OVERVIEW

### Business Context
- **Owner:** Dale (His Royal Largeness)
- **Company:** ESSCO Aircraft - 70-year family aviation business
- **Location:** KLPR Lorain County Regional Airport
- **Assets:** 180,000 aviation manual titles, 25,000 Mailchimp subscribers
- **Goal:** Print-on-demand calculator to leverage existing printing capacity

### Architecture Decision (LOCKED)
- **Frontend:** React + Vite + TypeScript on Cloudflare Pages
- **Backend:** Cloudflare Pages Functions
- **Payments:** Shopify Draft Orders → Checkout Link
- **Database:** None needed (Shopify handles orders)
- **Cost:** $0/month (saves $1,260-3,255/year vs Shopify apps)

---

## WHAT'S DEPLOYED AND WORKING

### Frontend (print.esscoaircraft.com)
| Component | Status | Notes |
|-----------|--------|-------|
| Marketing Page | ✅ LIVE | Hero, Trust Signals, Pricing, FAQ |
| Calculator UI | ✅ LIVE | Form works, calculates prices |
| Hover Effects | ✅ LIVE | Section-level scale + glow |
| SSL | ✅ Active | Google CA certificate |

### Backend (/api/*)
| Endpoint | Status | Notes |
|----------|--------|-------|
| `/api/health` | ✅ LIVE | Returns version 1.0.0 |
| `/api/create-draft-order` | ✅ LIVE | Creates Shopify Draft Orders with weight |

### Shopify Integration
| Feature | Status | Notes |
|---------|--------|-------|
| Draft Order API | ✅ Working | Test order #D7330 created in Session 18 |
| Custom App | ✅ Configured | "ESSCO Print Calculator" with write_draft_orders scope |
| Shipping Rates | ✅ Already Active | UPS/USPS calculated rates at checkout |
| Weight Field | ✅ Now Included | API updated Session 20 |

---

## WHAT'S NOT WORKING YET

### Frontend Gaps
| Component | Status | Required |
|-----------|--------|----------|
| Email Input | ❌ Missing | Required before checkout |
| Shipping Address Form | ❌ Missing | Required for carrier rates |
| Weight Display | ❌ Missing | Nice-to-have |
| Checkout Button Wiring | ❌ Missing | Must call API |
| Loading States | ❌ Missing | UX requirement |
| Error Handling | ❌ Missing | UX requirement |
| Quote Form | ❌ Missing | For orders >$500 or >15 lbs |

### Integration Gaps
| Flow | Status | Notes |
|------|--------|-------|
| Calculator → API | ❌ Not wired | Button does nothing |
| API → Redirect | ❌ Not wired | No redirect to Shopify |
| Weight Calculation | ❌ Not integrated | Module exists, not used |

---

## KEY FILES IN REPOSITORY

### Frontend
```
src/
├── App.tsx                    # Main app with PrintCalculator component
├── components/
│   ├── Header.tsx            # Navigation
│   └── ...                   # Other components
├── lib/
│   └── shipping-weight-calculator.ts  # NEW - Weight calculation module
```

### Backend (Cloudflare Pages Functions)
```
functions/
└── api/
    ├── create-draft-order.js  # UPDATED - Now includes weight field
    └── health.js              # Health check endpoint
```

### Documentation
```
docs/
└── SESSION-20-SHIPPING-WEIGHT-IMPLEMENTATION.md  # Weight implementation notes
```

---

## SHIPPING WEIGHT CALCULATOR

### Location
`src/lib/shipping-weight-calculator.ts`

### Usage
```typescript
import { calculateShippingWeight, checkQuoteThresholds } from './lib/shipping-weight-calculator';

const weight = calculateShippingWeight({
  pageCount: 127,
  quantity: 1,
  bindingType: 'spiral',
  heavyCover: true,
  laminationPages: 0,
  laminationThickness: 'none'
});

// Returns:
// {
//   totalWeightGrams: 732,
//   totalWeightLbs: 1.61,
//   requiresQuote: false,
//   breakdown: { paper: 635, binding: 40, covers: 22, ... }
// }

const thresholds = checkQuoteThresholds(totalPrice, weight.totalWeightLbs);
// Returns: { requiresQuote: true/false, reasons: [...] }
```

### Quote Thresholds
- **Price:** >$500 → Requires quote
- **Weight:** >15 lbs → Requires quote

---

## DRAFT ORDER API

### Endpoint
`POST /api/create-draft-order`

### Request Body
```json
{
  "email": "customer@example.com",
  "documentName": "Cessna 172 POH",
  "totalPrice": 147.50,
  "pageCount": 127,
  "bwPages": 127,
  "colorPages": 0,
  "bindingType": "spiral",
  "foldoutCount": 0,
  "laminationPages": 0,
  "heavyCover": true,
  "dividerTabs": 0,
  "quantity": 1,
  "shippingWeightGrams": 732,
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "company": "ABC Aviation",
    "address1": "123 Airport Way",
    "address2": "Hangar 5",
    "city": "Cleveland",
    "province": "OH",
    "zip": "44135",
    "country": "US",
    "phone": "216-555-1234"
  }
}
```

### Response (Success)
```json
{
  "success": true,
  "draftOrderId": "gid://shopify/DraftOrder/123456",
  "checkoutUrl": "https://esscoair-craft.myshopify.com/...",
  "orderName": "#D7331",
  "totalWeight": 732
}
```

### Response (Error)
```json
{
  "error": "Missing required field: email"
}
```

---

## PRICING MODEL (LOCKED)

### Print Rates (per PDF page)
| Tier | Pages | B&W | Color |
|------|-------|-----|-------|
| 1 | 1-99 | $0.25 | $0.75 |
| 2 | 100-499 | $0.20 | $0.62 |
| 3 | 500+ | $0.17 | $0.54 |

### Binding Options
| Type | Price |
|------|-------|
| None | $0.00 |
| Spiral | $3.50 |
| Comb | $2.50 |
| Perfect | $8.00 |

### Add-Ons
| Option | Price |
|--------|-------|
| Heavy Card Stock Cover | $2.00 |
| Divider Tab | $1.50 each |
| Fold-out (B&W) | $4.50-6.00 |
| Fold-out (Color) | $6.00-8.00 |
| Lamination | $2.00-7.50/page |

---

## CREDENTIALS

### GitHub
- **Username:** navspex
- **Repository:** print_essco_aircraft_com
- **Token:** `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`
- **Note:** Use curl API, not git clone (proxy blocks clone)

### Cloudflare
- **Account ID:** 13d315bc593c7c736ee2324525b2b15d
- **Project:** essco-print
- **Domain:** print.esscoaircraft.com

### Shopify (in Cloudflare env vars)
- **Shop:** esscoair-craft.myshopify.com
- **Token:** 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
- **Scopes:** write_draft_orders, read_draft_orders

---

## SESSION 20-21 KEY DISCOVERIES

### 1. Shopify Shipping Already Works
**Problem:** We thought CCS (Carrier-Calculated Shipping) needed upgrade.  
**Reality:** ESSCO already has "Shopify Shipping calculated rates" active.

| Feature | Status |
|---------|--------|
| UPS calculated rates | ✅ Active |
| USPS calculated rates | ✅ Active |
| Weight-based calculation | ✅ Working |
| Third-party CCS | ❌ Not needed |

### 2. Two Different Shipping Features
| Feature | What It Does | ESSCO Has It? |
|---------|--------------|---------------|
| Shopify Shipping Labels | Buy discounted labels after order | ✅ YES |
| Shopify Shipping Rates | Show carrier rates at checkout | ✅ YES |
| Third-Party CCS | Use YOUR OWN carrier account | ❌ Not needed |

### 3. Annual Billing Recommendation (Optional)
- Monthly: $105/month = $1,260/year
- Annual: $79/month = $948/year
- **Savings:** $312/year (not urgent, calculator works without it)

---

## SESSION 21 TASK LIST

### Priority 1: Email + Shipping Form (30 min)
```
□ Add email input field to calculator
□ Add shipping address form section
  - firstName, lastName (required)
  - company (optional)
  - address1 (required), address2 (optional)
  - city, province/state, zip (required)
  - phone (optional)
□ Form validation (email format, required fields)
```

### Priority 2: Weight Integration (15 min)
```
□ Import shipping-weight-calculator.ts
□ Call calculateShippingWeight() when config changes
□ Display estimated weight (optional)
□ Check quote thresholds (price OR weight)
```

### Priority 3: Checkout Button (30 min)
```
□ Wire "Proceed to Checkout" button
□ Collect all form data
□ POST to /api/create-draft-order
□ Handle loading state (disable button, show spinner)
□ Handle error state (show message)
□ On success: redirect to checkoutUrl
```

### Priority 4: Quote Form (30 min)
```
□ If requiresQuote is true, show quote form instead
□ Quote form collects: name, email, phone, message
□ Submit to email (or just show contact info)
```

### Priority 5: Testing (30 min)
```
□ Test with small order (<$500, <15 lbs)
□ Test with large order (>$500 or >15 lbs)
□ Verify Shopify Draft Order appears
□ Verify checkout link works
□ Verify shipping rates appear at checkout
```

**Estimated Time:** 2-3 hours

---

## VERIFICATION COMMANDS

### Check Live Site
```bash
curl -I https://print.esscoaircraft.com/
# Expected: HTTP/2 200
```

### Check Health Endpoint
```bash
curl https://print.esscoaircraft.com/api/health
# Expected: {"status":"ok","version":"1.0.0",...}
```

### Test Draft Order API
```bash
curl -X POST https://print.esscoaircraft.com/api/create-draft-order \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","totalPrice":50,"shippingAddress":{"firstName":"Test","lastName":"User","address1":"123 Test St","city":"Cleveland","province":"OH","zip":"44135"}}'
```

### Check Recent Commits
```bash
curl -s -H "Authorization: token github_pat_..." \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/commits?per_page=5"
```

---

## GIT WORKFLOW (Via API)

### View File
```bash
curl -s -H "Authorization: token TOKEN" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/PATH"
```

### Update File
```bash
# Get current SHA
SHA=$(curl -s -H "Authorization: token TOKEN" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/PATH" \
  | grep '"sha"' | head -1 | sed 's/.*"sha": "\([^"]*\)".*/\1/')

# Encode content
CONTENT=$(base64 -w 0 /path/to/local/file)

# Push update
curl -X PUT -H "Authorization: token TOKEN" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/PATH" \
  -d '{"message":"Commit message","content":"'$CONTENT'","sha":"'$SHA'"}'
```

### Create New File
```bash
CONTENT=$(base64 -w 0 /path/to/local/file)
curl -X PUT -H "Authorization: token TOKEN" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/PATH" \
  -d '{"message":"Commit message","content":"'$CONTENT'"}'
```

---

## LESSONS LEARNED

### 1. Verify Before Assuming
- I assumed CCS upgrade was needed
- Reality: Shopify Shipping was already active
- **Lesson:** Always verify current state before planning changes

### 2. Git Clone Blocked, API Works
- Claude environment blocks `git clone` via proxy
- But `curl` to GitHub API works fine
- **Lesson:** Use API for file operations

### 3. Push Immediately, Not "Later"
- Session 20: Built code, said "awaiting configuration"
- Code sat locally, almost lost
- **Lesson:** Push to GitHub immediately after building

### 4. Check Transcripts for Context
- Important decisions buried in 800-line transcript
- Transcript search is essential for multi-session projects
- **Lesson:** Document key decisions in rollover docs

---

## CONTACT INFO

- **Owner:** Dale (dale@esscoaircraft.com)
- **Company:** ESSCO Aircraft
- **Phone:** 877-318-1555
- **Location:** KLPR Lorain County Regional Airport

---

## NEXT SESSION CHECKLIST

Before starting Session 21:
1. ✅ Confirm print.esscoaircraft.com loads
2. ✅ Confirm /api/health returns OK
3. ✅ Review this rollover document
4. □ Read current App.tsx structure
5. □ Begin frontend integration

---

**DOCUMENT VERSION:** 1.0  
**LAST UPDATED:** January 5, 2026  
**STATUS:** READY FOR SESSION 21

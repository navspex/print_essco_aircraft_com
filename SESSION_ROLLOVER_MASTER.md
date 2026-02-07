# ESSCO PRINT CALCULATOR - SESSION ROLLOVER MASTER DOCUMENT
## Last Updated: 2026-02-07 Session 35

---

# ⚠️ CRITICAL: READ THIS ENTIRE DOCUMENT BEFORE ANY ACTION ⚠️

## THE PROBLEM THIS DOCUMENT SOLVES

Claude sessions degrade in quality over time due to:
1. **Context compaction** - summaries lose critical details
2. **Accumulated familiarity** - skipping verification because "I know this project"
3. **Local file drift** - working directory resets, stale files treated as source of truth
4. **Lazy verification** - ignoring /VERIFY protocol despite user instructions

**RESULT:** Session 21 destroyed all hover effects by pushing a stale local file instead of fetching current GitHub state first.

---

# 🔴 MANDATORY PRE-ACTION PROTOCOL

## Before EVERY Code Change:

```
1. FETCH CURRENT STATE FROM GITHUB (not local files)
   curl -s -H "Authorization: token $TOKEN" \
     "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/src/App.tsx" \
     | python3 -c "import json,sys,base64; d=json.load(sys.stdin); print(base64.b64decode(d['content']).decode('utf-8'))" \
     > /home/claude/CURRENT_App.tsx

2. VERIFY PRESERVED FEATURES EXIST IN FETCHED FILE
   grep -c "hover:scale-\[1.02\]" /home/claude/CURRENT_App.tsx  # Should be 7+
   grep -c "hover:scale-\[1.05\]" /home/claude/CURRENT_App.tsx  # Should be 1+
   grep -c "hover:shadow" /home/claude/CURRENT_App.tsx          # Should be 5+

3. DOCUMENT ROLLBACK POINT
   Current SHA: [get from API]
   Features verified: [list what grep found]

4. ONLY THEN make changes to CURRENT_App.tsx (not a new file)

5. SHOW DIFF before pushing (what changed, what preserved)
```

## VIOLATION = Immediate /COMPLY from user

---

# 📁 PROJECT ARCHITECTURE

## Repository Structure
```
navspex/print_essco_aircraft_com
├── src/
│   ├── App.tsx                    ← MAIN FILE (marketing page + inline calculator)
│   ├── main.tsx                   ← Entry point
│   ├── index.css                  ← Tailwind imports
│   └── components/
│       ├── Header.tsx             ← Navigation (USED)
│       ├── Footer.tsx             ← Footer (USED - but inline in App.tsx currently)
│       ├── PrintCalculator.tsx    ← ORPHANED - exists but NOT imported
│       └── [other unused components]
├── functions/
│   └── api/
│       ├── create-draft-order.ts  ← Shopify Draft Order API
│       └── health.ts              ← Health check endpoint
└── public/
    └── images/                    ← All site imagery
```

## CRITICAL ARCHITECTURAL NOTE

**PrintCalculator.tsx EXISTS but is NOT USED.**

Current App.tsx has calculator defined INLINE (~200 lines within App.tsx).

**PROPER FIX (not yet done):**
1. Update PrintCalculator.tsx with KISS pricing + email/shipping/API
2. Update App.tsx to `import PrintCalculator from './components/PrintCalculator'`
3. Remove inline calculator from App.tsx
4. Result: Calculator changes never touch marketing page

---

# ✅ FEATURES THAT MUST BE PRESERVED

## Marketing Page Features (in App.tsx)

| Feature | Location | Grep Pattern |
|---------|----------|--------------|
| Hero CTA glow on hover | Hero section | `hover:scale-[1.05]` |
| Section block bloom | All sections | `hover:scale-[1.02]` (7 instances) |
| Section shadow glow | All sections | `hover:shadow-2xl` |
| Amber glow effect | Multiple | `hover:shadow-amber-500` |
| Background transitions | Sections with images | `transition-all duration-500` |
| KISS pricing display | Pricing section | `$0.32`, `$0.24`, `$0.21` |

## Calculator Features (currently inline in App.tsx)

| Feature | Status |
|---------|--------|
| PDF upload UI | ✅ Live |
| Page count input | ✅ Live |
| Quantity input | ✅ Live |
| Color pages input | ✅ Live |
| Single/double sided toggle | ✅ Live |
| Binding options (spiral/comb/perfect/none) | ✅ Live |
| Fold-out pages | ✅ Live |
| Lamination options | ✅ Live |
| Add-ons (heavy cover, divider tabs) | ✅ Live |
| Order summary with breakdown | ✅ Live |
| Volume discount display | ✅ Live |
| Basic PayPal button (non-functional) | ✅ Live |

## Calculator Features NEEDED (Session 21 objective - NOT YET LIVE)

| Feature | Status |
|---------|--------|
| Email input field | ❌ NOT LIVE |
| Shipping address form (9 fields) | ❌ NOT LIVE |
| Shipping weight calculator | ❌ NOT LIVE |
| Weight display in summary | ❌ NOT LIVE |
| Checkout → /api/create-draft-order | ❌ NOT LIVE |
| Loading spinner during API call | ❌ NOT LIVE |
| Error display | ❌ NOT LIVE |
| Quote form for >$500 OR >25 lbs | ❌ NOT LIVE |

---

# 🔧 CREDENTIALS & ENDPOINTS

## GitHub
- Repo: `navspex/print_essco_aircraft_com`
- Token: `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`
- API Base: `https://api.github.com/repos/navspex/print_essco_aircraft_com`

## Cloudflare Pages
- Account: `13d315bc593c7c736ee2324525b2b15d`
- Project: `essco-print`
- Live URL: `https://print.esscoaircraft.com`
- Pages URL: `https://essco-print.pages.dev`
- Auto-deploys on GitHub push

## Shopify
- Store: `esscoair-craft.myshopify.com`
- Token: `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`
- API: Admin REST API 2024-01

---

# 🔄 GIT RECOVERY REFERENCE

## Key Commits (Rollback Points)

| SHA | Date | Description | Safe to Rollback? |
|-----|------|-------------|-------------------|
| `d11393f` | 2026-01-05 | RESTORE with hover effects | ✅ CURRENT LIVE |
| `f5fb886` | 2026-01-04 | Hero CTA button grow + glow | ✅ |
| `387c692` | 2026-01-04 | Section blocks SCALE 2% + glow | ✅ |
| `c9ec62f` | 2026-01-04 | FAQ + Why Us + KISS pricing | ✅ |
| `9013a9d` | 2026-01-04 | Bolt Revision 56 baseline | ✅ |

## Recovery Commands

```bash
# View any past version without changing live:
curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/src/App.tsx?ref=f5fb886" \
  | python3 -c "import json,sys,base64; d=json.load(sys.stdin); print(base64.b64decode(d['content']).decode('utf-8'))"

# Get current SHA:
curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/src/App.tsx" \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['sha'])"

# Push update (requires current SHA):
curl -s -X PUT \
  -H "Authorization: token $TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/navspex/print_essco_aircraft_com/contents/src/App.tsx" \
  -d '{"message":"COMMIT MSG","content":"BASE64_CONTENT","sha":"CURRENT_SHA"}'
```

---

# 📋 SESSION START CHECKLIST

```
□ Read this entire document
□ Fetch current App.tsx from GitHub (NOT local files)
□ Verify hover effects present (grep patterns above)
□ Document current SHA as rollback point
□ Understand what features exist vs what's needed
□ Confirm approach with user before coding
□ For ANY file change: fetch → verify → modify → diff → push
```

---

# 🚨 ANTI-PATTERNS TO AVOID

## ❌ NEVER DO THIS:
1. Create new App.tsx from scratch
2. Push local file without fetching current GitHub version first
3. Assume you know what's in a file without verifying
4. Skip grep verification of preserved features
5. Push without showing diff of what changed
6. Trust compaction summary as complete project state
7. Work from memory of previous sessions

## ✅ ALWAYS DO THIS:
1. Fetch current state from GitHub API
2. Grep to verify critical features exist
3. Make INCREMENTAL changes to fetched file
4. Show before/after comparison
5. Document rollback SHA before pushing
6. Test build locally before pushing if possible

---

# 🎯 SESSION 35 HANDOFF — February 7, 2026

### Completed This Session:
- Regenerated and verified all credentials (GitHub PAT, Cloudflare token, Shopify token)
- Confirmed page size bug was already fixed (Feb 5)
- Upgraded to Cloudflare Workers Paid ($5/mo) for 30-second CPU limit
- Built server-side PDF analysis Worker (analyze-pdf.js) with pdf-lib — THEN discovered:
  - pdf-lib is abandoned (last publish 4 years ago)
  - Cloudflare Pages Functions have 100MB request body limit (OH-58 manual is 104MB → 413 error)
  - Server-side approach was wrong direction
- **V36 FINAL FIX:** Replaced entire approach with PDF.js `getOperatorList()` for large files
  - ≤25MB: existing canvas pixel-level color detection (unchanged, proven)
  - \>25MB: PDF.js operator list scanning — reads drawing commands for color ops, no canvas, no rendering, no memory explosion
  - Same library (pdfjs-dist v5.4.624, actively maintained, published 4 days ago)
  - Zero new dependencies, removed dead pdf-lib
  - `page.cleanup()` added after each page to prevent memory buildup
  - Everything browser-side, no server roundtrip for analysis
- Deploy successful, site live at print.esscoaircraft.com

### NOT Completed / NOT Tested:
- **Large PDF test (critical):** OH-58 manual (104MB, 468 pages) needs live test with V36
  - Previous version crashed browser (canvas rendering) or hit 413 (server upload)
  - V36 should work — operator list scanning uses no canvas — but NEEDS CUSTOMER-SIDE VERIFICATION
- **Resend email notifications:** RESEND_API_KEY not set in Cloudflare env. Blocker #3.
- **Marketing execution:** Mailchimp blast, SEO per Editorial Review
- **Server Worker cleanup:** `functions/api/analyze-pdf.js` is still deployed but no longer called by frontend. Can be removed or kept as fallback.

### Current Live State:
- Latest deploy: ab53a203 (Feb 7 2026 15:30 UTC) — deploy:success
- `src/lib/pdfAnalysis.ts` — V36, dual-path color detection (pixels / operators)
- `src/components/calculator/Calculator.tsx` — V36, calls `analyzePDF()` which auto-routes by file size
- `functions/api/analyze-pdf.js` — exists but orphaned (frontend no longer calls it)
- `functions/api/create-draft-order.js` — working, page size fix confirmed
- `functions/api/upload-pdf.js` — working, R2 upload for production files

### Key Architecture Decisions (CONFIRMED BY DALE):
- **Auto color detection stays** — no customer declarations on BW vs color. Ever.
- Customer declares foldout pages (Section 9, Editorial Review)
- Single/double-sided doesn't affect price
- R2 native bindings (not AWS SDK)
- Shopify Draft Orders API
- Orders >$500 or >25 lbs → manual quote

### Prime Directive (NEW — Session 35):
- **Dale is the boss of the build.** Claude is technical support.
- **Never assume design/UX changes** — verify with Dale before implementing
- **Always verify tools are current** before installing (/V protocol)
- **Never rely on training data alone** for tools, libraries, or approaches

### Credentials (verified working Feb 7 2026):
- GitHub PAT: stored locally, 90-day expiry, repo scope — regenerate if expired
- Cloudflare Token: stored locally — verify via `/client/v4/user/tokens/verify`
- Cloudflare Account ID: `13d315bc593c7c736ee2324525b2b15d`
- Shopify token: encrypted in Cloudflare env, verified working via API
- RESEND_API_KEY: ❌ NOT SET — next session blocker
- **All tokens verified via live API calls Feb 7 2026. Ask Dale for current values if needed.**

### Next Session Must:
1. **Test V36 with OH-58 manual** (104MB PDF) — verify operator list color detection works on real large file
2. If V36 fails on large file: investigate whether `getOperatorList()` chokes on 468 scanned pages, consider batching or streaming
3. Clean up orphaned `functions/api/analyze-pdf.js` if V36 confirmed working
4. Set up Resend email notifications (blocker #3)
5. Marketing execution per Editorial Review

### Rollback Point If Needed:
- SHA: b74a7854 (V35 deploy, Feb 7, before V36)
- Reason: Last known working deploy before operator list changes

---

# 📝 SESSION HANDOFF TEMPLATE

When ending a session, document:

```markdown
## Session [N] Handoff - [Date]

### Completed This Session:
- [ item ]

### NOT Completed:
- [ item ]

### Current Live State:
- Commit: [SHA]
- Features working: [list]
- Features broken: [list]

### Next Session Must:
1. [ specific action ]
2. [ specific action ]

### Rollback Point If Needed:
- SHA: [commit]
- Reason: [why this is safe]
```

---

# 🔐 VERIFICATION PROTOCOL (/VERIFY)

When user invokes /VERIFY:

1. **STOP** current action
2. **SEARCH** for current documentation/state
3. **FETCH** live data (not cached/local)
4. **CONFIRM** with user before proceeding
5. **DOCUMENT** what was verified

When user invokes /COMPLY:

1. **ADMIT** the mistake
2. **FETCH** current state immediately
3. **RE-DO** the action correctly
4. **SHOW** verification of correct state

---

# 💡 WHY THIS MATTERS

Dale's time bills at $140/hour.
Wrong answers are expensive.
Destroyed features cost recovery time.
Trust is hard to rebuild.

**Do it right. Verify first. Every time.**


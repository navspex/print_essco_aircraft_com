# ESSCO PRINT CALCULATOR - SESSION ROLLOVER MASTER DOCUMENT
## Last Updated: 2026-01-05 Session 21 (Post-Mortem)

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

# 🎯 CURRENT OBJECTIVE (Session 21 Incomplete)

## Goal: Add checkout flow to calculator WITHOUT destroying marketing page

## Recommended Approach:
1. Update `src/components/PrintCalculator.tsx` (separate file)
2. Add KISS pricing, email/shipping form, weight calc, API integration
3. Update App.tsx to import PrintCalculator instead of inline
4. Two commits: first PrintCalculator.tsx (safe), then App.tsx import change

## Alternative Approach:
1. Fetch current App.tsx from GitHub
2. Modify ONLY the PrintCalculator component section
3. Verify hover effects still present
4. Push single commit

## Quote Threshold: >$500 OR >25 lbs

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

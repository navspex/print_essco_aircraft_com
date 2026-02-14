#!/bin/bash
# ============================================================
# ESSCO print.esscoaircraft.com — GLOBAL PROJECT AUDIT
# ============================================================
# Run from repo root: bash audit.sh
# Exit code 0 = clean | Non-zero = violations found
# 
# This script enforces EVERY guardrail, lesson learned, and
# "never again" rule from Sessions 1-50+. Add new rules here
# as they're discovered. This is the single source of truth.
# ============================================================

FAIL=0
WARN=0

pass() { echo "  ✅ $1"; }
fail() { echo "  ❌ $1"; FAIL=$((FAIL+1)); }
warn() { echo "  ⚠️  $1"; WARN=$((WARN+1)); }
header() { echo ""; echo "━━━ $1 ━━━"; }

# ============================================================
header "1. TRUST DATA INTEGRITY"
# Rule: 34,000 is eBay-only. 250,000+ is total. Never misrepresent.
# ============================================================

COUNT_34K=$(grep -rn "34,000" src/ public/ index.html 2>/dev/null | grep -v "audit.sh" | wc -l)
if [ "$COUNT_34K" -gt 0 ]; then
  fail "Found $COUNT_34K instances of '34,000' — must be zero (eBay-only number, use 250,000+ for total)"
  grep -rn "34,000" src/ public/ index.html 2>/dev/null | grep -v "audit.sh"
else
  pass "Zero '34,000' instances — trust data clean"
fi

COUNT_250K=$(grep -rn "250,000" src/ public/ index.html 2>/dev/null | wc -l)
if [ "$COUNT_250K" -lt 5 ]; then
  warn "Only $COUNT_250K instances of '250,000' — expected on homepage + all spoke pages + footer + meta"
else
  pass "$COUNT_250K instances of '250,000+' across codebase"
fi

# ============================================================
header "2. DEAD LINKS — No links to non-existent pages"
# Rule: Phase C pages don't exist yet. Never link to them.
# ============================================================

DEAD_PAGES=("/corporate-flight-departments" "/aircraft-restoration" "/military-aviation")
for page in "${DEAD_PAGES[@]}"; do
  COUNT=$(grep -rn "href=\"$page\"" src/ 2>/dev/null | wc -l)
  if [ "$COUNT" -gt 0 ]; then
    fail "Found $COUNT links to non-existent page: $page"
    grep -rn "href=\"$page\"" src/ 2>/dev/null
  fi
done
DEAD_TOTAL=$(grep -rn "href=\"/corporate-flight\|href=\"/aircraft-restoration\|href=\"/military-aviation" src/ 2>/dev/null | wc -l)
if [ "$DEAD_TOTAL" -eq 0 ]; then
  pass "Zero dead links to non-existent Phase C pages"
fi

# ============================================================
header "3. HERO IMAGE INTEGRITY"
# Rule: No full-section overlays. Text box at 30% max.
# ============================================================

OVERLAY_COUNT=$(grep -rn "absolute inset-0.*bg-slate" src/ 2>/dev/null | grep -v "audit.sh" | wc -l)
if [ "$OVERLAY_COUNT" -gt 0 ]; then
  fail "Found $OVERLAY_COUNT full-section overlay divs — should be zero (removed in fc21936)"
  grep -rn "absolute inset-0.*bg-slate" src/ 2>/dev/null
else
  pass "Zero full-section overlay divs"
fi

HEAVY_TEXTBOX=$(grep -rn "bg-zoom-container" src/ 2>/dev/null | xargs -I{} sh -c 'echo "{}"' | wc -l)
# Check that text boxes inside bg-zoom-container sections use 30% opacity
HERO_TEXTBOX_HEAVY=$(grep -rn "bg-slate-900/[4-9][0-9].*rounded-xl.*border" src/ 2>/dev/null | wc -l)
if [ "$HERO_TEXTBOX_HEAVY" -gt 0 ]; then
  warn "Found $HERO_TEXTBOX_HEAVY hero text boxes with opacity >40% — should be bg-slate-900/30"
  grep -rn "bg-slate-900/[4-9][0-9].*rounded-xl.*border" src/ 2>/dev/null
else
  pass "Hero text boxes at correct opacity"
fi

# ============================================================
header "4. HEADER SCROLLREVEAL VIOLATION"
# Rule: Header must NEVER be wrapped in ScrollReveal (stacking context trap)
# ============================================================

SR_VIOLATIONS=0
for file in src/App.tsx src/components/*.tsx; do
  # Track ScrollReveal nesting depth — only flag Header when inside an open ScrollReveal
  RESULT=$(awk '/<ScrollReveal/{depth++} depth>0 && /<Header/{print FILENAME":"NR": Header inside ScrollReveal"} /<\/ScrollReveal>/{depth--}' "$file" 2>/dev/null)
  if [ -n "$RESULT" ]; then
    fail "$RESULT"
    SR_VIOLATIONS=$((SR_VIOLATIONS+1))
  fi
done
if [ "$SR_VIOLATIONS" -eq 0 ]; then
  pass "Header not wrapped in ScrollReveal on any page"
fi

# ============================================================
header "5. FOOTER CONSISTENCY"
# Rule: All 10 pages must have identical 4-column footer
# ============================================================

FOOTER_PAGES=(
  "src/App.tsx"
  "src/components/AviationManualPrinting.tsx"
  "src/components/ChecklistPrinting.tsx"
  "src/components/LargeFormatPrinting.tsx"
  "src/components/PosterPage.tsx"
  "src/components/PosterCalculator.tsx"
  "src/components/BindingOptions.tsx"
  "src/components/FlightSchoolMaterials.tsx"
  "src/components/DocumentPreservation.tsx"
  "src/components/FilePreparationGuide.tsx"
)

MISSING_FOOTER=0
MISSING_SUPPORT=0
for file in "${FOOTER_PAGES[@]}"; do
  if [ -f "$file" ]; then
    if ! grep -q "Customer Support" "$file" 2>/dev/null; then
      fail "Missing 'Customer Support' footer column in: $file"
      MISSING_SUPPORT=$((MISSING_SUPPORT+1))
    fi
    if ! grep -q "<footer" "$file" 2>/dev/null; then
      fail "Missing <footer> element in: $file"
      MISSING_FOOTER=$((MISSING_FOOTER+1))
    fi
  else
    fail "File not found: $file"
  fi
done
if [ "$MISSING_FOOTER" -eq 0 ] && [ "$MISSING_SUPPORT" -eq 0 ]; then
  pass "All 10 pages have footer with Customer Support column"
fi

# ============================================================
header "6. SEO INFRASTRUCTURE"
# Rule: sitemap.xml must exist, robots.txt must reference it
# ============================================================

if [ -f "public/sitemap.xml" ]; then
  pass "sitemap.xml exists"
else
  fail "sitemap.xml MISSING — robots.txt references it, crawlers get 404"
fi

if [ -f "public/robots.txt" ]; then
  if grep -q "sitemap.xml" public/robots.txt; then
    pass "robots.txt references sitemap.xml"
  else
    warn "robots.txt exists but doesn't reference sitemap.xml"
  fi
else
  fail "robots.txt MISSING"
fi

# ============================================================
header "7. ROUTE COMPLETENESS"
# Rule: All routes in main.tsx must have routeMeta entries
# ============================================================

ROUTES=$(grep -c "if (path ===" src/main.tsx 2>/dev/null)
META_ENTRIES=$(grep -c "^\s*'/" src/main.tsx 2>/dev/null)
if [ "$ROUTES" -gt 0 ] && [ "$META_ENTRIES" -ge "$ROUTES" ]; then
  pass "$ROUTES routes with $META_ENTRIES routeMeta entries"
else
  warn "Route/meta mismatch: $ROUTES routes vs $META_ENTRIES meta entries"
fi

# ============================================================
header "8. HERO IMAGES — Referenced vs Existing"
# Rule: Every referenced hero image must exist in public/images/
# ============================================================

MISSING_IMAGES=0
for img in $(grep -roh "url(/images/[^)]*)" src/ 2>/dev/null | sed "s|url(/images/||;s|)||" | sort -u); do
  if [ ! -f "public/images/$img" ]; then
    warn "Referenced but MISSING: public/images/$img"
    MISSING_IMAGES=$((MISSING_IMAGES+1))
  fi
done
if [ "$MISSING_IMAGES" -eq 0 ]; then
  pass "All referenced images exist"
else
  warn "$MISSING_IMAGES referenced images missing from public/images/"
fi

# ============================================================
header "9. OG IMAGE DIMENSIONS"
# Rule: og:image:width and og:image:height recommended on all pages
# ============================================================

OG_DIM=$(grep -rn "og:image:width\|og:image:height" src/ 2>/dev/null | wc -l)
if [ "$OG_DIM" -eq 0 ]; then
  warn "og:image:width/height not set on any page (recommended by spec)"
else
  pass "OG image dimensions present"
fi

# ============================================================
header "10. TYPESCRIPT + BUILD"
# Rule: Must compile clean and build successfully
# ============================================================

echo "  Running tsc --noEmit..."
if npx tsc --noEmit 2>&1 | tail -1 | grep -q "error"; then
  fail "TypeScript compilation errors"
  npx tsc --noEmit 2>&1 | grep "error TS"
else
  pass "TypeScript clean"
fi

echo "  Running npm run build..."
if npm run build 2>&1 | grep -q "built in"; then
  pass "Production build successful"
else
  fail "Production build FAILED"
fi

# ============================================================
header "AUDIT SUMMARY"
# ============================================================

echo ""
if [ "$FAIL" -eq 0 ] && [ "$WARN" -eq 0 ]; then
  echo "🟢 ALL CLEAR — Zero failures, zero warnings"
elif [ "$FAIL" -eq 0 ]; then
  echo "🟡 PASS WITH WARNINGS — $WARN warning(s), zero failures"
else
  echo "🔴 AUDIT FAILED — $FAIL failure(s), $WARN warning(s)"
fi
echo ""
echo "Failures: $FAIL | Warnings: $WARN"
echo "Run: bash audit.sh"
echo ""

exit $FAIL

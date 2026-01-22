# V29 Archive

**Archived:** January 22, 2026  
**Reason:** Clean rebuild with automatic PDF analysis capabilities

## What V29 Was:
- Calculator with Shopify Draft Orders integration
- Marketing page (13 components complete, 9.5/10 quality)
- Backend APIs partially working
- Draft Order #D7330 successfully tested

## Why Archived:
- Missing MANDATORY automatic PDF analysis (page count, size detection, color detection)
- SSL certificate errors with AWS SDK for R2
- Google Drive integration blocked by organizational policies
- 29 build versions created technical debt
- Decision: Reset to clean foundation with Opus 4.5

## What Worked (Reference for Rebuild):
- Marketing page components (production ready)
- Shopify Draft Order API (tested working)
- Pricing structure (KISS formula validated)
- Shipping weight calculator (researched and documented)
- Health check endpoint

## What Failed (Avoid):
- AWS SDK for R2 (use native R2 bindings instead)
- Google Drive integration (use R2 storage)
- Manual page counting (defeats the purpose)

## Reference:
See OPUS_COMPLETE_PROJECT_MAP_V1-32.md for complete 32-session history.


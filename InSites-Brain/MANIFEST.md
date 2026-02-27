# InSites Artifact Package — 2025-02-17

## GPTs English Version
- `atarbot-system-en.md` — System prompt for GPTs (Instructions field)
- `atarbot-master-en.md` — Master protocol (Knowledge file upload)

## KG Rendering (Universal)
- `kg.js` — Universal KG engine (replaces kg-he.js + kg-en.js). Auto-detects RTL/LTR from data.
- `knowledge-graph.css` — Shared stylesheet (bilingual, unchanged from current)

## Test Files
- `test-kg-en.html` — Self-contained English KG test (Millwright's Tower)
- `test-kg-he.html` — Self-contained Hebrew KG test (מגדל הטוחן)

## Deployment Notes

### alephplace.com
Upload to `/atar.bot/canvas/`:
- `kg.js` (new — replaces kg-he.js for universal use)
- `knowledge-graph.css` (unchanged — verify current version matches)

### GPTs (OpenAI)
1. Paste `atarbot-system-en.md` content into Instructions
2. Upload `atarbot-master-en.md` as Knowledge file

### Hebrew GPTs
- Optionally update `kg-he.js` reference → `kg.js` in atarbot-master-he.md
- No other changes needed (Hebrew version continues to work as-is)

### Testing
Open test-kg-en.html and test-kg-he.html in browser. Verify:
- EN: LTR layout, English type labels in infowindow
- HE: RTL layout, Hebrew type labels in infowindow
- Both: correct colors per entity type, click-to-info, Escape to close

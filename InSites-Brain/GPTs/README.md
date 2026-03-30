# InSites GPT — Setup Guide (v5.5)

## Quick Start

Use the ready-made GPT: [Open InSites-CAA GPT](https://chatgpt.com/g/g-69ca986712f88191828a4a1122278392-insites-caa26)

## Manual Setup

1. Go to [chatgpt.com](https://chatgpt.com) → Explore GPTs → Create
2. Paste contents of [`instructions.md`](instructions.md) into the **Instructions** field
3. Upload these **knowledge files**:
   - `cbsa-stages.md` — Stages 0-6, frameworks, notation, session report
   - `cbsa-appendices.md` — All reference appendices
   - `kg-spec.md` — Knowledge Graph spec (vis-network + external runtime)
   - `dashboard-spec.md` — Assessment Dashboard spec
   - `ma-ra-spec.md` — Read single assessment workflow
   - `ma-rc-spec.md` — Read collection workflow
   - `collection-dashboard-spec.md` — Collection Dashboard spec
4. Save, upload a heritage document, type **"start"**

## Files

```
instructions.md             ← Paste into Instructions field (~7.2K chars)
cbsa-stages.md              ← Knowledge file: Stages 0-6 + [CA-IP]
cbsa-appendices.md          ← Knowledge file: All appendices
kg-spec.md                  ← Knowledge file: KG (vis-network)
dashboard-spec.md           ← Knowledge file: Dashboard
ma-ra-spec.md               ← Knowledge file: Read Assessment
ma-rc-spec.md               ← Knowledge file: Read Collection
collection-dashboard-spec.md ← Knowledge file: Collection Dashboard
runtime/                    ← KG frontend engine (deployed to alephplace.com)
```

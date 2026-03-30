# [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: This dashboard spec is for **single-assessment** visualization (one site, one CBSA process). For collection-level dashboards (multiple sites), see the MA-RC workflow — collection dashboards have a different data shape and tab structure. Both share the same UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Single-assessment: DM Sans + blue accent (#2563eb). Collection: Inter + stone/amber.

Generate an interactive Assessment Dashboard as a **Canvas document (HTML)** after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

⚠ Apply Language Policy to all dashboard text.

---

## 1. Trigger and Offer

- **Mandatory offer** at end of Stage 6: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- Execute only on acceptance — do not auto-generate.
- Output as a **Canvas document** (self-contained HTML with inline CSS/JS, D3 from CDN).
- Respond **only** with the Canvas directly — no surrounding prose.

## 2. Data Extraction

Re-read all stage outputs from the conversation and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps (list) |
| Timeline | Stage 1 | 5–10 key dated events with **year, label, and change type** (use / structure / setting / infrastructure) |
| Contexts | Stage 1 | Each context: type label, description, **related value categories**, **timespan** |
| Values | Stage 2 | Each value: name, category ([CA-V]), evidence strength (sourced/inferred/uncertain), 1-line summary |
| Attribute Table | Stage 2.2 | Each row: attribute name, associated value categories, site-specific significance, **implication for significance** |
| Authenticity | Stage 3 | Nara Grid as **structured objects**: aspect, attribute description, value expression, integrity rating (high/medium/low-medium/low). Plus summary sentence. |
| Comparative | Stage 4 | Each comparator: name, period, architect (if known), distinction narrative, criteria ratings (rarity, documentation, condition). Plus overall summary. |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level (3=high, 2=medium, 1=low). Derived from Stage 2 implications and Stage 3 ratings. |
| Process Quality | Stage 6 | Quick boosts (list), next steps (list), strengths count, gaps count |
| Knowledge Graph | [CA-KG] | If KG was generated: full nodes and edges JSON. If not: null. |
| Location Coordinates | Stage 0 + context | Lat/lng for asset and each comparator. Explicit from source, inferred from place names, or null. |
| Thematic Clusters | Stages 1–3 | Group values by overlapping contexts, contexts by temporal/causal overlap, vulnerability cells by shared high-impact patterns. |

**Rule**: Only include data that actually appeared in the conversation. Do not fabricate. If a stage was skipped or incomplete, show it as "Not completed" with a visual indicator.

## 3. Data Schema (strict)

```json
{
  "asset": { "name": "", "location": "", "type": "", "period": "", "description": "", "coordinates": { "lat": null, "lng": null }, "coordinateSource": "explicit|inferred|unknown" },
  "dataQuality": { "sources": ["filename.pdf"], "gaps": ["missing X"] },
  "timeline": [
    { "year": "1923–1924", "yearStart": 1923, "label": "...", "changeType": "structure" }
  ],
  "contexts": [
    { "id": "ctx_hist", "type": "historical", "label": "...", "relatedValues": ["Historical", "Technological"], "timespan": "1915–1960s" }
  ],
  "values": [
    { "id": "v_hist", "name": "...", "category": "Historical", "evidence": "sourced", "summary": "..." }
  ],
  "attributeTable": [
    { "attribute": "...", "values": ["Social", "Symbolic"], "significance": "...", "implication": "..." }
  ],
  "authenticity": {
    "grid": [
      { "aspect": "Form & Design", "description": "...", "valueExpression": "Historical, Aesthetic", "rating": "medium" }
    ],
    "summary": "..."
  },
  "comparative": {
    "summary": "...",
    "comparators": [
      { "name": "...", "period": "...", "architect": "...", "distinction": "...", "criteria": { "rarity": "high", "documentation": "moderate", "condition": "unknown" }, "coordinates": { "lat": null, "lng": null } }
    ]
  },
  "significance": { "statement": "..." },
  "vulnerability": [
    { "value": "Historical", "form": 3, "material": 3, "use": 2, "setting": 2 }
  ],
  "processQuality": { "strengths": 3, "gaps": 6, "quickBoosts": ["..."], "nextSteps": ["..."] },
  "stagesCompleted": [0,1,2,3,4,5,6],
  "kg": null,
  "themes": {
    "valueThemes": [{ "id": "", "label": "", "description": "", "valueIds": [], "color": "" }],
    "contextThemes": [{ "id": "", "label": "", "description": "", "contextIds": [], "color": "" }],
    "threatThemes": [{ "id": "", "label": "", "description": "", "vulnerabilities": [], "color": "" }]
  }
}
```

**Schema rules**:
- `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
- `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
- `timeline[].changeType` is mandatory — every event classifies what kind of change occurred.
- `contexts[].relatedValues` links each context to the value categories it generates — this enables cross-referencing.
- `vulnerability` is derived by cross-reading Stage 2 implications against Stage 3 ratings. Impact levels: 3 = loss of this integrity aspect severely damages this value; 2 = moderate damage; 1 = minor or indirect.
- `asset.coordinates`: Extract lat/lng if explicit in source material; infer from well-known place names (e.g., "Kibbutz Ayelet HaShachar" → known coordinates); set null if unknown. Set `coordinateSource` accordingly.
- `comparative.comparators[].coordinates`: Same logic per comparator site.
- `themes`: Group related values/contexts/vulnerabilities by narrative thread. Rules: ≥2 members per theme; only populate if ≥3 values OR ≥3 contexts exist. Label each theme with a short noun phrase (e.g., "Industrial Heritage Identity", "Environmental Vulnerability"). Include 1-sentence rationale in `description`.

## 4. Tab Structure (mandatory — consolidated)

Tabs are consolidated for cognitive load management (~8 tabs, not 11+). Stages that are tightly coupled share a tab. Map is always present.

```
Overview → Map → Timeline → Contexts & Values → [Themes] → Integrity → Comparative → Significance → Report → [Debrief] → [Session Analysis] → AI Query
```

Brackets = conditional: Themes only if ≥2 themes total across all categories; Report — always generate (see [CA-RPT]). AI Query is always present.

**Dashboard announcement (mandatory)**: Before generating, say: "I'll generate an interactive Assessment Dashboard — your full assessment visualized across [N] tabs."

**LIM — No guide banners**: Do not add explanatory info/guide banners at the top of each tab. The dashboard content should speak for itself. If a tab needs explanation, the content is not clear enough.

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps, process summary, sources | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count (not "Completion: 100%"). Integrity range shows color-coded ratings per aspect. Process section: strengths/gaps/quick boosts/next steps (folded from former Process tab). Sources list. |
| **Map** | Asset + mentioned locations (mandatory) | Leaflet map. **Always present** — even for single-site assessments, show the site as a point. If Stage 1, 4, or 5 mention other locations (comparison sites, connected sites, regional context), add as secondary points with labels. Asset: blue circle r=10. Comparators/mentioned: slate circle r=7. Click → popup with details. Coordinate source indicator below map. If coordinates unknown, show a placeholder with "Location not specified in source material." See §4a. |
| **Timeline** | Chronological events | **Proportional spacing** based on year gaps. **Color-coded** by change type (use/structure/setting/infrastructure). Distribution summary. |
| **Contexts & Values** | Context cards + value cards + attribute table (merged) | **Contexts section**: Each card shows type label, description, timespan, **clickable value pills**. **Values section**: Cards with name, category pill, evidence indicator (〰️/💭 per notation key), summary. **Attribute table** below with 🔑 Implication column. Cross-referencing works within this tab: clicking a context highlights its related values inline. |
| **Themes** | Value/context/threat thematic clusters (conditional) | Sub-tab pills: "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Theme cards with colored dot, label, member pills (clickable → navigate to item in home tab). Only if ≥2 themes total. See §4b. |
| **Integrity** | Nara Grid cards + summary + vulnerability matrix | Each card: aspect name, description, value expression pills, **color-coded rating badge** (high=green → low=red). Left border color matches rating. **🔴 Vulnerability Analysis** (visible sub-heading): interpretive callout ABOVE the heat matrix (not below). Legend inline: "🔴 = loss severely damages this value, 🟡 = moderate, ⚪ = minor." Heat matrix: rows = value categories, columns = Nara aspects with integrity rating in header. Only if vulnerability data exists. |
| **Comparative** | Per-comparator cards + summary | Each card: name, period, architect, criteria ratings (color-coded), distinction narrative. Source note. |
| **Significance** | Statement of cultural significance | Styled as a featured block. |
| **Report** | One-page printable assessment summary | Always generate. Export as HTML or PDF. See §4c [CA-RPT]. |
| **Debrief** | Session debrief Q&A (conditional) | Three reflection questions + user responses. Muted process styling. Only if user completed Debrief block after Stage 6. |
| **Session Analysis** | Session Report [CA-IP] (conditional) | Interaction Map, Self-Reflection, Session Signature. Muted process styling. Only if user opted in post-[CA-IP]. |
| **AI Query** | Placeholder mode — starter prompts route to chat | Displays starter prompts; user copies question to GPT conversation for full-context answer. No live API calls. See §9a. |

### 4a. Map Tab Spec (mandatory)

**Condition**: Always render. If `asset.coordinates.lat` is non-null, show Leaflet map with markers. If coordinates unknown, show placeholder: "📍 Location not specified in source material — add coordinates to enable map."

- **Library**: Leaflet 1.9.4 from `cdnjs.cloudflare.com`. Guard: `if (typeof L !== 'undefined')`.
- **Tiles**: OpenStreetMap.
- **Asset marker**: `L.circleMarker`, radius 10, fill `#2563eb`, white stroke width 2. Tooltip: asset name.
- **Comparator markers**: `L.circleMarker`, radius 7, fill `#94a3b8`, stroke color = highest criteria rating color. Only render if that comparator's coordinates are non-null.
- **Asset popup**: name (bold), type, period, description, integrity range summary.
- **Comparator popup**: name (bold), period, architect, distinction (truncated 80 chars), criteria as colored pills.
- **Bounds**: Auto-fit all markers with padding `[40, 40]`. If only asset marker → zoom 12.
- **Coordinate source**: Below the map container, show: "📍 Coordinates: explicit/inferred" matching `asset.coordinateSource`.
- **Container**: `height: 440px; border-radius: 10px; border: 1px solid #e2e8f0`.
- **Cross-referencing**: Click comparator marker → set `highlight = { type: 'comparator', id }` → Comparative tab highlights that card.
- **Leaflet popup close workaround**: Apply checklist item 13.

### 4b. Themes Tab Spec (conditional)

**Condition**: Render only if ≥2 themes total across `valueThemes`, `contextThemes`, and `threatThemes`.

**Layout**: Sub-tab switcher (pill buttons): "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Hide a sub-tab if 0 themes in that category.

**Theme card**:
- Colored dot matches `theme.color`.
- Member pills are clickable → navigate to the item's home tab (Values or Contexts) with highlight.
- Cards are always expanded (not collapsible).

**Threat Themes** additionally: mini heatmap row showing the vulnerability cells that define the threat pattern (red/amber/neutral from Vulnerability tab palette).

**Theme derivation rules** (instructions for the AI generating the data):
- Group values sharing overlapping contexts or co-occurring in the attribute table.
- Group contexts by temporal overlap or causal relationship.
- Group vulnerability cells by shared high-impact patterns.
- ≥2 members per theme. Label with short noun phrase.
- Include 1-sentence rationale in `description`.

**Integration into existing tabs**:
- Values tab: add a "Thematic Grouping" callout showing theme membership with link to Themes tab.
- Contexts tab: same callout.
- Vulnerability tab: summary row noting identified threat clusters.

### 4c. Report Tab Spec [CA-RPT]

**Condition**: Always generate. Position: after Process, before KG.

**Content philosophy**: LIM — optimal, not minimal. Every section earns its place. Bot decides which insights are most significant. Same visual theme as dashboard. Meaningful titles, emojis where they aid scanning. Conciser if long — condense, don't truncate.

**Core sections** (always present):

| # | Section | Content | Source |
|---|---------|---------|--------|
| 1 | **Asset Header** | Name, location, period, type badge | Overview |
| 2 | **📋 Assessment Overview** | One-paragraph synthesis: what + why it matters | Overview + Significance |
| 3 | **💎 Key Values** | Top cultural values, category pill + evidence indicator (〰️/💭) | Values |
| 4 | **🏛️ Integrity Snapshot** | Condition summary, Nara aspect → rating compact grid | Integrity |
| 5 | **✨ Significance Statement** | Formal statement from Stage 5, featured block | Significance |
| 6 | **📐 Process & Methodology** | Stages completed, sources, evidence coverage, notation | Process |

**Bot-decided sections** (include only when data warrants — max 2 of 3):

| Section | When | Content |
|---------|------|---------|
| **🔗 Context Effects** | Significant bidirectional relationships emerged | Most impactful context↔value effects + connected planning recommendations (if in source) |
| **⚡ Priority Insights** | Surprising or high-priority findings | Key discoveries, emerging patterns, urgent recommendations |
| **🗺️ Comparative Position** | Comparative analysis produced meaningful distinctions | Regional/typological positioning, key differentiators |

**Session sections** (from conversation):

| Section | When | Content |
|---------|------|---------|
| **💬 Session Analytics** | Always | Turns count, stages covered, depth, key decisions. 3-5 bullets. |
| **💡 User Reflections** | User gave reflections during HITL pauses | Key quotes/themes. Omit if none. |

**Layout**: Single column, max-width 720px, centered. Same card system as other tabs.

**Export controls** (in Report tab header):
- **📄 Export HTML** — downloads report as self-contained HTML file (`{asset-name}-report.html`). Clone DOM, inline styles, wrap in HTML5 doc with Google Fonts link.
- **🖨️ Print / PDF** — triggers `window.print()`.
- **GPT Canvas note**: GPT Canvas has sandbox constraints similar to Claude artifacts. Wrap `window.print()` and blob download calls in try-catch. If blocked, replace export buttons with: "📥 Download this Canvas file to use Export HTML and Print/PDF features."

**Print CSS**:
```css
@media print {
  .tab-bar, .sidebar, nav, .export-controls, footer { display: none !important; }
  .report-tab { display: block !important; max-width: 100%; padding: 20mm; }
  .report-section { break-inside: avoid; }
  body { font-size: 11pt; line-height: 1.5; }
  * { background: white !important; color: black !important; }
}
```

**Target length**: 800-1200 words, fitting 1-2 A4 pages.

## 5. Cross-Referencing (mandatory)

The dashboard must implement a shared selection state:

- **Clicking a context** → highlights its related values in the Values tab.
- **Clicking a value** → highlights matching contexts and integrity aspects.
- **Clicking a comparator** (on Map) → highlights its card in the Comparative tab.
- **Clicking a theme member pill** → highlights the specific item in its home tab (Values or Contexts).
- **Clicking a theme card** → highlights all members in their home tabs.
- **Clicking a comparator name** in Comparative tab → highlights on Map (if Map tab exists).
- **Navigating between tabs** preserves the active highlight.
- **Visible indicator** (banner) shows what is currently highlighted, with a Clear action.
- **Back pill**: After any cross-tab highlight jump, show "← Back to [previous tab]" pill. Hide when user navigates manually via tab bar.

Implementation: a top-level `highlight` variable (`{ type: 'value'|'context'|'comparator'|'theme', id: string } | null`) checked by each tab renderer.

## 6. Theme and Readability (mandatory)

**Light theme throughout**: All tabs use the same light palette.

**Light palette** (all tabs):
```
Background: #f8fafc → cards: #ffffff → borders: #e2e8f0
Text: #1e293b → dim: #64748b → muted: #94a3b8
Accent: #2563eb — or site-appropriate
```

**Minimum readability requirements**:
- Body text: ≥ 0.84rem, contrast ratio ≥ 4.5:1
- Section labels / uppercase micro-labels: ≥ 0.72rem
- Pills and badges: ≥ 0.66rem
- KG edge labels: ≥ 10px, contrast ratio ≥ 3:1
- KG node labels: include text-shadow or halo for legibility against light background
- **No text below 0.62rem anywhere**

## 7. Guide Boxes (mandatory — every tab)

Every tab must include a collapsible guide box at the top, explaining what the tab shows and how to interact with it.

**Structure** (3 zones):
1. **"What you see"** — what the visualization encodes.
2. **"How to interact"** — available actions (click, filter, sort).
3. **"What to look for"** — insight callout with amber left-border accent. The actionable takeaway.

**Behavior**:
- Collapsible with chevron toggle.
- State persisted in localStorage (`guide_[tabId]`). First visit = expanded; returning = collapsed. Fall back to in-memory object when localStorage throws (sandbox constraint).
- Collapsed state: single line (amber "ℹ" icon + title + chevron), minimal footprint.

**Styling**:
- Compact header: amber icon + tab-specific title + chevron.
- Section labels: small uppercase text.
- Insight callout: `background: #fef3c7; border-left: 3px solid #f59e0b; padding: 8px 12px;`
- Body indented from header for clear nesting.

**Content must be tab-specific** — no generic descriptions. Guide content per tab:
- **Overview**: "KPIs summarize scope; integrity range shows condition at a glance; gaps flag what's missing."
- **Map**: "Asset and comparator locations. Click markers for details. Dotted outline = inferred coordinates."
- **Timeline**: "Events spaced proportionally by year. Color = type of change. Look for clusters of rapid change."
- **Contexts**: "Click a context to highlight related values. Pill links jump to Values tab."
- **Values**: "Evidence markers (〰️/💭) show traceability. Attribute table below shows what sustains each value."
- **Themes**: "Values and contexts grouped by narrative thread. Click members to navigate."
- **Integrity**: "Left border color = integrity rating. Green = high, red = low. Summary links all aspects."
- **Comparative**: "Each site rated on rarity/documentation/condition. Colors match rating."
- **Significance**: "The synthesized statement from Stage 5."
- **Vulnerability**: "Red = high impact if that integrity aspect is lost. Look for columns with concentrated red."
- **Process**: "Strengths, gaps, and quick wins. Action items for next steps."

## 8. Navigation & History (mandatory)

- **URL hash**: Encode active tab in URL hash: `#overview`, `#map`, `#timeline`, etc. Wrap in try-catch — blocked in GPT Canvas sandbox.
- **pushState**: Use `history.pushState()` on every tab switch, **wrapped in try-catch**. Tab switching must work even when pushState fails — the in-memory `activeTab` variable is the source of truth, not the URL.
- **popstate**: Listen for `popstate` event to restore tab on browser back/forward. Wrap listener registration in try-catch.
- **Back pill**: After cross-tab jumps (e.g., click comparator on Map → Comparative tab), show "← Back to Map" pill. Hide when user navigates manually via the tab bar.
- **Page load**: On load, attempt to read hash and restore the corresponding tab. Default to Overview if no hash or if hash reading fails. Wrap in try-catch.
- **Sandbox fallback**: All navigation features above are progressive enhancements. The dashboard must be fully functional (all tabs switchable, all cross-references working) even when all URL-based APIs are blocked.

## 9. AI Query Tab [CA-AIQ]

The AI Query tab implements **placeholder mode** (GPT platform). No live API calls from the Canvas — all interpretation is routed through the GPT conversation.

**Starter prompts** (Single Dashboard):
1. "Summarize the significance of this asset"
2. "What are the main gaps in this assessment?"
3. "How do values connect to contexts?"
4. "What does the integrity assessment reveal?"
5. "How does this asset compare to its comparators?"

**UI elements**: Chat-style message area with starter prompt cards. When user clicks a prompt or types a question, display: "💬 Copy this question to the GPT conversation for an answer based on the full assessment context." Include a copy-to-clipboard button for the question text. No live API calls are executed from the Canvas.

## 10. Final Checklist

1. Only include data from the conversation — never fabricate.
2. If a stage was not completed, show as incomplete in progress bar and mark "Not completed" in its tab.
3. Evidence markers (〰️/💭) must match Stage 2 notation and appear consistently in all tabs that reference values.
4. Vulnerability tab only if data exists.
5. Replace `__DATA__` and `__ASSET_NAME__` placeholders with extracted content.
6. **All CBSA stages (1–6) have dedicated tabs** — no merged stages.
7. **Attribute-Value-Implication table** present in Values tab.
8. **Cross-referencing** implemented: at least Context↔Value linking functional.
9. **Readability**: no text below 0.62rem; no contrast ratio below 3:1.
10. **Nara Grid** stored as structured objects, not parsed strings.
11. **CDN source**: Use `cdnjs.cloudflare.com` exclusively for all external libraries (D3, Leaflet, Chart.js). Do NOT use unpkg.com or jsdelivr.net. Add a `typeof` guard before initializing CDN-dependent features.
12. **Inline data**: All extracted data must be embedded inline as JS objects. Do NOT use `fetch()` — the dashboard must work when opened via `file://` protocol without a server.
13. **Leaflet popup close button**: Leaflet's popup close is `<a href="#close">` — in sandbox environments, hash links get rewritten. After map init, add: `document.addEventListener('click',function(e){if(e.target.closest('.leaflet-popup-close-button')){e.preventDefault();mapInstance.closePopup();}});`
14. **Chart.js stability**: For doughnut/pie charts, do NOT set `maintainAspectRatio:false` — it causes infinite expansion. Add `canvas{max-height:280px}` CSS to chart containers. Only use `maintainAspectRatio:false` for bar charts in constrained-height containers.
15. **Map tab** conditional on non-null `asset.coordinates.lat`; coordinate source indicator below map; Leaflet `typeof L` guard.
16. **Themes tab** conditional on ≥2 clusters total; member pills linked via cross-referencing; threat themes show mini heatmap.
17. **Guide boxes** on every tab; collapsible with chevron; localStorage state persistence (`guide_[tabId]`); 3-zone structure.
18. **URL hash** encodes active tab; `pushState` on switch; `popstate` listener; back pill after cross-tab jumps.
19. **Cross-referencing** extended to `value|context|comparator|theme` types; back pill shown after highlight jumps.
20. **AI Query tab** uses placeholder mode — starter prompts only, no live API calls.
21. **Sandbox compatibility**: All `history.pushState()`, `localStorage`, `location.hash`, `window.print()`, and blob download calls wrapped in try-catch. Tab switching works via in-memory state. Report export buttons replaced with download prompt when in sandbox. Dashboard fully functional in both Canvas preview and standalone mode.

## 11. Post-Dashboard Offers (mandatory)

After generating the Dashboard, offer the next steps in the workflow chain [CA-WF]:

> "Would you like me to:
> 1. **Export** as a formatted Word document?
> 2. **Read-Assessment** — analyze from different angles (evidence weight, stakeholder lens, context-effect audit)?
>
> You can do both, one, or neither. After that → Session Debrief."

Use **Code Interpreter** for DOCX export. Do not stop at file delivery if a logical next step exists.

## 11a. Workflow & Augmentation Rules [CA-WF]

**Model B+**: Dashboard and DOCX export are part of one visible workflow. If a DOCX report exists, the dashboard must include a Report tab [CA-RPT].

**Post-session augmentation**: After Debrief and [CA-IP] Session Report are generated, offer to append them as optional Dashboard tabs and/or DOCX appendix sections. The dashboard may be updated after the main session is otherwise complete.

**Evidence separation rule (mandatory)**: Debrief and Session Analysis content must be visually and semantically separated from site assessment evidence. These are process-layer additions, not heritage-source evidence. Use muted styling (lighter background, different border color, "Process" label).

**Acceptance criteria**:
- If DOCX exists → Report tab must exist
- If user opts in → Debrief tab must exist
- If user opts in → Session Analysis tab must exist
- Dashboard may be updated after session closure
- DOCX may be regenerated with Debrief / Session Analysis appendices

---

## 12. Reference Data Shape — Ayelet HaShachar

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) implements this spec fully: light theme throughout, all 10 tabs, cross-referencing with shared highlight state, structured Nara Grid, per-comparator cards, vulnerability matrix, proportional timeline with change types, and floating KG popover. Use it as a working example — not as a locked template.

---

**END OF DASHBOARD SPECIFICATION**

# [CA-KG] Knowledge Graph — CBSA Integration

Generate an interactive Knowledge Graph as a Canvas document (HTML with embedded D3) when the user explicitly requests it ("kg", "knowledge graph", "create kg").

---

## 1. Trigger and Output

- Execute only on explicit KG requests.
- Output as a **Canvas document** (HTML). No surrounding prose — deliver the Canvas directly.
- The HTML must be self-contained: inline CSS, inline JS, D3 loaded from CDN.

## 2. CBSA Data Extraction → DATA

1. Re-read stage outputs (contexts, timeline, values, comparisons).
2. List candidate nodes (target 10–15, maximum 18) in this priority order:
   - Value-bearing entities central to Stage 2
   - Key places/structures and major events
   - Context anchors (geographic, social, political)
   - Social actors (individuals, groups, communities)
   - Up to 3 Cultural Value nodes (abstract value entities)
3. Capture relationship verbs: `located_in`, `expresses_value`, `part_of`, `commemorates`, `influenced_by`, `supports`, etc.
4. Drop weak/duplicate nodes. No orphans (every node connects at least once).
5. Assign each node a `type` from [CA-EC]. Default to closest category. New type only if genuinely outside all 14 categories.

## 3. DATA Schema (strict)

⚠ All fields (`name`, `meaning`, `type`, `label`) must be in English.

```json
{
  "nodes": [
    {
      "id": "unique_id",
      "name": "Display Name",
      "type": "Entity Type",
      "meaning": "5-12 words describing its heritage role",
      "value_type": "Optional value label from [CA-V]"
    }
  ],
  "edges": [
    { "from": "source_id", "to": "target_id", "label": "relationship_verb" }
  ]
}
```

Rules:
- `type` must use English tokens from [CA-EC] for colour mapping.
- `meaning` is concise, site-specific, English.
- Optional `value_type` must match [CA-V].
- Edges use lowercase verbs; total edges ≤ 20.

## 4. Canvas HTML Template Specification

### 4a. Layout Contract

```
Graph canvas: 65–70% of viewport width.
Sidebar: 30–35%, minimum 300px.
Sidebar: open by default, collapsible via toggle button.
When collapsed: graph expands to full width. Toggle remains visible.
```

### 4b. Dark Mode Chrome Palette

```
Background: #0a1120 → sidebar: #0f172a → cards: #1e293b → borders: #334155
Text-primary: #e2e8f0 → text-dim: #94a3b8 → text-muted: #64748b
Accent: #3b82f6 (interactive elements, active tab)
```

Entity node colours use [CA-EC] category mapping (distinct hue per type).

### 4c. Node Sizing

| Tier | Applies to | Radius |
|------|-----------|--------|
| Asset (primary) | The assessed heritage subject | 14–16px |
| Cultural Value | Nodes with `value_type` set | 11px |
| All others | Every other entity type | 8–10px |

Node labels: below node, font-size ≥ 10px. Truncate at 20 chars with ellipsis.

### 4d. Edge Geometry

- Link distance: 130–152px (D3 force-link distance).
- Curvature: Gentle arcs (quadratic curve, control point 15–25px perpendicular to midpoint). Not straight lines.
- Charge strength: −300 to −450.
- Edge labels: at curve midpoint, font-size ≥ 10px.
- Arrow markers: small directional arrowheads at target end.

### 4e. Node Interaction States

| Trigger | Visual response |
|---------|----------------|
| Hover | Enlarge radius +4px, stroke-width 3px. ≤150ms transition. |
| Click | Select → highlight direct edges (opacity 1), dim others (0.15) → populate Info tab. |
| Click background | Deselect: restore all edges, clear Info tab. |

### 4f. Sidebar Tabs

Three tabs — **Info**, **Analytics**, **AI Query**:

**Info tab:**
- No selection: placeholder "Click a node to inspect it"
- Selected: node name (≥1rem bold), type badge (coloured), meaning (≥0.88rem), connections grouped outgoing/incoming. Each connection clickable (selects that node).

**Analytics tab:**
- Search: text input filtering nodes by name or meaning
- Type filters: toggle buttons per entity type with count badges. Clear button.
- Statistics: node count, edge count, entity type count, graph density
- Most connected: top 5 by degree, clickable

**AI Query tab:**
- See §5 below for AI mock implementation.
- Suggested starter prompts when message list is empty.

### 4g. AI Query Response Rendering

User messages: Right-aligned compact bubbles (accent background).

Assistant messages: Full-width cards with:
1. Left border (3px, accent), card background (#1e293b), padding 12px
2. Minimal markdown: `**bold**` → `<strong>`, `` `code` `` → `<code>`, `\n\n` → paragraph, list items
3. Paragraph spacing ≥ 8px, line-height ≥ 1.55
4. Max height: 60% of sidebar, scrollable

### 4h. Legend

Horizontal wrap strip at bottom-left of graph canvas. Each item: coloured dot (8px) + type label. Background: `rgba(30,41,59,0.85)` with backdrop blur. Font ≥ 0.66rem.

### 4i. Additional Requirements

- D3 force-directed graph with zoom (scroll) and drag (nodes)
- D3 loaded from: `https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js`
- Color mapping by entity type using [CA-EC]
- Export JSON button (downloads graph data as `.json`)

## 5. AI Query — Gemini Mock Implementation

The KG Canvas includes an AI chat capability powered by the user's own Gemini API key.

### Configuration Panel
At the top of the HTML, include a collapsible configuration panel:

```
┌─ 🔑 AI Configuration (click to expand) ──────────────┐
│  Gemini API Key: [________________] [Save & Test]     │
│  Status: ● Not configured                             │
│  ℹ️ Get a free key at ai.google.dev/aistudio          │
└───────────────────────────────────────────────────────┘
```

**Behaviour:**
- Default: collapsed. AI Query tab shows: "Enter your Gemini API key in the configuration panel above to enable AI queries." + link.
- When key entered and saved: store in `localStorage` under key `insites_gemini_key`. Show "● Connected" status. AI tab becomes fully functional.
- Test button: sends a minimal request to verify the key works.

### API Integration

Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}`

Request format:
```javascript
const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: systemPrompt + '\n\nUser question: ' + userMessage }]
    }],
    generationConfig: { maxOutputTokens: 300, temperature: 0.3 }
  })
});
const data = await response.json();
const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
```

### System Prompt (embedded in HTML)

```
You are a CBSA heritage knowledge graph analyst. Answer questions based ONLY on this graph data:
{GRAPH_DATA_JSON}

Rules:
- Reference specific nodes and edges by name.
- Explain relationships using CBSA context-effect logic.
- Be concise (≤150 words).
- If the question is outside the graph data, say so.
```

### Conversation Management
- Maintain message history in a JS array (not sent to API — Gemini gets full context each time via concatenated history in the prompt).
- Show loading spinner during API call.
- Handle errors gracefully: display error message in chat, don't crash.

## 6. Final Checklist

1. Counts: 10–15 nodes (≤18), ≤20 edges, ≤3 Cultural Value nodes.
2. Fields: every node has `id`, `name`, `type`, `meaning` (English). No orphans.
3. Semantics: relationship verbs describe actual CBSA links.
4. Output: Canvas HTML only; no surrounding explanation.
5. Layout: graph 65–70%, sidebar 30–35%. Collapsible. Per §4a.
6. Palette: UI chrome uses §4b. Entity colours use [CA-EC].
7. Node sizes: asset 14–16px, cultural value 11px, others 8–10px. Per §4c.
8. Edges: curved arcs, link distance 130–152px. Per §4d.
9. Interaction: hover, click-select with edge dimming, background deselect. Per §4e.
10. AI responses: left-bordered cards with parsed markdown. Per §4g.
11. AI config panel: Gemini 2.0 Flash, localStorage key, test button. Per §5.

## 7. Context Effect Clarification (mandatory post-KG offer)

After generating the KG, always offer:
> "Would you like me to explain the context-effect relationships shown in the graph?"

When accepted:
1. Definition (2-3 sentences): Context effect as bidirectional flow.
2. One graph example: Select one context node and one asset node. Describe Context→Asset and Asset→Context.
3. Keep ≤100 words total.

---

**END OF KG SPECIFICATION**
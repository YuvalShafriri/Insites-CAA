# InSites GPT — Installation Package

## Package Contents

```
📦 InSites GPT Package
├── README.md                      ← this file (do NOT upload)
├── instructions.md                ← paste into GPT Instructions field (6,087 chars)
├── cbsa-method.md                 ← Knowledge file: full method (Stages 0-6 + appendices)
├── kg-spec.md                     ← Knowledge file: Knowledge Graph build template
├── dashboard-spec.md              ← Knowledge file: Dashboard build template + 7-lens UX
└── dashboard-reference-shape.md   ← Knowledge file: Ayelet data shape as reference
```

## Installation Steps

### 1. Create the GPT
Go to chatgpt.com → Explore GPTs → + Create → Configure tab.

### 2. Name and Description
- **Name**: InSites
- **Description**: Heritage assessment assistant using the CBSA (Context-Based Significance Assessment) method. Guides you through a structured 6-stage evaluation of built cultural heritage — from data inventory through significance statement.

### 3. Instructions
Open `instructions.md` and paste the entire content into the **Instructions** field.

### 4. Conversation Starters
Add these four:
1. `Start heritage assessment`
2. `Analyze collection`
3. `What is CBSA?`
4. `What is InSites?`

### 5. Knowledge Files
Upload these 4 files (drag and drop into the Knowledge section):
1. `cbsa-method.md`
2. `kg-spec.md`
3. `dashboard-spec.md`
4. `dashboard-reference-shape.md`

**Important**: This leaves 16 slots free for user asset documents during conversations.

### 6. Capabilities
| Capability | Setting |
|-----------|---------|
| Web Search | **OFF** |
| Canvas | **ON** |
| Code Interpreter & Data Analysis | **ON** |
| Image Generation | **OFF** |

### 7. Test
Upload a heritage document and say "start". Verify:
- [ ] Stage 0 output follows the template (summary, checklist, gaps, suggestions)
- [ ] Status line appears at the end
- [ ] Notation key is referenced
- [ ] GPT pauses and asks "Continue to Stage 1?"

Then test "kg" after completing stages to verify Canvas KG generation.

## Architecture Notes

### Why this split?

**Instructions (always active)**: Contains persona, stage flow, critical rules, knowledge index, output mode, triggers, and global controls. Everything that must be in every response.

**cbsa-method.md (RAG-retrieved)**: The full method with `[CA-XY]` anchor tags. The GPT retrieves relevant chunks via semantic search when processing each stage. Tags like `[CA-V]`, `[SM-3]`, `[CA-DB]` serve as stable retrieval anchors.

**kg-spec.md and dashboard-spec.md (trigger-specific)**: Separated because they are only needed on explicit triggers ("kg", "dashboard"). Keeping them separate ensures clean retrieval without noise from stage specs.

**dashboard-reference-shape.md**: Data shape as narrative (not raw JSON) so chunking preserves semantic coherence. Referenced alongside dashboard-spec when building.

### Known Limitations vs Claude Projects

1. **RAG ≠ System Prompt**: Knowledge files are chunked and retrieved semantically, not loaded in full. Critical rules are duplicated in Instructions for this reason.
2. **No React artifacts**: Canvas supports HTML but not the full React artifact system. KG and Dashboard are built as self-contained HTML with inline D3.
3. **AI Query is user-configured**: Unlike Claude's built-in API, the GPT version requires users to provide their own Gemini API key for the AI chat feature in KG/Dashboard.
4. **Retrieval may drift in long conversations**: If the GPT stops following stage structure, remind it: "Read cbsa-method.md for the Stage X template."

## File Size Reference

| File | Characters | Words |
|------|-----------|-------|
| instructions.md | 6,087 | 848 |
| cbsa-method.md | 24,028 | 3,392 |
| kg-spec.md | 8,616 | 1,183 |
| dashboard-spec.md | 10,358 | 1,550 |
| dashboard-reference-shape.md | 6,987 | 988 |
| **Total** | **56,076** | **7,961** |

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Directory Is

This is the **OpenAI Custom GPT installation package** for the InSites CBSA bot, split into files optimized for GPT's RAG-based knowledge retrieval. The split design is intentional — see README.md "Architecture Notes" for rationale.

The `Original/` folder is a frozen backup of the initial versions. Do not modify files in `Original/`.

## File Roles and Editing Rules

| File | Role | When GPT reads it |
|------|------|-------------------|
| `instructions.md` | System prompt — pasted into GPT Instructions field | Always active (every turn) |
| `instructions.txt` | Identical copy of `instructions.md` (alternate format) | N/A — convenience duplicate |
| `cbsa-method.md` | Full CBSA method (Stages 0-6 + appendices) — uploaded as Knowledge file | RAG-retrieved per stage via `[CA-*]` anchor tags |
| `kg-spec.md` | Knowledge Graph build template — uploaded as Knowledge file | Only on trigger: "kg", "knowledge graph" |
| `dashboard-spec.md` | Dashboard build template + 7-lens UX — uploaded as Knowledge file | Only on trigger: "dashboard" |
| `dashboard-reference-shape.md` | Ayelet data shape reference — uploaded as Knowledge file | Alongside dashboard-spec when building |

**Critical distinction**: `instructions.md` is loaded in full every turn (system prompt). The other four files are chunked and retrieved semantically by GPT's RAG — critical rules must be duplicated in `instructions.md` because RAG retrieval is not guaranteed.

## Anchor Tag System

`cbsa-method.md` uses `[CA-XY]` tags as stable retrieval anchors for GPT's semantic search:
- `[GB-1]` — CBSA theory / context effect
- `[CA-V]` — Values taxonomy
- `[CA-C]` — Contexts taxonomy
- `[CA-T]` — Change types
- `[SM-3]` — Integrity/authenticity theory
- `[CA-CS]` — Comparison criteria
- `[CA-EC]` — Entity categories (14 types, used for KG node coloring)
- `[CA-KG]` — Knowledge Graph spec (in `kg-spec.md`)
- `[CA-DB]` — Dashboard spec (in `dashboard-spec.md`)
- `[MA-RC]` — Read-Collection workflow

Do not rename or remove these tags — they are referenced by the system prompt and cross-referenced between files.

## Cross-Platform Sync

These files are the GPT-platform variant of content that exists in parallel for Claude (`../../../Claude/Bot-Brain-en.md`) and Gemini (`../../../Gemini/`). When modifying:
- **CBSA stage definitions** → propagate to Bot-Brain and Gemini equivalents
- **Entity types or KG schema** → propagate to `kg-spec.md`, Claude's `SKILL.md`, and Bot-Brain appendices
- **Operating rules** (evidence mandate, citation, HITL) → propagate to all platform variants

## Key Constraints (GPT vs Claude)

- **No React artifacts**: GPT Canvas supports HTML but not React. KG and Dashboard are self-contained HTML with inline D3 from CDN.
- **AI Query requires user API key**: GPT cannot call APIs natively. The KG/Dashboard HTML includes a Gemini API key configuration panel — the user provides their own key, stored in `localStorage`.
- **RAG drift**: In long conversations, GPT may stop following stage structure. The instructions include remediation: "Read cbsa-method.md for the Stage X template."

## Testing After Changes

After modifying any file, verify in GPT:
1. Upload a heritage document and say "start" — confirm Stage 0 output follows template
2. Check status line appears at end of every response
3. Test "kg" trigger after completing stages — verify Canvas KG generation
4. Test "dashboard" trigger after Stage 6 — verify Canvas dashboard generation

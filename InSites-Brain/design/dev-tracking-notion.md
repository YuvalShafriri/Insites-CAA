# InSites Development Tracking — Notion DB

**Date**: 2026-03-19 | **Mono version**: v2.0 (1611 lines) | **Total components**: 48

---

## Notion DB Fields

| Field | Notion Type | Purpose |
|-------|-------------|---------|
| **Component** | Title | Name of trackable unit |
| **Category** | Select | `Bot-Core` / `Bot-Stage` / `Bot-Appendix` / `Skill-Bot` / `Skill-Dev` / `Frontend` / `Design-Spec` / `Workshop` / `GPT` / `Gemini` |
| **Anchor** | Text | Tag in mono file, e.g. `[CA-KG]`. Empty for standalone files |
| **File** | URL/Text | Primary file path relative to repo root |
| **Lines** | Number | Approximate size (for effort estimation) |
| **Status** | Select | `Done` / `In Progress` / `Needs QA` / `Planned` / `Blocked` |
| **Version** | Text | e.g. `v2.0` |
| **Platform** | Multi-select | `Claude.ai` / `Claude Code` / `GPT` / `Gemini` / `Browser` / `Cross-platform` |
| **Priority** | Select | `P0-Critical` / `P1-High` / `P2-Medium` / `P3-Low` |
| **Depends On** | Relation (self) | Links to other rows this component depends on |
| **Sync Target** | Text | Other files that must be updated when this changes |
| **Last Updated** | Date | Track freshness |
| **Notes** | Rich text | QA notes, known issues, version history |

---

## Component Tracking Table

### Bot-Core (4)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 1 | System Prompt & Governance | — | `Claude/InSites-CAA-mono-v2.0.md` L1-119 | 119 | Done | v2.0 | Claude.ai | P0-Critical | — | GPT instructions.md | Persona, activation, upload routing, triggers, safety |
| 2 | Critical Operating Rules | — | `Claude/InSites-CAA-mono-v2.0.md` L120-142 | 23 | Done | v2.0 | Claude.ai | P0-Critical | — | GPT instructions.md | Evidence Mandate, Context Effect, Citation, Structure Fidelity, Descriptive Precision, No Generic Defs |
| 3 | CSR + DQR Frameworks | — | `Claude/InSites-CAA-mono-v2.0.md` L143-164 | 22 | Done | v2.0 | Claude.ai | P1-High | — | — | Cognitive Brief + Dialogue Quality. DQR condensed in v2.0 |
| 4 | Global Controls | — | `Claude/InSites-CAA-mono-v2.0.md` L165-204 | 40 | Done | v2.0 | Claude.ai | P1-High | — | — | Stage Closing, Notation Key, Interaction Tracking [CA-IP] |

### Bot-Stage (7)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 5 | Stage 0: Preliminary Review | — | `Claude/InSites-CAA-mono-v2.0.md` L207-254 | 48 | Done | v2.0 | Claude.ai | P0-Critical | #2 | GPT instructions.md | Data gaps, checklist, 7 mandatory rows |
| 6 | Stage 1: Contexts | — | `Claude/InSites-CAA-mono-v2.0.md` L255-365 | 111 | Done | v2.0 | Claude.ai | P0-Critical | #2, #16 | GPT instructions.md | Longest stage. Context Effect + Planning bridge |
| 7 | Stage 2: Values | — | `Claude/InSites-CAA-mono-v2.0.md` L366-426 | 61 | Done | v2.0 | Claude.ai | P0-Critical | #2, #14 | GPT instructions.md | Value-change-implication chain |
| 8 | Stage 3: Authenticity + Nara Grid | — | `Claude/InSites-CAA-mono-v2.0.md` L427-466 | 40 | Done | v2.0 | Claude.ai | P0-Critical | #2, #15, #17 | GPT instructions.md | Two-State Principle for archaeology |
| 9 | Stage 4: Comparison | — | `Claude/InSites-CAA-mono-v2.0.md` L467-494 | 28 | Done | v2.0 | Claude.ai | P0-Critical | #2, #18 | GPT instructions.md | [CA-CS] criteria |
| 10 | Stage 5: Significance Statement | — | `Claude/InSites-CAA-mono-v2.0.md` L495-533 | 39 | Done | v2.0 | Claude.ai | P0-Critical | #2 | GPT instructions.md | Synthesis of 1-4 |
| 11 | Stage 6: Quality Check | — | `Claude/InSites-CAA-mono-v2.0.md` L534-573 | 40 | Done | v2.0 | Claude.ai | P0-Critical | #2 | GPT instructions.md | DQR strengthened v5. Handoff to [CA-IP] |

### Bot-Appendix (13)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 12 | Session Report | [CA-IP] | `Claude/InSites-CAA-mono-v2.0.md` L574-667 | 94 | Done | v2.0 | Claude.ai | P1-High | — | — | Research protocol. Spec: `design/Bot-Research-Skiil/CA-IP-v2-spec-repo.md` |
| 13 | General Guidelines | [GB-1] | `Claude/InSites-CAA-mono-v2.0.md` L672-677 | 6 | Done | v2.0 | Claude.ai | P2-Medium | — | GPT cbsa-method.md | CBSA theory. Condensed in v2.0 |
| 14 | Taxonomies (Values+Contexts+Changes) | [CA-V] [CA-C] [CA-T] | `Claude/InSites-CAA-mono-v2.0.md` L678-764 | 87 | Done | v2.0 | Claude.ai | P1-High | — | GPT cbsa-method.md | 14 values, 11 contexts, 6 change types |
| 15 | Integrity + Nara Grid Theory | [SM-3] | `Claude/InSites-CAA-mono-v2.0.md` L765-796 | 32 | Done | v2.0 | Claude.ai | P1-High | — | GPT cbsa-method.md | Condensed in v2.0 — cross-refs Stage 3 |
| 16 | Phrasing Aids | [CA-E] | `Claude/InSites-CAA-mono-v2.0.md` L797-806 | 10 | Done | v2.0 | Claude.ai | P3-Low | — | — | Example templates |
| 17 | Comparative Criteria | [CA-CS] | `Claude/InSites-CAA-mono-v2.0.md` L807-820 | 14 | Done | v2.0 | Claude.ai | P2-Medium | — | — | 7 criteria for Stage 4/5 |
| 18 | Evidence Types (Archaeology) | [CA-EV] | `Claude/InSites-CAA-mono-v2.0.md` L821-862 | 42 | Done | v2.0 | Claude.ai | P2-Medium | — | — | 8 evidence categories |
| 19 | Image Analysis | [CA-IMG] | `Claude/InSites-CAA-mono-v2.0.md` L863-877 | 15 | Done | v2.0 | Claude.ai | P3-Low | — | — | Optional protocol |
| 20 | Entity Categories | [CA-EC] | `Claude/InSites-CAA-mono-v2.0.md` L878-900 | 23 | Done | v2.0 | Claude.ai | P1-High | — | KG-skill.md, kg.js, GPT kg-spec.md | 14 KG node types. Color mapping |
| 21 | KG Spec (inline) | [CA-KG] | `Claude/InSites-CAA-mono-v2.0.md` L901-1081 | 181 | Done | v2.0 | Claude.ai | P1-High | #20 | KG-skill.md, GPT kg-spec.md | Full artifact spec |
| 22 | Dashboard Spec (inline) | [CA-DB] | `Claude/InSites-CAA-mono-v2.0.md` L1082-1260 | 179 | Done | v2.0 | Claude.ai | P1-High | — | Dashboard-skill.md, GPT dashboard-spec.md | Full artifact spec |
| 23 | MA-RA (inline) | [MA-RA] | `Claude/InSites-CAA-mono-v2.0.md` L1261-1543 | 283 | Done | v2.0 | Claude.ai | P0-Critical | #22 | MA-RA-skill.md, design/MA-RA-spec-v2.md | Single assessment analysis |
| 24 | MA-RC (inline) | [MA-RC] | `Claude/InSites-CAA-mono-v2.0.md` L1544-1587 | 44 | Done | v2.0 | Claude.ai | P0-Critical | #22 | MA-RC-skill.md, design/MA-RC-spec-v2.md | Compact; skill has full spec + [CA-DB-C] |

### Skill-Bot (5) — Claude.ai Project Skills

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 25 | KG Skill | — | `Claude/skills/KG-skill.md` | 821 | Done | v2 | Claude.ai | P0-Critical | #20, #21 | — | On-demand. Must match [CA-KG]+[CA-EC] |
| 26 | Dashboard Generate Skill | — | `Claude/skills/Dashboard-skill-generate.md` | 199 | Done | v2 | Claude.ai | P0-Critical | #22 | — | Must match [CA-DB] |
| 27 | MA-RA Skill | — | `Claude/skills/MA-RA-skill.md` | 283 | Done | v2 | Claude.ai | P0-Critical | #23, #26 | — | Must match [MA-RA] inline + design spec |
| 28 | MA-RC Skill | — | `Claude/skills/MA-RC-skill.md` | 343 | Done | v2 | Claude.ai | P0-Critical | #24, #26 | — | Contains [CA-DB-C] + design tokens + Leaflet fix |
| 29 | Dashboard Review Skill | — | `Claude/skills/Dashboard-review-skill.md` | 179 | Done | v1 | Claude.ai | P2-Medium | #22 | — | UX review tool (not bot-facing) |

### Skill-Dev (3) — Claude Code slash commands

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 30 | /cbsa-ux-review | — | `.claude/skills/cbsa-ux-review/SKILL.md` | 197 | Done | v1 | Claude Code | P2-Medium | — | — | 13-lens UX review |
| 31 | /prompt-qa | — | `.claude/skills/prompt-qa/SKILL.md` | 143 | Done | v1 | Claude Code | P2-Medium | — | — | 7 optimization categories. Spec: `design/prompt-qa-principles.md` |
| 32 | /agent-builder | — | `.claude/skills/agent-builder/SKILL.md` | 78 | Done | v1 | Claude Code | P2-Medium | — | — | Workshop helper |

### Frontend (4)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 33 | kg.js (KG engine) | — | `Claude/KG-artifacts/kg.js` | 414 | Done | v5 | Browser | P0-Critical | #20 | Deploy to alephplace.com | Universal engine; auto RTL/LTR |
| 34 | knowledge-graph.css | — | `Claude/KG-artifacts/knowledge-graph.css` | 110 | Done | v5 | Browser | P1-High | #33 | Deploy to alephplace.com | Entity type color palette |
| 35 | EAC Collection Dashboard | — | `sites-data/EAC/EAC-DASH/index-eac.html` | 1026 | Done | v1 | Browser | P1-High | — | — | EAC11 (15 sites) visualization |
| 36 | Single Dashboard Reference | — | `design/Single-Dashboard-example.html` | — | Done | v1 | Browser | P1-High | #22 | — | Reference shape for MA-RA output |

### Workshop (3)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 37 | Agent-for-Agents (EN) | — | `agent-for-agents/agent-for-agents-en.md` | 108 | Done | v5.1 | Cross-platform | P1-High | — | #38 | "The Architect" meta-agent |
| 38 | Agent-for-Agents (HE) | — | `agent-for-agents/agent-for-agents-he.md` | 92 | Done | v5.1 | Cross-platform | P1-High | #37 | — | Hebrew original |
| 39 | Workshop Companion Site | — | `workshop-site/` | — | In Progress | v0 | Browser | P1-High | — | — | React app (copied, not yet customized) |

### GPT (2)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 40 | GPT Instructions | — | `GPTs/CAA-GTPs/instructions.md` | — | Needs QA | v1 | GPT | P1-High | #1, #2 | — | Needs sync with mono v2.0 |
| 41 | GPT Knowledge Files (6) | — | `GPTs/CAA-GTPs/` | — | Needs QA | v1 | GPT | P1-High | #13, #14, #21, #22 | — | cbsa-method, kg-spec, dashboard-spec, dashboard-ref-shape |

### Gemini (1)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 42 | Gemini Brain | — | `Gemini/InSites Brain - Gem.md` | — | Needs QA | v1 | Gemini | P2-Medium | #1 | — | Pending sync with mono v2.0 |

### Design-Spec (6)

| # | Component | Anchor | File | Lines | Status | Version | Platform | Priority | Depends On | Sync Target | Notes |
|---|-----------|--------|------|-------|--------|---------|----------|----------|------------|-------------|-------|
| 43 | MA-RA Design Spec | — | `design/MA-RA-spec-v2.md` | 322 | Done | v2 | Cross-platform | P1-High | — | #23, #27 | Source of truth for MA-RA |
| 44 | MA-RC Design Spec | — | `design/MA-RC-spec-v2.md` | 127 | Done | v2 | Cross-platform | P1-High | — | #24, #28 | Source of truth for MA-RC |
| 45 | LIM Spec | — | `design/less-is-more.md` | 131 | Done | v1 | Cross-platform | P2-Medium | — | — | Verbosity reduction rules |
| 46 | Prompt QA Principles | — | `design/prompt-qa-principles.md` | 158 | Done | v1 | Cross-platform | P2-Medium | — | #31 | QA methodology source |
| 47 | CA-IP Research Spec | — | `design/Bot-Research-Skiil/CA-IP-v2-spec-repo.md` | 223 | Done | v2 | Cross-platform | P2-Medium | — | #12 | Session Report methodology |
| 48 | CLAUDE.md (Project) | — | `CLAUDE.md` + `InSites-Brain/CLAUDE.md` | — | Done | v5 | Claude Code | P2-Medium | — | — | Dev guidance, deployment, architecture |

---

## Recommended Notion Views

### 1. Board: Status Overview (default)
- **Group by**: Status
- **Columns**: Done | In Progress | Needs QA | Planned | Blocked
- **Use**: Quick project health check

### 2. Table: Platform Sync
- **Filter**: Platform contains `GPT` OR Platform contains `Gemini`
- **Sort by**: Status (Needs QA first), then Priority
- **Use**: Track what's out of sync across platforms

### 3. Table: Mono File Map
- **Filter**: Category is `Bot-Core` OR `Bot-Stage` OR `Bot-Appendix`
- **Sort by**: # ascending
- **Use**: Navigate the mono prompt structure by section

### 4. Board: Architecture Layers
- **Group by**: Category
- **Use**: See architectural layers at a glance — how many items per layer

### 5. Table: QA Checklist
- **Filter**: Status is `Needs QA`
- **Sort by**: Priority ascending
- **Add checkbox**: `QA Passed`
- **Use**: Pre-workshop QA sweep

### 6. Table: Dependencies
- **Show columns**: Component, Depends On, Sync Target, Status
- **Sort by**: Depends On count descending
- **Use**: Identify fragile components — most dependencies = highest change risk

---

## Import Instructions

### Option A: Paste as Notion Table
1. Copy one of the category tables above
2. Paste into a Notion page — it will become a simple table
3. Click "..." → "Turn into database"
4. Set column types per the Fields section above
5. Repeat for remaining category tables, then merge into one DB

### Option B: Create Notion DB from scratch
1. Create a new Notion Database (full page)
2. Add all fields from the Fields section above
3. Copy rows from each category table
4. Set `Depends On` as self-relation after all rows exist
5. Create the 6 recommended views

### After Import
- Replace `#N` references in Depends On with actual Notion relations
- Set Last Updated dates (all current items: 2026-03-19)
- Add Owner (person property) if multiple team members

---

## File Paths Reference

All paths relative to `InSites-Brain/` unless noted:

| Prefix | Full path |
|--------|-----------|
| `Claude/` | `InSites-Brain/Claude/` |
| `design/` | `InSites-Brain/design/` |
| `GPTs/CAA-GTPs/` | `InSites-Brain/GPTs/CAA-GTPs (Claude.ai-Spilts)/` |
| `Gemini/` | `InSites-Brain/Gemini/` |
| `sites-data/` | `InSites-Brain/sites-data/` |
| `agent-for-agents/` | `InSites-Brain/agent-for-agents/` |
| `.claude/` | Root `.claude/` (not inside InSites-Brain) |
| `workshop-site/` | Root `workshop-site/` |
| `CLAUDE.md` | Root `CLAUDE.md` + `InSites-Brain/CLAUDE.md` |

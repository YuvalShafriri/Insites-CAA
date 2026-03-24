# Heritage 4.0 Paper — Claude Project Instructions

You are helping write an academic paper for the Heritage 4.0 conference (Florence, June 2026). The paper examines whether AI-assisted heritage significance assessment, under governance, can both operationalize current methodology and open new lines of inquiry.

## Paper Identity

- **Venue**: Heritage 4.0, Florence | Track 1: AI, Governance, Trust, Bias, Accountability
- **Format**: Extended abstract — exactly 6 pages Springer CCIS (including figures, tables, references). References max 1 page.
- **Deadline**: April 1, 2026 (extended abstract) → June 21 (camera-ready, max 12 pages if accepted)
- **Review**: Double-blind, ≥2 reviewers. Criteria: relevance, scientific quality/soundness, novelty/originality, clarity.
- **Template**: Springer CCIS (Word .docm or LaTeX/Overleaf). Template file: `splnproc2510.docm`
- **Submission**: Springer Meteor platform

## Double-Blind Rules

- No author names, affiliations, or acknowledgments
- Self-citations anonymized: "[Anon., 2024]" not the actual author name
- No "In our previous work…" — use "Prior work demonstrated…"
- No identifying metadata in file properties

## Case Study

**Site**: Tuba-Zangariyye dolmen field, Korazim Plateau, northern Israel — 43 documented dolmens, unexcavated, ~4000 years old.

**Comparison design**: Same site assessed manually (EAC Guidance 11, site 7.12) and with AI (InSites-CAA v2 + HITL), by the same expert, using the same 3 source documents. The AI's input includes the expert's own descriptions — only the significance assessment (SA) sections were withheld. New insights came from re-processing text the expert wrote, not from new data.

**Key findings**:
- 5 expert-validated new insights from cross-source synthesis (absent from manual assessment)
- 45 substantive claims traced at item level; 94% epistemic classification accuracy
- Expert governance caught failures notation missed (overreach, conceptual errors, amplified speculation)
- Core finding: AI and expert have **complementary blind spots** — AI under-reads salience, expert under-connects evidence

## File Map

### Working Files (edit these)
- `Heritage4_0-Draft-v1.md` — Current paper draft (all sections, ~2200 words + table)
- `Heritage4_0-Draft-v1.docx` — Same draft in Springer CCIS template format

### Evidence & Analysis (reference, don't modify)
- `Heritage4_0-Case-Evidence-2303.md` — Source-traced demonstrations (4 ° insights, governance catches, missed content, performance profile)
- `Heritage4_0-Adapted-Structure-2303.md` — Section-by-section writing scaffold with content guidance per section
- `Tuba-Run-Analysis-2303.md` — Full bot session analysis (flow, pacing, what worked)
- `InSites_Observation_Guide.docx` — Expert observation rubric used during the assessment

### Context Files (in contexts/)
- `contexts/Manual-vs-Bot-Comparison-2303.md` — Manual SA vs. AI-assisted SA: values identified, analytical framing, what AI added, what neither caught
- `contexts/Claim-Level-Count-2303.md` — All 45 claims with epistemic classification, per-stage tables, accuracy metrics
- `contexts/Writing-Plan.md` — Full writing plan: methodology, section-by-section guide, page budget, submission checklist

### Source Data (in site-data/)
- Source A: Berger et al. 2025 — development survey (43 dolmens, types, dimensions)
- Source B: Alef et al. — heritage management case study (CBSA descriptions, development threat)
- Source C: Stepansky 2005 — regional research synthesis (chronology, typology, social-economic framework)

### Publisher Materials
- `instructions for Authors heritage 4.0.pdf` — Springer submission guidelines
- `splnproc2510.docm` — Springer CCIS Word template

## Methodology (already decided)

- **Design**: Embedded single-case design (Yin 2018) — one case, two embedded units (manual SA, AI-assisted SA)
- **Analysis**: Directed qualitative content analysis (Hsieh & Shannon 2005) with source-tracing
- **Unit of analysis**: Individual substantive claim (n=45), not "the assessment" (n=1)
- **What it supports**: Existence proof, mechanism illustration, preliminary pattern identification
- **What it cannot support**: Generalizability, reliability measurement, causal claims

## Writing Principles

1. **Heritage methodology in the foreground** — the active agent is the methodology or expert, not the AI. Say "the assessment methodology, embedded in AI, surfaces context-effects" not "AI discovers heritage values."
2. **Inquiry, not declaration** — "we examine whether" not "AI enables." Confident but modest.
3. **Interdisciplinary accessibility** — every technical term explained on first use. Heritage terms glossed for AI/CS readers; AI terms glossed for heritage readers.
4. **No over-justification** — state what it is, what it supports, move on. Don't spend sentences explaining why limitations are okay.
5. **No tech-utopian, no apologetic** — balanced tone throughout.

## Current Status & What Needs Doing

**Done**:
- Full draft v1 (all sections written)
- Case evidence reports complete
- Writing plan complete
- Draft formatted in Springer CCIS .docx

**Still needed**:
- [ ] Content review by domain expert (heritage accuracy, emphasis, missing arguments)
- [ ] Reference verification — refs 4 (Bai 2023), 5 (Pan 2024), 9 (Xiong 2024) need exact DOIs/page numbers
- [ ] Page count verification in Springer template (currently estimated, not measured)
- [ ] Figure decision — include KG screenshot or context-effect diagram? (~0.3 page cost)
- [ ] Final double-blind check
- [ ] Remove all `<!-- CR: ... -->` comments before submission (these mark camera-ready expansion points)
- [ ] Decide: anonymous repo link or defer to camera-ready?

## Three-Paper Chain

This paper is the third in a sequence:
1. **[Anon., 2024]** — CBSA theory + Huqoq case study (foundation paper)
2. **[Anon., CAA2026]** — InSites tool implementation + workshop evaluation
3. **Heritage 4.0 (this paper)** — epistemic possibilities: does the governed workflow open new lines of inquiry?

Each paper has a distinct question. This one's is: "Under what governance conditions can AI-assisted assessment both operationalize current methodology and expand what can be noticed?"

## Key Decisions Already Made

- **One case study is enough** for this paper type (position paper with proof of concept) and venue
- **Compare SA outputs only** — disregard non-SA parts of EAC11 (management, decisions, conservation outcomes)
- **3 ° insights in extended abstract** (social continuity developed, imagination and cultural landscape brief); all 5 in camera-ready
- **Section 3 references the bot** via [Anon., CAA2026] for implementation details; describes governance principles here
- **"Complementary blind spots"** leads the Discussion, not trust
- **Notation → epistemic enabler** is the core theoretical contribution (Section 3.3)

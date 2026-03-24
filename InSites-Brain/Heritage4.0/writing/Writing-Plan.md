# Task: Package Heritage 4.0 Paper for Claude.ai Project

## Context
The user wants to continue working on this paper in a Claude.ai Project (or co-work session), separate from Claude Code. All context needs to be self-contained in `InSites-Brain/Heritage4.0/`. Currently some key evidence files only exist in other directories.

## What to do

### 1. Copy missing context files to Heritage4.0/contexts/

Files to copy (valuable, not already in Heritage4.0/):

| File | Source | Why needed |
|------|--------|-----------|
| Manual-vs-Bot-Comparison-2303.md | `InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/` | Section 4 comparison framing — values table, analytical framing, what AI added |
| Claim-Level-Count-2303.md | `InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/` | Section 4 quantitative backbone — 45 claims, 94% accuracy, item-level metrics |
| Writing-Plan.md | `C:\Users\user\.claude\plans\purring-pondering-dawn.md` | Full writing plan — methodology, section guide, page budget, submission checklist |

Files NOT needed (already covered or superseded):
- FINALPLAN.md (older duplicate of writing plan)
- Heritage4_0_Outline_v4.pdf (superseded by Adapted-Structure)
- Florence/nSites_CAA2026/ (different paper)
- Florence/springer templates/ (already have .docm in Heritage4.0/)
- Florence/OLD/ (archived)

### 2. Write Claude.ai Project instructions

Create `Heritage4.0/PROJECT-INSTRUCTIONS.md` — paste-ready instructions for the Claude.ai Project custom instructions field. Should cover:
- Paper identity (venue, format, deadlines, double-blind)
- File map (what's in the project and what each file is for)
- Writing principles and tone rules
- Current status and what needs doing next
- Key methodological decisions already made
- Submission checklist

### Files to modify/create
- `Heritage4.0/contexts/Manual-vs-Bot-Comparison-2303.md` (copy)
- `Heritage4.0/contexts/Claim-Level-Count-2303.md` (copy)
- `Heritage4.0/contexts/Writing-Plan.md` (copy + clean up paths)
- `Heritage4.0/PROJECT-INSTRUCTIONS.md` (new — Claude.ai Project instructions)

### Verification
- Open Heritage4.0/ folder — should contain everything needed to work on the paper
- PROJECT-INSTRUCTIONS.md should be self-contained and paste-ready

---

# Reference: Heritage 4.0 Paper — Final Writing Plan

**Venue**: Heritage 4.0, Florence | Track 1: AI, Governance, Trust, Bias, Accountability
**Paper type**: Position paper with proof of concept and preliminary demonstration
**Case study**: Tuba-Zangariyye — same site, same expert, same sources: EAC11 manual CBSA vs. InSites-CAA v2 with HITL

### Two-Stage Submission

| Stage | Deadline | Length | Scope |
|-------|----------|--------|-------|
| **Extended Abstract** | April 1, 2026 | **6 pages fixed** (incl. figures, tables, refs) | Full argument, compressed. Refs ≤1 page. |
| **Camera-ready** (if accepted) | June 21, 2026 | **max 12 pages** (incl. refs) | Expand with reviewer feedback. ~10-11 usable pages. |

**Submission**: Springer Meteor platform. Springer CCIS template (Word or LaTeX/Overleaf).
**Review**: Double-blind, ≥2 reviewers. Criteria: relevance, scientific quality/soundness, novelty/originality, clarity.
**Requirements**: Alt text for all figures. No author names/affiliations/self-identifying refs. Remove all template guidance text.
**Source file**: `Florence/instructions for Authors heritage 4.0.pdf`

### Strategy: Write for 6, Design for 12

The extended abstract must stand alone as a complete argument in 6 pages. But every section should be written with awareness that it can expand to ~2x for camera-ready. Mark expansion points in the draft with `<!-- CR: ... -->` comments (invisible in final output).

---

## Source Materials (created this session)

| File | Content | Use in paper |
|------|---------|-------------|
| `Florence/Heritage4_0-Adapted-Structure-2303.md` | Section-by-section structure with content guidance | Primary writing scaffold |
| `InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/Heritage4_0-Case-Evidence-2303.md` | Source-traced demonstrations (A/B/C), performance profile, case conclusion | Section 4 evidence + Section 5 arguments |
| `InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/Manual-vs-Bot-Comparison-2303.md` | EAC11 manual SA vs. bot SA — values, framing, new insights, what neither caught | Section 4 comparison framing |
| `InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/Claim-Level-Count-2303.md` | 45 claims, epistemic classification accuracy, item-level metrics | Section 4 quantitative backbone + Section 5 methodology |
| `Florence/Heritage4_0_Outline_v4.pdf` | Original writing plan — claims, structure, tone rules, references | Writing principles, claim structure, tone governance |

---

## Methodological Identity

**Design**: Embedded single-case design (Yin 2018) — one case with two embedded units (manual SA, AI-assisted SA). Controls for site, expert, and source material; isolates workflow as the variable.

**Analysis method**: Directed qualitative content analysis (Hsieh & Shannon 2005) with source-tracing. CBSA provides predefined categories; each AI output traced to source documents and classified as extraction / synthesis / overreach / missed.

**Unit of analysis**: Individual substantive claim (n=45), not "the assessment" (n=1). Each claim is page-referenced and independently checkable.

**Critical data relationship**: The bot's input includes the expert's own descriptions from the EAC11 case. The SA sections were withheld. New insights came from re-processing text the expert herself wrote — the difference is the workflow, not the data.

**What it supports**: Existence proof, mechanism illustration, preliminary pattern identification.
**What it cannot support**: Generalizability, reliability measurement, causal claims.

**Limitation to name directly**: Same expert produced descriptions, ran assessment, validated output. This is how the tool is designed to be used — but independent validation is future work.

---

## Required Sections ↔ Our Structure

Springer instructions require these sections explicitly. Our mapping:

| Required by Springer | Our section | Review criterion served |
|---------------------|-------------|----------------------|
| Title | Title | Clarity |
| Abstract and Keywords | Abstract (~150 words + 4-6 keywords) | All four criteria at a glance |
| Introduction (problem + state of art) | Section 1 | Relevance, novelty |
| Methodology and contribution | Sections 2 + 3 | Scientific quality, novelty |
| Results and applicability | Section 4 | Scientific quality, relevance |
| Conclusions | Sections 5 + 6 (Discussion + Conclusions) | All |
| References | Section 7 (≤1 page) | Soundness |

### Figure Decision

**Option**: 1 figure — KG screenshot or context-effect diagram from the Tuba assessment.
**Cost**: ~0.3 page in the 6-page version. Requires alt text.
**Value**: Visually distinguishes the paper for Track 1 reviewers; shows the "new representation" output.
**Decision**: TBD — prepare the figure, decide during page fitting whether it fits. If not, mark as `<!-- CR: Figure 1 -->` for camera-ready expansion.
**Camera-ready**: Room for 2-3 figures (KG, context-effect diagram, possibly workflow overview).

---

## Section-by-Section Writing Guide

### Abstract (~150 words) + Keywords (4-6)

**Job**: Compressed argument. Reviewer's first (and possibly only) read.
**Content**: Problem (assessment reasoning gap) → approach (governance framework with uncertainty notation) → case (same site/expert/sources, manual vs. AI-assisted) → finding (complementary blind spots, 5 new insights from re-reading expert's own text) → implication (assessment-as-inquiry).
**Keywords**: cultural heritage significance assessment, AI governance, epistemic uncertainty, human-in-the-loop, context-based assessment
**Note**: Abstract appears on page 1 and costs ~0.2 page. Factored into page budget below.

### Section 1: Introduction (~0.8 page, ~360 words)

**Job**: Land the reframe. By end of p.1: this examines heritage methodology upgraded through AI, not AI applied to heritage.

**Moves**:
1. Heritage assessment aspirations: contextual reasoning, multivocality, networks of meaning, systematic uncertainty
2. Well-articulated in theory, difficult in practice
3. [Anon., 2024]: single site → complex contextual network; three challenges
4. The gap: assessment reasoning (interpretive layer) underexplored in AI-heritage discourse
5. **Reframe (C)**: not "does AI match expert accuracy?" but "under what governance conditions can AI-assisted assessment both operationalize methodology and expand what can be noticed?"
6. Specific claim (B) + paper structure

**Tone rule**: Heritage methodology is the active agent, not the AI. "The assessment methodology, embedded in AI, surfaces context-effects for expert examination."

### Section 2: Background (~0.5 page, ~225 words)

**Job**: Just enough theory. Lean on [Anon., 2024]. Save space.

**Moves**:
1. CBSA + context-effect: 3-4 sentences referencing [Anon., 2024]
2. Why cognitively demanding: multiple contexts, cross-referencing, uncertainty calibration
3. What exists in AI-heritage: data pipeline (classification, 3D, decay). Assessment reasoning = different problem.
4. **Methodology** (2-3 sentences): Directed qualitative content analysis with source-tracing. We compare a formal manual CBSA (EAC Guidance 11) with an AI-assisted assessment of the same site, same expert, same sources. AI outputs traced at claim level (n=45) to distinguish extraction, synthesis, overreach, and missed content.

**References**: [Anon., 2024], Avrami & Mason 2019, EAC Guidance 9/11, 1-2 AI-heritage refs, 1 verbalized confidence ref

### Section 3: Design — Governed Epistemic Partnership (~0.9 page, ~400 words)

**Job**: Present the governance framework — the main contribution. The framework *is* the bot: epistemic notation, HITL stages, context-effect ontology are all embedded in the tool's prompt architecture.

**Referencing the tool**: Section 3 describes the design principles (what and why). For implementation details (prompt architecture, stage templates, workshop evaluation) → cite [Anon., CAA2026]. One sentence: "The framework is implemented as a structured prompt system for large language models; implementation and workshop evaluation are reported in [Anon., CAA2026]."

**Code availability**: Double-blind prevents linking to a named repo. Options (decide before submission):
- Anonymous repo link as footnote (Anonymous GitHub or similar)
- Defer full link to camera-ready; cite [Anon., CAA2026] for now
- Supplementary material via Meteor platform

**3.1 Context-effect as ontological backbone** (~0.15p): Bridge from [Anon., 2024] manual analysis to AI-embedded workflow. Domain-theoretic scaffolding, not generic conversation.

**3.2 HITL as accountability architecture** (~0.25p): Mandatory pause per stage. Expert directs, not checks. Audit mechanisms: Session Report, cognitive transparency, reflective questioning, evidence type tagging. Data quality governance (Stage 0/6) from practitioner feedback.

**3.3 Uncertainty notation as epistemic enabler** (~0.35p) — CORE:
- Three-tier: unmarked (explicit) / ° (inferred from 2+ evidence) / 💭 (interpretive hypothesis)
- **The key move**: notation licenses AI to search beyond explicit text — without it, any output beyond stated = indistinguishable from hallucination; with it = marked hypothesis for expert examination
- Technical honesty: verbalized confidence, not formal calibration. AI is sometimes wrong. That's why the checkpoint exists.

**3.4 Supporting infrastructure + workflow** (~0.15p): Citation-first, provenance, no external lookup. Six assessment modules. Portable across mainstream LLMs — prompt engineering only, no model training. See [Anon., CAA2026] for full specification.

### Section 4: Case Illustration (~1.1 page, ~350 words + table)

**Job**: Show the framework in action. Concrete outputs, source-traced.

**4a. Site + comparison framing** (~80 words):
- Tuba-Zangariyye dolmen field, Korazim Plateau, 43 dolmens, unexcavated, IB–MBII
- Evidence profile: survey + analogical + architectural. Data requires inference.
- Same site previously assessed manually for EAC Guidance 11 (site 7.12) by the same expert using the same source documents. Bot input includes the expert's own descriptions; SA withheld.

**4b. Demo A — all 3 ° insights** (~270 words):
- **Developed**: Social continuity — 4000-year pastoralist arc (~150 words). Source C main text + footnote 4 + Source B → "enduring node in a pastoral territory." Expert: "pattern I didn't identify."
- **Brief**: "Landscape for imagination" (~60 words). Single footnote → unified intangible heritage value.
- **Brief**: Cultural landscape / geographic reframing (~60 words). Springs + settlement ecology → "resource node."

**4c. Overview table** — 5 rows showing the full range:

| Moment | AI output | Source basis | Epistemic status | Expert action |
|--------|-----------|-------------|-----------------|---------------|
| Social continuity | "Pastoralist populations... four millennia" | C pp.46-48 + C fn.4 + B | ° — cross-source | Validated: "pattern I didn't identify" |
| "Landscape for imagination" | Footnote → heritage value | C fn.2 | ° — elevation | Validated: "new beautiful insight" |
| Cultural landscape | "Resource node in a landscape corridor" | A p.1 + C pp.40-41 | ° — reframing | Validated + new planning recommendation |
| "Hierarchical network" | Differentiation → hierarchy | A p.3: "it is possible..." | Unmarked — should be 💭 | Expert challenged; bot acknowledged |
| Corbelling prototype | Not surfaced | C p.44 (Stepansky's hypothesis) | Missed | Not caught by bot or assessor |

**4d. Demo B/C hybrid — governance catching failure** (~100 words):
The hierarchy example: bot generated hypothesis, failed to mark 💭, expert caught it, bot traced reasoning honestly. Shows: (1) AI generates hypotheses, (2) classification fails at boundary, (3) governance catches it.

**4e. Claim-level summary** (~2 sentences):
Across the full assessment, 45 substantive claims were traced: 94% of marked claims (°/💭) were correctly classified by the AI; content errors (scope, conceptual misapplication) were caught by governance, not notation.

**4f. What neither caught** (~2 sentences):
Corbelling hypothesis — Stepansky's explicit research question, missed by both. Complementary coverage, not exhaustive.

**4g. Workshop observations** (~3 sentences):
~65 heritage professionals in ICOMOS/CIPA workshops. Data quality identified as critical factor → Stage 0/6. Assessor noted notation "helps surface where hypotheses need attention."

### Section 5: Discussion (~0.6 page, ~270 words)

**5.1 Complementary blind spots** — LEAD:
Bot under-reads salience; expert under-connects evidence. Not "AI is flawed, humans must check" but "different cognitive strengths, architecture activates both." Manual SA: 5 values. AI-assisted: 7 values + 5 new insights — from re-reading the expert's own descriptions.

**5.2 Trust as structural governance**:
Not accuracy verification but warranted confidence. [Anon., 2024] showed networks too complex for individual management.

**5.3 Epistemic implications**:
Assessment-as-report → assessment-as-inquiry. New output category: "machine-generated hypotheses for expert examination."

**5.4 Limitations** (name directly, don't over-justify):
- Single case, single expert
- Same expert wrote descriptions and validated — design feature + known limitation
- Notation classification approximate (hierarchy example)
- Method not exhaustive (corbelling)
- Formal calibration across site types and experts is underway

### Section 6: Conclusions (~0.2 page, ~90 words)

Three beats:
1. Current assessment theory: principles difficult to implement consistently
2. We examined whether embedding them in AI under governance operationalizes them and opens new inquiry. Preliminary evidence: yes.
3. Core finding: complementary blind spots. The architecture structures collaboration where notation activates AI's synthetic strength and governance activates expert's salience judgment.

### Section 7: References (~0.7 page, 8-10 refs)

- [Anon., 2024] — CBSA theory + Huqoq (foundation)
- [Anon., CAA2026] — InSites implementation + workshops
- Avrami & Mason 2019 — values-based conservation
- EAC Guidance 9 (2025) or 11 (2026) — European heritage assessment
- 1-2 AI-in-heritage landscape refs
- 1 verbalized confidence / epistemic calibration ref
- 1 AI governance in cultural domains ref

---

## Writing Principles (from outline v4)

- **Heritage methodology in the foreground**: active agent = methodology or expert, not AI
- **Inquiry, not declaration**: "we examine whether" not "AI enables"
- **Interdisciplinary accessibility**: every technical term glossed on first use (heritage terms for AI readers, AI terms for heritage readers)
- **Tone**: confident but modest. No tech-utopian, no apologetic.
- **Double-blind**: no names, affiliations, identifying self-citations

---

## Page Budget — Extended Abstract (6 pages)

| Section | Pages | Words (~450/p) | Notes |
|---------|-------|---------------|-------|
| Title + Abstract + Keywords | 0.3 | ~150 (abstract) | Shares page 1 with Intro |
| 1. Introduction | 0.8 | ~360 | Tighter — abstract carries some load |
| 2. Background | 0.5 | ~225 | |
| 3. Design | 0.9 | ~400 | Core contribution |
| 4. Case Illustration | 1.1 | ~350 + table | Heart of the paper |
| 5. Discussion | 0.5 | ~225 | Trimmed from 0.6 |
| 6. Conclusions | 0.2 | ~90 | |
| 7. References | 0.7 | 8-10 entries | Max 1 page per instructions |
| Figure (optional) | 0.3 | — | KG or context-effect; decide at fit |
| **Total** | **5.3** | **0.7p margin (or 0.4 with figure)** |

### Camera-Ready (12 pages — after acceptance)

The 12-page version expands the same argument with: fuller methodology section, more developed demonstrations (all 5 new insights instead of 3), additional figures (KG, workflow, context-effect), deeper discussion, and broader references. Specific expansion depends on reviewer feedback.

---

## Writing Order

1. **Section 4 first** — around actual outputs. This is the evidence. Write it while the case is fresh.
2. **Section 3** — the framework. Shape it to support what Section 4 shows.
3. **Sections 1 + 2** — introduction and background. Now you know what needs setting up.
4. **Sections 5 + 6** — discussion and conclusions.
5. **Last**: abstract (~150 words), title, keywords (4-6), references.
6. **Page fit**: Verify 6 pages exactly. Decide figure in/out. Add `<!-- CR: ... -->` expansion markers.

### After acceptance
7. Expand to 12 pages using camera-ready expansion map. Add figures, fuller methodology, developed demonstrations.

---

## Pre-Submission Checklist (Extended Abstract — April 1)

### Springer compliance
- [ ] Springer CCIS template used (Word or LaTeX/Overleaf)
- [ ] Exactly 6 pages (including figures, tables, references)
- [ ] References ≤ 1 page
- [ ] All template guidance text removed
- [ ] Alt text for every figure (use Meteor Alt Text Assistant if needed)
- [ ] All ° and 💭 symbols render correctly in template

### Double-blind
- [ ] No author names or affiliations anywhere
- [ ] No acknowledgments section
- [ ] No self-identifying references — "[Anon., 2024]" not "[Author, 2024]"
- [ ] No "In our previous work…" — reformulate neutrally ("Prior work demonstrated…")
- [ ] No identifying metadata in file properties

### Content quality
- [ ] Every Section 4 claim traced to source with page reference
- [ ] Tone check: search for "AI enables/extends/transforms" → reframe as "we examine whether"
- [ ] Interdisciplinary check: every technical term explained on first use
- [ ] Required sections present: Title, Abstract+Keywords, Intro, Methodology+Contribution, Results, Conclusions, References
- [ ] Review criteria addressed: relevance (Intro), scientific quality (§3-4), novelty (§3.3+§4), clarity (throughout)

### Post-acceptance (camera-ready — June 21)
- [ ] Expand to ≤12 pages using camera-ready expansion map
- [ ] Incorporate reviewer comments
- [ ] License-to-Publish signed via DocuSign
- [ ] Plagiarism check passed

---

## Output

Paper draft: `InSites-Brain/Heritage4.0/Heritage4_0-Draft-v1.md`
Case evidence: `InSites-Brain/Heritage4.0/Heritage4_0-Case-Evidence-2303.md`
Writing scaffold: `Florence/Heritage4_0-Adapted-Structure-2303.md`

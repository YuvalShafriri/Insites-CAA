# Heritage 4.0 — Adapted Paper Structure

**Based on**: Outline v4 + Tuba-Zangariyye case evidence report (2026-03-23)
**Format**: 6 pages Springer CCIS (5.5 usable — text + tables + refs)
**Case study**: Tuba-Zangariyye — same site, same expert, manual vs. AI-assisted (InSites-CAA v2 with HITL)

---

## Section 1: Introduction (~1.0 page)

**Job**: Land the reframe. By end of p.1 the reader knows this examines heritage methodology upgraded through AI, not AI technology applied to heritage.

**Content** (follows outline v4, tightened):
- Heritage assessment's current aspirations: contextual reasoning, multivocality, networks of meaning, systematic uncertainty handling
- Well-articulated in theory, difficult to implement consistently in practice
- Significance assessment is a core activity in conservation practice — trust and accountability are practical, not abstract
- [Anon., 2024] demonstrated empirically: single site → complex contextual network; three challenges (complexity, representation, operational)
- The gap: assessment reasoning — the interpretive layer where evidence becomes significance — remains underexplored in AI-heritage discourse
- **Reframe (C)**: not "does AI match expert accuracy?" but "under what governance conditions can AI-assisted assessment both operationalize current methodology and expand the scope of what can be noticed and questioned?"
- Specific claim (B) + paper structure

**Cuts vs. outline v4**: Remove one bullet to save 0.25 page. The "significance assessment is a core activity" point can fold into the opening.

---

## Section 2: Background (~0.5 page)

**Job**: Establish just enough theory. Lean on [Anon., 2024]. Save space for Sections 3–4.

**Content**:
- CBSA + context-effect: significance emerges from reciprocal relationships between sites and contexts. 3-4 sentences referencing [Anon., 2024]
- Why cognitively demanding: multiple contexts simultaneously, cross-referencing reveals significance invisible in any single context, uncertainty calibration, alternative interpretations
- [Anon., 2024] §4.3: "even modeling a single site's complete contextual elements can create an extensive network"
- What exists in AI-heritage: classification, 3D, decay prediction — data pipeline. Assessment reasoning (interpretation, value attribution, uncertainty) requires a different approach
- **Methodology note** (~2-3 sentences): We compare a formal manual CBSA (conducted for EAC Guidance 11) with an AI-assisted assessment of the same site, by the same expert, using the same source documents. AI outputs are traced against their source documents to distinguish extraction, synthesis, overreach, and missed content. This is consistent with the paper's scope as preliminary demonstration; formal calibration is identified as future work (Section 5).

**Key references**: [Anon., 2024], Avrami & Mason 2019, EAC Guidance 9, 1-2 AI-heritage landscape refs, 1 verbalized confidence ref

---

## Section 3: Design — Governed Epistemic Partnership (~0.9 page)

**Job**: Present the governance framework — the main contribution.

### 3.1 Context-effect as ontological backbone (~0.15 page)
- Bridge from [Anon., 2024] manual analysis to AI-embedded workflow
- Same theoretical framework; AI holds and cross-references more contexts simultaneously
- Domain-theoretic scaffolding, not generic AI conversation

### 3.2 HITL as accountability architecture (~0.25 page)
- Mandatory pause after each stage: expert reviews, corrects, adds, rejects
- Human role: directing the assessment, not checking output
- Built-in mechanisms: Session Report (audit trail + research instrument), cognitive transparency, reflective questioning (designed so two experts could disagree), evidence type tagging
- Data quality governance: Stage 0 (gap scan) + Stage 6 (quality check) — developed from practitioner feedback

### 3.3 Uncertainty notation as epistemic enabler (~0.35 page) — CORE
- Three-tier: (no mark) = explicit | ° = inferred from 2+ evidence pieces | 💭 = interpretive hypothesis
- **The key move**: notation may license the AI to search beyond explicit text — without it, any output beyond the stated is indistinguishable from hallucination; with it, such output becomes a marked hypothesis for expert examination
- Current theory calls for systematic uncertainty and multiple interpretations; this notation examines whether that aspiration can be made operational
- Beyond operationalizing: the notation may also surface patterns and connections not anticipated
- **Technical honesty**: relies on AI's semantic self-assessment (verbalized confidence), not formal calibration. Classification is approximate. This is precisely why the expert checkpoint exists.

### 3.4 Supporting infrastructure + workflow overview (~0.15 page)
- Citation-first, provenance tracking, no external lookup
- Six modules: pre-check → contexts → values → authenticity → comparative → significance
- Portable across mainstream LLMs — prompt engineering only, no model training

---

## Section 4: Case Illustration (~1.1 page)

**Job**: Show the framework in action. Concrete outputs, source-traced.

### Site introduction (~4 sentences)
The Tuba-Zangariyye dolmen field occupies a basalt hilltop on the Korazim Plateau in northern Israel — a megalithic burial landscape of 43 documented dolmens dated by analogy to the Intermediate Bronze–Middle Bronze IIA period (~4000 years). The site has never been excavated; all chronological attribution rests on typological and regional parallels. Three source documents were provided: a development survey recording physical data (Berger et al. 2025), a heritage management case study (Alef et al.), and a regional research synthesis (Stepansky 2005). The evidence profile — survey, analogical, architectural, with no stratigraphic or scientific dating — makes this a site where uncertainty notation is essential: the data *requires* inference.

### Comparison framing (~3-4 sentences)
The same site was previously assessed manually by the same expert as part of the EAC Guidance 11 collection (site 7.12 — Tuba-Zangariyye Dolmen Field), using the same source documents. That formal assessment followed standard heritage assessment practice without AI assistance. The AI-assisted assessment used the same source material with the governance framework described in Section 3. This permits direct comparison: what did the governed AI-assisted workflow surface that the manual assessment did not? And what did governance catch that the AI got wrong?

### Demonstration A — Sub-textual insight (° as epistemic enabler)

Three instances where the AI synthesized across sources under ° notation, producing insights confirmed by the expert as genuinely new:

**Developed: Social continuity — 4000-year pastoralist arc** (~150 words)

Source C's main text (pp.46-48) links dolmen builders to IB-MBIIA semi-nomadic pastoralists through the Horbat Berekh settlement finds. A footnote on a later page (footnote 4, p.50) notes that "this mode of life has been discerned as the main character of Galilee-Bedouin 'Nomadism' in the 19th century... and until recently was the mainstay of the Zangariya and El-Heib tribes." Source B mentions Bedouin grazing in a management context. No source traces the full arc as a single narrative.

The AI connected these scattered data points into a coherent interpretive frame: "This social continuity — pastoralist populations using the same landscape over four millennia — frames the dolmen field not merely as Bronze Age mortuary architecture but as an enduring node in a pastoral territory." Marked °.

Expert response: "Pattern identification I didn't identify... turned the focus from the burial structures to the economy of those who built the dolmens — and the connection to the Bedouin." This insight was absent from the manual assessment of the same site.

**Brief: "Landscape for imagination" — intangible heritage** (~60 words)

Source C's footnote 2 lists textual references to dolmens: Rephaim in Deuteronomy, tombs in Mark, Merkolis in Talmud, Bedouin 'Dan' (shelter). The AI elevated these scholarly notes into a unified heritage value: "a persistent landscape for imagination" — structures that provoke narrative production across unrelated cultural traditions. Expert: "new beautiful insight not written before."

**Brief: Cultural landscape — geographic reframing** (~60 words)

Source A names four springs as location markers. Source C describes plateau settlement ecology. No source connects them. The AI framed the site as "a resource node within a landscape corridor" sustaining both sedentary and mobile populations. Expert: "Amazed by the new insight... strengthens the meaning of 'cultural landscape.'" Generated a new planning recommendation: include springs in any development buffer.

### Overview table — the full range

| Moment | AI output | Source basis | Epistemic status | Expert action |
|--------|-----------|-------------|-----------------|---------------|
| Social continuity | "Pastoralist populations using the same landscape over four millennia" | C pp.46-48 + C fn.4 + B (scattered across documents/sections) | ° — cross-source synthesis | Validated: "pattern I didn't identify" |
| "Landscape for imagination" | Footnote material → unified intangible heritage value | C fn.2 (scholarly notes, not interpretive theme) | ° — elevation | Validated: "new beautiful insight" |
| Cultural landscape | "Resource node in a landscape corridor" | A p.1 + C pp.40-41 (no source connects them) | ° — geographic reframing | Validated + new planning recommendation |
| "Hierarchical network" | Differentiation → hierarchy as organizational principle | A p.3: "it is possible... may have" | Unmarked — should be 💭 | Expert challenged; bot acknowledged overreach |
| Corbelling prototype | Not surfaced by AI | C p.44 — Stepansky's explicit research question | — (missed) | Not caught by either bot or assessor |

### Demonstration B/C hybrid — governance catching failure (~100 words)

Source A uses hedged language ("it is possible," "may have") about two sites of possible regional significance. The AI reframed this as "a hierarchically organized network" — structural language not present in any source. Crucially, it was not marked 💭. The expert challenged: "Is this framing a hypothesis of the bot or clearly written in the sources?" The AI acknowledged: "The phrase 'hierarchically organized network' is my interpretive framing — it goes beyond what the sources state."

This shows: (1) the AI can generate interesting hypotheses; (2) its own epistemic classification fails at the boundary between inference and speculation; (3) governance catches what notation misses.

### What neither caught (~2 sentences)

Source C explicitly poses a research question — whether corbelled dolmens could be prototypes for Canaanite tomb construction at Ugarit, Megiddo and Dan — that neither the AI nor the expert surfaced during the assessment. This is not a failure of the architecture but evidence that the workflow produces complementary coverage: a second pass, or a different expert, would catch different things.

### Workshop observations (~4 sentences)

Earlier versions of the tool were used by ~65 heritage professionals in ICOMOS and CIPA workshops. The most significant finding was that practitioners identified data quality as the critical factor determining output usefulness — leading directly to dedicated governance stages for data gap scanning and quality checking. In the Tuba assessment, the expert noted that arranging data was "kind of manual ETL — and very important" and that the uncertainty notation "helps to surface where hypotheses need attention and where the user's attention is required."

---

## Section 5: Discussion (~0.6 page)

**Job**: Interpret implications. Track 1 reviewers look here hardest.

### 5.1 Complementary blind spots — LEAD WITH THIS
- The case study reveals a structural finding: bot and expert fail differently
- The bot under-reads salience — misses which content carries interpretive weight for the domain (explicit research questions, central site enigmas)
- The expert under-connects evidence — misses cross-source patterns the AI catches (scattered data across documents/sections/footnotes)
- This is NOT "AI is flawed so humans must check it." It IS: the architecture structures a collaboration where each compensates for the other
- The result: an assessment richer than either could produce independently — confirmed by expert: 4 genuinely new insights absent from the manual assessment of the same site

### 5.2 Trust as structural governance
- Not accuracy verification but warranted confidence through architectural design
- [Anon., 2024] showed CBSA produces networks too complex for individual experts to manage consistently
- Trust = governing what exceeds individual cognitive capacity

### 5.3 Epistemic implications
- Assessment-as-report → assessment-as-inquiry: the workflow produces hypotheses and unexpected insights, not just conclusions
- A new output category: "machine-generated hypotheses for expert examination"
- Each assessment potentially surfaces patterns that may inform future research

### 5.4 Bias, limits, and honest failures
- LLMs may favor dominant narratives — structured prompting is partial mitigation
- Source quality determines output quality — strongest practitioner feedback
- The AI included non-CBSA administrative content — domain scope is not self-evident to AI
- Notation classification is approximate: the hierarchical network example proves this empirically

### 5.5 Limitations
- Single case, single expert, single platform — preliminary demonstration
- Same expert conducted both manual and AI-assisted assessments — not independent validation
- Notation relies on AI self-assessment (verbalized confidence), not tested for reliability
- Formal calibration (AI-expert agreement, cross-model stability) is priority for future work

---

## Section 6: Conclusions (~0.2 page)

Three beats, no restatement of demonstrations:

1. Current assessment theory articulates principles that practice struggles to implement consistently
2. We examined whether embedding those principles in AI, under governance, both operationalizes them and opens new inquiry. Preliminary evidence from comparing manual and AI-assisted assessment of the same site: the governed workflow surfaced insights absent from manual assessment, while governance caught failures the notation system alone could not
3. The core finding: bot and expert have complementary blind spots. The architecture's value is not preventing AI error — it is structuring a collaboration where notation activates the AI's synthetic strength and governance activates the expert's salience judgment

---

## Section 7: References (~0.7 page, 8-10 refs)

- [Anon., 2024] — CBSA theory + Huqoq case study (foundation)
- [Anon., CAA2026] — InSites implementation + workshop feedback
- Avrami & Mason 2019 — values-based conservation framework
- Bai 2023 — [TBD: confirm relevance]
- EAC Guidance 9 (2025) — European heritage assessment guidance
- Pan et al. 2024 — [TBD: confirm relevance]
- 1-2 AI-in-heritage landscape refs
- 1 verbalized confidence / AI epistemic calibration ref
- 1 AI governance in cultural domains ref

---

## Page Budget

| Section | Pages | Word estimate (~450/page) |
|---------|-------|--------------------------|
| 1. Introduction | 1.0 | ~450 |
| 2. Background | 0.5 | ~225 |
| 3. Design | 0.9 | ~400 |
| 4. Case Illustration | 1.1 | ~350 + table |
| 5. Discussion | 0.6 | ~270 |
| 6. Conclusions | 0.2 | ~90 |
| 7. References | 0.7 | 8-10 entries |
| **Total** | **5.0** | **0.5 page margin** |

---

## Writing Principles (from outline v4 — unchanged)

- **Heritage methodology in the foreground**: active agent is the methodology or expert, not the AI
- **Inquiry, not declaration**: "we examine whether" not "AI enables"
- **Interdisciplinary accessibility**: every technical term glossed on first use
- **Tone**: confident but modest
- **Double-blind**: no names, affiliations, identifying self-citations

---

## Key Adaptations from Outline v4

| Aspect | Outline v4 | This structure |
|--------|-----------|---------------|
| Site | TBD (4 options) | Tuba-Zangariyye — resolved |
| Comparison | None specified | **Same site, same expert, same sources: EAC11 manual CBSA (site 7.12) vs. InSites-CAA v2 with HITL** |
| Demo A | 1 example, 3 steps | **3 ° insights: 1 developed (social continuity) + 2 brief (imagination, cultural landscape)** |
| Demo B + C | Separate demonstrations | **Combined: hierarchical network carries both** |
| Missed content | Not in outline | **Added: corbelling — supports complementary blind spots** |
| Discussion lead | Trust (§5.1) | **Complementary blind spots — new finding from case** |
| Page budget | 6 pages | **5.5 pages (tighter)** |
| Section 4 format | Prose only | **Table + prose (saves ~300 words)** |

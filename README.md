# InSites-CAA — AI-Assisted Heritage Significance Assessment

**InSites** is an AI assistant that guides you through a structured significance assessment of built heritage sites. Upload documents about a site, and the assistant walks you through 7 stages (0–6) — identifying what makes the place culturally significant, how authentic it remains, and how it compares to similar sites.

Every claim is evidence-based. Every stage is reviewed by you. The AI proposes; you decide.

> **Workshop:** [InSites: Significance Assessment through the Looking Glass of Gen-AI](https://bit.ly/insites-caa)
> CAA 2026 — Athens, March 31, 2026
> **[bit.ly/insites-caa](https://bit.ly/insites-caa)**

---

## Try It Now

| Platform | Access | Notes |
|----------|--------|-------|
| **ChatGPT** | [Open InSites →](https://chatgpt.com/g/g-695d3567400c8191a402087b38c7b6b7-tr-bvt-h-rkt-mshm-vt-lshymvr) | Ready to use |
| **Google Gemini** | [Open InSites →](https://gemini.google.com/gem/5b822b7e1771?usp=sharing) | Use Thinking mode |
| **Claude.ai** | [Setup Guide →](InSites-Brain/Claude/SETUP-GUIDE.md) | DIY: paste one file into a Project (~5 min) |

**To start:** Upload a heritage document and type **"start"**.

---

## Quick Questions to Ask the Bot

The best way to understand InSites is to ask it. These questions let the bot introduce its own concepts.

### Understand the method

| Ask this | What you'll learn |
|----------|-------------------|
| **"What is InSites?"** | What it does, how it works, what it expects from you |
| **"What is CBSA?"** | The 7-stage assessment method — evidence-based, human-reviewed |
| **"What is context effect?"** | The core principle — how contexts and values shape each other |
| **"What are epistemic markers?"** | How the bot marks what's explicit, inferred 〰️, or interpretive 💭 |

### Explore capabilities

| Ask this | What you'll see |
|----------|----------------|
| **"kg"** or **"knowledge graph"** | Interactive map of entities and relationships |
| **"dashboard"** | Multi-tab visual summary of a completed assessment |
| **"read assessment"** | Deep interpretive reading through multiple lenses |
| **"read collection"** | Pattern analysis across multiple site assessments |

### Test its principles

| Ask this | Why it matters |
|----------|---------------|
| **"What evidence supports that claim?"** | Must cite your documents — file and page |
| **"What are the data gaps?"** | Stage 0 identifies what's missing before analysis |
| **"Can you search the web?"** | Should decline — works only with your uploads |

---

## What the Bot Does

**7-stage assessment (Stages 0–6)** — From document review through contexts, values, authenticity, comparison, significance statement, to quality check. Pauses after every stage for your review.

**Knowledge Graph** — Interactive entity-relationship visualization.

**Assessment Dashboard** — Multi-tab visual summary (values, contexts, timeline, integrity, threats).

**Read-Assessment** — Analytical and interpretive readings of a completed assessment.

**Read-Collection** — Cross-cutting analysis of multiple site assessments.

### Design principles

- **Evidence Mandate** — Uses only your uploaded documents. No external sources, no fabrication.
- **Human-in-the-Loop** — You approve every stage. The AI proposes; you decide.
- **Context Effect** — Bidirectional: contexts frame significance, and significance reframes contexts.
- **Epistemic Transparency** — Claims marked: explicit (sourced), 〰️ inferred, 💭 interpretive.

---

## Workshop Materials

- **[Companion website](https://bit.ly/insites-caa)** — Presentation, stage walkthroughs, KG demo, glossary
- **[Shared materials](https://drive.google.com/drive/folders/1HxWjZ1GVGtRsoGWZZi4kaiNuhhLPTfO1?usp=sharing)** — Heritage documents to work with during the workshop
- **[The Architect](docs/THE-ARCHITECT.md)** — Build your own AI agent (Ethics in Practice session)
- **[Sample data](docs/SAMPLE-DATA.md)** — Test datasets for hands-on sessions

---

## Repository Structure

```
InSites-Brain/
  Claude/                    Claude.ai mono prompt (v5.4) + setup guide
  GPTs/                      ChatGPT custom GPT (instructions + knowledge files)
  Gemini/                    Google Gemini prompt
  agent-for-agents/          "The Architect" meta-agent (EN + HE)
  design/                    Methodology specs (source of truth)
  sites-data/                Heritage site data for testing

workshop-site/               Companion website source (Vite + React + Tailwind)
docs/                        Non-technical overviews
```

---

## For Researchers

### Prompt source

The complete system prompt: [`InSites-Brain/Claude/InSites-CAA-mono v5.4.md`](InSites-Brain/Claude/InSites-CAA-mono%20v5.4.md)

### Design specs

| Document | Content |
|----------|---------|
| [MA-RA Spec](InSites-Brain/design/MA-RA-spec-v2.md) | Read-Assessment workflow |
| [MA-RC Spec](InSites-Brain/design/MA-RC-spec-v2.md) | Read-Collection workflow |
| [Artifact UX Contract](InSites-Brain/design/artifact-ux-contract.md) | Cross-platform visual language |
| [Dashboard Reference](InSites-Brain/design/Single-Dashboard-example.html) | Assessment dashboard implementation |
| [Session Report](InSites-Brain/design/Bot-Research-Skiil/) | Research instrument for documenting sessions |

---

## How to Cite

> Alef, Y., & Shafriri, Y. (2026). InSites-CAA: AI-Assisted Heritage Significance Assessment. InSites Knowledge Lab, Technion — Israel Institute of Technology. https://github.com/InSites-Lab/Insites-CAA2026

---

## The InSites Knowledge Lab

At the intersection of assessment methods, novel technologies, and built-heritage data — we develop computational methods for evidence-based heritage assessment.

**Dr. Yael Alef** — Heritage assessment methodology, CBSA development
**Yuval Shafriri** — AI systems architecture, prompt engineering

[InSites Knowledge Lab](https://github.com/InSites-Lab) · Technion — Israel Institute of Technology

---

[CC-BY 4.0](LICENSE)

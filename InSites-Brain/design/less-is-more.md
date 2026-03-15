# Less-Is-More (LIM) — Design Reference

Simplifications to reduce user-facing verbosity in the CBSA bot. Applied in `cbsa-method-lim.md`. Original `cbsa-method.md` stays untouched.

---

## A. CSR Brief → One Paragraph

**Before** (two labeled sections per stage opening):
```
💡 Why is this stage critical? (1-2 sentences)
⚙️ How is the analysis structured? (1-2 points)
```

**After** (one paragraph):
```
💡 Brief: [what we're doing and why, based on previous findings — 2-3 sentences max]
```

Drop the two-heading structure. One concise paragraph combining purpose + approach.

---

## B. Merge Reflection + Before Moving On → Single Prompt

**Before** (three elements at end of every stage):
```
💡 For Reflection — 1-2 questions
✋ Before Moving On — Anything to add, correct, or change?
Continue to Stage N?
```

**After** (one combined prompt):
```
💡 [reflection question(s)] ... Continue to Stage N, or add/correct anything first?
```

Removes one prompt per stage. Over 7 stages = 7 fewer interruptions.

---

## C. Remove Regional Note Prompt (Stage 3)

**Before** (Stage 3.2, explicit 3-option prompt):
```
"🌐 Regional Note: Would you like to explore how [region] approaches authenticity? (yes / no / tell me more)"
```

**After**: Remove the prompt entirely. If a regional framework is relevant, weave it into the analysis. Don't ask the user to choose.

---

## D. Simplify Optional Tracks (Stage 5)

**Before** (mandatory to list all 5):
```
5.2 Optional Tracks (mandatory to present all options; execute only if requested)
- Knowledge Graph
- Semiotic Reading
- Educational/Community/Tourism Ideas
- Alternative Narrative Framings
- Social Media Sentiment Analysis
```

**After**:
```
5.2 Next Steps
Offer Knowledge Graph. Mention that other explorations (semiotic reading, alternative framings, community ideas) are available on request.
```

---

## E. Self-Critique → Remove from Triggers (LIM only)

Remove the self-critique row from the triggers table in the LIM variant. It's a developer/debug tool, not for workshop participants. (Stays in `instructions.md` as a user starter prompt option.)

---

## Impact Summary

| Change | Prompts removed per session |
|--------|-----------------------------|
| B. Merge reflection + before moving on | -7 (one per stage) |
| D. Simplify optional tracks | -4 lines in Stage 5 |
| C. Remove regional note | -1 prompt in Stage 3 |
| A. CSR brief simplification | Same count, shorter text |
| E. Self-critique | -1 trigger row |

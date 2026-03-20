# Content Generation Guide

> Instructions for LLMs (or humans) creating new concept cards for the AI Safety app.
> Read this alongside `CLAUDE.md` for full architecture context.

## Creating a New Card

When adding a new concept card to `src/data/concepts.js`, follow this checklist:

### 1. Required Fields

```js
{
  id: 'cNNN',                  // Unique ID with 'c' prefix
  title: 'Concept Name',
  summary: 'One-line summary for card previews',
  description: 'Detailed explanation (2-4 sentences)',
  quizDescription: 'Clue-like indirect description for quizzes',
  topic: 'topic-id',
  secondaryTopic: null,        // or another topic ID
  category: 'concept',         // one of: concept, technique, risk, regulation, practice, proposal, actor, other
  difficulty: 1,               // 1-3
  tags: ['tag1', 'tag2'],
  linkedCards: [{ id: 'cXXX', relationship: 'relates to' }],
  importance: 1,
  isFoundational: false,
}
```

### 2. Optional: `whyItMatters`

Add this field only when the "why does this matter for AI safety?" question is meaningful (~40% of cards).

**Rules:**
- **Max ONE sentence** — keep it short for quiz readability
- **Consequence-focused** — explain the downstream effect, not just restate what the concept is
- **Specific to the card** — avoid generic statements like "this is important for safety"
- **Must not overlap with `quizDescription`** — they test different things
- **Do NOT start with type-categorizing phrases** like "This risk...", "This technique..." — lead with effects or actions

**Good examples:**
- "Predictable capability gains create strong incentives to keep scaling without pausing for safety."
- "A guardrail that can be bypassed with a clever prompt is really just a suggestion that only works on cooperative users."
- "One flaw in a widely-deployed base model cascades into every downstream application simultaneously."

**Bad examples (too long/vague/overlapping):**
- "This is an important concept because it relates to AI safety in many ways." (too vague)
- "Systems that can read and generate convincing human language gain the ability to persuade, deceive, and impersonate at scale — capabilities with no historical precedent." (too long — two clauses)

### 3. Required: Check for `similarWhyMatters`

After writing `whyItMatters`, **compare it against ALL existing cards' `whyItMatters` fields**. If the reason is thematically similar to another card's, you MUST:

1. Add `similarWhyMatters: ['cXXX']` to your new card
2. Add your new card's ID to the other card's `similarWhyMatters` array

**What counts as "similar":**
- Both reasons are about the same underlying concern (e.g., "irreversibility", "gaming objectives", "bias in data")
- A quiz-taker reading both `whyItMatters` statements might reasonably think either could apply to both concepts
- The core argument is the same even if the specific wording differs

**Current similarity groups** (update these when adding new links):

| Group Theme | Card IDs |
|-------------|----------|
| Resisting shutdown / irreversible control | c402, c404, c505 |
| Gaming / exploiting objectives | c304, c403, c406, c504 |
| Hidden goals / deception passing evaluations | c405, c503 |
| Single point of failure / cascading risk | c202, c305 |
| Bias in training data/patterns | c102, c302, c303, c702 |
| Irreversibility | c506, c706, c806 |
| Power / monopoly concerns | c206, c704 |
| Independent evaluation / conflict of interest | c604, c804 |

### 4. Optional: Add to `descriptionDistractors.js`

For cards that will appear in hardMCQ questions, add custom distractors in `src/data/descriptionDistractors.js`. Each entry needs:
- `hardCorrect`: An alternative correct description (worded differently from `quizDescription`)
- `distractors`: Array of 3 plausible-but-wrong descriptions at difficulty levels 1-3

### 5. Optional: Add to WHY_DISTRACTORS

In `src/data/descriptionDistractors.js`, add a custom wrong `whyItMatters` for your card. This is a plausible-but-incorrect reason that sounds tempting. The distractor should:
- Sound reasonable at first glance
- Contain a subtle factual error or logical flaw
- Not be easily confused with the correct `whyItMatters` of ANY other card

### 6. Cross-References

Before finalizing:
- Check `linkedCards` — does your card link to related concepts?
- Check `tags` — are there tags that connect it to other topics?
- Check existing cards — should any existing card link to yours?

## Validation Checklist

- [ ] `whyItMatters` is max ONE sentence
- [ ] `whyItMatters` does not overlap with `quizDescription`
- [ ] Checked all existing `whyItMatters` for similarity; added `similarWhyMatters` if needed
- [ ] Updated OTHER cards' `similarWhyMatters` to include this card's ID (bidirectional)
- [ ] `quizDescription` starts with a gerund, action, or effect (not "This is..." or "A system...")
- [ ] Category is correct per CLAUDE.md guidelines
- [ ] Tags include cross-topic connections where relevant

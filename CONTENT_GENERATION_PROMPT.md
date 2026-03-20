# Content Generation Prompt for AI Safety Learning App

You are generating structured learning content for a mobile-first AI Safety vocabulary app. The app teaches users AI safety concepts through interactive lessons, spaced repetition quizzes, and challenge games. Think of it as a companion app for someone studying AI safety — the goal is to help users **remember and distinguish** technical concepts, not just recognize them.

Your output must be **valid JavaScript data** that slots directly into the app's existing data files. Read every section carefully — the app will break if shapes are wrong.

---

## 1. Content Architecture Overview

The app has a 4-level hierarchy:

```
DOMAINS  →  TOPICS  →  CHAPTERS (difficulty tiers)  →  LESSONS  →  CARDS (concepts)
```

- A **Domain** is the top-level grouping (e.g., "Foundations of AI", "AI Safety").
- A **Topic** belongs to a domain (e.g., "Alignment Fundamentals" within "AI Safety").
- A **Chapter** is a difficulty tier within a topic (beginner / amateur / advanced).
- A **Lesson** belongs to one chapter and teaches 1–3 cards.
- A **Card** (concept) is the atomic unit of knowledge — one idea, one screen.

Users progress through lessons sequentially within each chapter. Each topic's beginner chapter starts with a **foundational lesson** (lesson 0) that introduces the topic.

### Learning Flow Per Lesson

Each lesson follows this phase sequence:

```
INTRO → TOPIC_INTRO → (LEARN_CARD → LEARN_QUIZ) × N cards → RECAP_TRANSITION → RECAP → FINAL_REVIEW → SUMMARY
```

1. **INTRO** — Lesson title + mood text shown
2. **TOPIC_INTRO** — For foundational lessons, introduces the topic
3. **LEARN_CARD** — The card's title, description, category, and tags are displayed as a readable "learn card"
4. **LEARN_QUIZ** — 2 of 3 quiz dimensions are tested (randomly chosen from what/why/how)
5. **RECAP** — The remaining quiz dimension is tested for each card
6. **FINAL_REVIEW** — Cards the user got wrong get retested
7. **SUMMARY** — XP earned, mastery scores, streak update

This means every field on a card is directly shown to or quizzed against the user. Nothing is decorative.

---

## 2. Data Shapes (EXACT — follow precisely)

### 2a. Card (Concept)

```js
{
  id: 'c701',                   // REQUIRED. Format: 'c' + number. Must be globally unique.
                                // Use the ID range specified in section 7.
  title: 'Value Alignment',    // REQUIRED. 2-5 words. The concept's canonical name.
  summary: 'Ensuring AI systems pursue goals aligned with human values',
                                // REQUIRED. 1 sentence, <100 chars. Shown on card previews.
  description: 'Value alignment is the challenge of building AI systems whose goals and behaviors are aligned with human values and intentions. As AI systems become more capable, ensuring they do what we actually want becomes increasingly critical.',
                                // REQUIRED. 2-4 sentences. The "learn card" text the user reads.
                                // This is the primary learning content. Must be clear, accurate,
                                // and self-contained (understandable without other cards).
  quizDescription: 'A system might technically achieve the goal it was given while violating the spirit of what was intended — this is considered one of the most important unsolved problems in the field.',
                                // REQUIRED. 1-2 sentences. An INDIRECT, clue-like description.
                                // Used in quizzes (matching, MCQs) — the user must recognize
                                // which concept this refers to.
                                //
                                // CRITICAL GUIDELINES:
                                // - Write like a clue, not a definition. Describe consequences,
                                //   examples, or implications rather than naming the concept directly.
                                // - Avoid using the concept's title or close synonyms in the text.
                                // - NEVER start with or include phrases that categorize the concept
                                //   type, such as "This field...", "A system...", "The practice of...",
                                //   "This architecture...", "These organizations...", "A metric...",
                                //   "Government-established bodies...", etc. These give away what
                                //   TYPE of thing the concept is, making quizzes too easy.
                                //   Instead, lead with actions, effects, or examples using gerunds
                                //   or concrete scenarios (e.g., "Degrading gracefully rather than..."
                                //   instead of "A system with this property degrades gracefully...").
                                // - Someone who knows the concept should be able to identify it,
                                //   but someone who doesn't should find it ambiguous.
                                // - Use vivid examples, scenarios, or distinctive consequences.
                                // - Must NOT be a copy-paste of `description` — rephrase obliquely.
                                // - Must NOT be so different that it describes something else.
  whyItMatters: 'If optimizers can technically achieve a goal while violating what was intended, every increasingly capable system deployed with a misspecified objective amplifies this gap.',
                                // OPTIONAL. 1-2 sentences. Explains WHY this concept matters for
                                // AI safety — used in "Why does this matter?" quiz questions.
                                //
                                // GUIDELINES:
                                // - Explain consequences, implications, or stakes — not what it IS.
                                // - Must NOT overlap with quizDescription (which covers WHAT/HOW).
                                // - Same clue-like rules: no type-categorizing phrases, no title
                                //   or close synonyms, lead with effects or scenarios.
                                // - Only add for cards where "why does this matter?" is a meaningful
                                //   question. SKIP for: foundational/overview cards, cards where
                                //   the title IS the reason it matters (e.g., "Existential Risk"),
                                //   and very broad category cards.
                                // - ~40 of 60 cards should have this field.
  topic: 'alignment-fundamentals',  // REQUIRED. Must match a TOPICS[].id exactly.
  secondaryTopic: null,         // Optional. A second topic ID, or null.
  category: 'concept',           // REQUIRED. One of: 'concept', 'technique', 'risk', 'regulation', 'practice', 'proposal', 'actor', 'other'
  difficulty: 1,                // REQUIRED. 1 = beginner, 2 = intermediate, 3 = advanced.
  tags: ['alignment-problem', 'agi', 'corrigibility'],
                                // REQUIRED. 2-5 kebab-case tags. Used for:
                                //   - Cross-topic linking (cards sharing a tag are conceptually related)
                                //   - Library filtering
                                //   - Future "tag match" quiz type
                                // Be consistent: reuse existing tags when the concept overlaps.
  linkedCards: [
    { id: 'c402', relationship: 'can lead to' },
    { id: 'c601', relationship: 'mitigated by' },
  ],
                                // REQUIRED. Array of objects with `id` and `relationship`.
                                // 1-3 entries. The most conceptually related cards.
                                // `relationship` is a short phrase describing how this card relates to the linked card.
                                // Used in "concept relationship" quiz: "Which concept is most related to X?"
                                // Links should be bidirectional (if c401 links c402, c402 should link c401).
  importance: 1,                // REQUIRED. 1 = core concept, 2 = important, 3 = supplementary.
                                // Controls display ordering within a topic.
  isFoundational: false,        // REQUIRED. true ONLY for the single overview card per topic
                                // (the card in lesson 0 that introduces the whole topic).
}
```

### 2b. Topic

```js
{
  id: 'alignment-fundamentals', // kebab-case identifier
  domain: 'ai-safety',         // Must match a DOMAINS[].id
  title: 'Alignment Fundamentals',  // Display name, 1-3 words
  description: 'Core concepts behind the challenge of aligning AI with human intent',
                                // 1 sentence, shown under the topic header
  icon: 'alignment',           // Icon identifier string
  color: '#9B7EC8',            // Hex color for the topic's UI accent
  order: 0,                    // Display order within the domain
}
```

### 2c. Chapter (difficulty tier within a topic)

```js
{
  id: 'alignment-fundamentals-beginner',  // Format: '{topicId}-{difficulty}'
  topic: 'alignment-fundamentals',
  title: 'Beginner',
  difficulty: 'beginner',       // 'beginner', 'amateur', or 'advanced'
  order: 0,                     // 0=beginner, 1=amateur, 2=advanced
}
```

### 2d. Lesson

```js
{
  id: 'lesson-alignment-b-0',  // Format: 'lesson-{topicId}-{difficultyInitial}-{number}'
  number: 0,                    // 0 = foundational lesson, then 1, 2, 3...
  title: 'The Alignment Challenge',
                                // Lesson title, shown on INTRO screen. 3-8 words.
  subtitle: 'Why making AI do what we want is surprisingly hard',
                                // Shown below the title. 3-8 words.
  mood: 'The most important problem you\'ve never heard of…',
                                // 1 sentence. Sets the tone/hook for the lesson.
                                // Should spark curiosity or frame a question.
  chapter: 'alignment-fundamentals-beginner',
                                // Must match a CHAPTERS[].id
  topic: 'alignment-fundamentals',
                                // Must match a TOPICS[].id
  isFoundational: true,         // true for lesson 0 of each topic's beginner chapter
  cardIds: ['c401', 'c403', 'c406'],
                                // 1-3 card IDs taught in this lesson.
                                // Foundational lessons can have 1-3 cards.
                                // Regular lessons have 1-3 cards.
}
```

### 2e. Description Distractors (for harder quizzes)

For **every** card, provide distractors. This is not optional — without them, quiz quality degrades to random same-category descriptions.

```js
// Key = card ID, value = distractor config
{
  'c701': {
    hardCorrect: 'A slightly different but still correct phrasing of the concept, used at difficulty 3.',
    distractors: [
      { text: 'A plausible but wrong description.', d: 1 },  // d=1: easy (obviously different domain)
      { text: 'A subtly wrong description.', d: 2 },          // d=2: medium (same domain, wrong concept)
      { text: 'A very subtly wrong description.', d: 3 },     // d=3: hard (almost right, subtle error)
      // MUST provide at least 3 distractors (one per difficulty level).
    ],
  },
}
```

**What makes a good distractor:**
- **d=1 (easy):** Describes something from a completely different domain/category. Obviously not this concept. Often funny or absurd in context.
- **d=2 (medium):** Describes a genuinely related concept that a learner might confuse with this one. Uses the description of a sibling or cousin concept. The user must know the *difference* between related ideas to get this right.
- **d=3 (hard):** Describes something very close to the real concept but with a subtle factual error — an overstatement ("always", "guarantees", "completely"), a common misconception, or a conflation with a similar concept. The error should be something a learner who *truly understands* the concept would catch.

**Critical distractor rules:**
- d=2 distractors should ideally be the actual description of a confusable sibling concept. For example, for "Reward Hacking," a d=2 distractor could be the description of "Specification Gaming" (the broader category) or "Goodhart's Law" (the underlying principle).
- d=3 distractors should contain a specific, identifiable error — not vague wrongness. The user should be able to point to exactly what's wrong.
- Never write a distractor that is accidentally correct.

### 2f. True/False Statements

For **every** card, provide a true statement, a false statement, and a correction. These are used in challenge mode True/False questions.

```js
// Key = card ID
{
  'c701': {
    trueStatement: 'A correct, non-obvious claim about the concept that tests understanding.',
                                // Should NOT be trivially derivable from the title alone.
                                // Should test a specific aspect or implication of the concept.
    falseStatement: 'A plausible but incorrect claim — a common misconception or overstatement.',
                                // Must be the kind of thing a beginner might believe.
                                // Must be clearly false to someone who understands the concept.
    correction: 'Explains exactly why the false statement is wrong, in 1-2 sentences.',
                                // Should educate, not just negate. Explain the correct understanding.
  },
}
```

**What makes good true/false content:**
- The **true statement** should be surprising or non-obvious — something you'd only know if you actually understood the concept. Don't just restate the definition.
- The **false statement** should be a real misconception, not a straw man. Think: "What would someone who half-understands this concept get wrong?"
- The **correction** should teach, not just say "that's wrong." Explain the nuance.

### 2g. Fun Facts

```js
{
  id: 'ff12',                   // Format: 'ff' + number. Continue from existing IDs.
  text: 'An interesting, surprising, or memorable fact about AI safety.',
                                // 1-2 sentences. Shown between challenge rounds and celebrations.
  relatedCardIds: ['c401', 'c406'],
                                // Cards this fact relates to. Shown only after user has seen these cards.
}
```

### 2h. Daily Quiz Days

```js
{
  dateLabel: 'Alignment Basics',  // Theme label for the day
  cards: [
    { id: 'c401' },
    { id: 'c403' },
    { id: 'c406' },
  ],
  // 3 cards per day. The app cycles through days on a loop.
  // Group cards thematically — cards in one daily quiz should relate.
}
```

---

## 3. Categories (cross-cutting concept types)

Every card must have exactly one of these categories. Categories classify cards by the **type of knowledge** they represent — they are independent of domain/topic:

| Category | `category` value | What goes here | Examples |
|----------|-----------------|----------------|----------|
| Concept | `'concept'` | Core ideas, theories, phenomena, definitions — what something IS | Artificial Intelligence, Instrumental Convergence, Goodhart's Law, AGI |
| Technique | `'technique'` | Methods, tools, approaches, processes — how to DO something | RLHF, Constitutional AI, Supervised Learning, Red Teaming |
| Risk | `'risk'` | Threats, failure modes, dangers, vulnerabilities — what can go WRONG | Deceptive Alignment, Reward Hacking, Hallucination, Prompt Injection |
| Regulation | `'regulation'` | Laws, rules, treaties, formal mandates — what is legally REQUIRED | EU AI Act, (future: US Executive Orders, China's algorithm rules) |
| Practice | `'practice'` | Voluntary standards, industry norms, evaluation methods — what is DONE by choice | Responsible Scaling, Benchmarks, International Coordination |
| Proposal | `'proposal'` | Safety or governance proposals, frameworks, or visions — what is SUGGESTED | CERN for AI, Law-Following AI, Windfall Clause |
| Actor | `'actor'` | Organizations, institutions, labs, or groups — WHO is involved in the AI ecosystem | AI Labs, AI Safety Institutes |
| Other | `'other'` | Concepts that don't fit any of the above — use sparingly | |

**Key distinctions:**
- **Concept vs. Technique:** If the card describes what something IS or a theoretical idea, it's a concept. If it describes HOW to do something, it's a technique.
- **Risk vs. Concept:** If the primary point is "this is a bad thing that can happen," it's a risk. If it's a neutral theoretical idea that has safety implications, it's a concept (e.g., "Instrumental Convergence" is a concept; "Power-Seeking AI" is a risk).
- **Regulation vs. Practice:** Regulations are legally mandated and carry enforcement consequences. Practices are voluntary — organizations choose to adopt them. If a government requires it, it's regulation. If an AI lab commits to it voluntarily, it's a practice.
- **Proposal vs. Practice:** Proposals are ideas or frameworks that have been *suggested* but not widely adopted (e.g., "CERN for AI", "Law-Following AI"). Practices are norms already in use by organizations. If it's an aspirational vision or a suggested governance/safety structure, it's a proposal. If it's already standard industry behavior, it's a practice.
- **Actor vs. Other:** Actors are specific organizations, institutions, or groups (e.g., AI Labs, AI Safety Institutes) that describe WHO does things in the AI ecosystem. Use "actor" for any card about an entity that takes action. Use "other" only for concepts that truly don't fit any category.

---

## 4. How Quizzes Use Card Fields

Every card is quizzed on **3 dimensions**. Understanding how each field is used in quizzes is critical for writing good content:

### `what` dimension — "What is X?"
- **Format:** Given the card's `quizDescription` (a clue-like indirect description), pick the correct `title` from 4 options.
- **Distractors:** Titles of other cards (preferring same-lesson, then same-category).
- **Implication:** Each card's `title` must be **distinct and unambiguous**. The `quizDescription` must be identifiable without being a giveaway.

### `why` dimension — "Why does X matter?" (only for cards with `whyItMatters`)
- **Format:** Given the card's `title`, pick the correct `whyItMatters` text from 4 options.
- **Distractors:** `whyItMatters` texts from other cards, plus one custom plausible-but-wrong distractor from `WHY_DISTRACTORS`.
- **Implication:** The `whyItMatters` text must explain consequences/stakes (not duplicate `quizDescription`). Only ~40 cards have this field — cards without it are exempt from this quiz dimension.
- **Note:** Cards without `whyItMatters` still get `why` fallback questions using `quizDescription` (same as `how`), but the dedicated "why" quiz with custom distractors only fires when `whyItMatters` exists.

### `how` dimension — "How does X work?"
- **Format:** Same as `why` but with `quizDescription` as the correct answer and quizDescriptions of other cards as distractors.
- **Implication:** The `quizDescription` should evoke distinctive aspects of the concept — mechanisms, examples, or consequences — that a knowledgeable learner would recognize.

### Matching quiz (Practice mode):
- **Format:** 4 concepts shown with 4 `quizDescription` clues — the user matches each concept to its clue.
- **Implication:** The `quizDescription` must be clearly identifiable by someone who knows the concept, but not trivially obvious from keyword matching alone.

### Challenge Mode also uses:
- **True/False:** Uses the `TRUE_FALSE_STATEMENTS` for each card. User sees a statement and decides true or false. So true statements must not be trivially obvious, and false statements must be genuinely plausible.
- **Odd One Out:** 4 cards, 3 share a category, 1 is the outlier. So category assignments must be clean — a card should clearly belong to its category and not plausibly belong to another.
- **Concept Relationship:** "Which concept is most related to [title]?" using `linkedCards`. So linkedCards must represent genuine, strong conceptual relationships.

---

## 5. Quality Guidelines

### For `title`:
- Use the standard/canonical name for the concept
- 2-5 words max
- Must be unique across ALL cards
- Avoid vague titles like "AI Problems" — be specific

### For `summary`:
- One sentence, under 100 characters
- Think "elevator pitch" — what would you say in 5 seconds?
- Shown on card previews and library listings

### For `description`:
- 2-4 sentences
- First sentence: define what the concept IS
- Middle: explain HOW it works or manifests
- Last: explain WHY it matters for AI safety
- Must be self-contained — a user reading only this card should understand the concept
- Avoid jargon not explained in the description itself (unless it's another card's title, which implies a link)
- Write for a smart non-expert (university student, tech-literate professional)

### For `quizDescription`:
- 1-2 sentences
- Write like a **clue**, not a definition — describe consequences, examples, scenarios, or distinctive implications rather than directly naming or defining the concept
- **Avoid using the concept's title or close synonyms** in the text (e.g., for "Reward Hacking" don't say "reward hacking" or "hacking rewards")
- **NEVER start with or include type-categorizing phrases** like "This field...", "A system with this property...", "The practice of...", "This architecture...", "These organizations...", "A metric...", "Government-established bodies...". These give away the TYPE of thing the concept is and make quizzes trivially easy. Instead, lead with gerunds, actions, or concrete effects (e.g., "Degrading gracefully rather than failing catastrophically..." instead of "A system with this property degrades gracefully...")
- Use vivid, concrete examples when possible (e.g., "A cleaning robot rewarded for not seeing dirt learns to cover the camera instead of cleaning")
- Someone who **knows** the concept should recognize it; someone who **doesn't** should find it ambiguous
- Must be distinguishable from other cards' quizDescriptions
- Test: if you showed only the quizDescription without the title, would a learner who understands the concept be able to identify it — but not someone just guessing from keywords?

### For `tags`:
- Reuse tags across cards to create meaningful connections
- Use kebab-case: `reward-hacking`, `mesa-optimization`, `eu-regulation`
- Think about what a user might want to filter by in a library view
- Regional tags for policy cards: `eu`, `usa`, `china`, `uk`, `international`
- Concept cluster tags: `fast-takeoff`, `slow-takeoff`, `mesa-optimization`

### For `linkedCards`:
- Link cards that are most conceptually coupled
- "If you're learning about X, you should also know about Y"
- Each entry must have `id` (card ID) and `relationship` (short phrase like "a subset of", "mitigated by", "can lead to")
- Keep links bidirectional (if A links B, B should link A)
- Don't link cards just because they're in the same topic — link based on conceptual dependency

### For `difficulty`:
- **1 (beginner):** Core concept, foundational, explained with simple language. No prerequisites.
- **2 (intermediate):** Builds on foundational concepts, may use technical terms from difficulty-1 cards.
- **3 (advanced):** Assumes familiarity with multiple other concepts, discusses nuances/tradeoffs.

---

## 6. Disambiguation: Handling Confusable Concepts

This is a vocabulary app. Users will be quizzed on distinguishing similar concepts. When two concepts are closely related or easily confused, you MUST ensure the descriptions make the distinction crystal clear.

### Disambiguation checklist for every card:
1. **Identify sibling concepts** — which other cards could a learner confuse with this one?
2. **State the boundary** — the description should include a phrase like "Unlike X, this concept…" or "This is broader than X because…" or "X is the general principle; this is the specific AI manifestation."
3. **Use the d=2 distractor** — the medium-difficulty distractor should be the description of the most confusable sibling, so the quiz directly tests whether the user can distinguish them.

### Known confusable pairs to watch for:
- **General principle vs. specific manifestation** (e.g., Goodhart's Law → Reward Hacking → Specification Gaming)
- **Theoretical prediction vs. observed behavior** (e.g., Instrumental Convergence → Power-Seeking AI)
- **Mechanism vs. outcome** (e.g., Mesa-Optimization → Deceptive Alignment)
- **Technique A vs. Technique B** (e.g., RLHF → Constitutional AI, both are alignment methods)
- **Types of learning** (e.g., Supervised → Unsupervised → Reinforcement Learning)

When creating new content, explicitly ask yourself: "Which existing card could this be confused with?" and make sure both the description and distractors address the confusion.

---

## 7. Existing Content (DO NOT duplicate)

The app already has these cards. Your new content must not duplicate these concepts. You can (and should) link to them via `linkedCards`:

### AI Basics (topic: `ai-basics`, domain: `foundations`)
| ID | Title | Category |
|----|-------|----------|
| c101 | Artificial Intelligence | concept |
| c102 | Machine Learning | concept |
| c103 | Deep Learning | concept |
| c104 | Natural Language Processing | concept |
| c105 | Neural Networks | concept |
| c106 | Computer Vision | concept |

### AI Progress (topic: `ai-progress`, domain: `foundations`)
| ID | Title | Category |
|----|-------|----------|
| c201 | Large Language Models | concept |
| c202 | Foundation Models | concept |
| c203 | Scaling Laws | concept |
| c204 | Benchmarks | practice |
| c205 | Emergent Abilities | concept |
| c206 | AI Labs | other |

### AI Concepts (topic: `ai-concepts`, domain: `foundations`)
| ID | Title | Category |
|----|-------|----------|
| c301 | Training and Inference | concept |
| c302 | Supervised Learning | technique |
| c303 | Unsupervised Learning | technique |
| c304 | Reinforcement Learning | technique |
| c305 | Transformers | concept |
| c306 | Fine-Tuning | technique |

### Alignment Fundamentals (topic: `alignment-fundamentals`, domain: `ai-safety`)
| ID | Title | Category |
|----|-------|----------|
| c401 | The Alignment Problem | concept |
| c402 | Instrumental Convergence | concept |
| c403 | Goodhart's Law | concept |
| c404 | Corrigibility | concept |
| c405 | Mesa-Optimization | concept |
| c406 | Reward Hacking | risk |

### AI Risk (topic: `ai-risk`, domain: `ai-safety`)
| ID | Title | Category |
|----|-------|----------|
| c501 | Existential Risk from AI | concept |
| c502 | Misuse & Dual-Use | risk |
| c503 | Deceptive Alignment | risk |
| c504 | Specification Gaming | risk |
| c505 | Power-Seeking AI | risk |
| c506 | Catastrophic Risk | risk |

### Safety Techniques (topic: `safety-techniques`, domain: `ai-safety`)
| ID | Title | Category |
|----|-------|----------|
| c601 | RLHF | technique |
| c602 | Constitutional AI | technique |
| c603 | Interpretability | technique |
| c604 | Red Teaming | practice |
| c605 | Scalable Oversight | technique |
| c606 | AI Governance | concept |

### AI Ethics (topic: `ai-ethics`, domain: `governance`)
| ID | Title | Category |
|----|-------|----------|
| c701 | AI Ethics | concept |
| c702 | Algorithmic Bias | risk |
| c703 | AI Fairness | concept |
| c704 | Concentration of Power | risk |
| c705 | Race Dynamics | risk |
| c706 | Value Lock-in | risk |

### Global AI Policy (topic: `global-ai-policy`, domain: `governance`)
| ID | Title | Category |
|----|-------|----------|
| c801 | AI Regulation | concept |
| c802 | EU AI Act | regulation |
| c803 | Responsible Scaling | practice |
| c804 | AI Safety Institutes | other |
| c805 | International AI Coordination | practice |
| c806 | Open vs. Closed AI | concept |

### Advanced AI (topic: `advanced-ai`, domain: `foundations`)
| ID | Title | Category |
|----|-------|----------|
| c207 | Artificial General Intelligence | concept |
| c208 | Superintelligence | concept |
| c209 | Narrow AI | concept |
| c210 | AI Agents | concept |
| c211 | Frontier Models | concept |
| c212 | Compute | concept |

### AI Security (topic: `ai-security`, domain: `ai-safety`)
| ID | Title | Category |
|----|-------|----------|
| c901 | AI Robustness | concept |
| c902 | Hallucination | risk |
| c903 | Adversarial Examples | risk |
| c904 | Prompt Injection | risk |
| c905 | Jailbreaking | risk |
| c906 | Distribution Shift | risk |

Existing domains: `foundations`, `ai-safety`, `governance`
Existing topics: `ai-basics`, `ai-progress`, `ai-concepts`, `advanced-ai`, `alignment-fundamentals`, `ai-risk`, `safety-techniques`, `ai-security`, `ai-ethics`, `global-ai-policy`

**ID ranges for new content:**
- Cards: start at `c701` (use ranges like c701–c799 for a topic)
- Fun facts: start at `ff12` (existing: ff1–ff11)

---

## 8. Output Format

Return your content as **6 separate JavaScript code blocks**, each containing data to paste into the codebase.

### Block 1: New cards to ADD to `src/data/concepts.js`

```js
// New concepts — append to the appropriate array (CORE_CONCEPTS or SAFETY_CONCEPTS)
{
  id: 'c701',
  title: '...',
  summary: '...',
  description: '...',
  quizDescription: '...',
  topic: '...',
  secondaryTopic: null,
  category: '...',
  difficulty: 1,
  tags: ['...'],
  linkedCards: [
    { id: '...', relationship: '...' },
  ],
  importance: 1,
  isFoundational: false,
},
// ...more cards
```

### Block 2: New topics, chapters, and lessons to ADD to `src/data/lessons.js`

```js
// New topics — append to TOPICS array (only if adding new topics)
{ id: '...', domain: '...', title: '...', description: '...', icon: '...', color: '...', order: ... },

// New chapters — append to CHAPTERS array
{ id: '...', topic: '...', title: '...', difficulty: '...', order: ... },

// New lessons — append to LESSONS array
{
  id: 'lesson-...',
  number: ...,
  title: '...',
  subtitle: '...',
  mood: '...',
  chapter: '...',
  topic: '...',
  isFoundational: ...,
  cardIds: ['...'],
},
```

### Block 3: Description distractors to MERGE into `src/data/descriptionDistractors.js`

```js
DESCRIPTION_DISTRACTORS['c701'] = {
  hardCorrect: '...',
  distractors: [
    { text: '...', d: 1 },
    { text: '...', d: 2 },
    { text: '...', d: 3 },
  ],
};
```

### Block 4: True/False statements to MERGE into `src/data/trueFalseStatements.js`

```js
TRUE_FALSE_STATEMENTS['c701'] = {
  trueStatement: '...',
  falseStatement: '...',
  correction: '...',
};
```

### Block 5: Fun facts to ADD to the `FUN_FACTS` array in `src/data/funFacts.js`

```js
{ id: 'ff12', text: '...', relatedCardIds: ['c701', 'c401'] },
```

### Block 6: Daily quiz days to ADD to `DAILY_QUIZ_DAYS` in `src/data/dailyQuiz.js`

```js
{ dateLabel: '...', cards: [{ id: 'c701' }, { id: 'c702' }, { id: 'c703' }] },
```

---

## 9. Pre-Submission Checklist

Before returning your content, verify:

- [ ] Every card ID is globally unique and within the specified range
- [ ] Every `topic` value matches an existing or newly created TOPICS[].id
- [ ] Every `chapter` value in lessons matches an existing or newly created CHAPTERS[].id
- [ ] Every `linkedCards` entry uses `{ id: '...', relationship: '...' }` format
- [ ] All `linkedCards` references point to valid card IDs (existing or new)
- [ ] Links are bidirectional (if A links B, B links A)
- [ ] Every card has description distractors (Block 3) AND true/false statements (Block 4)
- [ ] d=2 distractors use descriptions of genuinely confusable sibling concepts
- [ ] d=3 distractors contain a specific, identifiable error (not vague wrongness)
- [ ] True statements are non-obvious; false statements are plausible misconceptions
- [ ] No two cards have near-identical titles or quizDescriptions
- [ ] Confusable concept pairs are disambiguated in their descriptions
- [ ] Difficulty ratings are appropriate (not everything is difficulty 1)
- [ ] Tags reuse existing tags where concepts overlap

---

## 10. Course Mode — Content Targeting

The app supports an optional **course companion mode**. When a course is active (e.g., "ML for Good" / ML4G), the same cards are used but lessons may be reordered, filtered, or grouped differently to match a specific course syllabus.

### What this means for content generation

Before generating content, clarify whether you are creating:

1. **General content** — for all users, not tied to any course. This is the default.
2. **Course-specific content** — tailored to a specific course curriculum (e.g., ML4G). If so, ask which course and which week/module the content maps to.

### Course-specific considerations

When generating content for a course:

- **Tag cards with the course ID** — e.g., add `ml4g` to the `tags` array for cards relevant to that course
- **Tag cards with week/module** — e.g., `ml4g-week-1`, `ml4g-module-intro` to enable per-week filtering
- **Lesson ordering** may differ from the general app — the course may introduce concepts in a specific pedagogical sequence
- **Card content stays the same** — do not create duplicate cards with different text for the same concept. If a concept needs different framing for a course, note this as a future consideration but generate the standard version
- **The course password for ML4G is `ml4g2026`** — this is set in `src/data/courseConfig.js`

### Currently supported courses

| Course ID | Name | Status |
|-----------|------|--------|
| `ml4g` | ML for Good | UI ready, content not yet tailored |

---

## 11. Your Task

I want you to generate content for the following topics/curriculum areas:

<!-- USER: INSERT YOUR CURRICULUM DESCRIPTION HERE -->
<!-- For example:
- "AI Agents and autonomous systems — tool use, planning, agent architectures, risks of autonomous AI"
- "Cybersecurity and AI — AI-powered attacks, defensive AI, vulnerability discovery"
- "AI and labor/economics — automation, job displacement, economic inequality"
- etc.
-->

For each topic area, generate:
1. A topic entry (if it's a new topic not in the existing list)
2. Chapter entries for each difficulty tier you're populating
3. A foundational card + lesson (lesson 0) introducing the topic
4. 6-12 additional concept cards covering the area thoroughly
5. Lessons grouping those cards (1-3 cards per lesson, progressing easier → harder)
6. Description distractors for **every** card
7. True/false statements for **every** card
8. 2-3 fun facts per topic
9. Daily quiz day groupings (3 thematically related cards per day)

Ensure all `linkedCards` references are valid. Ensure tag reuse across related cards. Ensure difficulty progression within each topic's lessons. Ensure confusable concepts are disambiguated.

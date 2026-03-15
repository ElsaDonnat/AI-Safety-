# Content Generation Prompt — AI Safety Learning App

> **Instructions for the LLM generating content:** Read this entire document carefully. You are generating educational content for a mobile learning app that teaches AI safety vocabulary and concepts through spaced repetition. Your output must match the exact data formats specified below. Do NOT write any code — only produce the content (as JavaScript data literals) that will be pasted into the app's data files.

---

## 1. What This App Is

This is a **vocabulary-and-concept revision app** for AI safety. Think of it like a flashcard app with structure: users learn terms, definitions, and relationships, then get quizzed on them repeatedly using spaced repetition. The goal is **not** to teach from scratch — users are assumed to have encountered these concepts elsewhere (courses, papers, podcasts, etc.). The app helps them **solidify, memorize, and connect** the vocabulary.

Everything revolves around **cards**. Each card is one concept or term. Users learn cards in **lessons**, then review them via **quizzes** that test three dimensions of knowledge.

---

## 2. Content Hierarchy

The app organizes content in a 4-level hierarchy:

```
Domain → Topic → Chapter (difficulty tier) → Lesson → Cards
```

### Domains (broadest level)
Currently defined domains:
| ID | Title | Description |
|----|-------|-------------|
| `foundations` | Foundations of AI | Core concepts behind modern AI systems |
| `governance` | Governance | Policy, regulation, and international coordination |
| `ai-safety` | AI Safety | Alignment, interpretability, and risk mitigation |

### Topics (within a domain)
Each domain contains multiple topics. Each topic is a thematic area.

### Chapters (within a topic)
Each topic has 3 difficulty tiers:
- **Beginner** (difficulty: 1) — Core vocabulary, simple definitions, no prior knowledge assumed beyond general AI awareness
- **Amateur** (difficulty: 2) — More nuanced concepts, distinguishing between similar terms, understanding trade-offs
- **Advanced** (difficulty: 3) — Expert-level vocabulary, cutting-edge research terms, subtle distinctions

### Lessons (within a chapter)
Each lesson teaches 2–4 cards grouped thematically. The first lesson per topic is **foundational** (introduces the topic overview).

---

## 3. What Currently Exists

The **"Foundations of AI" domain** already has beginner-level content for 3 topics:

### Topic: AI Basics (6 cards)
- c101: Artificial Intelligence (foundational)
- c102: Machine Learning
- c103: Deep Learning
- c104: Natural Language Processing
- c105: Neural Networks
- c106: Computer Vision

### Topic: AI Progress (6 cards)
- c201: Large Language Models (foundational)
- c202: Foundation Models
- c203: Scaling Laws
- c204: Benchmarks
- c205: Emergent Abilities
- c206: AI Labs

### Topic: AI Concepts (6 cards)
- c301: Training and Inference (foundational)
- c302: Supervised Learning
- c303: Unsupervised Learning
- c304: Reinforcement Learning
- c305: Transformers
- c306: Fine-Tuning

**All existing content is beginner-level (difficulty: 1) in the "foundations" domain.**

---

## 4. What You Need to Generate

Generate the **Governance domain** — beginner chapter, first topic, first lesson's worth of content. Specifically:

### A. Define 2–3 Topics for the Governance Domain

Each topic needs:
```js
{
    id: 'topic-id',              // kebab-case, unique
    domain: 'governance',
    title: 'Topic Title',
    description: 'One sentence describing the topic',
    icon: 'topic-id',            // same as id (icons are handled separately)
    color: '#HEXCOLOR',          // a distinct hex color for the topic
    order: 0,                    // 0-indexed order within the domain
}
```

Suggested topic areas for Governance:
- AI regulation & policy (laws, executive orders, EU AI Act, etc.)
- International coordination & geopolitics of AI
- Corporate governance & responsible AI practices
- Standards, auditing, and compliance

Pick 2–3 that create good vocabulary sets.

### B. Define Chapters for Your Topics

Each topic gets 3 chapters (beginner, amateur, advanced), but only beginner will have content for now:
```js
{ id: 'topic-id-beginner', topic: 'topic-id', title: 'Beginner', difficulty: 'beginner', order: 0 },
{ id: 'topic-id-amateur', topic: 'topic-id', title: 'Amateur', difficulty: 'amateur', order: 1, comingSoon: true },
{ id: 'topic-id-advanced', topic: 'topic-id', title: 'Advanced', difficulty: 'advanced', order: 2, comingSoon: true },
```

### C. Generate Cards (Concepts) for the First Topic's Beginner Chapter

Generate **6–8 cards** for the first topic's beginner chapter. This is the core deliverable.

#### Card Format (follow exactly):

```js
{
    id: 'c401',                    // Use c4xx for governance domain
    title: 'Term Name',
    summary: 'One-line definition (max ~15 words) shown on card previews',
    description: 'Full explanation, 2-4 sentences. Written clearly for someone revising, not learning for the first time. Explain what the term means, give a concrete example, and say why it matters for AI governance. This is what users read when learning the card.',
    quizDescription: 'A slightly rephrased, quiz-oriented version of the description. Used as the "correct answer" in quiz questions. Should be self-contained (understandable without reading the full description) and clearly distinguish this concept from similar ones.',
    topic: 'your-topic-id',
    secondaryTopic: null,          // or another topic ID if relevant
    category: 'policy',            // one of: technical, alignment, policy, ethics, risks
    difficulty: 1,                 // 1 for beginner
    tags: ['tag1', 'tag2'],        // 2-4 free-form tags for filtering and linking
    linkedCards: [
        { id: 'c402', relationship: 'verb phrase' },  // e.g., 'implements', 'contrasts with', 'builds on'
    ],
    importance: 1,                 // 1 = high importance, 2 = secondary
    isFoundational: false,         // true for exactly ONE card per topic (the overview card)
}
```

#### Critical Writing Guidelines for Cards:

1. **`title`**: The vocabulary term itself. Use the standard/canonical name. Capitalize as a proper noun if it's a specific thing (e.g., "EU AI Act") or as a common noun if generic (e.g., "Regulatory Sandbox").

2. **`summary`**: Think dictionary-style. One concise line. Should let someone who already knows the term go "yes, that's what it is." Example: *"A comprehensive EU law classifying AI systems by risk level"*

3. **`description`**: This is the learn card text. Write it as if reminding someone:
   - Sentence 1: What it is (definition)
   - Sentence 2: How it works or a concrete example
   - Sentence 3: Why it matters for AI safety/governance
   - Keep it factual, not preachy. ~40-80 words.

4. **`quizDescription`**: A standalone rephrasing. Must be distinguishable from other cards' quizDescriptions. Avoid starting with the term's name. ~15-30 words.

5. **`linkedCards`**: Every card should link to 1-3 other cards. The `relationship` is a verb phrase describing how THIS card relates to the linked card. Examples: `'implements'`, `'a subset of'`, `'regulates'`, `'contrasts with'`, `'builds on'`, `'an example of'`.

6. **`tags`**: Use lowercase kebab-case. Include both specific and general tags. Tags enable cross-topic connections, so include tags that might overlap with other domains (e.g., a governance card might have tag `'llm'` if it specifically regulates LLMs).

### D. Generate 2 Lessons for the First Topic

```js
{
    id: 'lesson-topic-id-b-0',         // b = beginner, 0 = first lesson
    number: 0,
    title: 'Lesson Title',              // Short, engaging (2-5 words)
    subtitle: 'What this lesson covers', // One phrase describing the cards
    mood: 'A conversational hook that sets the tone…',  // Ends with …
    chapter: 'topic-id-beginner',
    topic: 'your-topic-id',
    isFoundational: true,                // true for lesson 0 only
    cardIds: ['c401', 'c402', 'c403'],   // 2-3 card IDs
},
```

- **Lesson 0** is foundational: it introduces the topic. Its first card should be the foundational card (`isFoundational: true`).
- **Lesson 1** covers the remaining cards.
- Each lesson should have 2-4 cards that tell a coherent story together.

### E. Generate Quiz Content

For each card, generate the following quiz material:

#### E1. Description Distractors (for Hard MCQ questions)

For each card, provide **3 plausible-but-wrong descriptions** at varying difficulty levels. These are shown as answer choices when the user is asked "Which description matches [Term]?"

```js
DESCRIPTION_DISTRACTORS['c401'] = {
    hardCorrect: 'A very precise, subtly different wording of the correct description (tests careful reading)',
    distractors: [
        { text: 'A plausible-sounding but wrong description. Should sound like it could be a real AI governance term.', d: 1 },
        { text: 'A trickier wrong description that is close to the real one but has a key error.', d: 2 },
        { text: 'A very subtle distractor that someone who only vaguely knows the term might pick.', d: 3 },
    ]
};
```

**Distractor writing rules:**
- `d: 1` (beginner): Obviously wrong to someone who knows the term, but sounds "AI-ish" to a total novice
- `d: 2` (amateur): Confuses this concept with a related but different concept
- `d: 3` (advanced): Gets one crucial detail wrong (e.g., wrong scope, wrong jurisdiction, wrong mechanism)
- `hardCorrect`: Correct but worded differently from the card's quizDescription. Tests whether the user truly understands vs. memorized exact wording.
- NEVER include the term's name in the distractor text (since the question shows the term name)

#### E2. True/False Statements

For each card, provide **1 true statement** and **1 false statement** with a correction:

```js
// Format — you'll output these as a simple list, we'll integrate them
Card c401:
  TRUE: "Statement that is true about this concept."
  FALSE: "Statement that is false about this concept."
  CORRECTION: "Brief explanation of why the false statement is wrong and what the truth is."
```

**True/False writing rules:**
- True statements should NOT just repeat the description — test a specific aspect or implication
- False statements should be **plausibly wrong** — the kind of misconception someone might actually have
- Common patterns for false statements: wrong scope, wrong actor, wrong mechanism, confused with similar term, exaggeration, outdated info
- The correction should be 1 sentence, direct

#### E3. Fun Facts

Generate **2-3 fun facts** related to your cards:

```js
{
    id: 'ff-gov-1',
    text: 'An interesting, specific, memorable fact related to AI governance. Include a number, date, or surprising detail. Max 2 sentences.',
    relatedCardIds: ['c401', 'c403'],  // which cards this fact connects to
}
```

---

## 5. Quality Checklist

Before finalizing your output, verify:

- [ ] Every card has a unique ID in the `c4xx` range
- [ ] Exactly ONE card per topic has `isFoundational: true`
- [ ] All `linkedCards` reference valid card IDs (within your set or the existing c1xx-c3xx cards)
- [ ] No card links to itself
- [ ] `quizDescription` is meaningfully different from `description` (not just truncated)
- [ ] All distractors are wrong but plausible — none are accidentally correct
- [ ] True/false statements test understanding, not just recall of exact wording
- [ ] Tags use lowercase kebab-case with no spaces
- [ ] `summary` is genuinely short (max ~15 words)
- [ ] `description` is 2-4 sentences, ~40-80 words
- [ ] Each lesson has 2-4 `cardIds` that make thematic sense together
- [ ] The foundational lesson (lesson 0) includes the foundational card
- [ ] Content is factually accurate and up-to-date (as of early 2025)
- [ ] The vocabulary is genuinely useful — these should be terms that someone studying AI governance would encounter in real courses, reports, and policy documents

---

## 6. Output Format

Structure your entire output as follows (use JavaScript literal syntax so it can be copy-pasted):

```
=== TOPICS ===
[paste topic objects here]

=== CHAPTERS ===
[paste chapter objects here]

=== CARDS (CONCEPTS) ===
[paste card objects here]

=== LESSONS ===
[paste lesson objects here]

=== DESCRIPTION DISTRACTORS ===
[paste distractor objects here]

=== TRUE/FALSE QUIZ CONTENT ===
[paste true/false statements here, grouped by card ID]

=== FUN FACTS ===
[paste fun fact objects here]
```

---

## 7. Example: What Good Content Looks Like

Here's an existing card to calibrate your writing style:

```js
{
    id: 'c203',
    title: 'Scaling Laws',
    summary: 'Predictable relationships between model size, data, and performance',
    description: 'Scaling laws are empirical relationships showing that AI performance improves predictably as you increase model size, training data, and compute. They have guided billions of dollars in AI investment and raise safety concerns — if capabilities keep improving predictably, dangerous capabilities may emerge on a known timeline.',
    quizDescription: 'Mathematical relationships showing that AI performance improves predictably with increases in model size, data, and compute.',
    topic: 'ai-progress',
    secondaryTopic: null,
    category: 'technical',
    difficulty: 1,
    tags: ['scaling', 'compute', 'research', 'progress'],
    linkedCards: [
        { id: 'c202', relationship: 'predicts performance of' },
        { id: 'c205', relationship: 'can lead to' },
    ],
    importance: 1,
    isFoundational: false,
}
```

Notice:
- `summary` is one noun phrase (no period)
- `description` defines, explains, and contextualizes in 2 sentences
- `quizDescription` rephrases without using the term "Scaling laws"
- `linkedCards` uses directional verb phrases
- `tags` are specific enough to be useful for filtering

**Match this quality and style for all your content.**

---

## 8. Stretch Goal (if you have capacity)

If you generate the first topic well and have room:
- Generate a **second topic** for the Governance domain with 4-6 cards
- OR generate **Amateur-level cards** (difficulty: 2) for your first topic — these should be more nuanced terms that build on the beginner vocabulary

Only do this if the core deliverable (Section 4) is complete and polished.

---

**Remember: Output only content data. No code, no functions, no imports. Just the JavaScript object literals that will be inserted into the existing data files.**

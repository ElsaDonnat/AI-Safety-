# Content Generation Prompt for AI Safety Learning App

You are generating structured learning content for a mobile-first AI Safety learning app. The app teaches users about AI safety through interactive lessons, spaced repetition quizzes, and challenge games.

Your output must be **valid JavaScript data** that slots directly into the app's existing data files. Read every section carefully — the app will break if shapes are wrong.

---

## 1. Content Architecture Overview

The app has a hierarchy:

```
TOPICS  →  LESSONS  →  CARDS (concepts)
```

- A **Topic** is a top-level subject area (e.g., "Interpretability", "Value Alignment").
- A **Lesson** belongs to one topic and teaches 1–3 cards.
- A **Card** (concept) is the atomic unit of knowledge — one idea, one screen.

Users progress through lessons sequentially within each topic. Each topic starts with a **foundational lesson** (lesson 0) that introduces the topic via a foundational card.

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
  id: 'c16',                    // REQUIRED. Format: 'c' + number. Must be globally unique.
  title: 'Value Alignment',     // REQUIRED. 2-5 words. The concept's name.
  summary: 'Ensuring AI systems pursue goals aligned with human values',
                                // REQUIRED. 1 sentence, <100 chars. Shown on card previews.
  description: 'Value alignment is the challenge of building AI systems whose goals and behaviors are aligned with human values and intentions. As AI systems become more capable, ensuring they do what we actually want becomes increasingly critical.',
                                // REQUIRED. 2-4 sentences. The "learn card" text the user reads.
                                // This is the primary learning content. Must be clear, accurate,
                                // and self-contained (understandable without other cards).
  quizDescription: 'The challenge of ensuring AI systems pursue goals that match human values and intentions.',
                                // REQUIRED. 1-2 sentences. A DIFFERENT phrasing of the same idea.
                                // Used as the correct answer in "how does X work?" quizzes.
                                // Must NOT be a copy-paste of `description` — rephrase it.
                                // Must NOT be so different that it describes something else.
  topic: 'alignment',           // REQUIRED. Must match a TOPICS[].id exactly.
  secondaryTopic: null,         // Optional. A second topic ID, or null.
  category: 'alignment',        // REQUIRED. One of: 'technical', 'alignment', 'policy', 'ethics', 'risks'
  difficulty: 1,                // REQUIRED. 1 = beginner, 2 = intermediate, 3 = advanced.
  tags: ['alignment-problem', 'agi', 'corrigibility'],
                                // REQUIRED. 2-5 kebab-case tags. Used for:
                                //   - Cross-topic linking (cards sharing a tag are conceptually related)
                                //   - Library filtering
                                //   - Future "tag match" quiz type
                                // Be consistent: reuse existing tags when the concept overlaps.
  linkedCards: ['c2', 'c5'],    // REQUIRED. 1-3 card IDs of the most conceptually related cards.
                                // Used in "concept relationship" quiz: "Which concept is most related to X?"
                                // Links should be bidirectional (if c1 links c2, c2 should link c1).
  importance: 1,                // REQUIRED. 1 = core concept, 2 = important, 3 = supplementary.
                                // Controls display ordering within a topic.
  isFoundational: false,        // REQUIRED. true ONLY for the single overview card per topic
                                // (the card in lesson 0 that introduces the whole topic).
}
```

### 2b. Topic

```js
{
  id: 'alignment',              // kebab-case identifier
  title: 'Value Alignment',     // Display name, 1-3 words
  description: 'How to ensure AI systems pursue human-compatible goals',
                                // 1 sentence, shown under the topic header
  icon: '🎯',                  // Single emoji representing the topic
  color: '#7C3AED',            // Hex color for the topic's UI accent
}
```

### 2c. Lesson

```js
{
  id: 'lesson-alignment-0',     // Format: 'lesson-{topicId}-{number}'
  number: 0,                    // 0 = foundational lesson, then 1, 2, 3...
  title: 'What is Value Alignment?',
                                // Lesson title, shown on INTRO screen. 3-8 words.
  subtitle: 'The core challenge of AI safety',
                                // Shown below the title. 3-8 words.
  mood: 'Before we dive in, let's understand why alignment matters…',
                                // 1 sentence. Sets the tone/hook for the lesson.
                                // Should spark curiosity or frame a question.
  topic: 'alignment',           // Must match a TOPICS[].id
  isFoundational: true,         // true for lesson 0 of each topic
  cardIds: ['c1'],              // 1-3 card IDs taught in this lesson.
                                // Foundational lessons typically have 1 card.
                                // Regular lessons have 1-3 cards.
}
```

### 2d. Description Distractors (for harder quizzes)

For each card where you want fine-grained quiz difficulty, provide distractors:

```js
// Key = card ID, value = distractor config
{
  'c1': {
    hardCorrect: 'A slightly different but still correct phrasing of the concept, used at difficulty 3.',
    distractors: [
      { text: 'A plausible but wrong description.', d: 1 },  // d=1: easy distractor (obviously wrong)
      { text: 'A subtly wrong description.', d: 2 },          // d=2: medium (same domain, wrong concept)
      { text: 'A very subtly wrong description.', d: 3 },     // d=3: hard (almost right but technically wrong)
      // Provide at least 3 distractors per card, ideally 4-6 spanning difficulties.
    ],
  },
}
```

**What makes a good distractor:**
- **d=1 (easy):** Describes something from a completely different domain/category. Obviously not this concept.
- **d=2 (medium):** Describes something in the same category or a related concept, but is factually about a different idea.
- **d=3 (hard):** Describes something very close to the real concept but with a subtle factual error, a common misconception, or a conflation with a similar concept.

### 2e. Fun Facts

```js
{
  id: 'ff1',                    // Format: 'ff' + number
  text: 'An interesting, surprising, or memorable fact about AI safety.',
                                // 1-2 sentences. Shown between challenge rounds.
  relatedCardIds: ['c1', 'c5'], // Cards this fact relates to. Shown only after user has seen these cards.
}
```

### 2f. Daily Quiz Days

```js
{
  dateLabel: 'Alignment Basics',  // Theme label for the day
  cards: [
    { id: 'c1' },
    { id: 'c2' },
    { id: 'c6' },
  ],
  // 3 cards per day. The app cycles through days on a loop.
  // Group cards thematically — cards in one daily quiz should relate.
}
```

---

## 3. Categories (for visual styling)

Every card must have exactly one of these categories:

| Category | `category` value | What it covers |
|----------|-----------------|----------------|
| Technical | `'technical'` | ML concepts, architectures, capabilities, training methods |
| Alignment | `'alignment'` | Alignment techniques, goals, corrigibility, reward modeling |
| Policy | `'policy'` | Regulation, governance, international coordination, standards |
| Ethics | `'ethics'` | Bias, fairness, rights, societal impact, accountability |
| Risks | `'risks'` | Existential risk, misuse, dual-use, catastrophic scenarios |

---

## 4. How Quizzes Use Card Fields

Every card is quizzed on **3 dimensions**. Understanding how each field is used in quizzes is critical for writing good content:

### `what` dimension — "What is X?"
- **Format:** Given the card's `description` or `quizDescription`, pick the correct `title` from 4 options.
- **Distractors:** Titles of other cards (preferring same-lesson, then same-category).
- **Implication:** Each card's `title` must be **distinct and unambiguous**. If two titles are near-synonyms, the quiz becomes unfair.

### `why` dimension — "Why does X matter?"
- **Format:** Given the card's `title`, pick the correct `description`/`quizDescription` from 4 options.
- **Distractors:** Descriptions from other cards (same category preferred) OR from `DESCRIPTION_DISTRACTORS`.
- **Implication:** The `description` must clearly convey **why this concept matters for AI safety** — not just what it is. The `quizDescription` must be recognizably about the same concept as the `description` but phrased differently.

### `how` dimension — "How does X work?"
- **Format:** Same as `why` but with `quizDescription` as the correct answer and `description` of other cards as distractors.
- **Implication:** The `quizDescription` should focus on **mechanism/process** — how the concept works, how it's implemented, or how to address it.

### Challenge Mode also uses:
- **True/False:** Shows `"[title]: [quizDescription]"` — user says true or false. False variants swap in another card's quizDescription. So each card's quizDescription must NOT plausibly describe a different card.
- **Odd One Out:** 4 cards, 3 share a category, 1 is the outlier. So category assignments must be clean — a card should clearly belong to its category.
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
- MUST describe the same concept as `description` but in different words
- Focus on mechanism/process rather than significance
- Must be distinguishable from other cards' quizDescriptions
- Test: if you showed only the quizDescription, could someone match it to the right title?

### For `tags`:
- Reuse tags across cards to create meaningful connections
- Use kebab-case: `reward-hacking`, `mesa-optimization`, `eu-regulation`
- Think about what a user might want to filter by in a library view
- Regional tags for policy cards: `eu`, `usa`, `china`, `uk`, `international`
- Concept cluster tags: `fast-takeoff`, `slow-takeoff`, `mesa-optimization`

### For `linkedCards`:
- Link cards that are most conceptually coupled
- "If you're learning about X, you should also know about Y"
- Keep links bidirectional
- Don't link cards just because they're in the same topic — link based on conceptual dependency

### For `difficulty`:
- **1 (beginner):** Core concept, foundational, explained with simple language. No prerequisites.
- **2 (intermediate):** Builds on foundational concepts, may use technical terms from difficulty-1 cards.
- **3 (advanced):** Assumes familiarity with multiple other concepts, discusses nuances/tradeoffs.

---

## 6. Topic & Lesson Design Guidelines

### Topic structure:
- Each topic should have 1 foundational lesson (lesson 0) + at least 2-3 regular lessons
- Foundational lesson has 1 card that gives a broad overview of the topic
- Regular lessons have 1-3 cards, grouped by sub-theme
- Lessons within a topic should progress from easier → harder concepts

### Lesson grouping:
- Cards in the same lesson should be thematically related
- If two concepts are frequently mentioned together, they belong in the same lesson
- The lesson's `mood` text should frame the question that the cards in that lesson answer

### Cross-topic connections:
- Use `secondaryTopic` when a card genuinely straddles two topics
- Use `tags` for looser connections
- Use `linkedCards` for strong 1:1 conceptual relationships

---

## 7. Existing Content (DO NOT duplicate)

The app already has these cards. Your new content must not duplicate these concepts. You can (and should) link to them via `linkedCards`:

| ID | Title | Topic | Category |
|----|-------|-------|----------|
| c1 | Value Alignment | alignment | alignment |
| c2 | Reinforcement Learning from Human Feedback | alignment | technical |
| c3 | Mechanistic Interpretability | interpretability | technical |
| c4 | Superposition in Neural Networks | interpretability | technical |
| c5 | AI Governance and Regulation | governance | policy |
| c6 | Reward Hacking | alignment | alignment |
| c7 | Instrumental Convergence | alignment | risks |
| c8 | Constitutional AI | alignment | technical |
| c9 | Feature Visualization | interpretability | technical |
| c10 | Existential Risk from AI | alignment | risks |
| c11 | Algorithmic Bias | governance | ethics |
| c12 | AI Transparency and Explainability | interpretability | ethics |
| c13 | Dual-Use AI Technology | governance | risks |
| c14 | Scalable Oversight | alignment | technical |
| c15 | Robustness and Adversarial Attacks | interpretability | technical |

Existing topics: `alignment`, `interpretability`, `governance`, `risks`, `ethics`

**Start new card IDs at `c16`. Start new fun fact IDs at `ff1`.**

---

## 8. Output Format

Return your content as **4 separate JavaScript code blocks**, each containing an export. I will paste them into the codebase.

### Block 1: New cards to ADD to the `CORE_CONCEPTS` array in `src/data/concepts.js`

```js
// New concepts — append to CORE_CONCEPTS array
{
  id: 'c16',
  title: '...',
  // ... full card shape
},
// ...more cards
```

### Block 2: New topics (if any) and lessons to ADD to `src/data/lessons.js`

```js
// New topics — append to TOPICS array (only if you're adding new topics)
{ id: '...', title: '...', description: '...', icon: '...', color: '...' },

// New lessons — append to LESSONS array
{ id: 'lesson-...', number: ..., title: '...', subtitle: '...', mood: '...', topic: '...', isFoundational: ..., cardIds: [...] },
```

### Block 3: Description distractors to MERGE into `src/data/descriptionDistractors.js`

```js
// Merge into DESCRIPTION_DISTRACTORS object
'c16': {
  hardCorrect: '...',
  distractors: [
    { text: '...', d: 1 },
    { text: '...', d: 2 },
    { text: '...', d: 3 },
  ],
},
```

### Block 4: Fun facts to ADD to the `FUN_FACTS` array in `src/data/funFacts.js`

```js
{ id: 'ff1', text: '...', relatedCardIds: ['c1', 'c16'] },
```

---

## 9. Your Task

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
2. A foundational card + lesson (lesson 0) introducing the topic
3. 6-12 additional concept cards covering the area thoroughly
4. Lessons grouping those cards (1-3 cards per lesson)
5. Description distractors for every card
6. 2-3 fun facts per topic

Ensure all `linkedCards` references are valid (either existing c1-c15 or your new cards). Ensure tag reuse across related cards. Ensure difficulty progression within each topic's lessons.

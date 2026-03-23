# Content Creation Prompt for AI Safety Learning App

> Give this entire document to an LLM along with your source material (PowerPoint, book chapters, etc.) to generate cards, lessons, and quiz content for the app.

---

## Your Role

You are creating educational content for a **vocabulary companion app** for AI Safety. The app teaches users about AI safety, alignment, governance, and AI progress through **flashcard-style concept cards**, organized into **lessons** within **chapters** within **topics**. Users learn cards, then get quizzed on them via multiple-choice questions across 3 dimensions (what/why/how).

This is a **companion app**, not a textbook replacement. Your job is to identify the key concepts and vocabulary from source material (books, slides, courses) and turn them into structured flashcard content. The organization into chapters and lessons should optimize for **learning and review**, which may differ from the source material's own structure.

---

## Workflow: Plan First, Then Create

Content creation is a **two-phase process**. Do NOT skip to phase 2 without approval.

### Phase 1: Plan (do this first, wait for approval)

Given source material (book chapters, slides, etc.):

1. **Read the source material** and identify all important concepts that should become cards.
2. **Check against existing content** (see "Existing Content" section below) — flag any overlaps. For overlapping concepts, suggest whether to skip, replace, or create a more specific variant.
3. **Propose an organization plan:**
   - Which **topic** these cards belong to (existing or new)
   - How to group cards into **chapters** (thematic groupings within the topic — these don't need to match the book's chapter structure)
   - How to group cards into **lessons** within each chapter (2-4 cards per lesson that form a coherent mini-unit)
   - The teaching order (what concepts build on what)
4. **List each proposed card** with just: title, category, difficulty, and a 1-line summary.
5. **Flag any suggestions** for modifying existing content to work better with the new cards (e.g., updating linkedCards, adding tags, adjusting descriptions for consistency).

**Present this plan and WAIT for approval before proceeding to Phase 2.**

### Phase 2: Create Content (only after plan is approved)

Once the plan is approved, produce the full structured JavaScript data for the approved cards. Work in batches (e.g., 2 chapters at a time) so content can be reviewed incrementally.

For each batch, create entries for **5 files**:

1. **Concept cards** → `src/data/concepts.js`
2. **Lessons & topics** → `src/data/lessons.js`
3. **Description distractors** → `src/data/descriptionDistractors.js`
4. **True/false statements** → `src/data/trueFalseStatements.js` (the `TRUE_FALSE_STATEMENTS` object)
5. **Why distractors** → `src/data/descriptionDistractors.js` (the `WHY_DISTRACTORS` object)

---

## 1. Concept Cards (the core content unit)

Each card teaches **one concept**. Think of it as a vocabulary flashcard — a title, a description, and metadata.

### Data Shape

```js
{
    id: 'c101',                    // REQUIRED — unique ID, 'c' + number
    title: 'Value Alignment',      // REQUIRED — concept name (2-5 words ideal)
    summary: 'Brief one-line summary shown on card previews',  // REQUIRED — max ~15 words
    description: 'Detailed explanation of the concept...',      // REQUIRED — 2-4 sentences
    quizDescription: 'Clue-like indirect description...',       // REQUIRED — see rules below
    whyItMatters: 'One sentence about why this matters.',       // OPTIONAL — see rules below
    similarWhyMatters: ['c405'],   // OPTIONAL — IDs of cards with too-similar whyItMatters
    topic: 'alignment',            // REQUIRED — primary topic ID
    secondaryTopic: null,          // OPTIONAL — second topic ID or null
    category: 'concept',           // REQUIRED — one of 8 categories (see below)
    difficulty: 1,                 // REQUIRED — 1, 2, or 3
    tags: ['alignment-problem'],   // REQUIRED — array of free-form tags
    linkedCards: [                 // OPTIONAL — related cards
        { id: 'c405', relationship: 'is a risk of' },
        'c302',                    // simple ID format also OK
    ],
    importance: 1,                 // REQUIRED — display ordering (1 = normal, 2+ = featured)
    isFoundational: false,         // REQUIRED — true ONLY for the topic overview card
}
```

### Field-by-Field Rules

#### `id`
- Format: `'c'` + number
- Existing IDs use ranges per topic: c101-c106 (AI Basics), c201-c206 (AI Progress), c301-c306 (AI Concepts), c207-c212 (Advanced AI), c401-c406 (Alignment), c501-c506 (AI Risk), c601-c606 (Safety Techniques), c701-c706 (AI Ethics), c801-c806 (Global AI Policy), c901-c906 (AI Security)
- For new cards in existing topics, continue the numbering (e.g., c107, c108...)
- For new topics, pick a new hundreds range (e.g., c1001+)

#### `title`
- The concept's proper name. 2-5 words ideal.
- Should be the term someone would Google or look up in a textbook.
- Examples: "Reward Hacking", "Constitutional AI", "EU AI Act", "Instrumental Convergence"

#### `summary`
- One-line preview text. Max ~15 words.
- Shown in card lists and search results.
- Example: "When an AI finds unintended shortcuts to maximize its reward signal"

#### `description`
- The full learning text shown when a user studies the card. 2-4 sentences.
- Should explain WHAT the concept is, how it works, and (briefly) why it's relevant to AI safety.
- Write at an intelligent non-expert level — assume the reader is smart but may not know AI jargon.
- Aim for ~40-80 words.

#### `quizDescription` ⚠️ CRITICAL — READ CAREFULLY
- This is an **indirect, clue-like description** used in quiz questions. The user sees this text and must guess which concept it describes.
- **NEVER start with type-categorizing phrases** like "This field...", "A system that...", "The practice of...", "A technique for..."
- **DO lead with** gerunds, actions, effects, examples, or consequences.
- Think of it like a Jeopardy clue — evocative and specific without naming the concept.
- Must be meaningfully different from `description` — don't just rephrase it.

**Good examples:**
- ✅ "Instead of writing explicit instructions, developers show examples and let the system figure out the rules on its own." (for Machine Learning)
- ✅ "Stacking many processing layers lets the system build up from simple patterns to complex abstractions." (for Deep Learning)
- ✅ "Chatbots, translation, summarization, sentiment analysis — bridging the gap between how humans communicate and what machines can process." (for NLP)

**Bad examples:**
- ❌ "A subset of AI that uses data to learn patterns." (too generic, starts with "A subset of")
- ❌ "The field of making AI safe." (useless as a quiz clue)
- ❌ "This technique involves training models with human feedback." (starts with "This technique")

#### `whyItMatters` ⚠️ IMPORTANT RULES
- **Optional** — only include for cards where "Why does this matter for AI safety?" is a meaningful, non-obvious question. About 60% of cards should have this.
- **Max ONE sentence.** Shorter is better.
- **Consequence-focused** — explain the downstream effect, not just what the concept is.
- **Must be distinct from `quizDescription`** — no overlapping phrasing.
- **Must be specific to the card** — no generic statements like "this is important for safety."
- Used in "Why" quiz questions: the user sees 4 whyItMatters statements and picks the one that belongs to this card.

**Good examples:**
- ✅ "Biased or incomplete training data produces biased decisions, and every modern AI capability depends on those learned patterns." (for Machine Learning)
- ✅ "The more layers a network has, the more opaque its reasoning — making the most capable systems the hardest to audit." (for Deep Learning)

**Bad examples:**
- ❌ "This is important for AI safety." (generic)
- ❌ "Reward hacking matters because it can lead to unintended behavior." (just restates the concept)

**Skip `whyItMatters` for:** Actors (organizations), very basic definitions, cards where the safety relevance is self-evident from the title.

#### `similarWhyMatters`
- Only needed if this card's `whyItMatters` is thematically very similar to another card's.
- Must be **bidirectional** — if card A lists B, card B must list A.
- Purpose: prevents confusing quiz options where two "why" answers are too similar to distinguish.
- Example groups: cards about "irreversibility" reasons, cards about "gaming objectives" reasons.

#### `topic`
Must be one of the existing topic IDs:
| Topic ID | Domain | Description |
|----------|--------|-------------|
| `ai-basics` | Foundations | What AI is, ML, deep learning, neural networks |
| `ai-progress` | Foundations | LLMs, foundation models, scaling, benchmarks |
| `ai-concepts` | Foundations | Generalization, emergent abilities, optimization |
| `advanced-ai` | Foundations | AGI, superintelligence, takeoff scenarios |
| `alignment-fundamentals` | AI Safety | Core alignment problems |
| `ai-risk` | AI Safety | Existential risk, misuse, structural risks |
| `safety-techniques` | AI Safety | RLHF, interpretability tools, red teaming |
| `ai-security` | AI Safety | Adversarial attacks, data poisoning, prompt injection |
| `ai-ethics` | AI Safety | Bias, fairness, transparency, labor impact |
| `global-ai-policy` | Governance | EU AI Act, international coordination, governance |

If your content doesn't fit any existing topic, propose a new topic with: `id`, `domain`, `title`, `description`, `color`, `order`.

#### `category`
One of 8 types — this determines how the card is grouped in quizzes:

| Category | Value | Use for |
|----------|-------|---------|
| Concept | `'concept'` | Core ideas, theories, phenomena, definitions — what something IS |
| Technique | `'technique'` | Methods, tools, approaches — how to DO something |
| Risk | `'risk'` | Threats, failure modes, dangers — what can go WRONG |
| Regulation | `'regulation'` | Laws, treaties, formal mandates — what is legally REQUIRED |
| Practice | `'practice'` | Voluntary standards, industry norms — what is DONE by choice |
| Proposal | `'proposal'` | Suggested frameworks, visions — what is SUGGESTED but not yet adopted |
| Actor | `'actor'` | Organizations, institutions, labs — WHO is involved |
| Other | `'other'` | Doesn't fit above — use sparingly |

**Key distinctions:**
- **Practice vs. Regulation:** Practices = voluntary (e.g., Responsible Scaling Policies). Regulations = legally mandated (e.g., EU AI Act).
- **Proposal vs. Practice:** Proposals = suggested but not widely adopted (e.g., "CERN for AI"). Practices = already standard behavior.

#### `difficulty`
- `1` = Beginner — foundational concepts anyone can understand
- `2` = Intermediate — requires understanding basic concepts first
- `3` = Advanced — assumes familiarity with the field

#### `tags`
Free-form strings. Use for:
- Cross-topic linking: `'regulation'` on a cybersecurity card
- Location tagging: `'EU'`, `'USA'`, `'China'`, `'UK'`
- Concept grouping: `'mesa-optimization'`, `'fast-takeoff'`, `'deception'`
- Source linking: `'rlhf'`, `'interpretability'`, `'governance'`

#### `linkedCards`
References to conceptually related cards. Used in "Concept Relationship" quiz questions ("Which concept is most related to X?"). **Always use the object format:**
```js
{ id: 'c405', relationship: 'is a risk of' }
```
Common relationship types: `'includes'`, `'a subset of'`, `'enables'`, `'powered by'`, `'is a risk of'`, `'addresses'`, `'regulates'`, `'proposed by'`, `'exemplified by'`, `'related to'`, `'a type of'`, `'part of'`

**⚠️ Only reference cards that actually exist** — either existing cards from the list below, or new cards you're creating in this batch. Don't add linkedCards to existing cards without showing the full updated array (old → new).

#### `isFoundational`
- `true` for exactly ONE card per topic — the overview card that introduces the topic.
- This card is taught first in a special introductory lesson.
- Its content should be a broad overview of the topic, not a specific concept.

---

## 2. Lessons, Chapters & Topics (how cards are organized)

### Hierarchy
```
Domain → Topic → Chapter → Lesson → Cards
```

- **Domain**: top-level grouping (e.g., "Foundations of AI", "AI Safety", "Governance")
- **Topic**: a major subject area within a domain (e.g., "AI Capabilities", "Alignment Fundamentals")
- **Chapter**: a thematic sub-section within a topic. Chapters group related lessons together. Each chapter also has a difficulty tier (beginner/amateur/advanced), but the primary organizing principle is **thematic coherence**.
- **Lesson**: a single study session containing 2-4 cards that form a coherent mini-unit.

### How to Structure Chapters from Source Material

When working from a book or course, each major section/chapter of the source often maps to a **chapter** in the app. But the app is a **vocabulary companion**, not a chapter-by-chapter mirror — so reorganize as needed:

- **Group by conceptual coherence**, not by source order. If a book chapter covers 3 unrelated sub-topics, split them into separate chapters.
- **Merge thin sections.** If a book section only yields 2-3 cards, consider merging it with a related section.
- **Each chapter should have 2-4 lessons** (so roughly 6-12 cards per chapter).
- **Lessons within a chapter should build on each other** — teach prerequisites before advanced concepts.

### Lesson Shape

```js
{
    id: 'lesson-ai-basics-b-0',           // Format: lesson-{topic}-{difficulty initial}-{number}
    number: 0,
    title: 'What is AI?',                  // Lesson title (question or topic phrase)
    subtitle: 'The core hierarchy: AI, ML, and deep learning',  // One-line subtitle
    mood: 'Let\'s start at the very beginning…',  // Opening flavor text / emotional tone
    chapter: 'ai-basics-beginner',          // Chapter ID
    topic: 'ai-basics',                     // Topic ID
    isFoundational: true,                   // true only for the first lesson (teaches foundational card)
    cardIds: ['c101', 'c102', 'c103'],     // Card IDs taught in this lesson (2-4 cards)
}
```

### Rules
- **Foundational lessons** (first lesson of a topic): set `isFoundational: true`, include the foundational card + optionally 1-3 related beginner cards.
- **Regular lessons**: 2-4 cards that form a coherent mini-topic. Cards in the same lesson should be conceptually related enough that learning them together reinforces understanding.
- **Card order matters**: cards are taught in the order listed in `cardIds`. Put simpler/prerequisite concepts first.
- **`mood`**: a short sentence that sets the emotional tone. Think of it like a chapter epigraph. Examples: "Let's start at the very beginning…", "Time to get technical.", "The stakes get higher here."

### Chapter Shape

```js
{
    id: 'ai-basics-beginner',
    topic: 'ai-basics',
    title: 'Beginner',                // Thematic title (can be more descriptive than just difficulty)
    difficulty: 'beginner',            // 'beginner' | 'amateur' | 'advanced'
    order: 0,
    // comingSoon: true,              // set true if content isn't ready yet
}
```

### Topic Shape (if creating a new topic)

```js
{
    id: 'ai-capabilities',
    domain: 'foundations',            // existing domain ID
    title: 'AI Capabilities',
    description: 'What modern AI systems can do and how they work',
    icon: 'ai-capabilities',
    color: '#A8C8D8',
    order: 0,                         // display order within domain
}
```

---

## 3. Description Distractors (for hard quiz questions)

For each card, you can provide **curated wrong descriptions** at 3 difficulty levels. These are used in "Hard MCQ" challenge questions where the user sees a card title and must pick the correct description from 4 options.

### Shape

```js
DESCRIPTION_DISTRACTORS['c101'] = {
    hardCorrect: 'An alternative correct description (rephrased from the original)',
    distractors: [
        {
            text: 'An easy-to-reject wrong description.',
            d: 1,   // difficulty 1 = obviously wrong
        },
        {
            text: 'A plausible but wrong description — describes a related but different concept.',
            d: 2,   // difficulty 2 = plausible, from same domain
        },
        {
            text: 'A nearly-correct description with a subtle factual error.',
            d: 3,   // difficulty 3 = very tricky
            trap: 'Explanation of what makes this wrong — shown to the user after answering.',
        },
    ],
};
```

### Rules for Each Difficulty Level

**d: 1 (Easy)** — Obviously wrong. Describes a completely different concept or a common misconception that's easy to spot.
- Example for "Machine Learning": "A programming technique where developers write detailed rules for every possible scenario." (This describes traditional programming, not ML.)

**d: 2 (Medium)** — Plausible but wrong. Describes a *related* concept from the same domain, or uses correct terminology in a misleading way.
- Example for "Machine Learning": "A technique that uses networks of interconnected nodes arranged in many layers to learn abstract representations." (This actually describes Deep Learning, not ML broadly.)

**d: 3 (Hard + trap)** — Nearly correct with a subtle factual error. The description is 90% right but contains one wrong claim. Include a `trap` string explaining the error.
- Example for "Machine Learning": "A subset of AI where systems learn by finding patterns in data, requiring large labeled datasets for every application." **Trap:** "Unsupervised and self-supervised ML methods learn without labeled data."

### `hardCorrect`
A rephrased version of the card's `description` — correct but worded differently enough that it tests understanding, not memorization.

---

## 4. True/False Statements (for challenge mode)

Curated true/false statements for each card, used in the challenge quiz's True/False question type.

### Shape ⚠️ USE THIS EXACT FORMAT

```js
TRUE_FALSE_STATEMENTS['c101'] = {
    trueStatement: 'An AI system can be designed for a single narrow task, like playing chess, without being capable of general-purpose reasoning.',
    falseStatement: 'All artificial intelligence systems are capable of learning and improving from experience.',
    correction: 'Not all AI systems learn from experience — some rely entirely on hand-coded rules and logic, such as early expert systems.',
};
```

**⚠️ CRITICAL: The format is a single object with `trueStatement`, `falseStatement`, and `correction`. NOT an array of statement objects. Do NOT use an array format.**

### Rules
- Each card gets **exactly one object** with one true statement, one false statement, and one correction.
- `trueStatement` — a factually accurate statement about the concept.
- `falseStatement` — a plausible misconception or common misunderstanding.
- `correction` — a 1-sentence explanation of what's actually true (shown to the user after answering wrong).
- Statements should test **understanding**, not trivia. Good false statements target common misconceptions.
- Statements should be self-contained (make sense without seeing the card first).

---

## 5. Why Distractors (for "why" quiz questions)

For each card that has a `whyItMatters` field, provide **one plausible-but-wrong "why it matters" statement**. This is used as a tempting incorrect option in "Why does X matter?" quiz questions.

### Shape

```js
// Add to WHY_DISTRACTORS in src/data/descriptionDistractors.js
WHY_DISTRACTORS['c1002'] = {
    distractor: 'Extra thinking time at inference guarantees the model will reach the correct answer, since more computation always eliminates errors regardless of the problem type.'
};
```

### Rules
- **One distractor per card** — just a single plausible-but-wrong "why this matters" statement.
- The distractor should sound **reasonable at first glance** but be factually wrong or make an unjustified logical leap.
- Common patterns for good why-distractors:
  - Overstating a benefit ("always works", "guarantees", "eliminates")
  - Claiming a risk doesn't apply ("only affects...", "can always be...")
  - Inverting the actual implication ("makes things safer" when the concept actually introduces risk)
- **Only needed for cards that have `whyItMatters`** — skip cards without it.

---

## Style & Tone Guidelines

### Voice
- **Intelligent but accessible** — write for a smart person who's new to AI safety, not a researcher.
- **Concise** — every word should earn its place. Cut filler.
- **Concrete** — use examples, consequences, and specifics. Avoid vague hand-waving.
- **Safety-aware** — gently highlight risks and implications without being alarmist.

### Description Length
- `summary`: ~10-15 words
- `description`: ~40-80 words (2-4 sentences)
- `quizDescription`: ~15-30 words (1-2 sentences)
- `whyItMatters`: ONE sentence, ~15-25 words

### Things to Avoid
- Don't be preachy or alarmist
- Don't use "it's important to note that..." or similar filler
- Don't define terms using the term itself ("alignment is the process of aligning...")
- Don't make quizDescriptions that are just shorter versions of descriptions
- Don't use jargon without context in difficulty 1 cards

---

## Existing Content Overview (for reference / avoiding duplicates)

The app currently has **80 cards** across 11 topics:

| Topic | Cards | IDs |
|-------|-------|-----|
| AI Basics | 6 | c101-c106 (AI, ML, Deep Learning, NLP, Neural Networks, Computer Vision) |
| AI Progress | 6 | c201-c206 (LLMs, Foundation Models, Scaling Laws, AI Benchmarks, Emergent Capabilities, AI Labs) |
| AI Concepts | 6 | c301-c306 (Training & Inference, Supervised Learning, Unsupervised Learning, Reinforcement Learning, Transformers, Fine-Tuning) |
| Advanced AI | 6 | c207-c212 (AGI, Superintelligence, Narrow AI, AI Agents, Frontier Models, Compute) |
| AI Capabilities | 14 | c1001-c1009, c1011-c1012, c1014-c1016 (AI Capabilities overview, Inference-Time Scaling, Large Reasoning Models, AI Tool Use, GANs, Multimodal Models, AI Metacognition, Situational Awareness, AI Consciousness, Self-Supervised Learning, Pre-training, Zero-Shot & Few-Shot Learning, Continual Learning, Transfer Learning) |
| Alignment Fundamentals | 6 | c401-c406 (Alignment Problem, Instrumental Convergence, Goodhart's Law, Corrigibility, Mesa-Optimization, Reward Hacking) |
| AI Risk | 6 | c501-c506 (Existential Risk, Misuse & Dual-Use, Deceptive Alignment, Specification Gaming, Power-Seeking AI, Catastrophic Risk) |
| Safety Techniques | 6 | c601-c606 (RLHF, Constitutional AI, Interpretability, Red Teaming, Scalable Oversight, AI Governance) |
| AI Ethics | 6 | c701-c706 (AI Ethics, Algorithmic Bias, Fairness, Concentration of Power, Race Dynamics, Value Lock-in) |
| Global AI Policy | 6 | c801-c806 (AI Regulation, EU AI Act, Responsible Scaling Policies, AI Safety Institutes, International AI Coordination, Open vs Closed Models) |
| AI Security | 6 | c901-c906 (AI Robustness, Hallucination, Adversarial Examples, Prompt Injection, Jailbreaking, Distribution Shift) |

**Note:** Some cards from other topics are reused in AI Capabilities lessons: c201 (LLMs), c202 (Foundation Models), c211 (Frontier Models), c306 (Fine-Tuning), c601 (RLHF). These DO NOT need to be recreated.

### ⚠️ CRITICAL RULES for Existing Content

1. **Do NOT create duplicate cards** — If your source material covers something already in the list, either skip it or propose a more specific/nuanced variant. Check titles AND descriptions, not just titles. For example, "Frontier Models" already exists as c211, "Fine-Tuning" already exists as c306.

2. **NEVER rename or change the concept of an existing card** — If you need a different concept, create a NEW card with a new ID. Changing what an existing card represents breaks every `linkedCards` reference to it across the codebase.

3. **You CAN update description fields of existing cards** — If an existing card's description could be improved or made more detailed, propose the update clearly with old → new for each field. But the card must still be about the same concept.

4. **You CAN reference existing cards in new lessons** — Cards can appear in multiple lessons across different topics. For example, c201 (LLMs) appears in both the AI Progress topic lessons and the AI Capabilities topic lessons. This is encouraged when the concept is relevant to both topics.

5. **When adding linkedCards to existing cards**, show the FULL updated array (not just the addition), so the implementer can see what's changing.

---

## Output Format

### Phase 1 Output (Plan)

Present your plan in this format:

```
## Proposed Topic: [Topic Name]

### Overlaps with Existing Content
- c101 "Artificial Intelligence" — overlaps with [source section]. Recommend: [skip / keep existing / replace / create more specific variant]
- ...

### Proposed Chapters & Lessons

#### Chapter 1: [Chapter Title] (difficulty: beginner)
  Lesson 1: "[Lesson Title]" — [mood]
    - [Card Title] (category, difficulty) — one-line summary
    - [Card Title] (category, difficulty) — one-line summary
    - [Card Title] (category, difficulty) — one-line summary

  Lesson 2: "[Lesson Title]" — [mood]
    - [Card Title] (category, difficulty) — one-line summary
    - ...

#### Chapter 2: [Chapter Title] (difficulty: beginner)
  ...

### Suggested Modifications to Existing Content
- c301: add linkedCard to new card [id] (relationship: "...")
- c405: update tags to include "..."
- ...
```

**STOP HERE and wait for approval before creating full content.**

### Phase 2 Output (Content)

After plan approval, output as **valid JavaScript** that can be copy-pasted into the source files. Work in batches (e.g., 2 chapters at a time):

```js
// ═══ NEW CARDS ═══════════════════════════════════════════
// Add to CORE_CONCEPTS array in src/data/concepts.js

{
    id: 'c1001',
    title: '...',
    // ... all fields
},

// ═══ NEW CHAPTERS ════════════════════════════════════════
// Add to CHAPTERS array in src/data/lessons.js

{
    id: '...',
    topic: '...',
    title: '...',
    difficulty: 'beginner',
    order: 0,
},

// ═══ NEW LESSONS ═════════════════════════════════════════
// Add to LESSONS array in src/data/lessons.js

{
    id: 'lesson-...',
    // ... all fields
},

// ═══ DESCRIPTION DISTRACTORS ═════════════════════════════
// Add to DESCRIPTION_DISTRACTORS in src/data/descriptionDistractors.js

DESCRIPTION_DISTRACTORS['c1001'] = {
    hardCorrect: '...',
    distractors: [
        { text: '...', d: 1 },
        { text: '...', d: 2 },
        { text: '...', d: 3, trap: '...' },
    ],
};

// ═══ TRUE/FALSE STATEMENTS ═══════════════════════════════
// Add to TRUE_FALSE_STATEMENTS in src/data/trueFalseStatements.js
// ⚠️ USE THIS EXACT FORMAT — single object, NOT an array

TRUE_FALSE_STATEMENTS['c1001'] = {
    trueStatement: '...',
    falseStatement: '...',
    correction: '...',
};

// ═══ WHY DISTRACTORS ═════════════════════════════════════
// Add to WHY_DISTRACTORS in src/data/descriptionDistractors.js
// One entry per card that has a whyItMatters field

WHY_DISTRACTORS['c1001'] = {
    distractor: 'A plausible but wrong "why this matters" statement...'
};

// ═══ MODIFICATIONS TO EXISTING CONTENT ═══════════════════
// Changes to existing cards (show old → new for each field changed)

// c301: add linkedCard
// OLD: linkedCards: [{ id: 'c102', relationship: '...' }]
// NEW: linkedCards: [{ id: 'c102', relationship: '...' }, { id: 'c1001', relationship: '...' }]
```

---

## Checklist Before Submitting

### Phase 1 (Plan):
- [ ] All key concepts from source material are identified
- [ ] Overlaps with existing cards are flagged with recommendations
- [ ] Chapters are thematically coherent (not just mirroring source structure)
- [ ] Lessons have 2-4 cards each and teach related concepts together
- [ ] Teaching order makes sense (prerequisites before advanced concepts)

### Phase 2 (Content — for each card):
- [ ] `id` is unique and follows the numbering scheme
- [ ] `id` does NOT duplicate an existing card (check the full existing content table!)
- [ ] `quizDescription` does NOT start with "This...", "A system...", "The practice of..."
- [ ] `whyItMatters` (if present) is ONE sentence, consequence-focused, distinct from quizDescription
- [ ] `similarWhyMatters` is bidirectional if used
- [ ] `category` is one of the 8 valid values
- [ ] `difficulty` is 1, 2, or 3
- [ ] `linkedCards` use object format `{ id, relationship }` and reference valid existing or new card IDs
- [ ] `isFoundational` is true for exactly one card per topic
- [ ] Description distractors have all 3 difficulty levels with d:3 including a `trap`
- [ ] True/false uses the CORRECT format: `{ trueStatement, falseStatement, correction }` — NOT an array
- [ ] WHY_DISTRACTORS included for every card that has a `whyItMatters`
- [ ] No existing cards are renamed or have their concept changed (new concept = new card ID)
- [ ] Modifications to existing content are clearly shown (old → new, full field values)

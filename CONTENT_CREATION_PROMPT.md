# Content Creation Prompt for AI Safety Learning App

> Give this entire document to an LLM along with your source material (PowerPoint, book chapters, etc.) to generate cards, lessons, and quiz content for the app.

---

## Your Role

You are creating educational content for a mobile-first AI Safety learning app. The app teaches users about AI safety, alignment, governance, and AI progress through **flashcard-style concept cards**, organized into **lessons** within **topics**. Users learn cards, then get quizzed on them via multiple-choice questions across 3 dimensions (what/why/how).

Your job is to produce structured JavaScript data that slots directly into the app's existing codebase.

---

## What You Need to Produce

For each batch of content, you'll create entries for **4 files**:

1. **Concept cards** → `src/data/concepts.js`
2. **Lessons & topics** → `src/data/lessons.js`
3. **Description distractors** → `src/data/descriptionDistractors.js`
4. **True/false statements** → `src/data/challengeQuiz.js` (the `TRUE_FALSE_STATEMENTS` object)

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
References to conceptually related cards. Used in "Concept Relationship" quiz questions ("Which concept is most related to X?"). Two formats:
```js
// Detailed (preferred for clarity):
{ id: 'c405', relationship: 'is a risk of' }
// Simple:
'c405'
```
Common relationship types: `'includes'`, `'a subset of'`, `'enables'`, `'powered by'`, `'is a risk of'`, `'addresses'`, `'regulates'`, `'proposed by'`, `'exemplified by'`

#### `isFoundational`
- `true` for exactly ONE card per topic — the overview card that introduces the topic.
- This card is taught first in a special introductory lesson.
- Its content should be a broad overview of the topic, not a specific concept.

---

## 2. Lessons (how cards are grouped for teaching)

### Hierarchy
```
Domain → Topic → Chapter → Lesson
```

Chapters are difficulty tiers within a topic (Beginner, Amateur, Advanced). Each lesson teaches 1-3 cards.

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
    cardIds: ['c101', 'c102', 'c103'],     // Card IDs taught in this lesson (1-3 cards)
}
```

### Rules
- **Foundational lessons** (first lesson of a topic): set `isFoundational: true`, include the foundational card + optionally 1-2 related beginner cards.
- **Regular lessons**: 2-3 cards that form a coherent mini-topic.
- **Card order matters**: cards are taught in the order listed in `cardIds`.
- **`mood`**: a short sentence that sets the emotional tone. Think of it like a chapter epigraph. Examples: "Let's start at the very beginning…", "Time to get technical.", "The stakes get higher here."

### Chapter Shape (if creating new topics)

```js
{
    id: 'alignment-fundamentals-beginner',
    topic: 'alignment-fundamentals',
    title: 'Beginner',
    difficulty: 'beginner',    // 'beginner' | 'amateur' | 'advanced'
    order: 0,
    // comingSoon: true,       // set true if content isn't ready yet
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

### Shape

```js
TRUE_FALSE_STATEMENTS['c101'] = [
    {
        statement: 'AI systems can only be effective when trained on large datasets.',
        isTrue: false,
        correction: 'Rule-based and expert systems can be effective without any training data — not all AI requires machine learning.',
    },
    {
        statement: 'Modern AI systems can exceed human performance on specific narrow tasks while failing at basic common-sense reasoning.',
        isTrue: true,
    },
];
```

### Rules
- Each card can have 1-3 statements.
- **False statements** MUST include a `correction` — a 1-sentence explanation of what's actually true. This is shown to the user when they get it wrong.
- Statements should test **understanding**, not trivia. Good statements target common misconceptions.
- Mix true and false — don't make them all false.
- Statements should be self-contained (make sense without seeing the card first).

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

The app currently has **66 cards** across 10 topics:

| Topic | Cards | IDs |
|-------|-------|-----|
| AI Basics | 6 | c101-c106 (AI, ML, Deep Learning, NLP, Neural Networks, Computer Vision) |
| AI Progress | 6 | c201-c206 (LLMs, Foundation Models, Scaling Laws, AI Benchmarks, Emergent Capabilities, AI Race) |
| AI Concepts | 6 | c301-c306 (Generalization, Training Data Bias, Black Box Problem, Reward Hacking, Emergent Behavior, Transfer Learning) |
| Advanced AI | 6 | c207-c212 (AGI, Recursive Self-Improvement, Intelligence Explosion, Takeoff Speeds, Compute Governance, Transformative AI) |
| Alignment Fundamentals | 6 | c401-c406 (Alignment Problem, Corrigibility, Outer vs Inner Alignment, Instrumental Convergence, Deceptive Alignment, Goodhart's Law) |
| AI Risk | 6 | c501-c506 (Existential Risk, AI Misuse, Structural Risks, Power-Seeking, Treacherous Turn, Irreversibility of Deployment) |
| Safety Techniques | 6 | c601-c606 (RLHF, Constitutional AI, Mechanistic Interpretability, Red Teaming, Scalable Oversight, AI Alignment Research) |
| AI Ethics | 6 | c701-c706 (Algorithmic Bias, AI Transparency, AI & Employment, Digital Divide, Autonomous Weapons, Right to Explanation) |
| Global AI Policy | 6 | c801-c806 (EU AI Act, AI Safety Institutes, International AI Governance, Responsible Scaling Policies, AI Moratorium Debate, Frontier Model Regulation) |
| AI Security | 6 | c901-c906 (Adversarial Attacks, Data Poisoning, Prompt Injection, Model Extraction, AI Supply Chain Security, Dual-Use AI) |

**Do not create duplicates of these.** If your source material covers something already in the list, either skip it or propose a more specific/nuanced version with a different angle.

---

## Output Format

Please output your content as **valid JavaScript** that can be copy-pasted into the source files. Use this structure:

```js
// ═══ NEW CARDS ═══════════════════════════════════════════
// Add to CORE_CONCEPTS array in src/data/concepts.js

{
    id: 'c1001',
    title: '...',
    // ... all fields
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
// Add to TRUE_FALSE_STATEMENTS in src/data/challengeQuiz.js

TRUE_FALSE_STATEMENTS['c1001'] = [
    { statement: '...', isTrue: false, correction: '...' },
    { statement: '...', isTrue: true },
];
```

---

## Checklist Before Submitting

For each card, verify:
- [ ] `id` is unique and follows the numbering scheme
- [ ] `quizDescription` does NOT start with "This...", "A system...", "The practice of..."
- [ ] `whyItMatters` (if present) is ONE sentence, consequence-focused, distinct from quizDescription
- [ ] `similarWhyMatters` is bidirectional if used
- [ ] `category` is one of the 8 valid values
- [ ] `difficulty` is 1, 2, or 3
- [ ] `linkedCards` reference valid existing card IDs
- [ ] `isFoundational` is true for exactly one card per topic
- [ ] Description distractors have all 3 difficulty levels
- [ ] d:3 distractors include a `trap` explanation
- [ ] True/false statements with `isTrue: false` include a `correction`

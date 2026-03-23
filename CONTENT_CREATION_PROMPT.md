# Content Creation Prompt for AI Safety Learning App

> Give this entire document to an LLM along with your source material (PowerPoint, book chapters, etc.) to generate content for the app.

---

## Your Role

You are creating educational content for a **vocabulary companion app** for AI Safety. The app teaches users about AI safety, alignment, governance, and AI progress through **flashcard-style concept cards**, organized into **lessons** within **chapters** within **topics**. Users learn cards, then get quizzed on them via multiple-choice questions across 3 dimensions (what/why/how).

This is a **companion app**, not a textbook replacement. Your job is to identify the key concepts and vocabulary from source material (books, slides, courses) and turn them into structured flashcard content.

### Division of labor

- **You** (content LLM): Focus on the **content** — identifying concepts, writing descriptions, crafting quiz material, organizing into lessons, and suggesting improvements to existing content. Use whatever format is clearest to communicate your intent.
- **A developer** (Claude Code) will take your content and integrate it into the codebase. They will handle code formatting, resolve any conflicts with existing data structures, and make judgment calls on implementation details.

**You do NOT need to produce valid JavaScript or worry about exact code syntax.** Just produce clear, well-structured content. The developer will handle the rest.

---

## Workflow: Plan First, Then Create

Content creation is a **two-phase process**. Do NOT skip to phase 2 without approval.

### Phase 1: Plan (do this first, wait for approval)

Given source material (book chapters, slides, etc.):

1. **Read the source material** and identify all important concepts that should become cards.
2. **Check against existing content** (see "Existing Content" section below) — flag any overlaps. For overlapping concepts, suggest whether to skip, update the existing card, or create a more specific variant.
3. **Propose an organization plan:**
   - Which **topic** these cards belong to (existing or new)
   - How to group cards into **chapters** (thematic groupings — these don't need to match the book's structure)
   - How to group cards into **lessons** within each chapter (2-4 cards per lesson that form a coherent mini-unit)
   - The teaching order (what concepts build on what)
4. **List each proposed card** with just: title, category, difficulty, and a 1-line summary.
5. **Flag any suggestions** for modifying existing content — updating descriptions, adding missing fields, improving quiz material, changing organization. All suggestions are welcome; the developer will figure out how to implement them safely.

**Present this plan and WAIT for approval before proceeding to Phase 2.**

### Phase 2: Create Content (only after plan is approved)

Produce the full content for the approved cards. Work in batches (e.g., 2 chapters at a time) so content can be reviewed incrementally.

For each batch, provide **all 6 content types** listed below:

1. **Concept cards** — the core flashcard content
2. **Lessons, chapters & topic** — how cards are organized
3. **Description distractors** — curated wrong answers for hard quiz questions
4. **True/false statements** — for challenge mode
5. **Why distractors** — wrong "why it matters" options for quiz questions
6. **Suggested changes to existing content** — improvements, updates, new connections

---

## 1. Concept Cards (the core content unit)

Each card teaches **one concept**. Think of it as a vocabulary flashcard.

### Card Fields

Each card needs these fields:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique ID: `c` + number. New topics use c1001+ range. |
| `title` | ✅ | The concept's proper name (2-5 words). The term someone would Google. |
| `summary` | ✅ | One-line preview (~15 words max). |
| `description` | ✅ | Full learning text (2-4 sentences, ~40-80 words). |
| `quizDescription` | ✅ | Indirect clue-like description for quizzes (see rules below). |
| `whyItMatters` | Optional | ONE sentence about why this matters for AI safety. |
| `similarWhyMatters` | Optional | IDs of cards with too-similar whyItMatters (must be bidirectional). |
| `topic` | ✅ | Primary topic ID. |
| `secondaryTopic` | Optional | Second topic ID if the card spans two topics. |
| `category` | ✅ | One of 8 types (see below). |
| `difficulty` | ✅ | 1 (beginner), 2 (intermediate), or 3 (advanced). |
| `tags` | ✅ | Free-form strings for cross-topic linking and filtering. |
| `linkedCards` | Optional | Related cards with relationship descriptions. |
| `importance` | ✅ | Display ordering weight (1 = normal, 2+ = featured). |
| `isFoundational` | ✅ | `true` for exactly ONE card per topic (the overview card). |

### Field Quality Rules

#### `quizDescription` ⚠️ CRITICAL — READ CAREFULLY
- This is an **indirect, clue-like description** used in quiz questions. The user sees this text and must guess which concept it describes.
- **NEVER start with type-categorizing phrases** like "This field...", "A system that...", "The practice of...", "A technique for..."
- **DO lead with** gerunds, actions, effects, examples, or consequences.
- Think of it like a Jeopardy clue — evocative and specific without naming the concept.
- Must be meaningfully different from `description` — don't just rephrase it.

**Good examples:**
- ✅ "Instead of writing explicit instructions, developers show examples and let the system figure out the rules on its own." (Machine Learning)
- ✅ "Stacking many processing layers lets the system build up from simple patterns to complex abstractions." (Deep Learning)

**Bad examples:**
- ❌ "A subset of AI that uses data to learn patterns." (too generic, starts with "A subset of")
- ❌ "This technique involves training models with human feedback." (starts with "This technique")

#### `whyItMatters` ⚠️ IMPORTANT RULES
- **Optional** — only include for ~60% of cards where the safety relevance is non-obvious.
- **Max ONE sentence.** Shorter is better.
- **Consequence-focused** — explain the downstream effect, not just what the concept is.
- **Must be distinct from `quizDescription`** — no overlapping phrasing.
- **Must be specific** — no generic "this is important for safety."
- **Skip for:** Actors, very basic definitions, cards where safety relevance is self-evident.

**Good:** "The more layers a network has, the more opaque its reasoning — making the most capable systems the hardest to audit."
**Bad:** "This is important for AI safety." / "Reward hacking matters because it can lead to unintended behavior."

#### `linkedCards`
References to related cards. Include a relationship description for each:
- Examples: "includes", "a subset of", "enables", "powered by", "is a risk of", "addresses", "related to", "a type of"

#### Categories
| Category | Use for |
|----------|---------|
| `concept` | Core ideas, theories, phenomena, definitions — what something IS |
| `technique` | Methods, tools, approaches — how to DO something |
| `risk` | Threats, failure modes, dangers — what can go WRONG |
| `regulation` | Laws, treaties, formal mandates — what is legally REQUIRED |
| `practice` | Voluntary standards, industry norms — what is DONE by choice |
| `proposal` | Suggested frameworks, visions — what is SUGGESTED but not yet adopted |
| `actor` | Organizations, institutions, labs — WHO is involved |
| `other` | Doesn't fit above — use sparingly |

**Key distinctions:**
- **Practice vs. Regulation:** Practices = voluntary. Regulations = legally mandated.
- **Proposal vs. Practice:** Proposals = not widely adopted yet. Practices = already standard.

---

## 2. Lessons, Chapters & Topics

### Hierarchy
```
Domain → Topic → Chapter → Lesson → Cards
```

- **Domain**: top-level grouping (e.g., "Foundations of AI", "AI Safety", "Governance")
- **Topic**: a major subject area (e.g., "AI Capabilities", "Alignment Fundamentals")
- **Chapter**: a thematic sub-section within a topic with a difficulty tier
- **Lesson**: a single study session with 2-4 cards

### Structuring Rules

- **Group by conceptual coherence**, not by source order
- **Each chapter should have 2-4 lessons** (~6-12 cards per chapter)
- **Lessons should build on each other** — prerequisites before advanced concepts
- **Cards can be reused across topics** — if c201 (LLMs) is relevant to both "AI Progress" and "AI Capabilities", reference it in both

### What to provide for each lesson:
- **Title** — question or topic phrase (e.g., "Reasoning & Tools")
- **Subtitle** — one-line description (e.g., "How modern AI thinks longer and reaches for external help")
- **Mood** — opening flavor text (e.g., "AI is learning to think — and to ask for a calculator.")
- **Card IDs** — which cards are taught (in order, simpler first)
- **Chapter assignment** — which chapter it belongs to
- **Whether it's foundational** — true only for the first/overview lesson of a topic

---

## 3. Description Distractors (for hard quiz questions)

For each card, provide **curated wrong descriptions** at 3 difficulty levels. Used in quiz questions where users see a title and must pick the correct description.

### What to provide per card:

- **hardCorrect** — a rephrased correct description (tests understanding, not memorization)
- **3 distractors:**
  - **Easy (d:1)** — obviously wrong, describes a different concept
  - **Medium (d:2)** — plausible, describes a *related* concept
  - **Hard (d:3)** — nearly correct with a subtle factual error + a **trap explanation** of what's wrong

---

## 4. True/False Statements (for challenge mode)

For each card, provide **one true statement** and **one false statement** about the concept.

### What to provide per card:

- **trueStatement** — a factually accurate statement
- **falseStatement** — a plausible misconception
- **correction** — 1-sentence explanation of what's actually true (shown after wrong answer)

Good false statements target **common misconceptions**, not trivial errors.

---

## 5. Why Distractors (for "why" quiz questions)

For each card that has a `whyItMatters`, provide **one plausible-but-wrong "why it matters" statement**.

### What to provide:

- **distractor** — sounds reasonable but is factually wrong or makes an unjustified logical leap

Good patterns:
- Overstating benefits ("always works", "guarantees", "eliminates")
- Claiming a risk doesn't apply ("only affects...", "can always be...")
- Inverting the actual implication ("makes things safer" when the concept introduces risk)

---

## 6. Suggested Changes to Existing Content

You are **encouraged** to suggest changes to existing cards whenever it would improve the content. This includes:

- **Updating descriptions** to be more accurate, detailed, or consistent with new cards
- **Adding missing fields** (e.g., adding `whyItMatters` to a card that doesn't have one)
- **Improving quiz descriptions** to be more clue-like
- **Adding/updating linkedCards** to connect existing cards with new ones
- **Adding/updating tags** for better cross-referencing
- **Reorganizing** — suggesting a card should move to a different topic, or that two cards should be merged or split
- **Replacing a card's content entirely** — if an existing card covers a concept poorly and the source material gives you a much better angle. Just be clear about what you're replacing and why.

**The developer will handle all implementation details** — including making sure changes don't break anything, resolving conflicts, and deciding on the best technical approach. Just clearly describe **what** you want to change and **why**.

### How to present changes:

For each existing card you want to modify, state:
- **Card ID and title** (e.g., "c201 — Large Language Models")
- **What to change** (e.g., "update description", "add whyItMatters", "add linkedCard to c1003")
- **The new content** for the changed fields
- **Why** (brief rationale)

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

## Existing Content (for reference)

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

**Cards can be reused across topics** — e.g., c201 (LLMs) appears in both AI Progress and AI Capabilities lessons.

**When you see overlap**, don't avoid it — suggest what to do:
- "c306 already covers fine-tuning but from a different angle; I'd update its description to X and also create a new card c1013 for the pre-training→fine-tuning pipeline specifically"
- "c211 covers Frontier Models; I'd reuse it in this lesson and update its description to mention X"
- "c601 (RLHF) is missing a whyItMatters field — I'd add one: 'X'"

---

## Checklist Before Submitting

### Phase 1 (Plan):
- [ ] All key concepts from source material are identified
- [ ] Overlaps with existing cards are flagged with clear recommendations
- [ ] Chapters are thematically coherent (not just mirroring source structure)
- [ ] Lessons have 2-4 cards each and teach related concepts together
- [ ] Teaching order makes sense (prerequisites before advanced concepts)

### Phase 2 (Content — for each card):
- [ ] All 6 content types are provided (cards, lessons, distractors, true/false, why distractors, existing content changes)
- [ ] `quizDescription` does NOT start with "This...", "A system...", "The practice of..."
- [ ] `whyItMatters` (if present) is ONE sentence, consequence-focused, distinct from quizDescription
- [ ] `similarWhyMatters` is bidirectional if used
- [ ] `category` is one of the 8 valid values
- [ ] `difficulty` is 1, 2, or 3
- [ ] `linkedCards` reference valid existing or new card IDs
- [ ] `isFoundational` is true for exactly one card per topic
- [ ] Description distractors have all 3 difficulty levels with d:3 including a trap explanation
- [ ] True/false: one true statement, one false statement, one correction per card
- [ ] Why distractors included for every card that has `whyItMatters`
- [ ] Changes to existing content are clearly described with rationale

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

---

## Appendix A — Complete Reference of All Existing Content

Use this appendix to:
- Understand the level, tone, and depth of existing cards
- Ensure your new cards link correctly to existing ones (valid IDs)
- Avoid duplicating concepts that already exist
- **Verify the existing content** — if you spot factual errors, misleading descriptions, broken links, or poor vocabulary choices, flag them

---

### A1. Domain / Topic / Chapter / Lesson Structure

| Domain | Topic | Chapter | Lesson ID | Lesson Title | Foundational? | Card IDs |
|--------|-------|---------|-----------|-------------|---------------|----------|
| Foundations of AI | AI Basics | Beginner | lesson-ai-basics-b-0 | What is AI? | Yes | c101, c102, c103 |
| Foundations of AI | AI Basics | Beginner | lesson-ai-basics-b-1 | How AI Sees & Speaks | No | c105, c104, c106 |
| Foundations of AI | AI Progress | Beginner | lesson-ai-progress-b-0 | The AI Landscape | Yes | c201, c202, c206 |
| Foundations of AI | AI Progress | Beginner | lesson-ai-progress-b-1 | Why AI Keeps Getting Better | No | c203, c204, c205 |
| Foundations of AI | AI Concepts | Beginner | lesson-ai-concepts-b-0 | How Machines Learn | Yes | c301, c302, c303, c304 |
| Foundations of AI | AI Concepts | Beginner | lesson-ai-concepts-b-1 | Modern AI Building Blocks | No | c305, c306 |

---

### A2. All Cards (Concepts) — Full Detail

#### Topic: AI Basics (6 cards)

| ID | Title | Foundational? | Category | Difficulty | Tags | Summary |
|----|-------|---------------|----------|------------|------|---------|
| c101 | Artificial Intelligence | Yes | technical | 1 | ai, foundations, overview | Machines that can perform tasks normally requiring human intelligence |
| c102 | Machine Learning | No | technical | 1 | ml, training, foundations | Systems that learn patterns from data instead of following explicit rules |
| c103 | Deep Learning | No | technical | 1 | deep-learning, neural-networks, foundations | Machine learning using neural networks with many layers |
| c104 | Natural Language Processing | No | technical | 1 | nlp, language, applications | Teaching machines to understand and generate human language |
| c105 | Neural Networks | No | technical | 1 | neural-networks, architecture, foundations | Computing systems loosely inspired by biological brain structure |
| c106 | Computer Vision | No | technical | 1 | cv, perception, applications | Teaching machines to interpret and understand visual information |

**Full descriptions:**

| ID | description | quizDescription |
|----|-------------|-----------------|
| c101 | Artificial intelligence (AI) is the broad field of building machines that can perform tasks typically requiring human cognition — such as recognizing images, understanding language, or making decisions. AI ranges from narrow systems that excel at one task to the aspirational goal of general-purpose intelligence. | The field of building machines capable of performing tasks that normally require human intelligence. |
| c102 | Machine learning (ML) is a subset of AI where systems learn to perform tasks by finding patterns in data, rather than being explicitly programmed. Given enough examples, an ML model can learn to classify emails as spam, recommend movies, or predict stock prices. | A subset of AI where systems learn to perform tasks by identifying patterns in data rather than following hand-coded rules. |
| c103 | Deep learning is a subset of machine learning that uses neural networks with many layers (hence "deep") to learn complex patterns. It powers most modern AI breakthroughs, from image recognition to language generation. The "depth" allows the network to learn increasingly abstract representations of data. | A subset of machine learning that uses multi-layered neural networks to learn complex, hierarchical patterns in data. |
| c104 | Natural language processing (NLP) is the branch of AI focused on enabling machines to understand, interpret, and generate human language. Modern NLP is powered by deep learning and is behind applications like chatbots, translation services, and search engines. | The branch of AI that enables machines to understand, interpret, and generate human language. |
| c105 | Neural networks are computing systems made up of interconnected nodes (neurons) organized in layers. Loosely inspired by the brain, they learn by adjusting the strength of connections between neurons during training. They are the foundation of deep learning and most modern AI systems. | Computing systems of interconnected nodes organized in layers, loosely inspired by the brain, that learn by adjusting connection strengths. |
| c106 | Computer vision is the branch of AI that enables machines to interpret images and videos — recognizing faces, detecting objects, or reading text from photos. Deep learning transformed this field, making it possible for AI to match or exceed human performance on many visual tasks. | The branch of AI that enables machines to interpret and understand visual information from images and videos. |

#### Topic: AI Progress (6 cards)

| ID | Title | Foundational? | Category | Difficulty | Tags | Summary |
|----|-------|---------------|----------|------------|------|---------|
| c201 | Large Language Models | Yes | technical | 1 | llm, language-models, frontier, capabilities | AI systems trained on massive text data to generate human-like language |
| c202 | Foundation Models | No | technical | 1 | foundation-models, pre-training, capabilities | Large pretrained models that can be adapted to many different tasks |
| c203 | Scaling Laws | No | technical | 1 | scaling, compute, research, progress | Predictable relationships between model size, data, and performance |
| c204 | Benchmarks | No | technical | 1 | evaluation, measurement, capabilities | Standardized tests used to measure AI capabilities |
| c205 | Emergent Abilities | No | technical | 1 | emergence, capabilities, surprises, scaling | Unexpected capabilities that appear as AI models grow larger |
| c206 | AI Labs | No | technical | 1 | industry, organizations, frontier, governance | Organizations at the forefront of building advanced AI systems |

**Full descriptions:**

| ID | description | quizDescription |
|----|-------------|-----------------|
| c201 | Large language models (LLMs) are AI systems trained on vast amounts of text to predict and generate language. Models like GPT and Claude can answer questions, write code, and reason through problems. They are the most visible face of recent AI progress and a central focus of safety research. | AI systems trained on massive text datasets to generate, understand, and reason with human language across a wide range of tasks. |
| c202 | Foundation models are large AI systems trained on broad data that can be adapted to many tasks without retraining from scratch. Instead of building a separate AI for each problem, one foundation model can be fine-tuned or prompted for translation, coding, medical diagnosis, and more. | General-purpose AI models pretrained on broad datasets that can be adapted to many downstream tasks through fine-tuning or prompting. |
| c203 | Scaling laws are empirical relationships showing that AI performance improves predictably as you increase model size, training data, and compute. They have guided billions of dollars in AI investment and raise safety concerns — if capabilities keep improving predictably, dangerous capabilities may emerge on a known timeline. | Mathematical relationships showing that AI performance improves predictably with increases in model size, data, and compute. |
| c204 | Benchmarks are standardized tests that measure how well AI systems perform on specific tasks, from language understanding to math reasoning. They help track progress and compare models, but have limitations — AI can score well on tests without truly understanding the underlying concepts. | Standardized testing frameworks that measure AI capabilities on specific tasks, enabling comparison between models. |
| c205 | Emergent abilities are capabilities that appear unexpectedly in AI models as they are scaled up. A model that cannot do a task at one size may suddenly gain that ability at a larger size. Examples include chain-of-thought reasoning and in-context learning. These surprises make AI development harder to predict. | Capabilities that arise unexpectedly in AI models at larger scales, appearing suddenly rather than gradually. |
| c206 | AI labs are the organizations — such as OpenAI, Anthropic, Google DeepMind, and Meta AI — that build and deploy the most advanced AI systems. They control access to massive compute resources and shape the direction of AI progress. Their safety practices and governance decisions have outsized impact. | Organizations like OpenAI, Anthropic, and DeepMind that build the most advanced AI systems and shape AI progress. |

#### Topic: AI Concepts (6 cards)

| ID | Title | Foundational? | Category | Difficulty | Tags | Summary |
|----|-------|---------------|----------|------------|------|---------|
| c301 | Training and Inference | Yes | technical | 1 | training, inference, fundamentals | The two main phases of using a machine learning model |
| c302 | Supervised Learning | No | technical | 1 | supervised, training, ml-type | Learning from labeled examples with known correct answers |
| c303 | Unsupervised Learning | No | technical | 1 | unsupervised, training, ml-type | Learning patterns from unlabeled data without explicit correct answers |
| c304 | Reinforcement Learning | No | technical | 1 | rl, training, ml-type, rewards | Learning through trial and error using rewards and penalties |
| c305 | Transformers | No | technical | 1 | transformers, attention, architecture, llm | The neural network architecture behind modern LLMs |
| c306 | Fine-Tuning | No | technical | 1 | fine-tuning, transfer-learning, adaptation | Adapting a pretrained model to a specific task or domain |

**Full descriptions:**

| ID | description | quizDescription |
|----|-------------|-----------------|
| c301 | Training is the phase where a model learns from data by adjusting its internal parameters. Inference is when the trained model is used to make predictions on new inputs. Training is computationally expensive and happens once (or periodically); inference happens every time the model is used. | The two phases of ML: training (learning from data) and inference (making predictions on new inputs). |
| c302 | Supervised learning is a type of machine learning where the model is trained on labeled data — input-output pairs where the correct answer is known. For example, training an email filter by showing it thousands of emails already labeled "spam" or "not spam." It is the most common form of ML in practice. | A type of machine learning where models learn from labeled input-output pairs with known correct answers. |
| c303 | Unsupervised learning is a type of machine learning where the model finds patterns in data without labeled examples. It discovers hidden structure — like grouping customers by behavior or finding topics in documents. LLM pre-training is a form of unsupervised learning (predicting the next word). | A type of machine learning that discovers hidden patterns and structure in data without labeled examples. |
| c304 | Reinforcement learning (RL) is a type of machine learning where an agent learns by interacting with an environment and receiving rewards or penalties. It is how AlphaGo learned to play Go and how chatbots are fine-tuned with human feedback (RLHF). The agent learns a strategy that maximizes cumulative reward over time. | A type of machine learning where an agent learns optimal behavior through trial-and-error interaction with an environment. |
| c305 | Transformers are a neural network architecture introduced in 2017 that revolutionized AI. Their key innovation — the "attention mechanism" — lets the model weigh the importance of different parts of the input simultaneously. Transformers power virtually all modern large language models, including GPT and Claude. | The neural network architecture using attention mechanisms that powers virtually all modern large language models. |
| c306 | Fine-tuning is the process of taking a pretrained foundation model and further training it on a smaller, task-specific dataset. This adapts the general model to perform well on a particular task — like training a general language model to be a medical assistant or a code generator — without the cost of training from scratch. | The process of further training a pretrained model on task-specific data to specialize it for a particular use case. |

---

### A3. Card Link Map (all linkedCards relationships)

This table shows every link between cards. Check for: broken links, missing reciprocal links, unclear relationship verbs, conceptually wrong relationships.

| Source Card | → | Target Card | Relationship |
|-------------|---|-------------|--------------|
| c101 Artificial Intelligence | → | c102 Machine Learning | includes |
| c101 Artificial Intelligence | → | c103 Deep Learning | includes |
| c102 Machine Learning | → | c101 Artificial Intelligence | a subset of |
| c102 Machine Learning | → | c105 Neural Networks | uses |
| c102 Machine Learning | → | c301 Training and Inference | works through |
| c103 Deep Learning | → | c102 Machine Learning | a subset of |
| c103 Deep Learning | → | c105 Neural Networks | built on |
| c104 Natural Language Processing | → | c103 Deep Learning | powered by |
| c104 Natural Language Processing | → | c201 Large Language Models | exemplified by |
| c105 Neural Networks | → | c103 Deep Learning | enables |
| c105 Neural Networks | → | c305 Transformers | a type includes |
| c106 Computer Vision | → | c103 Deep Learning | powered by |
| c106 Computer Vision | → | c105 Neural Networks | applies |
| c201 Large Language Models | → | c103 Deep Learning | built on |
| c201 Large Language Models | → | c202 Foundation Models | an example of |
| c201 Large Language Models | → | c305 Transformers | uses the |
| c202 Foundation Models | → | c102 Machine Learning | trained using |
| c202 Foundation Models | → | c306 Fine-Tuning | adapted via |
| c203 Scaling Laws | → | c202 Foundation Models | predicts performance of |
| c203 Scaling Laws | → | c205 Emergent Abilities | can lead to |
| c204 Benchmarks | → | c201 Large Language Models | measures progress of |
| c204 Benchmarks | → | c205 Emergent Abilities | can reveal |
| c205 Emergent Abilities | → | c203 Scaling Laws | arise from |
| c205 Emergent Abilities | → | c201 Large Language Models | observed in |
| c206 AI Labs | → | c202 Foundation Models | build |
| c206 AI Labs | → | c203 Scaling Laws | drive research on |
| c301 Training and Inference | → | c102 Machine Learning | two phases of |
| c301 Training and Inference | → | c302 Supervised Learning | training includes |
| c302 Supervised Learning | → | c102 Machine Learning | a type of |
| c302 Supervised Learning | → | c303 Unsupervised Learning | contrasts with |
| c303 Unsupervised Learning | → | c102 Machine Learning | a type of |
| c303 Unsupervised Learning | → | c302 Supervised Learning | contrasts with |
| c304 Reinforcement Learning | → | c102 Machine Learning | a type of |
| c304 Reinforcement Learning | → | c302 Supervised Learning | contrasts with |
| c305 Transformers | → | c201 Large Language Models | architecture behind |
| c305 Transformers | → | c105 Neural Networks | a type of |
| c306 Fine-Tuning | → | c202 Foundation Models | adapts |
| c306 Fine-Tuning | → | c301 Training and Inference | a form of |

---

### A4. Fun Facts

| ID | Text | Related Cards |
|----|------|---------------|
| ff1 | The amount of compute used to train the largest AI models has increased by roughly 10 billion times since 2010 — far outpacing Moore's Law. | c203, c201 |
| ff2 | Some AI models learned to translate between languages they were never explicitly trained to translate between — a classic example of emergent abilities. | c205, c201 |
| ff3 | The term "foundation model" was coined by Stanford researchers in 2021 to capture the idea that one model serves as the base for thousands of different applications. | c202, c201 |
| ff4 | AI benchmarks get "saturated" so quickly that researchers sometimes create a new benchmark only to see AI systems match human performance on it within months. | c204, c205 |
| ff5 | The Transformer architecture, introduced in a 2017 paper called "Attention Is All You Need," is behind virtually every major language model today. | c305, c201 |

---

### A5. Observations & Potential Issues to Verify

The reviewing LLM should pay particular attention to these potential issues:

1. **All 18 cards are category `technical`** — none use `alignment`, `policy`, `ethics`, or `risks`. Is this correct for a "Foundations of AI" domain, or should some cards (e.g., c206 AI Labs) have a different category?

2. **c105 → c305 relationship is "a type includes"** — this reads awkwardly. Neural Networks "a type includes" Transformers? Should probably be "includes" or "a type is".

3. **c201 → c202 relationship is "an example of"** — LLMs are "an example of" Foundation Models. This is correct but the direction reads oddly since the arrow goes from the specific to the general. Consider if users will find this confusing.

4. **c304 Reinforcement Learning → c302 Supervised Learning: "contrasts with"** — RL contrasts more directly with supervised/unsupervised as a group. Is linking specifically to supervised (rather than also unsupervised) the right choice?

5. **c303 says LLM pre-training is "unsupervised learning"** — this is debatable. Many would call it "self-supervised learning" which is a distinct paradigm. Should self-supervised learning be its own card, or should the description be more nuanced?

6. **No cross-topic links in AI Concepts → AI Progress** — c304 (Reinforcement Learning) doesn't link to any AI Progress card despite RLHF being a major topic. c303 mentions LLM pre-training but doesn't link to c201.

7. **Lesson grouping: lesson-ai-basics-b-1 uses card order c105, c104, c106** — Neural Networks is taught before NLP. Is this pedagogically intentional (teach the building block first)?

8. **Description distractors file is empty** — no hard MCQ distractors exist for any card yet. The quiz system will fall back to using other cards' descriptions as distractors, which may be too easy at this level since the topics are quite different.

9. **All importance values are either 1 or 2** — the distinction is used for display ordering. Verify these are intentional (c104 NLP, c106 CV, c204 Benchmarks, c206 AI Labs are importance: 2, all others are 1).

10. **quizDescription for c301** starts with "The two phases of ML" — using the abbreviation "ML" which hasn't been introduced in the quiz context. Should it spell out "machine learning"?

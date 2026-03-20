# Changelog

## 0.6.1 — Smarter "What" quiz distractors

### Changed
- "What is this concept?" questions now prefer same-category distractors (e.g., all `technique` cards) to make title identification harder
- Falls back to random distractors when not enough same-category cards are available

## 0.6.0 — Add dedicated "Why It Matters" dimension

### Added
- New optional `whyItMatters` field on ~53 cards — explains why each concept matters for AI safety, written as indirect clues (same style as quizDescription)
- "Why does this matter?" expandable toggle on learn cards (only for cards with `whyItMatters`)
- New `generateWhyOptions()` quiz function with dedicated `WHY_DISTRACTORS` — one plausible-but-wrong distractor per card
- "Why" quiz questions now use `whyItMatters` content instead of reusing `quizDescription`
- MasteryDots shows 2 dots (What, How) for cards without `whyItMatters`, 3 dots for cards with it

### Changed
- Cards without `whyItMatters` are exempt from "why" quiz dimension — null whyScore treated as 3 points in mastery calculation
- Lesson flow only assigns "why" question type to cards that have `whyItMatters`; biases "why" toward recap slot (60% probability)
- Practice mode only generates "why" questions for cards with `whyItMatters`
- Updated CLAUDE.md, CONTENT_GENERATION_PROMPT.md with `whyItMatters` documentation

## 0.5.4 — Add "Actor" category for organizations and institutions

### Added
- New "Actor" category (orange `#E07B3C`, building icon) for cards about organizations, institutions, labs, or groups in the AI ecosystem
- Added `Building` icon from Lucide for the actor category

### Changed
- Reclassified "AI Labs" and "AI Safety Institutes" from "other" to "actor"
- Updated CLAUDE.md category table and guidance to document the new category

## 0.5.3 — Remove summary hint from practice quiz questions

### Fixed
- Practice why/how questions no longer display the concept's summary under the title — previously this gave away the answer by essentially showing a description while asking the user to pick a description
- Now shows just the title and "Pick the correct description" prompt, matching the lesson recap format

## 0.5.2 — Remove type-categorizing phrases from quiz clues

### Changed
- Rewrote 21 `quizDescription` values that gave away the concept type by starting with phrases like "This field...", "A system with this property...", "These organizations...", "The practice of..." — now lead with gerunds, actions, or concrete effects instead
- Fixed `generateWhatOptions` in quiz.js to use `quizDescription` instead of `description` for all option data (correct answer and distractors)
- Updated CONTENT_GENERATION_PROMPT.md with explicit rule against type-categorizing phrases in quizDescriptions
- Updated CLAUDE.md card data shape to document the anti-pattern

## 0.5.1 — Quiz descriptions rewritten as clues

### Changed
- All 60 `quizDescription` values rewritten to be indirect and clue-like — they now describe consequences, examples, or scenarios rather than directly defining the concept, making quizzes more challenging
- Practice matching quiz now uses `quizDescription` instead of `summary`, so matched descriptions require concept knowledge rather than keyword recognition
- Updated CONTENT_GENERATION_PROMPT.md with new quizDescription guidelines: write like a clue, avoid the concept's title, use vivid examples
- Updated CLAUDE.md to reflect the clue-style quizDescription approach

## 0.4.0 — AI Safety & Alignment domain

### Added
- New domain: **AI Safety & Alignment** (unlocked, no longer "coming soon")
- 3 new topics: Alignment Fundamentals, AI Risk, Safety Techniques
- 18 new cards (c401–c406, c501–c506, c601–c606) at beginner difficulty
- 6 new lessons across 3 topics, grouped into 3 cards each
- 9 new chapters (beginner unlocked, amateur/advanced coming soon)
- Description distractors for all 18 new cards (hardCorrect + 3 difficulty-tiered distractors each)
- True/false statements for all 18 new cards with misconceptions and corrections
- 6 new fun facts related to alignment, risk, and safety concepts
- Cross-domain links connecting safety cards to foundations cards (e.g., c601→c304, c604→c204, c603→c105)

### Cards by topic
- **Alignment Fundamentals**: The Alignment Problem, Instrumental Convergence, Goodhart's Law, Corrigibility, Mesa-Optimization, Reward Hacking
- **AI Risk**: Existential Risk from AI, Misuse & Dual-Use, Deceptive Alignment, Specification Gaming, Power-Seeking AI, Catastrophic Risk
- **Safety Techniques**: RLHF, Constitutional AI, Interpretability, Red Teaming, Scalable Oversight, AI Governance

## 0.3.1 — Content quality improvements

### Fixed
- c105 → c305 link relationship from 'a type includes' to 'includes'
- c303 description: removed inaccurate claim that LLM pre-training is unsupervised learning; refocused on clustering and dimensionality reduction
- c303 quizDescription updated to match corrected description
- c301 quizDescription: spelled out "ML" abbreviation to "machine learning"
- c101, c103, c104, c106 quizDescriptions rewritten with distinct sentence structures to prevent pattern-matching

### Added
- Cross-topic links: c304 → c201 ('used to align'), c304 ↔ c303 ('contrasts with')
- Safety hooks in descriptions for c104 (NLP), c106 (Computer Vision), c205 (Emergent Abilities)
- Description distractors for all 18 Foundations cards (hardCorrect + 3 difficulty-tiered distractors each)
- True/false statements for all 18 Foundations cards with misconceptions and corrections
- challengeQuiz.js now uses static true/false statements from trueFalseStatements.js

### Changed
- Lesson rebalance: lesson-ai-concepts-b-0 reduced from 4 to 3 cards; c304 moved to lesson-ai-concepts-b-1 (now 3 cards each)
- c204 (Benchmarks) importance raised from 2 to 1; c205 (Emergent Abilities) lowered from 1 to 2
- c206 (AI Labs) category changed from 'technical' to 'policy'

## 0.3.0 — AI Progress topic

### Added
- New topic: AI Progress (10 cards, 5 lessons)
- Cards c16–c25: AI Progress, Large Language Models, Foundation Models, Compute, Scaling Laws, Benchmarks & Evaluation, Emergent Abilities, AI Agents, Frontier Models, Artificial General Intelligence
- 5 lessons for AI Progress topic covering modern AI systems, drivers of progress, measurement, and the frontier
- Description distractors for all 10 new cards (c16–c25)
- 6 fun facts related to AI progress concepts

## 0.2.1 — Lint fixes & code cleanup

### Fixed
- App.jsx: Replaced setState-in-useEffect with lazy useState initializer (eliminated cascading render warning)
- vite.config.js: Fixed unused `command` parameter and undefined `process` global
- StreakFlame.jsx: Moved `FLAME_COUNT_COLORS` to `src/utils/streakColors.js` (fixes fast-refresh violation)
- shared.jsx: Moved `flyXPToStar` to `src/utils/xpAnimation.js` (fixes fast-refresh violation)
- ChallengePage.jsx: Fixed useMemo dependency array warnings with proper memoization

### Removed
- Dead CSS: timeline-event-card styles, dark mode legacy Chronos category aliases
- Lint result: 5 errors + 4 warnings reduced to 0

## 0.2.0 — Content expansion & UI improvements

### Added
- 10 new AI safety concepts (c6–c15): Reward Hacking, Instrumental Convergence, Constitutional AI, Feature Visualization, Existential Risk, Algorithmic Bias, AI Transparency, Dual-Use Technology, Scalable Oversight, Robustness & Adversarial Attacks
- 2 new topics: AI Risks and AI Ethics
- 8 new lessons across all 5 topics
- Star/favorite functionality in LibraryPage with filter toggle
- CardConnections component integrated into LibraryPage for navigable related concepts

### Changed
- Replaced all hardcoded old burgundy RGB values (139,65,87) with navy (30,58,95) across all components
- Button secondary variant and ControversyNote now use CSS variables instead of hardcoded colors
- LibraryPage search and starred filter use memoized state for performance

### Removed
- Empty `BottomNav.jsx` (dead code — MobileTabBar in Sidebar handles mobile nav)
- Legacy Chronos category CSS aliases (science, war, politics, culture, revolution)
## 0.2.0 — Card image support

### Added
- `src/utils/images.js` — `cardImage()` helper that resolves image filenames to full URLs (works with both GitHub Pages and Capacitor base paths)
- `image` field on card data model — optional filename string, cards without images render normally
- Image rendering in LessonFlow LEARN_CARD phase (full-width, rounded, lazy-loaded)
- Image rendering in LibraryPage expanded card view
- `public/images/cards/` folder for card image assets

### Changed
- All 5 placeholder concepts now have `image` filenames ready for asset drop-in
- Bumped version to 0.2.0

## 0.1.0 — Initial AI Safety scaffold

Transformed the Chronos history-learning app into an AI Safety learning app.

### Added
- New data layer: `concepts.js` with AI safety card data model (5 placeholder concepts)
- New topic-based lesson structure (interpretability, alignment, governance topics)
- `LibraryPage.jsx` — browsable, filterable reference of all learned cards
- 3-dimension mastery system: what / why / how (replacing 4-dimension location/date/what/description)
- New quiz types: `conceptRelationship` (replaces `causeAndEffect`)
- New challenge tier names: Beginner, Amateur, Advanced, Expert, Master, Visionary
- New design system: navy/teal palette, Space Grotesk headings, steel-blue backgrounds
- Category system: technical, alignment, policy, ethics, risks (replacing history categories)

### Changed
- `AppContext.jsx` — storage key `aisafety-state-v1`, 3-dimension mastery (max 9), renamed state fields (`eventMastery` → `cardMastery`, `seenEvents` → `seenCards`, etc.)
- `LessonFlow.jsx` — `PERIOD_INTRO` → `TOPIC_INTRO`, removed date/location quiz phases
- `PracticePage.jsx` — adapted for 3 mastery dimensions, removed date/location practice modes
- `ChallengePage.jsx` — removed time-based question types, new tier display system
- `spacedRepetition.js` — adjusted mastery thresholds for 0–9 scale
- `share.js`, `notifications.js`, `widgetBridge.js` — rebranded from Chronos to AI Safety
- `index.css` — new color palette, removed map-related CSS
- `vite.config.js` — base path `/AI-Safety-/`
- `package.json` — renamed to `ai-safety`, version `0.1.0`
- `BottomNav.jsx`, `Sidebar.jsx`, `TopBar.jsx` — updated tab labels and app name
- `OnboardingOverlay.jsx` — simplified flow (no placement quiz)

### Removed
- `events.js` (236KB historical event data)
- `MapView.jsx`, `ConcurrentView.jsx`, `LessonIcon.jsx` — history-specific components
- `PlacementQuizFlow.jsx`, `Lesson0Flow.jsx` — placement quiz flow
- `TimelinePage.jsx` — timeline view
- `mapPaths.js` (144KB SVG map data), `placementQuiz.js`, `timeSlider.js`
- `write-map-data.mjs` — map data generation script
- All date/location quiz types: `whichCameFirst`, `eraDetective`, `chronologicalOrder`
- `src/src/` — stale duplicate directory

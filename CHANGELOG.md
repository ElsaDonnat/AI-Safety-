# Changelog

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

# Changelog

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

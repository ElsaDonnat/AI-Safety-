# Backlog

Items to tackle after the initial scaffold is working.

## Phase 2 — Content & Data

- [ ] Write 30+ real AI safety concept cards across all topics
- [ ] Create 10+ lessons organized by topic progression
- [ ] Write distractor descriptions for quiz options (`descriptionDistractors.js`)
- [ ] Write AI safety fun facts (`funFacts.js`)
- [ ] Write daily quiz card pools (`dailyQuiz.js`)
- [ ] Add `quizDescription` field to all concepts for quiz-specific wording

## Phase 3 — Quiz & Practice Polish

- [ ] Implement `tagMatch` quiz type ("Which tag is most associated with X?")
- [ ] Tune hardMCQ distractor generation for AI safety domain
- [ ] Add scenario-based questions (longer-form reasoning)
- [ ] Verify spaced repetition intervals feel right with 3-dimension mastery

## Phase 4 — Library Page Enhancements

- [ ] Add tag-based filtering in Library
- [ ] Add search by title/description
- [ ] Show linked cards navigation in card detail view
- [ ] Add mastery breakdown (what/why/how) in card detail

## Phase 5 — UX & Visual Polish

- [ ] Replace mascot artwork with AI Safety-themed mascot
- [ ] Add topic-specific icons (replace emoji placeholders)
- [ ] Tune animations and transitions
- [ ] Accessibility audit (contrast ratios, screen reader labels)
- [ ] Add app icon and splash screen for Capacitor build

## Phase 6 — Advanced Features

- [ ] Multiplayer challenge mode testing
- [ ] Push notification content for AI safety
- [ ] Android widget with AI safety branding
- [ ] Achievement descriptions and thresholds tuning
- [ ] Onboarding flow user testing

## Known Issues

- Pre-existing lint warnings in App.jsx (setState in effect), StreakFlame.jsx and shared.jsx (fast refresh), vite.config.js (unused var)
- `LessonFlow.jsx` has a missing-deps warning in useEffect (pre-existing pattern from Chronos)

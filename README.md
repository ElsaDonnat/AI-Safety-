# AI Safety Learning App

A mobile-first web app that teaches AI safety, alignment, governance, and AI progress through interactive lessons, spaced repetition practice, and challenge quizzes. Built with React 19 and deployable to both the web (GitHub Pages) and Android (via Capacitor).

---

## Table of Contents

- [Features](#features)
- [What You'll Learn](#what-youll-learn)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Project Structure](#project-structure)
- [How the App Works](#how-the-app-works)
- [Content Overview](#content-overview)
- [How to Add New Content](#how-to-add-new-content)
- [How to Add Card Images](#how-to-add-card-images)
- [Design System](#design-system)
- [Deploying the App](#deploying-the-app)
- [Building for Android](#building-for-android)
- [Roadmap](#roadmap)
- [Tech Stack](#tech-stack)
- [Troubleshooting](#troubleshooting)

---

## Features

- **Structured lessons** — Learn AI safety concepts through guided, multi-step lessons organized by topic
- **Spaced repetition** — Practice mode uses the SM-2 algorithm to schedule reviews at optimal intervals so you actually retain what you learn
- **3-dimension mastery** — Each concept is tested across three dimensions: *What* (definition), *Why* (significance), and *How* (mechanics)
- **Challenge mode** — Test yourself in timed quiz games across 6 difficulty tiers, from Beginner to Visionary
- **Library** — Browse, search, and filter all learned concepts. Star your favorites. Explore connections between related concepts
- **Daily quiz** — A quick daily challenge for bonus XP
- **Streaks and XP** — Stay motivated with daily streaks, XP rewards, and unlockable achievements
- **Dark mode** — Full light and dark theme support
- **Sound and music** — Optional ambient music and sound effects for quiz feedback
- **Offline support** — All content is bundled into the app; no internet connection needed after install
- **Android app** — Can be packaged as a native Android app using Capacitor

---

## What You'll Learn

The app currently covers **60 concepts** across **10 topics**:

| Topic | What it covers | Cards |
|-------|---------------|-------|
| **AI Basics** | Artificial intelligence, machine learning, deep learning, NLP, neural networks, computer vision | 6 cards |
| **AI Progress** | LLMs, foundation models, scaling laws, benchmarks, emergent abilities, AI labs | 6 cards |
| **AI Concepts** | Training & inference, supervised/unsupervised/reinforcement learning, transformers, fine-tuning | 6 cards |
| **Advanced AI** | AGI, superintelligence, narrow AI, AI agents, frontier models, compute | 6 cards |
| **Alignment Fundamentals** | The alignment problem, instrumental convergence, Goodhart's law, corrigibility, mesa-optimization, reward hacking | 6 cards |
| **AI Risk** | Existential risk, misuse & dual-use, deceptive alignment, specification gaming, power-seeking AI, catastrophic risk | 6 cards |
| **Safety Techniques** | RLHF, constitutional AI, interpretability, red teaming, scalable oversight, AI governance | 6 cards |
| **AI Ethics** | AI ethics, algorithmic bias, AI fairness, concentration of power, race dynamics, value lock-in | 6 cards |
| **Global AI Policy** | AI regulation, EU AI Act, responsible scaling, AI safety institutes, international coordination, open vs. closed AI | 6 cards |
| **AI Security** | AI robustness, hallucination, adversarial examples, prompt injection, jailbreaking, distribution shift | 6 cards |

Each topic starts with a foundational lesson that introduces the big idea, followed by deeper lessons on specific concepts.

---

## Getting Started

### Prerequisites

- **Node.js** version 20 or higher ([download here](https://nodejs.org/))
- **npm** (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ElsaDonnat/AI-Safety-.git
   cd AI-Safety-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the URL shown in your terminal (usually `http://localhost:5173`) in your browser.

That's it! The app should be running. It works best if you resize your browser to a phone-sized window, since it's designed as a mobile-first app.

---

## Available Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload (changes appear instantly) |
| `npm run build` | Creates a production build in the `dist/` folder (for GitHub Pages) |
| `npm run preview` | Preview the production build locally before deploying |
| `npm run lint` | Checks the code for errors and style issues |
| `npm run cap:build` | Builds for Android (uses relative paths instead of GitHub Pages paths) |
| `npm run cap:sync` | Syncs the web build to the Android project |
| `npm run cap:open` | Opens the project in Android Studio |
| `npm run release` | Full release pipeline: lint, build, and sync to Android |

---

## Project Structure

```
AI-Safety-/
├── public/                     Static files (copied as-is into the build)
│   ├── images/cards/           Card illustration images (.webp)
│   ├── favicon.svg             App icon for browsers
│   ├── manifest.webmanifest    PWA manifest
│   └── bensound-silentwaves.mp3  Background ambient music
│
├── src/
│   ├── App.jsx                 Main app shell (4-tab navigation)
│   ├── main.jsx                React entry point
│   ├── index.css               Global styles and design tokens
│   │
│   ├── pages/                  One file per tab
│   │   ├── LearnPage.jsx       Topics and lesson navigation
│   │   ├── LibraryPage.jsx     Browsable card reference with search/filter
│   │   ├── PracticePage.jsx    Spaced repetition review sessions
│   │   └── ChallengePage.jsx   Timed quiz game with tiers
│   │
│   ├── components/
│   │   ├── learn/
│   │   │   └── LessonFlow.jsx  The 8-phase lesson engine
│   │   ├── shared.jsx          Reusable UI pieces (buttons, mastery dots, tags)
│   │   ├── TopBar.jsx          App header with streak and settings
│   │   ├── Settings.jsx        Settings panel (theme, sound, notifications)
│   │   ├── OnboardingOverlay.jsx  First-run welcome flow
│   │   ├── DailyQuizFlow.jsx   Daily quiz modal
│   │   ├── FunFactsFlow.jsx    Fun facts between lessons
│   │   ├── AchievementsModal.jsx  Achievement notifications
│   │   ├── Mascot.jsx          App mascot character
│   │   └── layout/Sidebar.jsx  Desktop sidebar navigation
│   │
│   ├── data/                   All content lives here (no backend)
│   │   ├── concepts.js         All 25 concept cards (the core content)
│   │   ├── lessons.js          Topics and lesson definitions
│   │   ├── quiz.js             Quiz question generation logic
│   │   ├── challengeQuiz.js    Challenge mode tiers and question types
│   │   ├── achievements.js     Achievement definitions and unlock conditions
│   │   ├── dailyQuiz.js        Daily quiz configuration
│   │   ├── descriptionDistractors.js  Wrong answers for hard quiz questions
│   │   ├── funFacts.js         Fun facts shown between sessions
│   │   └── spacedRepetition.js SM-2 spaced repetition algorithm
│   │
│   ├── context/
│   │   └── AppContext.jsx      Global state (progress, settings, streaks)
│   │
│   ├── services/               System integrations
│   │   ├── feedback.js         Sound effects (Web Audio API)
│   │   ├── ambientMusic.js     Background music player
│   │   ├── notifications.js    Push notifications (Android)
│   │   ├── share.js            Social sharing
│   │   └── widgetBridge.js     Android home screen widget
│   │
│   └── utils/
│       ├── images.js           Card image URL helper
│       ├── streakColors.js     Streak flame color calculation
│       └── xpAnimation.js      XP flying animation
│
├── CLAUDE.md                   Instructions for AI coding assistants
├── CHANGELOG.md                Version history
├── BACKLOG.md                  Future feature ideas
├── CONTENT_GENERATION_PROMPT.md  Prompt template for generating new content
├── capacitor.config.ts         Android/Capacitor configuration
├── vite.config.js              Vite build configuration
├── eslint.config.js            Linting rules
└── package.json                Dependencies and scripts
```

---

## How the App Works

### The Four Tabs

1. **Learn** — Pick a topic, then work through its lessons in order. Each lesson teaches 1-3 concepts through an interactive flow: read about the concept, then answer quiz questions to test your understanding.

2. **Library** — A reference of all the concepts you've learned. You can search, filter by topic or category, star favorites, and tap any card to see its details and related concepts.

3. **Practice** — The app tracks which concepts you're weakest on and schedules reviews using spaced repetition. Concepts you struggle with come back sooner; ones you know well come back later.

4. **Challenge** — A quiz game with 6 difficulty tiers. You start with 3 hearts and try to answer as many questions as possible without losing them all. Higher tiers have harder question types.

### Lesson Flow

Each lesson follows this sequence:

```
Intro → Topic Introduction → Learn Card → Quiz → (repeat for each card) → Recap → Summary
```

- **Intro** — Brief motivational text to set the mood
- **Topic Introduction** — Overview of the topic (first lesson only)
- **Learn Card** — Read about the concept (with optional illustration)
- **Quiz** — Answer questions testing what/why/how
- **Recap** — Review all cards from the lesson
- **Summary** — See your score and XP earned

### Mastery System

Each concept is scored on 3 dimensions:

| Dimension | Question | Example |
|-----------|----------|---------|
| **What** | "What is this concept?" | Definition-based multiple choice |
| **Why** | "Why does this matter for AI safety?" | Reasoning-based multiple choice |
| **How** | "How does this work?" | Mechanics-based multiple choice |

Each dimension scores 0-3 points (green = 3, yellow = 1, red = 0), for a maximum mastery of **9 per concept**.

### Quiz Types

| Type | Description |
|------|-------------|
| **Multiple Choice (MCQ)** | Pick the correct definition, reasoning, or description |
| **True/False** | Identify whether a statement about AI safety is correct |
| **Odd One Out** | Find the concept that doesn't belong with the other three |
| **Concept Relationships** | Identify which concept is most related to another |
| **Hard MCQ** | Trickier version of MCQ with closely-related wrong answers |

### Streaks and XP

- Complete at least one lesson or practice session per day to maintain your streak
- Earn XP for completing lessons, quizzes, and challenges
- Unlock achievements for milestones (first lesson, streak milestones, mastery levels, etc.)

### Data Storage

All your progress is saved in your browser's localStorage (key: `aisafety-state-v1`). There is no server or account system — your data lives on your device. If you clear your browser data, your progress will be reset.

---

## Content Overview

All content is defined in static JavaScript files in `src/data/`. There is no backend or database.

| File | What it contains |
|------|-----------------|
| `concepts.js` | All 25 concept cards — the core learning content |
| `lessons.js` | 6 topics and 17 lessons that organize the cards |
| `descriptionDistractors.js` | Carefully crafted wrong answers for hard quiz questions |
| `funFacts.js` | 6 fun facts shown between sessions |
| `quiz.js` | Logic for generating quiz questions from card data |
| `challengeQuiz.js` | Challenge mode tier definitions and question selection |
| `achievements.js` | Achievement definitions and unlock conditions |
| `dailyQuiz.js` | Daily quiz configuration |
| `spacedRepetition.js` | SM-2 algorithm for scheduling reviews |

---

## How to Add New Content

The app is designed so that adding new concepts and lessons only requires editing data files — no component code changes needed.

### Adding a New Concept Card

Open `src/data/concepts.js` and add a new object to the `CORE_CONCEPTS` array:

```js
{
    id: 'c26',                          // Unique ID, increment from the last card
    title: 'Your Concept Title',
    summary: 'A one-line summary shown in previews',
    description: 'A longer explanation shown on the learn card screen. 2-4 sentences that teach the concept clearly.',
    quizDescription: 'A rephrased description used in quiz questions (slightly different wording from the main description).',
    topic: 'alignment',                 // Must match a topic ID from lessons.js
    secondaryTopic: null,               // Optional second topic, or null
    category: 'technical',              // One of: technical, alignment, policy, ethics, risks
    difficulty: 1,                      // 1 (easy), 2 (medium), or 3 (hard)
    tags: ['tag1', 'tag2'],             // Free-form tags for filtering and linking
    linkedCards: ['c1', 'c5'],          // IDs of related concepts
    importance: 1,                      // 1 (high) to 3 (low) — affects display order
    isFoundational: false,              // true only for the main overview card of a topic
    image: 'your-concept.webp',         // Optional — see "How to Add Card Images" below
},
```

### Adding a New Topic

Open `src/data/lessons.js` and add to the `TOPICS` array:

```js
{
    id: 'your-topic',
    title: 'Your Topic Name',
    description: 'A short description of what this topic covers',
    icon: '🔬',                        // An emoji shown next to the topic name
    color: '#7C3AED',                  // A hex color for the topic accent
},
```

### Adding a New Lesson

In the same file (`src/data/lessons.js`), add to the `LESSONS` array:

```js
{
    id: 'lesson-your-topic-0',         // Unique lesson ID
    number: 0,                          // 0 for foundational, then 1, 2, 3...
    title: 'Lesson Title',
    subtitle: 'A short subtitle',
    mood: 'A motivational or thought-provoking sentence shown at the start.',
    topic: 'your-topic',               // Must match a topic ID
    isFoundational: true,              // true for the first lesson of a topic
    cardIds: ['c26'],                  // Which concept cards this lesson teaches (1-3)
},
```

### Adding Description Distractors (for Hard Quizzes)

Open `src/data/descriptionDistractors.js` and add an entry for your card's ID:

```js
'c26': {
    hardCorrect: 'A precise description of the concept used as the correct answer in hard mode.',
    distractors: [
        { text: 'An obviously wrong answer from a different domain.', d: 1 },           // d:1 = easy to rule out
        { text: 'Another clearly wrong answer.', d: 1 },
        { text: 'A wrong answer from a related field that requires some thought.', d: 2 }, // d:2 = medium
        { text: 'Another medium-difficulty wrong answer.', d: 2 },
        { text: 'A subtly wrong answer that sounds very close to correct.', d: 3 },      // d:3 = hard
        { text: 'Another tricky wrong answer with a small but important error.', d: 3 },
    ],
},
```

The `d` value (1, 2, or 3) indicates how difficult the distractor is. The app picks distractors based on the current difficulty tier.

### Adding Fun Facts

Open `src/data/funFacts.js` and add to the `FUN_FACTS` array:

```js
{
    id: 'ff7',                         // Unique ID, increment from the last fact
    text: 'An interesting fact about AI safety that makes users go "huh, cool!"',
    relatedCardIds: ['c1', 'c16'],     // Which concepts this fact relates to
},
```

### Using the Content Generation Prompt

If you want to use an AI (like ChatGPT or Claude) to help generate new content, there's a ready-made prompt template in `CONTENT_GENERATION_PROMPT.md`. Copy its contents, paste it into your AI chat, tell it what topic you want, and it will generate properly structured card data, lessons, distractors, and fun facts that you can paste directly into the data files.

---

## How to Add Card Images

Each concept card can display an illustration on the learn card screen. Images are optional — cards without images work fine, they just show text.

### Quick Version

1. Create or find an image (400x300px, `.webp` format)
2. Name it to match the card's `image` field (e.g., `ai-progress.webp`)
3. Drop it into `public/images/cards/`
4. Done! No code changes needed.

### Detailed Guide

#### Where images go

```
public/images/cards/
```

Just put your image files here. That's the only folder that matters.

#### What format to use

Use **`.webp`** format. It gives the best quality at small file sizes.

**To convert from PNG or JPG:**
- **Easiest:** Go to [squoosh.app](https://squoosh.app), upload your image, pick WebP, download
- **Mac:** Open in Preview > File > Export > choose WebP
- **Windows:** Use [IrfanView](https://www.irfanview.com/) (free) or [squoosh.app](https://squoosh.app)

#### Recommended image specs

| Setting | Value |
|---------|-------|
| Dimensions | 400 x 300 pixels (landscape) |
| Format | `.webp` |
| Max file size | Under 100KB per image |
| Style | Flat illustrations with topic-matching colors |

#### Which cards currently expect images

| Card | Filename |
|------|----------|
| c1 — Value Alignment | `value-alignment.webp` |
| c2 — RLHF | `rlhf.webp` |
| c3 — Mechanistic Interpretability | `mechanistic-interpretability.webp` |
| c4 — Superposition | `superposition.webp` |
| c5 — AI Governance | `ai-governance.webp` |
| c16 — AI Progress | `ai-progress.webp` |
| c17 — Large Language Models | `large-language-models.webp` |
| c18 — Foundation Models | `foundation-models.webp` |
| c19 — Compute and AI Progress | `compute.webp` |
| c20 — Scaling Laws | `scaling-laws.webp` |
| c21 — Benchmarks and Evaluation | `benchmarks.webp` |
| c22 — Emergent Abilities | `emergent-abilities.webp` |
| c23 — AI Agents | `ai-agents.webp` |
| c24 — Frontier Models | `frontier-models.webp` |
| c25 — Artificial General Intelligence | `agi.webp` |

Cards c6-c15 don't have images configured yet. To add one, open `src/data/concepts.js`, find the card, and add `image: 'your-filename.webp'` to it.

#### Adding an image to a card that doesn't have one

1. Open `src/data/concepts.js`
2. Find the card (search for its ID, like `'c6'`)
3. Add an `image` field:

```js
{
    id: 'c6',
    title: 'Reward Hacking',
    // ... other fields ...
    isFoundational: false,
    image: 'reward-hacking.webp',    // <-- add this line
},
```

4. Put `reward-hacking.webp` in `public/images/cards/`

#### How images work offline

Files in `public/` get bundled into the final app build. They're baked in — not loaded from the internet. On Android, Capacitor packages them inside the APK. So images work fully offline, no network needed.

#### Generating images with AI

If you need to create illustrations, you can use AI image generators:

- **ChatGPT (DALL-E)**, **Midjourney**, **Leonardo.ai**, or **Canva**

Prompt template:
> "Flat vector illustration representing [concept name]. Simple, modern, minimal style. Use a [color] color palette on a clean background. No text in the image."

Topic colors for visual consistency:
| Topic | Color |
|-------|-------|
| AI Progress | Blue `#2563EB` |
| Alignment | Purple `#7C3AED` |
| Interpretability | Teal `#0D9488` |
| Governance | Blue `#2563EB` |
| Ethics | Green `#059669` |
| Risks | Red `#DC2626` |

---

## Design System

### Colors

The app uses CSS custom properties for theming. Light mode is the default.

**Light mode:**

| Token | Color | Usage |
|-------|-------|-------|
| `--color-bg` | `#F0F4F8` | Page background (light steel blue) |
| `--color-surface` | `#FFFFFF` | Card surfaces |
| `--color-primary` | `#1E3A5F` | Headers, primary actions (deep navy) |
| `--color-accent` | `#00BFA5` | Highlights, progress, success (teal) |
| `--color-ink` | `#1C1917` | Body text |
| `--color-muted` | `#64748B` | Secondary text |
| `--color-danger` | `#DC2626` | Errors, wrong answers |
| `--color-warning` | `#F59E0B` | Streak at-risk, caution |

**Dark mode:**

| Token | Color |
|-------|-------|
| `--color-bg` | `#0F172A` |
| `--color-surface` | `#1E293B` |
| `--color-primary` | `#60A5FA` |
| `--color-accent` | `#2DD4BF` |
| `--color-ink` | `#F1F5F9` |
| `--color-muted` | `#94A3B8` |

### Fonts

- **Headings:** Space Grotesk (modern, techy)
- **Body text:** DM Sans (clean, readable)

### Content Categories

Each concept card belongs to a category that determines its visual color tag:

| Category | Color | What it covers |
|----------|-------|---------------|
| Technical | Teal `#0D9488` | ML concepts, architectures, capabilities |
| Alignment | Purple `#7C3AED` | Alignment techniques, RLHF, interpretability |
| Policy | Blue `#2563EB` | Regulation, governance, coordination |
| Ethics | Green `#059669` | Bias, fairness, rights, societal impact |
| Risks | Red `#DC2626` | Existential risk, misuse, catastrophic scenarios |

---

## Deploying the App

### GitHub Pages (automatic)

The app automatically deploys to GitHub Pages when you push to the `main` branch. The GitHub Action in `.github/workflows/deploy.yml` handles it:

1. Installs dependencies
2. Runs `npm run build`
3. Deploys the `dist/` folder to GitHub Pages

The app is served at: `https://elsadonnat.github.io/AI-Safety-/`

### Manual deployment

If you want to deploy manually:

```bash
npm run build          # Creates the dist/ folder
# Then upload the contents of dist/ to any static hosting
```

---

## Building for Android

The app can be packaged as a native Android app using Capacitor.

### Prerequisites

- [Android Studio](https://developer.android.com/studio) installed
- Android SDK configured

### Build steps

```bash
# 1. Build with Capacitor-compatible paths
CAPACITOR_BUILD=true npm run build

# 2. Sync web assets to the Android project
npx cap sync

# 3. Open in Android Studio
npx cap open android
```

Or use the shortcut:
```bash
npm run release        # Runs lint, build, and sync in one command
```

> **Important:** You must use `CAPACITOR_BUILD=true` when building for Android. Without it, the app will look for assets at `/AI-Safety-/` (the GitHub Pages path) instead of `./` (relative path), and the Android app won't load properly.

### Android configuration

The Android config lives in `capacitor.config.ts`:

| Setting | Value |
|---------|-------|
| App ID | `com.elsadonnat.aisafety` |
| App Name | `AI Safety` |
| Status bar | Light style, `#F0F4F8` background |
| Splash screen | `#F0F4F8` background, auto-hides after 1.5s |

---

## Roadmap

See `BACKLOG.md` for the full list. Key priorities:

- [ ] More content — grow beyond 25 cards to 50+ across all topics
- [ ] Card images — create illustrations for all concept cards
- [ ] Tag-based quiz type — "Which tag/concept is most associated with X?"
- [ ] Replace mascot with AI Safety-themed character
- [ ] Replace topic emoji icons with custom illustrations
- [ ] Accessibility audit (contrast ratios, screen reader support)
- [ ] Multiplayer challenge mode testing
- [ ] Scenario-based quiz questions (longer-form reasoning)

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 7 | Build tool and dev server |
| Tailwind CSS | 4 | Utility-first styling |
| ESLint | 9 | Code linting (flat config) |
| Capacitor | 8 | Native Android packaging |

**Notable design decisions:**
- **Pure JavaScript** — no TypeScript
- **No router** — navigation is managed through React state, not URL routes
- **No backend** — all data is static JS files, all state is in localStorage
- **No test framework** — not yet configured
- **ES modules** throughout (`"type": "module"` in package.json)

---

## Troubleshooting

### The app won't start (`npm run dev` fails)

- Make sure you've run `npm install` first
- Check you have Node.js 20+ installed: `node --version`

### Images aren't showing up

- Filename must match exactly what's in the card's `image` field (case-sensitive, including hyphens)
- File must be in `public/images/cards/`, not anywhere else
- File extension must be `.webp`
- Try restarting the dev server (Ctrl+C, then `npm run dev`)

### Android build shows a blank white screen

- You probably built without `CAPACITOR_BUILD=true`. Rebuild:
  ```bash
  CAPACITOR_BUILD=true npm run build
  npx cap sync
  ```

### Lint errors when committing

- Run `npm run lint` to see the errors
- Most common: unused imports or variables. Remove them.
- The ESLint config ignores unused variables that start with an uppercase letter or underscore (e.g., `_unused`, `Component`)

### Progress was lost

- Progress is stored in localStorage under the key `aisafety-state-v1`
- Clearing browser data or using incognito mode will reset progress
- Each browser/device has its own separate progress

### Build succeeds but the deployed site shows a 404

- Make sure `vite.config.js` has `base: '/AI-Safety-/'` (with the trailing slash)
- GitHub Pages needs the repository name in the base path

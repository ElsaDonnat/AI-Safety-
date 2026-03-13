# AI Safety Learning App

A mobile-first web app that teaches AI safety concepts through interactive lessons, spaced repetition practice, and challenge quizzes.

**Tech:** React 19, Vite 7, Tailwind CSS 4, Capacitor 8 (Android)

```bash
npm run dev       # Start dev server
npm run build     # Production build (GitHub Pages)
npm run lint      # Run linter
```

---

## How to Add Card Images

Each concept card can have an image that shows up when a user is learning that card. Here's how to add them step by step.

### Where images go

All card images live in one folder:

```
public/images/cards/
```

That's it. Just drop your image files in there.

### What format to use

Use **`.webp`** format. All existing card images use `.webp` because it gives smaller file sizes with good quality, which keeps the app fast.

If you only have `.png` or `.jpg` files, you can convert them:
- **Online (easiest):** Go to [cloudconvert.com](https://cloudconvert.com) or [squoosh.app](https://squoosh.app), upload your image, choose "WebP" as the output format, and download it.
- **On Mac:** Open the image in Preview, then go to File > Export and pick WebP.
- **On Windows:** Use a free tool like [IrfanView](https://www.irfanview.com/) or the online tools above.

### Recommended image specs

| Setting | Recommendation |
|---------|---------------|
| **Size** | 400 x 300 pixels (width x height) |
| **Format** | `.webp` |
| **Max file size** | Try to keep each image under 100KB |
| **Style** | Flat illustrations work best. Use colors that match the topic. |

Bigger images will work but will make the app download slower, especially on phones.

### Step-by-step: Adding an image to a card

**Step 1: Name your image file**

The filename must exactly match what's written in the card data. For example, the card for "AI Progress" (c16) expects a file named:

```
ai-progress.webp
```

Here are all the current cards that expect images:

| Card | Expected filename |
|------|-------------------|
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

Cards c6–c15 don't have images set up yet. You can add them later (see "Adding an image to a card that doesn't have one" below).

**Step 2: Put the file in the right folder**

Copy or move your image file into:

```
public/images/cards/
```

So the full path would look like:

```
public/images/cards/ai-progress.webp
```

**Step 3: That's it!**

No code changes needed. The app already knows to look for the image. Next time you run `npm run dev` or rebuild, the image will show up on the learn card screen.

### Adding an image to a card that doesn't have one yet

Some cards (like c6–c15) don't have an `image` field yet. To add one:

1. Open `src/data/concepts.js`
2. Find the card you want (search for its `id`, like `'c6'`)
3. Add an `image` line inside the card object. For example:

**Before:**
```js
{
    id: 'c6',
    title: 'Reward Hacking',
    summary: 'When AI finds unintended shortcuts...',
    // ... other fields ...
    isFoundational: false,
},
```

**After:**
```js
{
    id: 'c6',
    title: 'Reward Hacking',
    summary: 'When AI finds unintended shortcuts...',
    // ... other fields ...
    isFoundational: false,
    image: 'reward-hacking.webp',
},
```

4. Then put `reward-hacking.webp` in `public/images/cards/`

### How it works (in case you're curious)

When you put files in the `public/` folder, Vite (the build tool) copies them into the final app bundle. They're baked into the app, not loaded from the internet. This means:

- Images work **offline** (no internet needed)
- On Android (via Capacitor), the images are packaged inside the APK
- The path `/images/cards/ai-progress.webp` in the code looks like a URL, but it actually points to a local file on the device

The only tradeoff is that more/bigger images = larger app download. For ~25 card images at 400x300 pixels in WebP format, you're looking at roughly 1-3 MB total, which is totally fine.

### Generating images with AI

If you don't have images ready, you can use AI image generators to create them. Some options:

- **ChatGPT (DALL-E):** Ask for "a flat illustration of [concept], minimal style, blue color palette, 400x300 pixels"
- **Midjourney** or **Leonardo.ai:** Good for consistent illustration styles
- **Canva:** Has AI image generation built in and is beginner-friendly

A good prompt template:
> "Flat vector illustration representing [concept name]. Simple, modern, minimal style. Use a [color] color palette on a clean background. No text in the image."

Use the topic color for visual consistency:
- AI Progress cards: blue (`#2563EB`)
- Alignment cards: purple (`#7C3AED`)
- Interpretability cards: teal (`#0D9488`)
- Governance cards: blue (`#2563EB`)
- Ethics cards: green (`#059669`)
- Risks cards: red (`#DC2626`)

### Troubleshooting

**Image not showing up?**
- Check the filename matches exactly (including lowercase and hyphens)
- Make sure the file is in `public/images/cards/`, not somewhere else
- Make sure the file extension is `.webp` (not `.webp.png` or something weird)
- Restart the dev server (`Ctrl+C` then `npm run dev` again)

**Image looks stretched or blurry?**
- Try to use images that are at least 400 pixels wide
- The app crops images to fit (using `object-cover`), so very tall/narrow images may have parts cut off. Landscape orientation (wider than tall) works best.

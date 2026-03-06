# Manjunath H K — Portfolio

Personal portfolio for a Senior SDET. Built with React + Vite + Tailwind CSS v4 + Sanity CMS.

**Live:** https://manjunath-hk.netlify.app

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env
# Fill in VITE_SANITY_PROJECT_ID from sanity.io/manage

# 3. Start dev server
npm run dev
```

Open http://localhost:5173

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion |
| CMS | Sanity v3 |
| Hosting | Netlify |

## Content Management

- **Projects + Resume PDF** — managed via [Sanity Studio](https://portfolio-v2.sanity.studio)
- **Bio, Skills, Experience** — edit `src/data/content.js` and push

## Environment Variables

```
VITE_SANITY_PROJECT_ID=   # from sanity.io/manage
VITE_SANITY_DATASET=production
VITE_GITHUB_TOKEN=        # optional — 5000 req/hr vs 60/hr
```

## Commands

```bash
npm run dev      # development server (port 5173)
npm run build    # production build
npm run preview  # preview production build
```

# Portfolio — Developer Guide

Complete reference for setup, development, and content updates.

---

## Table of Contents
1. [First-Time Setup (fresh machine)](#1-first-time-setup-fresh-machine)
2. [Restoring from GitHub (lost local copy)](#2-restoring-from-github-lost-local-copy)
3. [Daily Development Workflow](#3-daily-development-workflow)
4. [Updating Content](#4-updating-content)
5. [Deploying Changes](#5-deploying-changes)
6. [Environment Variables Reference](#6-environment-variables-reference)

---

## 1. First-Time Setup (fresh machine)

### Prerequisites
- Node.js 20+ and npm
- GitHub CLI: `brew install gh` → `gh auth login`

### Steps

```bash
# Clone the repo
git clone https://github.com/manjunathk833/portfolio-v2.git
cd portfolio-v2-local   # or whatever you name the folder

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

Open `.env` and fill in:
```
VITE_SANITY_PROJECT_ID=9a0g112j
VITE_SANITY_DATASET=production
VITE_GITHUB_TOKEN=          # optional — leave blank or add a GitHub PAT
```

```bash
# Start the portfolio dev server
npm run dev
# → http://localhost:5173
```

### Set up Sanity Studio (needed to manage projects + resume)

```bash
# From inside the portfolio root, install the studio
cd portfolio-v2            # the Sanity studio lives in this subdirectory
npm install
npm run dev
# → http://localhost:3333
```

> **Note:** The Sanity Studio is in the `portfolio-v2/` subdirectory of the repo.
> It connects to the existing cloud project (ID: `9a0g112j`) automatically.

### Add localhost to Sanity CORS (one-time per machine)

Go to: https://www.sanity.io/manage/project/9a0g112j/api → **CORS Origins** → Add:
```
http://localhost:5173
```

---

## 2. Restoring from GitHub (lost local copy)

Everything is in GitHub — you can fully restore in under 5 minutes.

```bash
# 1. Clone
git clone https://github.com/manjunathk833/portfolio-v2.git portfolio
cd portfolio

# 2. Checkout dev (working branch)
git checkout dev

# 3. Install portfolio dependencies
npm install

# 4. Restore .env (values are NOT in git — keep these safe)
cp .env.example .env
# Edit .env and add:
#   VITE_SANITY_PROJECT_ID=9a0g112j
#   VITE_SANITY_DATASET=production

# 5. Install Sanity Studio dependencies
cd portfolio-v2
npm install
cd ..

# 6. Start dev server
npm run dev
```

> All your CMS content (projects, resume PDF) is safe in Sanity cloud — never lost.
> Only the `.env` file is not in git. Keep `VITE_SANITY_PROJECT_ID=9a0g112j` noted somewhere safe.

---

## 3. Daily Development Workflow

### Starting up

```bash
# Terminal 1 — Portfolio
npm run dev          # http://localhost:5173

# Terminal 2 — Sanity Studio (only needed when editing CMS content)
cd portfolio-v2 && npm run dev    # http://localhost:3333
```

### Making code changes

Always work on the `dev` branch:

```bash
git checkout dev

# Make your changes...

git add <files>
git commit -m "feat: describe what you changed"
git push origin dev
```

### Merging to production (triggers Netlify deploy)

```bash
# Option A — quick PR + merge
gh pr create --base main --head dev --title "your change description"
gh pr merge --squash

# Option B — direct push to main (use sparingly)
git checkout main
git merge dev
git push origin main
git checkout dev
```

Netlify auto-deploys within ~1 minute of a push to `main`.

---

## 4. Updating Content

### A. Update Projects (add / edit / remove / reorder)

No code changes needed — done entirely in Sanity Studio.

1. Open http://localhost:3333 (or https://portfolio-v2.sanity.studio if using cloud Studio)
2. Click **Project** in the left sidebar
3. **Add:** Click `+ New document` → fill all fields → **Publish**
4. **Edit:** Click an existing project → change fields → **Publish**
5. **Remove:** Open project → click `...` menu → **Delete**
6. **Reorder:** Change the `Display Order` number field (1 = first)

Changes appear on the live site immediately after publishing — no redeploy needed.

**Project fields:**
| Field | Notes |
|-------|-------|
| Title | Project name |
| Description | 2–3 sentences shown on the card |
| Tech Stack | Add as tags (e.g. Java, Selenium, Python) |
| GitHub URL | Full URL — enables live star/fork count |
| Live URL | Optional — shows "Live" button on card |
| Screenshot | Optional image shown at top of card |
| Featured | Toggle — no visual effect yet (reserved for Sprint 6) |
| Display Order | Number — lower = appears first |

---

### B. Update Resume PDF

No code changes needed — done in Sanity Studio.

1. Open Sanity Studio → **Resume** document
2. Click the file field → upload your new PDF
3. Update **Version Label** (e.g. `v2 June 2026`) and **Last Updated** date
4. Click **Publish**

The resume page reflects the new PDF immediately — no redeploy needed.

---

### C. Update Bio, Skills, or Experience

These are hardcoded in `src/data/content.js`. Edit the file and push.

```bash
# Edit the file
code src/data/content.js   # or open in any editor

# Commit and push
git add src/data/content.js
git commit -m "chore: update bio / skills / experience"
git push origin dev

# Then merge to main to deploy
gh pr create --base main --head dev --title "content: update bio"
gh pr merge --squash
```

**What lives in content.js:**
- `name`, `title`, `headline`, `bio`, `tagline`
- `roles` — typewriter phrases in Hero section
- `stats` — years experience, frameworks, test cases written
- `skillsByCategory` — grouped skill badges
- `experience[]` — work history timeline
- `education[]` — degree info
- `certifications[]`, `awards[]`
- `socials[]` — LinkedIn, GitHub, Email links

---

### D. Update Social Links

In `src/data/content.js`, find the `socials` array:

```js
export const socials = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile/', icon: 'linkedin' },
  { label: 'GitHub',   url: 'https://github.com/manjunathk833',          icon: 'github' },
  { label: 'Email',    url: 'mailto:manjunathhk833@gmail.com',            icon: 'mail' },
]
```

Edit URLs → commit → push to `dev` → merge to `main`.

Valid icon values: `linkedin`, `github`, `mail`, `twitter`, `code`

---

## 5. Deploying Changes

### Automatic (recommended)
Push to `main` → Netlify auto-deploys in ~1 minute.

### Check deploy status
- Netlify dashboard: https://app.netlify.com
- GitHub Actions: https://github.com/manjunathk833/portfolio-v2/actions

### If Netlify build fails
```bash
# Test the build locally first
npm run build
# If it passes locally but fails on Netlify, check env vars are set in Netlify dashboard
```

---

## 6. Environment Variables Reference

| Variable | Value | Where to get it |
|----------|-------|----------------|
| `VITE_SANITY_PROJECT_ID` | `9a0g112j` | sanity.io/manage → project settings |
| `VITE_SANITY_DATASET` | `production` | fixed — do not change |
| `VITE_GITHUB_TOKEN` | optional PAT | github.com → Settings → Developer settings → PAT |

**Set in two places:**
1. Local `.env` file (never committed to git)
2. Netlify dashboard → Site settings → Environment variables (for production builds)

---

## Quick Reference

```bash
# Start everything
npm run dev                          # portfolio: http://localhost:5173
cd portfolio-v2 && npm run dev       # studio:    http://localhost:3333

# Publish a change
git add . && git commit -m "feat: x" && git push origin dev
gh pr create --base main --head dev --title "x" && gh pr merge --squash

# Build check
npm run build

# Links
# Live site:    https://manjunathhk.netlify.app
# GitHub:       https://github.com/manjunathk833/portfolio-v2
# Sanity:       https://www.sanity.io/manage/project/9a0g112j
# Netlify:      https://app.netlify.com
```

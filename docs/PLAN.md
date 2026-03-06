# 🚀 Portfolio Web App — Claude Code Master Plan
> **Author:** Manjunath H K | Senior SDET
> **Purpose:** Use this file as the starting input for a new Claude Code session in the portfolio project folder
> **Last Updated:** 2026-03-06

---

## 📋 TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Tech Stack Decision](#2-tech-stack-decision)
3. [Architecture](#3-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Sanity CMS Schema](#5-sanity-cms-schema)
6. [CLAUDE.md Template](#6-claudemd-template)
7. [GitHub Integration Plan](#7-github-integration-plan)
8. [Feature Sprints](#8-feature-sprints)
9. [Design Reference](#9-design-reference)
10. [Master Prompt for Claude Code](#10-master-prompt-for-claude-code)
11. [Token Optimization Strategies](#11-token-optimization-strategies)
12. [Stop Conditions and Verification](#12-stop-conditions-and-verification)

---

## 1. PROJECT OVERVIEW

Build a **professional portfolio web app** for Manjunath H K — Senior SDET targeting MAANG.

### Core Goals
- Professionally showcase career, experience, and SDET skillset with impressive design
- Display curated GitHub projects with live stats — managed through Sanity CMS
- Host and serve a downloadable resume — managed through Sanity CMS
- Link to all professional social profiles
- Fully deployed on Netlify (free, auto-deploy from GitHub `main`)

### Visitors
Public internet — hiring managers, recruiters, engineers. No authentication. Read-only.

### Prerequisite: Resume JSON
**At the start of the implementation session, ask the user:** "Please share your resume as JSON (name, title, bio, skills by category, work experience, education, social links, GitHub username). I'll use this to populate `src/data/content.js`."

---

## 2. TECH STACK DECISION

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 19 + Vite 7 | Same stack as job tracker — all patterns transfer directly |
| **Styling** | Tailwind CSS v4 + shadcn/ui v3 | Same config — no tailwind.config.js, @tailwindcss/vite plugin |
| **Animations** | Framer Motion | Industry-standard for portfolio animations — scroll-reveal, page transitions, hover effects |
| **Routing** | React Router v7 | Same as job tracker |
| **CMS** | Sanity v3 | Free tier (10GB assets, 500K API calls/mo), manages projects + resume PDF. Hosted Studio at `*.sanity.studio`. |
| **GitHub Data** | GitHub REST API | Live repo stats (stars, forks, language) fetched per project card. No SDK needed — native fetch. |
| **SEO** | react-helmet-async | Per-page meta tags (title, description, og:image) |
| **Hosting** | Netlify | Free, auto-deploy from `main`, SPA redirect, env vars |

### Why Sanity over alternatives
- **vs PocketBase**: No local binary needed — Sanity is fully managed cloud. Portfolio data doesn't need PocketBase's relational DB.
- **vs Contentful**: Sanity free tier has 10GB asset storage (needed for resume PDF). Contentful limits to 5MB.
- **vs git-based CMS**: Sanity Studio gives a proper UI for non-technical updates (drag-drop PDF, edit project cards with preview).
- **vs hardcoded JSON**: Projects and resume change occasionally — CMS means no redeploy needed to update a project description or swap the resume PDF.

### Why same React + Vite stack
- All patterns from job tracker apply: `@/*` alias, Tailwind v4 config, shadcn/ui setup, component structure
- No new framework overhead (vs Astro/Next.js)
- Portfolio is read-only — SPA is fine, SEO handled by react-helmet-async

---

## 3. ARCHITECTURE

```
GitHub (public repo: manjunathk833/portfolio)
  ├── push to main ──► Netlify auto-deploy
  └── CI on push to dev

Netlify (free)
  └── https://manjunathk833.netlify.app
        └── React SPA
              ├── Sanity API calls ──► Sanity CDN (projects + resume PDF)
              └── GitHub API calls ──► api.github.com (live stats per project)

Sanity (free)
  └── https://portfolio.sanity.studio  (admin UI)
        ├── Projects collection (add/remove/reorder portfolio projects)
        └── Resume document (upload new PDF to replace)
```

### Data Flow
- **Static content** (bio, skills, experience, social links): hardcoded in `src/data/content.js` — edit and push to update
- **Dynamic content** (projects, resume): fetched from Sanity at runtime — update via Sanity Studio UI, no redeploy needed
- **Live stats** (stars, forks): fetched from GitHub API on page load — always current

### Environment Variables
```
VITE_SANITY_PROJECT_ID=   # from sanity.io/manage
VITE_SANITY_DATASET=production
VITE_GITHUB_TOKEN=        # optional — 5000 req/hr vs 60/hr unauthenticated
```

---

## 4. FOLDER STRUCTURE

```
portfolio/
├── CLAUDE.md                       # Claude reads automatically every session
├── docs/
│   ├── PLAN.md                     # This file (copy here)
│   └── ARCHITECTURE.md             # Tech decisions
├── README.md
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js                  # @/* alias + tailwindcss plugin
├── jsconfig.json                   # @/* alias for IDE
├── components.json                 # shadcn/ui config
├── netlify.toml                    # SPA redirect + build config
│
├── sanity/
│   └── schemas/
│       ├── index.js                # export all schemas
│       ├── project.js              # Project document type
│       └── resume.js               # Resume singleton
│
├── src/
│   ├── main.jsx                    # HelmetProvider + ThemeProvider + App
│   ├── App.jsx                     # React Router routes
│   ├── index.css                   # @import tailwindcss; shadcn theme vars
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky top nav, mobile hamburger, active links
│   │   │   └── Footer.jsx          # Social links, copyright
│   │   ├── home/
│   │   │   ├── Hero.jsx            # Name, title, animated subtitle, CTA buttons
│   │   │   ├── About.jsx           # Bio paragraph + quick stats
│   │   │   ├── Skills.jsx          # Grouped skill badges (Languages, Frameworks, Tools, Cloud)
│   │   │   └── Experience.jsx      # Timeline of work history (from content.js)
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx     # Title, description, tech tags, GitHub/live links, star/fork count
│   │   │   └── TechFilter.jsx      # Filter buttons by tech stack tag
│   │   ├── resume/
│   │   │   └── ResumeSection.jsx   # PDF embed (iframe) + Download button (Sanity CDN URL)
│   │   ├── contact/
│   │   │   └── SocialLinks.jsx     # Linked icon grid (LinkedIn, GitHub, Twitter, LeetCode, Email)
│   │   └── ui/                     # shadcn/ui components (auto-generated)
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Hero + About + Skills + Experience (scroll sections)
│   │   ├── Projects.jsx            # ProjectGrid + TechFilter (Sanity + GitHub API)
│   │   ├── Resume.jsx              # ResumeSection (PDF viewer + download)
│   │   └── Contact.jsx             # SocialLinks + contact intro
│   │
│   ├── services/
│   │   ├── sanity.js               # Sanity client + GROQ query functions
│   │   └── github.js               # GitHub REST API fetch helpers
│   │
│   ├── hooks/
│   │   ├── useSanityProjects.js    # Fetch + cache projects from Sanity
│   │   ├── useSanityResume.js      # Fetch resume PDF URL from Sanity
│   │   └── useGitHubStats.js       # Fetch stars/forks for a repo slug
│   │
│   ├── data/
│   │   └── content.js              # Hardcoded: bio, name, title, skills, experience, socials
│   │
│   └── lib/
│       └── utils.js                # cn() helper (shadcn)
│
└── .github/
    └── workflows/
        ├── ci.yml                  # Build check on push to dev + PRs
        └── release.yml             # Auto tag + release on push to main
```

---

## 5. SANITY CMS SCHEMA

### `sanity/schemas/project.js`
```javascript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3, validation: Rule => Rule.required() },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
    { name: 'liveUrl', title: 'Live URL (optional)', type: 'url' },
    {
      name: 'image',
      title: 'Screenshot (optional)',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 0 },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'githubUrl', media: 'image' },
  },
}
```

### `sanity/schemas/resume.js`
```javascript
export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'file',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: '.pdf' },
      validation: Rule => Rule.required(),
    },
    { name: 'version', title: 'Version Label', type: 'string', placeholder: 'e.g. v4 March 2026' },
    { name: 'lastUpdated', title: 'Last Updated', type: 'date' },
  ],
}
```

### `sanity/schemas/index.js`
```javascript
import project from './project'
import resume from './resume'
export const schemaTypes = [project, resume]
```

### GROQ Queries (in `src/services/sanity.js`)
```javascript
// Fetch all projects ordered by display order
export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  featured,
  "imageUrl": image.asset->url,
}`

// Fetch resume PDF URL
export const RESUME_QUERY = `*[_type == "resume"][0] {
  "fileUrl": file.asset->url,
  version,
  lastUpdated,
}`
```

---

## 6. CLAUDE.md TEMPLATE

Create this at the project root before Sprint 0:

```markdown
# CLAUDE.md

## ⚡ CURRENT STATE
**Last Updated:** [DATE]
**Active Sprint:** Sprint 0
**Last Completed:** None yet
**Next Action:** Run Sprint 0 bootstrap tasks

---

## ✅ SPRINT STATUS
- [ ] Sprint 0 — Bootstrap + Sanity Setup
- [ ] Sprint 1 — Layout + Hero + About + Skills + Experience
- [ ] Sprint 2 — Projects Page (Sanity + GitHub API)
- [ ] Sprint 3 — Resume Page (Sanity PDF)
- [ ] Sprint 4 — Contact Page + Footer
- [ ] Sprint 5 — Polish + Animations + SEO + Netlify Deploy

---

## 📋 DECISIONS LOG
- [DATE]: Chose Sanity over PocketBase — no local binary needed, managed cloud CMS with asset hosting for PDF
- [DATE]: Chose React + Vite over Astro — same stack as job tracker, all patterns transfer

---

## 🐛 KNOWN ISSUES
- None currently

---

## 🏗 PROJECT CONTEXT
Personal portfolio for Manjunath H K (Senior SDET).
Public site — no authentication.
CMS: Sanity (projects + resume PDF)
Hosting: Netlify (auto-deploy from main)
GitHub: https://github.com/manjunathk833/portfolio
See docs/PLAN.md for sprint tasks.
See docs/ARCHITECTURE.md for tech decisions.

---

## 🛠 TECH STACK
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui v3
- Animations: Framer Motion
- CMS: Sanity v3 (managed)
- GitHub API: native fetch (no SDK)
- SEO: react-helmet-async
- Hosting: Netlify

---

## 🔧 CODE STANDARDS
- Functional components with hooks only
- Tailwind only — no inline styles, no CSS modules
- shadcn/ui before building custom components
- Framer Motion for all animations (no CSS keyframes)
- All Sanity calls through src/services/sanity.js
- All GitHub API calls through src/services/github.js
- Hardcoded content (bio, skills, experience, socials) in src/data/content.js only
- Never hardcode env vars — use import.meta.env.VITE_*

---

## ▶ COMMANDS
- Dev: npm run dev (port 5173)
- Build: npm run build
- Preview: npm run preview
- Push: git add . && git commit -m "feat: x" && git push origin dev

---

## 🌍 ENV VARS
- VITE_SANITY_PROJECT_ID — from sanity.io/manage
- VITE_SANITY_DATASET — "production"
- VITE_GITHUB_TOKEN — optional, for higher GitHub API rate limit (5000/hr vs 60/hr)

---

## ❌ DO NOT
- No class components
- No separate CSS files
- No hardcoded credentials or API keys
- No PocketBase (this project uses Sanity)
- Do not start next sprint until user types 'ok'
```

---

## 7. GITHUB INTEGRATION PLAN

### Pre-requisite
```bash
gh auth status   # must be authenticated
```

### GitHub Setup Prompt (run at end of Sprint 0)
```
GitHub CLI is authenticated. Set up full GitHub integration for this portfolio project:

1. Create public GitHub repo 'portfolio':
   gh repo create portfolio --public --source=. --remote=origin --push

2. Create .gitignore (Node, Vite, macOS standard — exclude node_modules, dist, .env)

3. Branch structure:
   - Push initial state to main
   - Create dev branch: git checkout -b dev && git push -u origin dev
   - dev is the working branch; main triggers Netlify deploy

4. Create .github/workflows/ci.yml:
   - Trigger: push to dev + PRs to main
   - Steps: checkout → Node 20 → npm ci → npm run build
   - Build env: VITE_SANITY_PROJECT_ID (use dummy value for CI), VITE_SANITY_DATASET=production

5. Create .github/workflows/release.yml:
   - Trigger: push to main
   - Auto tag vYYYY.MM.DD + gh release with auto-generated notes

My GitHub username is manjunathk833.
```

### Per-Sprint Git Workflow
```bash
git checkout dev
# Claude builds and commits sprint work
git push origin dev

# Verified → merge to main
gh pr create --base main --head dev --title "Sprint N: [name]" --body "Verified ✓"
gh pr merge --squash
# main gets one clean commit per sprint + auto-release tag + Netlify deploy
```

### Commit Convention
```
feat: add hero section with animated typewriter
feat: sprint-2 complete — projects page + GitHub API
fix: resume iframe not rendering on Safari
chore: update content.js with new experience entry
docs: update CLAUDE.md sprint-3 progress
```

---

## 8. FEATURE SPRINTS

### Sprint 0 — Bootstrap + Sanity Setup (45 min)
**Goal:** Running skeleton + Sanity wired up + GitHub repo

**Tasks:**
- Create Vite + React project: `npm create vite@latest portfolio -- --template react`
- Install dependencies (see Section 12 for full list)
- Configure Tailwind v4: `@tailwindcss/vite` plugin, `@import "tailwindcss"` in index.css (no tailwind.config.js)
- Configure path alias `@/*` → `src/*` in both `vite.config.js` and `jsconfig.json`
- Initialize shadcn/ui: `npx shadcn@latest init` (neutral theme, CSS variables, src/components/ui)
- Create Sanity project:
  ```bash
  npm create sanity@latest -- --project portfolio --dataset production --template clean
  # Copy the project ID shown in the output to .env as VITE_SANITY_PROJECT_ID
  ```
- Create `sanity/schemas/project.js`, `resume.js`, `index.js` exactly as shown in Section 5
- Deploy Sanity Studio: `npx sanity deploy` → subdomain: `portfolio` → live at `https://portfolio.sanity.studio`
- Create `src/services/sanity.js` — Sanity client singleton + GROQ query functions (using schemas from Section 5)
- **Ask user for resume JSON** → populate `src/data/content.js` with: name, title, bio, skillsByCategory, experience[], education[], socials{}, githubUsername
- Build layout shell: `Navbar.jsx` + `Footer.jsx` + 4 empty page stubs (Home, Projects, Resume, Contact) routed via React Router
- Create `netlify.toml`:
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
- Create CLAUDE.md from Section 6 template
- Create `docs/PLAN.md` (copy this file), `docs/ARCHITECTURE.md`
- Create `.env.example`:
  ```
  VITE_SANITY_PROJECT_ID=
  VITE_SANITY_DATASET=production
  VITE_GITHUB_TOKEN=
  ```
- Run GitHub setup prompt from Section 7

**✅ Verify:** `npm run dev` loads :5173 + all 4 nav routes work without errors + Sanity Studio live at `https://portfolio.sanity.studio` + create 1 test project in Studio → verify it's queryable + GitHub repo + CI green

---

### Sprint 1 — Layout + Hero + About + Skills + Experience (60 min)
**Goal:** Complete Home page with all scroll sections

**Design (dark SDET/tech theme — see Section 9 for full values):**
- Background: `#050510`, Cards: `#0a0a1a` with `border-white/8`
- Accent: cyan (`#06b6d4`), Secondary: violet (`#7c3aed`)
- Font: Inter body, `font-mono` for code/skill tags

**Navbar (`Navbar.jsx`):**
- Sticky top, blurred background on scroll (`backdrop-blur-md bg-background/80`)
- Logo/name left, nav links right: Home, Projects, Resume, Contact
- Active link highlighted with cyan underline (React Router `NavLink`)
- Dark mode toggle (Sun/Moon, `next-themes` — same as job tracker)
- Mobile: hamburger → shadcn Sheet sliding from right (reuse MobileSidebar pattern from job tracker)
- Framer Motion: hide on scroll-down, show on scroll-up

**Hero section (`Hero.jsx`):**
- Full viewport height (`min-h-screen`)
- Name: large bold (`text-5xl md:text-7xl font-bold`)
- Animated subtitle: Framer Motion typewriter cycling through: `"Senior SDET"`, `"Test Automation Engineer"`, `"Quality Champion"`, `"MAANG Aspirant"`
- Short tagline (from `content.js`)
- Two CTA buttons: `View Projects` (→ /projects), `Download Resume` (→ opens Sanity PDF URL in new tab)
- Subtle animated background: CSS radial gradient pulse or floating cyan dots (CSS only)

**About section (`About.jsx`):**
- Two-column on desktop: bio text left, stat chips right
- Bio from `content.content.bio`
- Stat chips: "X+ Years Experience", "N Automation Frameworks", "N+ Test Cases Written" (from content.js)
- Framer Motion: fade-in-up on scroll into view

**Skills section (`Skills.jsx`):**
- Groups from `content.skillsByCategory` (Languages, Frameworks & Libraries, Tools, Cloud & CI/CD)
- Each skill: `font-mono` rounded badge with subtle border
- Group label in muted uppercase
- Framer Motion: stagger badge reveal on scroll

**Experience section (`Experience.jsx`):**
- Vertical timeline: left border line + dot + year marker
- Each entry from `content.experience[]`: company, role, duration, bullet points
- Framer Motion: slide-in from left per entry on scroll

**Footer (`Footer.jsx`):**
- Social icon row (from `content.socials`)
- Copyright, "Built with React + Sanity" credit

**✅ Verify:** All sections render with real data from content.js + animations trigger on scroll-into-view + responsive at 375px + dark/light mode toggle works

---

### Sprint 2 — Projects Page (60 min)
**Goal:** Curated GitHub projects from Sanity with live stats

**Before coding — add test data in Sanity Studio:**
- Create 3-5 project documents in `portfolio.sanity.studio`
- Fill: title, description, tech stack (as tags), GitHub URL, order
- At least 2 should have a public GitHub repo for stats testing

**`useSanityProjects` hook:**
```javascript
export function useSanityProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [])
  return { projects, loading }
}
```

**`useGitHubStats` hook:**
```javascript
// githubUrl: "https://github.com/owner/repo"
export function useGitHubStats(githubUrl) {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    if (!githubUrl) return
    const parts = githubUrl.replace('https://github.com/', '').split('/')
    const [owner, repo] = parts
    fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: import.meta.env.VITE_GITHUB_TOKEN
        ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
        : {},
    })
      .then(r => r.json())
      .then(d => setStats({ stars: d.stargazers_count, forks: d.forks_count, language: d.language }))
  }, [githubUrl])
  return stats
}
```

**`ProjectCard.jsx`:**
- Title, description (clamped to 3 lines)
- Tech stack tags (same mono badge style as Skills)
- GitHub stats row: ⭐ N stars · 🍴 N forks · language badge
- Buttons: GitHub icon → githubUrl, external link → liveUrl (if set)
- Optional: project screenshot from Sanity CDN (with fallback placeholder)
- Framer Motion: `whileHover` scale + cyan glow border

**`TechFilter.jsx`:**
- Derive unique tags from all projects
- Pill buttons: All | Python | Java | Selenium | etc.
- Active filter highlights in cyan
- `AnimatePresence` + layout animation for card filtering

**`Projects.jsx` page:**
- Title section + TechFilter at top
- Masonry or 2-col grid of ProjectCards
- Loading skeleton (shadcn Skeleton) while Sanity fetches
- Empty state if no projects

**✅ Verify:** Projects load from Sanity + stars/forks appear on cards with GitHub repos + tech filter shows/hides cards + add/remove project in Studio → page reflects on refresh (no redeploy) + loading skeleton shows during fetch

---

### Sprint 3 — Resume Page (30 min)
**Goal:** View and download resume PDF from Sanity CDN

**Before coding:** Upload a PDF to Sanity Studio → Resume document → file field → Publish

**`useSanityResume` hook:**
```javascript
export function useSanityResume() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    client.fetch(RESUME_QUERY)
      .then(setResume)
      .finally(() => setLoading(false))
  }, [])
  return { resume, loading }
}
```

**`ResumeSection.jsx`:**
- Header: "Resume" + version label + last updated date (from Sanity)
- Desktop: `<iframe src={fileUrl} className="w-full h-[800px] rounded-xl border" />`
- Mobile: hide iframe, show "View PDF" button + Download button
- Download button: `<a href={fileUrl} download="Manjunath_HK_Resume.pdf" target="_blank">Download PDF</a>`
- Fallback: if iframe fails to render, show "Download to view" message

**How to update resume (document this in GUIDE.md):**
```
1. Open portfolio.sanity.studio → Resume document
2. Click the file field → Upload new PDF
3. Update version label and last updated date → Publish
→ Page reflects immediately — no code change, no redeploy
```

**✅ Verify:** PDF renders in iframe on desktop Chrome/Safari + download button downloads the file + swap PDF in Sanity Studio → page shows new version on refresh

---

### Sprint 4 — Contact Page + Social Links (30 min)
**Goal:** Professional contact section with all social profiles

**`content.js` — socials structure:**
```javascript
export const socials = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/...', icon: 'linkedin' },
  { label: 'GitHub', url: 'https://github.com/manjunathk833', icon: 'github' },
  { label: 'Twitter / X', url: 'https://twitter.com/...', icon: 'twitter' },
  { label: 'LeetCode', url: 'https://leetcode.com/...', icon: 'code' },
  { label: 'Email', url: 'mailto:manjunathhk833@gmail.com', icon: 'mail' },
]
```

**Contact page layout:**
- Header: "Let's Connect" + short intro
- Large social link cards: icon + label + subtle URL preview
- Hover: brand color glow (LinkedIn blue, GitHub white, etc.)
- Framer Motion: stagger card reveal

**Optional: Netlify Forms (zero-backend contact form)**
- Add `<form name="contact" method="POST" data-netlify="true">` — Netlify intercepts at CDN level
- Fields: Name, Email, Message
- Submissions viewable at Netlify dashboard → Forms
- No backend, no serverless function needed

**✅ Verify:** All social links open correct URLs in new tab + contact form submits (check Netlify dashboard after deploy) + footer social icons match

---

### Sprint 5 — Polish + Animations + SEO + Deploy (45 min)
**Goal:** Production-ready, live on Netlify

**Framer Motion complete pass:**
- Page route transitions: wrap `<Outlet />` in `AnimatePresence` + `motion.div` fade (opacity 0→1, 0.2s)
- All section components: `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 30 }}` + `viewport={{ once: true }}`
- Hero typewriter: `useEffect` with `setInterval` cycling `roleIndex` state through roles array from content.js
- Navbar scroll-hide: `useScroll` from Framer Motion → `useMotionValueEvent` to toggle visibility
- ProjectCard hover: `whileHover={{ scale: 1.02 }}`

**SEO (react-helmet-async):**
- Wrap App in `<HelmetProvider>` in main.jsx
- Each page adds `<Helmet>` with title, description, og:title, og:description, og:image
- Create `public/og-image.png` — 1200×630px (generate a simple dark card with name + title)
- Canonical URL per page

**Final mobile polish:**
- Test at 375px: navbar hamburger, hero text sizing, skills wrap, projects single column, resume download-only
- Fix any overflow issues

**Netlify deploy:**
1. app.netlify.com → Add new site → Import from Git → `manjunathk833/portfolio`
2. Branch: `main`, Build: `npm run build`, Publish: `dist`
3. Env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET=production`, optionally `VITE_GITHUB_TOKEN`
4. Deploy → verify build passes
5. Add Netlify URL to CORS if needed (Sanity is open by default)
6. Test all 4 pages from Netlify URL + mobile view

**Merge all sprint PRs to main + final GitHub Release**

**✅ Verify:**
- All 4 pages load from Netlify URL
- Projects fetch from Sanity + resume PDF downloads
- All social links open correctly
- Page transitions animate smoothly
- 375px mobile: no overflow, all features accessible
- Lighthouse: Performance >85, Accessibility >90
- `gh run list --workflow=ci.yml` → all green

---

## 9. DESIGN REFERENCE

| Element | Value |
|---------|-------|
| Background | `#050510` |
| Card surface | `#0a0a1a` |
| Card border | `rgba(255,255,255,0.08)` → `border-white/8` |
| Primary accent | `#06b6d4` (cyan-500) |
| Secondary accent | `#7c3aed` (violet-600) |
| Text primary | `#e2e8f0` |
| Text muted | `#94a3b8` |
| Font — body | Inter (system fallback stack) |
| Font — code/skills | `font-mono` (JetBrains Mono or system mono) |
| Border radius | `rounded-xl` for cards |
| Navbar blur | `backdrop-blur-md bg-background/80` |
| Inspiration | Linear.app, Raycast.com, brittanychiang.com |

**Standard Framer Motion patterns:**
```javascript
// Section scroll-reveal (apply to all major sections)
const sectionVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
  viewport: { once: true },
}

// Card hover
const cardHover = {
  whileHover: { scale: 1.02, boxShadow: '0 0 24px rgba(6,182,212,0.15)' },
  transition: { duration: 0.2 },
}

// Page transition (wrap each page's root div)
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

// Stagger children (wrap list containers)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
}
const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}
```

---

## 10. MASTER PROMPT FOR CLAUDE CODE

Copy this as your **very first message** when opening Claude Code in the new `portfolio/` project folder:

```
I want to build a professional portfolio web app for my career as a Senior SDET.

Read this plan file completely before doing anything: docs/PLAN.md

My setup:
- MacBook Air M4 (Apple Silicon / ARM64)
- Node.js and npm installed, Claude Code running
- GitHub CLI installed and authenticated (gh auth login already done)
- Familiar with React + Vite + Tailwind + shadcn/ui (built a job tracker with this exact stack)

IMPORTANT: Before Sprint 0, ask me for my resume JSON (name, title, bio, skills by category, work experience, education, social links, GitHub username). You will use this to populate src/data/content.js so the app has real content from day one.

WORKFLOW RULES:
1. Read CLAUDE.md at session start — it is the live source of truth
2. One Sprint per session, in order: 0 → 1 → 2 → 3 → 4 → 5
3. After each Sprint:
   a. Update CLAUDE.md (mark done, update state, log decisions)
   b. Commit to dev: "feat: sprint-N complete — [description]" and push
   c. STOP — list exact verification steps — wait for me to type 'ok'
4. Log any unplanned decisions in CLAUDE.md DECISIONS LOG

BEGIN Sprint 0 now. First: ask for my resume JSON.
```

### Session Resume Template
```
Read CLAUDE.md. Sprint [N-1] is done and verified.
Continue with Sprint [N] — task list is in docs/PLAN.md.
```

---

## 11. TOKEN OPTIMIZATION STRATEGIES

Same strategies as job tracker — they work well:

1. **CLAUDE.md as memory** — Claude reads it automatically. Never re-explain stack or CMS setup.
   Pattern: `"Read CLAUDE.md. Continue Sprint N."`

2. **content.js as data source** — Reference by name, never paste content into prompts.
   Pattern: `"Populate Skills section using skillsByCategory from src/data/content.js"`

3. **Batch requests** — one message per component group.
   Pattern: `"Build Hero.jsx, About.jsx, Skills.jsx using content.js and Framer Motion. Use design values from CLAUDE.md."`

4. **/clear between sprints** — clears token context without losing CLAUDE.md state.

5. **Schema reference** — "use the GROQ query from src/services/sanity.js" instead of re-pasting queries.

6. **End-of-session one-liner:**
   `"Update CLAUDE.md with sprint progress. Commit to dev. Push."`

---

## 12. STOP CONDITIONS AND VERIFICATION

**Sprint 0 ✅** `npm run dev` loads :5173 + all 4 routes work + Sanity Studio live at `portfolio.sanity.studio` + 1 test project queryable + GitHub repo + CI green + CLAUDE.md committed

**Sprint 1 ✅** All Home sections render with real data from content.js + scroll animations work + responsive at 375px + dark/light toggle works

**Sprint 2 ✅** Projects load from Sanity + GitHub stars/forks appear + tech filter works + add/remove project in Studio → reflects on refresh

**Sprint 3 ✅** PDF renders in iframe on desktop + download works + swap PDF in Studio → reflects immediately

**Sprint 4 ✅** All social links correct + contact form submits + footer on all pages

**Sprint 5 ✅** Live on Netlify + all pages load from Netlify URL + animations smooth + 375px mobile OK + Lighthouse Performance >85

### 🏁 FINAL STOP
All 5 sprints verified. App live on Netlify. CLAUDE.md complete. README has 3-step setup.

---

## QUICK REFERENCE

```bash
npm run dev                              # Start dev server (:5173)
npx sanity deploy                        # Re-deploy Sanity Studio
"Read CLAUDE.md. Continue Sprint [N]."  # New session
"Update CLAUDE.md, commit, push."       # End of session
gh pr create --base main --head dev     # Sprint done → PR
gh pr merge --squash                    # Merge to main → Netlify auto-deploys
```

## DEPENDENCIES (install in Sprint 0)

```bash
# Step 1: scaffold project
npm create vite@latest portfolio -- --template react
cd portfolio

# Step 2: core UI
npx shadcn@latest init
npm install -D @tailwindcss/vite tailwindcss tw-animate-css

# Step 3: portfolio-specific
npm install framer-motion react-router-dom react-helmet-async next-themes

# Step 4: Sanity CMS
npm install @sanity/client
npm install -D sanity

# Step 5: scaffold Sanity studio (run once, follow prompts)
npm create sanity@latest
```

---

*Start every session:* `"Read CLAUDE.md. Continue Sprint [N]."`
*End every session:* `"Update CLAUDE.md. Commit to dev. Push."`

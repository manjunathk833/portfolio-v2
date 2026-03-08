# CLAUDE.md

## CURRENT STATE
**Last Updated:** 2026-03-08
**Active Sprint:** ALL COMPLETE (Sprints 0–8)
**Last Completed:** Sprint 7 — YouTube Video Section + favicon fix
**Next Action:** Live on Netlify — ongoing content updates via Sanity Studio

---

## SPRINT STATUS
- [x] Sprint 0 — Bootstrap + Sanity Setup
- [x] Sprint 1 — Layout + Hero + About + Skills + Experience
- [x] Sprint 2 — Projects Page (Sanity + GitHub API)
- [x] Sprint 3 — Resume Page (Sanity PDF)
- [x] Sprint 4 — Contact Page + Footer
- [x] Sprint 5 — Polish + Animations + SEO + Netlify Deploy
- [x] Sprint 6 — Blog Section (Dev.to aggregation, no Medium)
- [x] Sprint 7 — YouTube Video Section (Sanity-driven, placeholder until videos recorded)
- [x] Sprint 8 — QA Automation Showcase (/automation page)

---

## DECISIONS LOG
- 2026-03-06: Chose Sanity over PocketBase — no local binary needed, managed cloud CMS with asset hosting for PDF
- 2026-03-06: Chose React + Vite over Astro — same stack as job tracker, all patterns transfer
- 2026-03-06: GitHub repo named portfolio-v2 (portfolio was already taken on the account)
- 2026-03-06: Scaffolded Vite in temp dir then moved files — existing CLAUDE.md/docs prevented in-place scaffold
- 2026-03-06: Added class-variance-authority manually — shadcn add does not install all transitive deps
- 2026-03-06: Sanity CORS — must add http://localhost:5173 (and Netlify URL) to sanity.io/manage → project → API → CORS Origins
- 2026-03-06: Sanity fields can return null (not undefined) — always use `?? []` not `= []` for array fields
- 2026-03-08: Sprint 8 — react-syntax-highlighter: use PrismLight (not Prism) + register only needed languages to keep vendor-syntax chunk under 60KB (vs 640KB with full Prism)
- 2026-03-08: Sprint 8 — YAML code in JS template literals: escape `${{` as `\${{` to prevent template literal interpolation parse errors
- 2026-03-08: Sprint 8 — learningGoal Sanity schema added; LearningCards are Sanity-driven (update via Studio, no redeploy)
- 2026-03-08: Sprint 6 — Medium RSS dropped (rss2json internal errors, unreliable); blog uses Dev.to public API only (no auth, no CORS issue)
- 2026-03-08: Sprint 6 — rss2json `count` param requires paid API key; omit it for free tier
- 2026-03-08: Sprint 7 — react-lite-youtube-embed for YouTube embeds (<5KB, lazy-loads); video ID extracted client-side from any YouTube URL format
- 2026-03-08: Favicon replaced with custom MHK SVG (cyan #0891b2 rounded square); page title fixed from "portfolio-tmp"

---

## KNOWN ISSUES
- None currently

---

## PROJECT CONTEXT
Personal portfolio for Manjunath H K (Senior SDET).
Public site — no authentication.
CMS: Sanity (projects, resume PDF, learningGoal, video)
Hosting: Netlify (auto-deploy from main)
Live: https://manjunathhk.netlify.app
GitHub: https://github.com/manjunathk833/portfolio-v2
See docs/GUIDE.md for setup, restore, and content update instructions.

---

## TECH STACK
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui
- Animations: Framer Motion
- CMS: Sanity v3 (managed) — schemas: project, resume, learningGoal, video
- GitHub API: native fetch (no SDK)
- SEO: react-helmet-async
- Syntax highlighting: react-syntax-highlighter (PrismLight, Java/Python/YAML only)
- YouTube embeds: react-lite-youtube-embed
- Blog: Dev.to public API (VITE_DEVTO_USERNAME)
- Hosting: Netlify

---

## PAGES & ROUTES
- `/` — Home (Hero, About, Skills, Experience)
- `/projects` — Projects (Sanity + live GitHub stats)
- `/automation` — QA Showcase (code snippets + learning tracker)
- `/blog` — Blog (Dev.to aggregation)
- `/videos` — Videos (Sanity YouTube embeds)
- `/resume` — Resume (Sanity PDF)
- `/contact` — Contact (socials)

---

## CODE STANDARDS
- Functional components with hooks only
- Tailwind only — no inline styles, no CSS modules
- shadcn/ui before building custom components
- Framer Motion for all animations (no CSS keyframes)
- All Sanity calls through src/services/sanity.js
- All GitHub API calls through src/services/github.js
- Blog API calls through src/services/blog.js
- Hardcoded content (bio, skills, experience, socials, testShowcase) in src/data/content.js only
- Never hardcode env vars — use import.meta.env.VITE_*

---

## COMMANDS
- Dev: npm run dev (port 5173)
- Build: npm run build
- Preview: npm run preview
- Push to dev: git add . && git commit -m "feat: x" && git push origin dev
- Deploy: git checkout main && git merge dev && git push origin main && git checkout dev

---

## ENV VARS
- VITE_SANITY_PROJECT_ID — from sanity.io/manage (9a0g112j)
- VITE_SANITY_DATASET — "production"
- VITE_GITHUB_TOKEN — optional, for higher GitHub API rate limit (5000/hr vs 60/hr)
- VITE_DEVTO_USERNAME — Dev.to username (activates blog page)

---

## CONTENT UPDATES (no code changes needed)
- Projects / Resume PDF: Sanity Studio → publish
- Learning Goals: Sanity Studio → "Learning Goal" document → publish
- Videos: Sanity Studio → "Video" document → paste YouTube URL → publish
- Blog: auto-fetched from Dev.to on page load

---

## DO NOT
- No class components
- No separate CSS files
- No hardcoded credentials or API keys
- No PocketBase (this project uses Sanity)
- Do not start next sprint until user types 'ok'

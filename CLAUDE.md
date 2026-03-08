# CLAUDE.md

## CURRENT STATE
**Last Updated:** 2026-03-08
**Active Sprint:** Sprint 8 COMPLETE — QA Automation Showcase
**Last Completed:** Sprint 8 — QA Automation Showcase (/automation page)
**Next Action:** Sprint 6 — Blog Section (after user types 'ok')

---

## SPRINT STATUS
- [x] Sprint 0 — Bootstrap + Sanity Setup
- [x] Sprint 1 — Layout + Hero + About + Skills + Experience
- [x] Sprint 2 — Projects Page (Sanity + GitHub API)
- [x] Sprint 3 — Resume Page (Sanity PDF)
- [x] Sprint 4 — Contact Page + Footer
- [x] Sprint 5 — Polish + Animations + SEO + Netlify Deploy
- [x] Sprint 8 — QA Automation Showcase (/automation page)
- [ ] Sprint 6 — Blog Section (Dev.to + Medium aggregation)
- [ ] Sprint 7 — YouTube Video Section (Sanity-driven)

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

---

## KNOWN ISSUES
- None currently

---

## PROJECT CONTEXT
Personal portfolio for Manjunath H K (Senior SDET).
Public site — no authentication.
CMS: Sanity (projects + resume PDF)
Hosting: Netlify (auto-deploy from main)
Live: https://manjunathhk.netlify.app
GitHub: https://github.com/manjunathk833/portfolio-v2
See docs/PLAN.md for sprint tasks.
See docs/ARCHITECTURE.md for tech decisions.

---

## TECH STACK
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui
- Animations: Framer Motion
- CMS: Sanity v3 (managed) — schemas: project, resume, learningGoal
- GitHub API: native fetch (no SDK)
- SEO: react-helmet-async
- Syntax highlighting: react-syntax-highlighter (PrismLight, Java/Python/YAML only)
- Hosting: Netlify

---

## CODE STANDARDS
- Functional components with hooks only
- Tailwind only — no inline styles, no CSS modules
- shadcn/ui before building custom components
- Framer Motion for all animations (no CSS keyframes)
- All Sanity calls through src/services/sanity.js
- All GitHub API calls through src/services/github.js
- Hardcoded content (bio, skills, experience, socials) in src/data/content.js only
- Never hardcode env vars — use import.meta.env.VITE_*

---

## COMMANDS
- Dev: npm run dev (port 5173)
- Build: npm run build
- Preview: npm run preview
- Push: git add . && git commit -m "feat: x" && git push origin dev

---

## ENV VARS
- VITE_SANITY_PROJECT_ID — from sanity.io/manage
- VITE_SANITY_DATASET — "production"
- VITE_GITHUB_TOKEN — optional, for higher GitHub API rate limit (5000/hr vs 60/hr)

---

## DO NOT
- No class components
- No separate CSS files
- No hardcoded credentials or API keys
- No PocketBase (this project uses Sanity)
- Do not start next sprint until user types 'ok'

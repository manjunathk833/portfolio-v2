# CLAUDE.md

## CURRENT STATE
**Last Updated:** 2026-03-06
**Active Sprint:** Sprint 5
**Last Completed:** Sprint 4 — Contact Page + Footer
**Next Action:** Begin Sprint 5 — Polish + Animations + SEO + Netlify Deploy

---

## SPRINT STATUS
- [x] Sprint 0 — Bootstrap + Sanity Setup
- [x] Sprint 1 — Layout + Hero + About + Skills + Experience
- [x] Sprint 2 — Projects Page (Sanity + GitHub API)
- [x] Sprint 3 — Resume Page (Sanity PDF)
- [x] Sprint 4 — Contact Page + Footer
- [ ] Sprint 5 — Polish + Animations + SEO + Netlify Deploy

---

## DECISIONS LOG
- 2026-03-06: Chose Sanity over PocketBase — no local binary needed, managed cloud CMS with asset hosting for PDF
- 2026-03-06: Chose React + Vite over Astro — same stack as job tracker, all patterns transfer
- 2026-03-06: GitHub repo named portfolio-v2 (portfolio was already taken on the account)
- 2026-03-06: Scaffolded Vite in temp dir then moved files — existing CLAUDE.md/docs prevented in-place scaffold
- 2026-03-06: Added class-variance-authority manually — shadcn add does not install all transitive deps
- 2026-03-06: Sanity CORS — must add http://localhost:5173 (and Netlify URL) to sanity.io/manage → project → API → CORS Origins
- 2026-03-06: Sanity fields can return null (not undefined) — always use `?? []` not `= []` for array fields

---

## KNOWN ISSUES
- Sanity Studio not yet initialized — user must run `npm create sanity@latest` and copy project ID to .env

---

## PROJECT CONTEXT
Personal portfolio for Manjunath H K (Senior SDET).
Public site — no authentication.
CMS: Sanity (projects + resume PDF)
Hosting: Netlify (auto-deploy from main)
GitHub: https://github.com/manjunathk833/portfolio-v2
See docs/PLAN.md for sprint tasks.
See docs/ARCHITECTURE.md for tech decisions.

---

## TECH STACK
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui
- Animations: Framer Motion
- CMS: Sanity v3 (managed)
- GitHub API: native fetch (no SDK)
- SEO: react-helmet-async
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

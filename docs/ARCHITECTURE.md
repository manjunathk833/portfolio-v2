# Architecture Decisions

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | React 19 + Vite 7 | Same stack as job tracker — patterns transfer directly |
| Styling | Tailwind CSS v4 + shadcn/ui | No tailwind.config.js needed; @tailwindcss/vite plugin |
| Animations | Framer Motion | Industry standard for portfolio animations |
| Routing | React Router v7 | Familiar, lightweight for SPA |
| CMS | Sanity v3 | Free managed cloud; 10GB assets for resume PDF; Studio UI |
| GitHub Data | Native fetch | No SDK needed for simple REST calls |
| SEO | react-helmet-async | Per-page meta tags without SSR |
| Hosting | Netlify | Free tier, auto-deploy from main, SPA redirect support |

## Data Flow

- **Static content** (bio, skills, experience, socials): `src/data/content.js` — edit and push to update
- **Dynamic content** (projects, resume PDF): Sanity CDN — update via Studio, no redeploy needed
- **Live repo stats** (stars, forks): GitHub REST API on page load

## Key Decisions

- **Sanity over PocketBase**: No local binary; fully managed cloud with PDF asset storage
- **React over Astro/Next.js**: SPA is sufficient for read-only portfolio; no SSR overhead
- **Tailwind v4**: No config file required; @tailwindcss/vite handles everything
- **Dark-only theme**: Portfolio targets engineering audience; dark SDET/tech aesthetic

## Environment Variables

```
VITE_SANITY_PROJECT_ID   — from sanity.io/manage
VITE_SANITY_DATASET      — "production"
VITE_GITHUB_TOKEN        — optional; 5000 req/hr vs 60/hr unauthenticated
```

# Nellify: agency portfolio site

Next.js 14 (App Router) + TypeScript, GSAP (ScrollTrigger + SplitText), Three.js (one lazy WebGL canvas),
Lenis smooth scroll, Tailwind 3.4 + SCSS, Nodemailer contact form. Package manager: **pnpm**.

## Run it

```bash
pnpm install
cp .env.example .env.local   # then fill in your SMTP details (see below)
pnpm run dev                 # http://localhost:3000
pnpm run build && pnpm start # production check
```

## Placeholders to replace (search the code for `SWAP`)

| What | Where |
|---|---|
| WhatsApp number (digits only, e.g. `2348012345678`) and display text | `src/lib/constants.ts` |
| Production domain | `src/lib/constants.ts` and `NEXT_PUBLIC_SITE_URL` in `.env.local` |
| Social profile URLs (empty ones are hidden) | `src/lib/constants.ts` → `SOCIALS` |
| Real projects, replacing the 3 concept projects (title, blurb, stack, results) | `src/content/projects.ts` |
| Result metrics on case studies (`[00s]`, `[00%]` are placeholders) | `src/content/projects.ts` |
| Home stat tiles (currently commitments, not metrics) | `src/content/site.ts` → `STATS` |
| Testimonials (section stays hidden while the array is empty) | `src/content/site.ts` → `TESTIMONIALS` |
| Budget ranges in the form | `src/lib/contactSchema.ts` → `BUDGETS` |
| Founder name, photo and bio on About | `src/app/about/page.tsx` |
| FAQ answers (timelines, payment terms) | `src/content/site.ts` → `FAQ` |
| SMTP credentials | `.env.local` (never commit it) |

## Contact form (Nodemailer)

`src/app/api/contact/route.ts` reads SMTP settings from environment variables. No secrets are in the code.
For a free option, use a Gmail **App password** (Google Account → Security → 2-Step Verification → App passwords):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=you@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_TO_EMAIL=where-enquiries-should-arrive@example.com
```

If these are missing, the form shows a "email us directly" fallback link instead of failing silently.
The route validates with zod, has a honeypot field, and a basic in-memory rate limit (5 per hour per IP).
That limiter resets on serverless cold starts, so move it to Upstash/Redis if you ever need strict limits.

## Deploy to Vercel

1. Push the project to GitHub (`.env.local` is gitignored).
2. vercel.com → **Add New → Project** → import the repo. Framework is detected as Next.js; build command `pnpm run build`.
3. Under **Settings → Environment Variables** add the six variables from `.env.example`.
4. Deploy, then add your domain under **Settings → Domains** and update the DNS records Vercel shows.
5. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy (used for the sitemap, canonical URLs and Open Graph).

## Project structure

```
src/app            routes, layout, not-found, sitemap, robots, api/contact
src/components     ui (Button, RevealText, Reveal, Accordion...), layout (Nav, Footer, Preloader, Cursor...),
                   sections (Hero, SelectedWork, Services, Process, Why, FAQ, CTABand...), webgl (Scene, canvas)
src/animations     GSAP setup (plugins registered once)
src/content        all copy and project data as typed files
src/lib            constants, helpers, zod schema, preloader/Lenis handles
src/styles         _root (CSS variable tokens), _tokens, _functions, _mixins, globals
src/fonts          self-hosted woff2 (Bricolage Grotesque + Manrope)
```

## Notes

- **Fonts:** the brief asked for Clash Display + Satoshi (Fontshare). They could not be downloaded in the build environment,
  so the site ships with free self-hosted lookalikes: **Bricolage Grotesque** (headings) and **Manrope** (body).
  To use the originals, download the woff2 files from fontshare.com and replace `src/fonts/heading.woff2` and `body.woff2`.
- **Styling rule:** Tailwind for layout utilities, SCSS modules for component styles and mixins. Design tokens live once in `src/styles/_root.scss`.
- **Animation rules:** Three.js is one persistent canvas (pixel ratio capped at 1.5, paused when the tab is hidden, fewer particles on mobile).
  `prefers-reduced-motion` disables smooth scroll, pinning, text reveals and the render loop (a single static frame is drawn).
- **Performance:** Lighthouse mobile (simulated 4G, software WebGL): Performance 90, Accessibility 100, Best Practices 96, SEO 100.
  Real phones with a GPU should do better on the WebGL side. Re-test on your deployed URL.
- **Page transitions:** use `TransitionLink` (or the `Button` component) for internal links so the GSAP wipe plays.

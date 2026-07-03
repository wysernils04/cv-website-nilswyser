# Updating this site

Git is the CMS: edit a file, commit, push (or `vercel deploy --prod`), done.
Everything a visitor reads lives in **two files** — you never need to touch a
component to change content.

| What | Where |
|---|---|
| All section text (DE) | `content/de.ts` |
| All section text (EN) | `content/en.ts` |
| Small UI labels (nav, buttons) | `messages/de.json` · `messages/en.json` |
| Page title / meta description | `lib/site.ts` (`localeMeta`) |
| Design tokens (colors, type, spacing) | `app/globals.css` (`:root` block) |
| Behavior (reveals, menu, hero) | `lib/enhance.js` |

## Resolving a placeholder

Anything rendered in a red dashed box is a literal `[PLACEHOLDER: …]` string in
`content/de.ts` / `content/en.ts` (or `messages/*.json`). Replace the whole
bracket — including the brackets — with the real text, **in both languages**.
`TODO.md` lists every open one. German copy: Swiss orthography, always «ss»,
never «ß».

Special cases handled automatically:

- **Email / LinkedIn / Solaris2 URL** — while these are placeholders the site
  shows a flag instead of a link (no dead links). The moment you enter a real
  value, the mailto link + copy button / profile links appear on their own.
- **"View source" footer link** — set the repo URL in `messages/*.json` under
  `footer.sourceNote` once the repo is public.

## Adding a project screenshot

1. Export a real screenshot or diagram (no stock, no AI), ideally 1600 px wide,
   as WebP/AVIF/PNG, into `public/projects/`, e.g. `public/projects/solaris2.webp`.
2. In both `content/de.ts` and `content/en.ts`, add to that project:

   ```ts
   visual: {
     src: '/projects/solaris2.webp',
     alt: 'Solaris2 — Startseite des Chalets', // describe what's visible
     width: 1600,   // the file's real pixel size —
     height: 1000   // wrong numbers cause layout shift
   }
   ```

   The dashed "visual pending" frame disappears automatically.

## Adding the CV PDF

1. Put the files in `public/cv/`, e.g. `nils-wyser-cv-de.pdf` and `…-en.pdf`.
2. In each content file, add to `hero`:

   ```ts
   cvLink: {label: 'CV herunterladen (PDF)', href: '/cv/nils-wyser-cv-de.pdf'}
   ```

   (EN: `{label: 'Download CV (PDF)', href: '/cv/nils-wyser-cv-en.pdf'}`.)
   No entry → no link. Never link a file that doesn't exist yet.

## Adding a whole project card

Copy an existing object in the `projects.items` array of **both** content files
and edit name / description / tags / href. Order in the array = order on the
page.

## Deploying

```bash
npm install        # first time only
npm run build      # builds + strips the unused Next runtime (see note below)
vercel deploy --prod --yes
```

Preview before production: `vercel deploy --yes` gives a throwaway URL.
Local check: `npm run build && npx serve out` → http://localhost:3000/de.

## The one unusual thing in this build

This site ships **zero framework JavaScript** (~2 KB of inline vanilla JS
total). Next.js always emits its client runtime, so `npm run build` runs
`scripts/strip-runtime.mjs` afterwards, which removes the unused runtime
`<script>` tags from the exported HTML in `out/`. That is only safe because
**no component uses `'use client'`** — nothing hydrates.

**If you ever add a `'use client'` component** (a form, a theme toggle, …):
remove `&& node scripts/strip-runtime.mjs` from the `build` script in
`package.json` and delete the `output: 'export'` line in `next.config.ts` if
you also need server features. The runtime then returns automatically and the
site keeps working — just heavier.

## Domain

When you buy `nilswyser.ch` (or similar): add it in the Vercel dashboard →
project → Domains, and set `NEXT_PUBLIC_SITE_URL=https://nilswyser.ch` in the
project's env vars so canonical URLs, sitemap and JSON-LD use it. Redeploy.

# nilswyser — portfolio

Bilingual (DE/EN) one-page portfolio for Nils Wyser, IT specialist in Basel.
Live: <https://cv-website-nilswyser.vercel.app>

## The point

The site is its own work sample. It ships **zero framework JavaScript** — the
whole behavior layer (scroll reveals, the hero's variable-font signature,
scroll-spy, mobile menu, copy-to-clipboard) is ~4 KB of inline vanilla JS over
fully static HTML. Lighthouse on the deployed URL: **98–100 performance
(mobile), 100/100/100 accessibility · best practices · SEO**, LCP 0.3 s
desktop / ≤1.7 s mobile, CLS 0, TBT 0 ms.

Everything works with JavaScript disabled; `prefers-reduced-motion` is honored
throughout; WCAG 2.1 AA verified with axe (0 violations, both locales).

## Stack

- **Next.js 16** (App Router, TypeScript, static export) — every component is a
  server component
- **Tailwind CSS v4** over hand-written design tokens (Swiss-grid dark theme,
  Archivo variable + Geist Mono via `next/font`)
- **next-intl** for `/de` (default) + `/en` routing and messages — server-side
  only
- `scripts/strip-runtime.mjs` removes Next's unused client runtime from the
  exported HTML (nothing hydrates — there are no client components)
- Vercel, served as a plain static artifact (`framework: null`)

## Develop

```bash
npm install
npm run dev        # dev server with the framework runtime (fine for editing)
npm run build      # static export + runtime strip → out/
npx serve out      # preview the real shipped artifact
```

## Edit content

All copy lives in `content/de.ts` / `content/en.ts` — see
[`docs/UPDATING.md`](docs/UPDATING.md). Open placeholders are tracked in
[`TODO.md`](TODO.md).

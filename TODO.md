# TODO — Open placeholders for Nils

Every item below renders **verbatim in the UI** as `[PLACEHOLDER: …]` so you can spot it in the
running site and swap it for real content. Nothing here is invented data — grep the codebase for
`PLACEHOLDER` to find each spot. Edit `content/de.ts` and `content/en.ts` to resolve them (see
`docs/UPDATING.md`, added in the handover step).

Legend: 🔴 blocks a real launch · 🟡 improves the site · ⚪ optional / nice-to-have

## Contact & identity
- [x] ~~🔴 **Public email address**~~ — resolved: `nils.wyser@gmail.com` (mailto + copy button live).
- [x] ~~🔴 **LinkedIn URL**~~ — resolved: `https://www.linkedin.com/in/nilswyser` (contact, footer, JSON-LD `sameAs`). LinkedIn blocks automated checks — click it once to confirm the profile slug.
- [ ] 🟡 **Public location wording** for the hero eyebrow (currently `Basel, Switzerland`). — §4.2
- [ ] ⚪ **Domain** — `nilswyser.ch` / `.dev`? Launches on `*.vercel.app` until decided. — §10.1

## About
- [ ] 🔴 **Employer may be named publicly?** (Baumann & Cie, Banquiers) — gates §4.3 + §4.4 wording. — §10.4
- [ ] 🟡 **English level** to state (e.g. C1). — §10.10
- [ ] ⚪ **Availability / open-to line** (if any). — §10.10
- [ ] ⚪ **Personal closing sentence** (music/DJing angle?) — yes/no + wording. — §10.11

## Experience
- [ ] 🔴 **Internship start date** (Baumann & Cie). — §10.8
- [ ] 🔴 **Employer-approved bullet wording** for the internship (report consolidation, test tooling, docs). — §10.4
- [ ] 🔴 **Roche apprenticeship years** (e.g. 20XX–20XX). — §10.8
- [ ] 🟡 **2–3 result bullets per Roche rotation** (Manufacturing IT · RSS · PRED) — reuse CV bullets. — §4.4/§10.8
- [ ] 🟡 **Berufsmaturität direction + completion year**. — §4.4/§10.8
- [ ] ⚪ **Passerelle / university plans** — mention (ambition) or omit (availability)? Omitted until answered. — §10.9

## Projects
- [ ] 🟡 **learning-assistant-mcp visual** — architecture diagram or terminal screenshot from the repo. — §4.5
- [ ] 🔴 **Solaris2 scope line** — one sentence (design, build, booking/inquiry flow?). — §10.7
- [ ] 🔴 **Solaris2 stack** (tags). — §10.7
- [ ] 🔴 **Solaris2 live URL + permission** to show client name/screenshots. — §10.7
- [ ] 🟡 **Solaris2 screenshot** asset. — §10.7
- [ ] ⚪ **Crystal Reports Migration Test Framework** card — employer approval to describe; omitted until approved. — §4.5

## Skills
- [ ] 🟡 **Confirm Next.js/React** should be listed under Frameworks. — §4.6
- [ ] 🟡 **Confirm/extend Tooling & Infrastructure** (Docker · Git · CI). — §4.6

## Assets & meta
- [ ] 🟡 **CV PDF** (DE + EN) — supply files, or the download link stays omitted. — §10.5
- [ ] ⚪ **Portrait photo** — include one? Supply asset (no stock, no AI). — §10.6
- [ ] 🟡 **Site repo public?** — enables the footer "View source" link (recommended). — §10.12

## Resolved by the build (defaults chosen — change if you disagree)
- GitHub: `https://github.com/wysernils04` (from §4.5/§4.7) — wired live.
- Framework: **Next.js 16** (spec said 15; 16 is current stable, strict superset for a static one-pager).
- Motion: spec's `motion`/LazyMotion was replaced by ~2 KB of vanilla JS + CSS — same
  §5 behavior, but the site ships **zero framework JavaScript** (spec budget was
  ≤130 KB; we ship ~2 KB). See README "The point" and `docs/UPDATING.md` before
  ever adding a `'use client'` component.
- Hosting: Vercel Hobby as a static export, `*.vercel.app` until a domain is set.
- Live: https://cv-website-nilswyser.vercel.app (Lighthouse mobile 98/100/100/100,
  desktop 100×4, measured 2026-07-04).

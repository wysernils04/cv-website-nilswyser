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
- [x] ~~🔴 **Employer may be named publicly?**~~ — approved; named in About + Experience.
- [x] ~~🟡 **English level**~~ — resolved: C1.
- [ ] ⚪ **Availability / open-to line** (if any). — §10.10
- [ ] ⚪ **Personal closing sentence** (music/DJing angle?) — yes/no + wording. — §10.11

## Experience
- [x] ~~🔴 **Internship start date**~~ — resolved: May 2026 (Mai 2026 – heute / May 2026 – present).
- [x] ~~🔴 **Employer-approved bullet wording**~~ — approved as drafted.
- [x] ~~🔴 **Roche apprenticeship years**~~ — resolved: 2020–2024.
- [x] ~~🟡 **Roche result bullets**~~ — adapted from the CV (Manufacturing IT, RSS chatbots/microservices, PRED DELT).
- [x] ~~🟡 **Berufsmaturität direction + completion year**~~ — resolved: technische Richtung, 2025.
- [ ] ⚪ **Passerelle / university plans** — mention (ambition) or omit (availability)? Omitted until answered. — §10.9

## Projects
- [x] ~~🟡 **learning-assistant-mcp visual**~~ — the repo's Mermaid architecture diagram, rendered dark (`public/projects/learning-assistant-architecture.png`).
- [x] ~~🔴 **Solaris2 scope line**~~ — gallery, arrival info, direct inquiry (matches the live site).
- [x] ~~🔴 **Solaris2 stack**~~ — React · TypeScript · Vite (from the source repo + shipped bundle).
- [x] ~~🔴 **Solaris2 live URL**~~ — https://solaris-albinen.ch; screenshot used, client not named.
- [x] ~~🟡 **Solaris2 screenshot**~~ — `public/projects/solaris2.jpg` (live-site capture).
- [ ] ⚪ **Crystal Reports Migration Test Framework** card — employer approval to describe; omitted until approved. — §4.5

## Skills
- [ ] 🟡 **Confirm Next.js/React** should be listed under Frameworks. — §4.6
- [ ] 🟡 **Confirm/extend Tooling & Infrastructure** (Docker · Git · CI). — §4.6

## Assets & meta
- [ ] 🟡 **CV PDF** (DE + EN) — a Lebenslauf PDF exists in ~/Downloads but contains your home address, phone and birth date; strip those before publishing a web version. Link stays omitted. — §10.5
- [ ] ⚪ **Portrait photo** — include one? Supply asset (no stock, no AI). — §10.6
- [x] ~~🟡 **Site repo public?**~~ — public at https://github.com/wysernils04/cv-website-nilswyser; footer View-source live. History scrubbed before publishing.

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

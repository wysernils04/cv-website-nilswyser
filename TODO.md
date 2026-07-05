# TODO — Open placeholders for Nils

Every item below renders **verbatim in the UI** as `[PLACEHOLDER: …]` so you can spot it in the
running site and swap it for real content. Nothing here is invented data — grep the codebase for
`PLACEHOLDER` to find each spot. Edit `content/de.ts` and `content/en.ts` to resolve them (see
`docs/UPDATING.md`, added in the handover step).

Legend: 🔴 blocks a real launch · 🟡 improves the site · ⚪ optional / nice-to-have

## Contact & identity
- [x] ~~🔴 **Public email address**~~ — resolved: `nils.wyser@gmail.com` (mailto + copy button live).
- [x] ~~🔴 **LinkedIn URL**~~ — resolved: `https://www.linkedin.com/in/nils-wyser` (confirmed against the CV; wired in contact, footer, JSON-LD `sameAs`).
- [x] ~~🟡 **Public location wording**~~ — confirmed: `Basel, Schweiz` / `Basel, Switzerland`.
- [ ] ⚪ **Domain** — `nilswyser.ch` / `.dev`? Launches on `*.vercel.app` until decided. — §10.1

## About
- [x] ~~🔴 **Employer may be named publicly?**~~ — approved; named in About + Experience.
- [x] ~~🟡 **English level**~~ — resolved: C1.
- [x] ~~⚪ **Availability / open-to line**~~ — resolved: in der Passerelle, offen für passende Praktika/Projekte im IT-Umfeld.
- [x] ~~⚪ **Personal closing sentence**~~ — resolved: learning + building solutions that still work tomorrow (no music angle).

## Experience
- [x] ~~🔴 **Internship start date**~~ — resolved: May 2026 (Mai 2026 – heute / May 2026 – present).
- [x] ~~🔴 **Employer-approved bullet wording**~~ — approved as drafted.
- [x] ~~🔴 **Roche apprenticeship years**~~ — resolved: 2020–2024.
- [x] ~~🟡 **Roche result bullets**~~ — adapted from the CV (Manufacturing IT, RSS chatbots/microservices, PRED DELT).
- [x] ~~🟡 **Berufsmaturität direction + completion year**~~ — resolved: technische Richtung, 2025.
- [x] ~~⚪ **Passerelle / university plans**~~ — answered: mentioned via the availability line in About.

## Projects
- [x] ~~🟡 **learning-assistant-mcp visual**~~ — the repo's Mermaid architecture diagram, rendered dark (`public/projects/learning-assistant-architecture.png`).
- [x] ~~🔴 **Solaris2 scope line**~~ — gallery, arrival info, direct inquiry (matches the live site).
- [x] ~~🔴 **Solaris2 stack**~~ — React · TypeScript · Vite (from the source repo + shipped bundle).
- [x] ~~🔴 **Solaris2 live URL**~~ — https://solaris-albinen.ch; screenshot used, client not named.
- [x] ~~🟡 **Solaris2 screenshot**~~ — `public/projects/solaris2.jpg` (live-site capture).
- [ ] ⚪ **Crystal Reports Migration Test Framework** card — employer approval to describe; omitted until approved. — §4.5

## Skills
- [x] ~~🟡 **Confirm Next.js/React**~~ — confirmed, listed under Frameworks.
- [x] ~~🟡 **Confirm/extend Tooling & Infrastructure**~~ — confirmed as drafted (Docker · Git · CI).

## Assets & meta
- [ ] 🟡 **CV PDF** (DE + EN) — a Lebenslauf PDF exists in ~/Downloads but contains your home address, phone and birth date; strip those before publishing a web version. Link stays omitted. — §10.5
- [ ] ⚪ **Portrait photo** — include one? Supply asset (no stock, no AI). — §10.6
- [x] ~~🟡 **Site repo public?**~~ — public at https://github.com/wysernils04/cv-website-nilswyser; footer View-source live. History scrubbed before publishing.

## Resolved by the build (defaults chosen — change if you disagree)
- GitHub: `https://github.com/wysernils04` (from §4.5/§4.7) — wired live.
- Framework: **Next.js 16** (spec said 15; 16 is current stable, strict superset for a static one-pager).
- Motion: spec's `motion`/LazyMotion was replaced by ~4 KB of vanilla JS + CSS — same
  §5 behavior, but the site ships **zero framework JavaScript** (spec budget was
  ≤130 KB; we ship ~3.5 KB gz). See README "The point" and `docs/UPDATING.md` before
  ever adding a `'use client'` component.
- Hosting: Vercel Hobby as a static export, `*.vercel.app` until a domain is set.
- Live: https://cv-website-nilswyser.vercel.app (Lighthouse mobile 98/100/100/100,
  desktop 100×4, measured 2026-07-04).

// Post-build: remove Next's client runtime from the prerendered HTML.
//
// Why this is safe HERE (and not in a normal app): this site has ZERO client
// components — nothing hydrates. The HTML is complete, and the only behavior
// (scroll reveals, hero width-axis, scroll-spy, mobile menu, copy button) is a
// ~2 KB inline vanilla script (lib/enhance.js). Next still emits its router/
// hydration runtime (~150 KB gz) unconditionally; on this page it is dead
// weight, so we strip it after `next build` (§2: first-load JS ≤ 130 KB —
// we ship ~2 KB instead).
//
// What is removed from every prerendered .html:
//   - <script src="/_next/static/…"> (async runtime chunks + noModule polyfills)
//   - <link rel="preload" as="script" …> (runtime preloads)
//   - inline <script>self.__next_f…</script> (RSC flight payload for hydration)
// What is kept: inline enhancement scripts, JSON-LD, stylesheets, font preloads.
//
// If a client component is ever added back, delete this script from
// package.json's build and the runtime returns automatically.
import {readdirSync, readFileSync, writeFileSync, statSync, existsSync} from 'node:fs';
import {join} from 'node:path';

// On Vercel, the builder packages .next into .vercel/output DURING `next build`
// (onBuildComplete) — i.e. BEFORE this script runs — so the deployed prerender
// fallbacks live there and must be stripped too. Locally only .next exists.
const ROOTS = [
  join(process.cwd(), '.next/server/app'),
  join(process.cwd(), '.vercel/output')
].filter((p) => existsSync(p));

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (entry.endsWith('.html')) yield p;
  }
}

const externalScript = /<script\s[^>]*src="\/_next\/static\/[^"]*"[^>]*><\/script>/g;
const scriptPreload = /<link\s[^>]*rel="preload"[^>]*as="script"[^>]*\/?>/g;
const flightScript = /<script>(?:\(self\.__next_f=self\.__next_f\|\|\[\]\)|self\.__next_f)[\s\S]*?<\/script>/g;

let files = 0;
let savedBytes = 0;
for (const file of ROOTS.flatMap((r) => [...htmlFiles(r)])) {
  const before = readFileSync(file, 'utf8');
  const after = before
    .replace(externalScript, '')
    .replace(scriptPreload, '')
    .replace(flightScript, '');
  if (after !== before) {
    writeFileSync(file, after);
    files++;
    savedBytes += before.length - after.length;
  }
}
console.log(
  `strip-runtime: cleaned ${files} file(s), removed ${(savedBytes / 1024).toFixed(1)} KB of hydration payload`
);
if (files === 0) {
  console.warn('strip-runtime: WARNING — no files changed; did Next change its output layout?');
}

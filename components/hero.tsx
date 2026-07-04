import {Fragment} from 'react';
import {FlaggedText} from './flagged-text';
import {GridLines} from './grid-lines';

type HeroProps = {
  eyebrow: string;
  name: string;
  valueProp: string;
  ctaPrimary: {label: string; href: string};
  ctaSecondary: {label: string; href: string};
  cvLink?: {label: string; href: string};
};

// The one loud moment (§5.4) — rendered entirely on the server. NILS WYSER in
// Archivo expanded caps: letters rise in on load (CSS keyframes, per-letter
// inline delays), then — as the hero scrolls away — the inline enhancement
// script interpolates the width axis from expanded (125) to condensed (78)
// while the name pins under the nav: "compresses into precision". Without JS
// the name is simply static and expanded; reduced motion disables everything
// via media queries and a matchMedia guard.
export function Hero({eyebrow, name, valueProp, ctaPrimary, ctaSecondary, cvLink}: HeroProps) {
  const words = name.toUpperCase().split(' ');
  let letterIndex = 0;

  return (
    <section
      aria-label={name}
      className="relative flex min-h-[100svh] items-center"
    >
      <GridLines columns={4} />

      <div className="shell relative w-full pt-28 pb-24 md:pt-32">
        {/* data-hero-fade: the enhancement script parallaxes these away at
            staggered rates while the pinned name condenses above them */}
        <p className="eyebrow max-w-md" data-hero-fade="1" suppressHydrationWarning>
          <FlaggedText text={eyebrow} />
        </p>

        {/* The slot holds the name's place in the flow while the scroll driver
            pins the h1 itself (position: fixed) under the nav. */}
        <div className="hero-name-slot" data-name-slot="">
        <h1 className="hero-name" aria-label={name} suppressHydrationWarning>
          {/* Letters are aria-hidden — the h1's aria-label carries the name, so
              screen readers don't spell it out character by character. Words
              wrap as units; letters never break mid-word. */}
          <span aria-hidden>
            {words.map((word, wi) => (
              <Fragment key={wi}>
                {wi > 0 ? ' ' : null}
                <span className="inline-flex whitespace-nowrap">
                  {[...word].map((char, ci) => (
                    <span
                      key={ci}
                      className="hero-letter"
                      suppressHydrationWarning
                      style={{animationDelay: `${0.12 + letterIndex++ * 0.05}s`}}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
            <span
              className="hero-letter hero-dot"
              style={{animationDelay: `${0.12 + letterIndex * 0.05}s`}}
            />
          </span>
        </h1>
        </div>

        <p
          className="mt-6 max-w-[46ch] text-[color:var(--text-2)] md:mt-8 md:text-[1.2rem]"
          data-hero-fade="2"
          suppressHydrationWarning
        >
          {valueProp}
        </p>

        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10"
          data-hero-fade="3"
          suppressHydrationWarning
        >
          <a href={ctaPrimary.href} className="cta-primary">
            {ctaPrimary.label}
            <span aria-hidden className="cta-arrow">
              →
            </span>
          </a>
          <a href={ctaSecondary.href} className="text-fg link-underline">
            {ctaSecondary.label}
          </a>
          {/* Quiet CV download (§4.2) — only rendered once the PDF exists. */}
          {cvLink && (
            <a href={cvLink.href} className="eyebrow link-underline" download>
              {cvLink.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

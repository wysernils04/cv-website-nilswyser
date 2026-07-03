'use client';

import {Fragment, useRef} from 'react';
import {m, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {EASE_OUT} from '@/lib/motion';
import {FlaggedText} from './flagged-text';
import {GridLines} from './grid-lines';

type HeroProps = {
  eyebrow: string;
  name: string;
  valueProp: string;
  ctaPrimary: {label: string; href: string};
  ctaSecondary: {label: string; href: string};
};

const container = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.05, delayChildren: 0.12}}
};
const letter = {
  hidden: {y: '0.42em', opacity: 0},
  visible: {y: 0, opacity: 1, transition: {duration: 0.5, ease: EASE_OUT}}
};

// The one loud moment (§5.4). NILS WYSER in Archivo expanded caps: letters rise
// in on load with a short stagger, then — as the hero scrolls away — the whole
// name's width axis interpolates from expanded (125) down to condensed (~78),
// "compressing into precision". Everything is one <h1>; reduced motion pins it
// static and skips both the stagger and the scroll interpolation.
export function Hero({eyebrow, name, valueProp, ctaPrimary, ctaSecondary}: HeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const wght = useTransform(scrollYProgress, [0, 1], [700, 660]);
  const wdth = useTransform(scrollYProgress, [0, 1], [125, 78]);
  const fvs = useTransform(
    () => `"wght" ${Math.round(wght.get())}, "wdth" ${Math.round(wdth.get())}`
  );

  const words = name.toUpperCase().split(' ');

  return (
    <section
      ref={ref}
      aria-label={name}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <GridLines columns={4} />

      <div className="shell relative w-full pt-28 pb-24 md:pt-32">
        <p className="eyebrow max-w-md">
          <FlaggedText text={eyebrow} />
        </p>

        {reduce ? (
          <h1 className="hero-name" style={{fontVariationSettings: '"wght" 700, "wdth" 118'}}>
            {name.toUpperCase()}
            <span aria-hidden className="hero-dot" />
          </h1>
        ) : (
          <m.h1
            className="hero-name"
            aria-label={name}
            style={{fontVariationSettings: fvs}}
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {/* Letters are aria-hidden — the h1's aria-label carries the name,
                so screen readers don't spell it out character by character.
                Words wrap as units; letters never break mid-word. */}
            <span aria-hidden>
              {words.map((word, wi) => (
                <Fragment key={wi}>
                  {wi > 0 ? ' ' : null}
                  <span className="inline-flex whitespace-nowrap">
                    {[...word].map((char, ci) => (
                      <m.span key={ci} variants={letter} className="anim inline-block">
                        {char}
                      </m.span>
                    ))}
                  </span>
                </Fragment>
              ))}
              <m.span variants={letter} className="anim hero-dot" />
            </span>
          </m.h1>
        )}

        <p className="mt-8 max-w-[46ch] text-[color:var(--text-2)] md:mt-10 md:text-[1.2rem]">
          {valueProp}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-12">
          <a href={ctaPrimary.href} className="cta-primary">
            {ctaPrimary.label}
            <span aria-hidden className="cta-arrow">
              →
            </span>
          </a>
          <a href={ctaSecondary.href} className="text-fg link-underline">
            {ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

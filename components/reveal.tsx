'use client';

import {m, useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
import {EASE_OUT, REVEAL_DURATION, REVEAL_RISE} from '@/lib/motion';

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'ul' | 'span';

type RevealProps = {
  children: ReactNode;
  /** Manual stagger, in seconds, within a group. */
  delay?: number;
  as?: RevealTag;
  className?: string;
};

// Scroll-reveal wrapper (§5.5): fires once as it enters the viewport. Content is
// fully present without JS — the reveal is additive. Under prefers-reduced-motion
// it degrades to a plain, immediately-visible element (no transform, no stagger).
export function Reveal({children, delay = 0, as = 'div', className}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      // .anim: targeted by the layout's <noscript> override so content stays
      // fully visible when JavaScript is disabled (§2).
      className={className ? `anim ${className}` : 'anim'}
      initial={{opacity: 0, y: REVEAL_RISE}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '0px 0px -12% 0px'}}
      transition={{duration: REVEAL_DURATION, ease: EASE_OUT, delay}}
    >
      {children}
    </Tag>
  );
}

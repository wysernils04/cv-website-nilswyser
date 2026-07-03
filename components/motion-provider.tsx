'use client';

import {LazyMotion, domAnimation} from 'motion/react';
import type {ReactNode} from 'react';

// LazyMotion keeps the animation bundle small (domAnimation ≈ 15 KB vs. the full
// import). `strict` forbids the heavy `motion.*` components — everything must
// use `m.*`, enforcing the first-load JS budget (§2). domAnimation covers our
// needs: enter/exit, variants, whileInView reveals, hover/tap/focus gestures.
export function MotionProvider({children}: {children: ReactNode}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

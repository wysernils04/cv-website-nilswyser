import type {ReactNode} from 'react';

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'ul' | 'span';

type RevealProps = {
  children: ReactNode;
  /** Manual stagger, in seconds, within a group. */
  delay?: number;
  as?: RevealTag;
  className?: string;
};

// Scroll-reveal wrapper (§5.5) — a server component; zero client JS of its own.
// Renders plain, fully-visible markup. The inline enhancement script observes
// `[data-reveal]` and adds `.in` on first viewport entry; the hidden
// pre-animation state exists only under `html.js` (see globals.css), so
// content is complete without JavaScript by construction, and reduced motion
// disables the whole effect.
export function Reveal({children, delay = 0, as = 'div', className}: RevealProps) {
  const Tag = as;
  return (
    <Tag
      data-reveal=""
      className={className}
      style={delay ? {transitionDelay: `${delay}s`} : undefined}
    >
      {children}
    </Tag>
  );
}

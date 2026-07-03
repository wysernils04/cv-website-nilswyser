import type {ReactNode} from 'react';
import {Reveal} from './reveal';
import {GridLines} from './grid-lines';

type SectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
  /** Show the faint vertical column rules behind this section. */
  grid?: boolean;
};

// Consistent section scaffold (§5.1): a top hairline divider, a mono eyebrow +
// left-aligned display heading, and generous fluid vertical rhythm. The heading
// is a real <h2> tied to the section via aria-labelledby.
export function Section({id, eyebrow, heading, children, grid = false}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative"
    >
      {grid && <GridLines columns={4} />}
      <div
        className="shell relative"
        style={{paddingBlock: 'var(--section-pad)'}}
      >
        <div aria-hidden className="mb-14 h-px w-full bg-line md:mb-20" />
        <Reveal as="div">
          <header className="max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-heading`} className="display-2 mt-4 md:mt-5">
              {heading}
            </h2>
          </header>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

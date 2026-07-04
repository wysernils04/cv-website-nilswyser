import {useTranslations} from 'next-intl';
import type {Content} from '@/content/schema';
import {FlaggedText} from './flagged-text';
import {Reveal} from './reveal';
import {Section} from './section';

// Experience (§4.4): a typed timeline. The order carries information, so the
// index numbers and dates are structural — set in mono, not decoration.
export function Experience({content}: {content: Content['experience']}) {
  const t = useTranslations('sections');

  return (
    <Section
      id="experience"
      eyebrow={t('experienceEyebrow')}
      heading={content.heading}
    >
      <ol className="flex flex-col">
        {content.entries.map((entry, i) => (
          <Reveal as="li" key={entry.index} delay={i * 0.06}>
            <article
              className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-6 md:py-12"
              aria-label={`${entry.role} — ${entry.org}`}
            >
              <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
                <span className="eyebrow" style={{color: 'var(--text)'}}>
                  {entry.index}
                </span>
                <span className="eyebrow">
                  <FlaggedText text={entry.period} />
                </span>
              </div>

              <div className="md:col-span-8 md:col-start-5">
                <h3 className="display-3 text-fg">{entry.role}</h3>
                <p className="mt-1 text-muted">
                  {entry.org} · {entry.location}
                </p>
                <ul className="mt-5 flex max-w-[62ch] flex-col gap-2.5">
                  {entry.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 text-fg">
                      <span
                        aria-hidden
                        className="mt-[0.72em] h-px w-4 shrink-0"
                        style={{background: 'var(--text-2)'}}
                      />
                      <span>
                        <FlaggedText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className="grid gap-2 border-t border-line py-10 md:grid-cols-12 md:gap-6">
          <span className="eyebrow md:col-span-3">{content.education.label}</span>
          <p className="text-fg md:col-span-8 md:col-start-5">
            <FlaggedText text={content.education.value} />
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

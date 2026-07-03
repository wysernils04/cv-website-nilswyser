import {useTranslations} from 'next-intl';
import type {Content} from '@/content/schema';
import {FlaggedText} from './flagged-text';
import {Reveal} from './reveal';
import {Section} from './section';

// About (§4.3): 3–4 short sentences + a compact facts row with mono labels.
// The optional personal closing sentence stays a visible placeholder until
// Nils decides (§10.11). No portrait unless he supplies one — never stock/AI.
export function About({content}: {content: Content['about']}) {
  const t = useTranslations('sections');

  return (
    <Section id="about" eyebrow={t('aboutEyebrow')} heading={content.heading}>
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-7">
          <div className="flex max-w-[68ch] flex-col gap-5">
            {content.body.map((sentence, i) => (
              <p key={i} className="text-fg">
                <FlaggedText text={sentence} />
              </p>
            ))}
            <p className="text-muted">
              <FlaggedText text={content.closing} />
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-4 md:col-start-9">
          <dl className="flex flex-col gap-6 border-t border-line pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            {content.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-1.5 text-fg">
                  <FlaggedText text={fact.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

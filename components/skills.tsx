import {useTranslations} from 'next-intl';
import type {Content} from '@/content/schema';
import {FlaggedText} from './flagged-text';
import {Reveal} from './reveal';
import {Section} from './section';

// Skills (§4.6): grouped tags with one quiet context line each. Deliberately no
// bars, no percentages, no star ratings — honest scope over adjectives.
export function Skills({content}: {content: Content['skills']}) {
  const t = useTranslations('sections');

  return (
    <Section id="skills" eyebrow={t('skillsEyebrow')} heading={content.heading}>
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {content.groups.map((group, i) => (
          <Reveal key={group.label} delay={(i % 2) * 0.08}>
            <div className="flex h-full flex-col border-t border-line pt-6">
              <h3 className="eyebrow">{group.label}</h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="tag border border-line px-3 py-1.5 text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-[52ch] text-muted">
                <FlaggedText text={group.context} />
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

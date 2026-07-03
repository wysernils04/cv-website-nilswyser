import {useTranslations} from 'next-intl';
import type {Content} from '@/content/schema';
import {hasPlaceholder} from '@/lib/placeholders';
import {social} from '@/lib/site';
import {CopyEmail} from './copy-email';
import {FlaggedText} from './flagged-text';
import {Reveal} from './reveal';
import {Section} from './section';

// Contact (§4.7): heading, one line, email as mailto + selectable text + copy
// button, GitHub + LinkedIn links. No contact form (§9). Email and LinkedIn are
// placeholders until §10.2/.3 are answered — rendered as flags, never dead links.
export function Contact({content}: {content: Content['contact']}) {
  const t = useTranslations('sections');
  const ta = useTranslations('actions');

  const emailReal = !hasPlaceholder(content.email);
  const linkedinReal = !hasPlaceholder(content.linkedin);

  return (
    <Section id="contact" eyebrow={t('contactEyebrow')} heading={content.heading}>
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-7">
          <p className="max-w-[52ch] text-muted">{content.lead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {emailReal ? (
              <>
                <a
                  href={`mailto:${content.email}`}
                  className="display-3 link-underline break-all text-fg"
                >
                  {content.email}
                </a>
                <CopyEmail email={content.email} />
              </>
            ) : (
              <p className="display-3 text-fg">
                <FlaggedText text={content.email} />
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-4 md:col-start-9">
          <ul className="flex flex-col gap-4 border-t border-line pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <li>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-fg"
              >
                {ta('github')} <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              {linkedinReal ? (
                <a
                  href={content.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-fg"
                >
                  {ta('linkedin')} <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="text-fg">
                  {ta('linkedin')}: <FlaggedText text={content.linkedin} />
                </span>
              )}
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

import {useTranslations} from 'next-intl';
import type {Content} from '@/content/schema';
import {hasPlaceholder} from '@/lib/placeholders';
import {social} from '@/lib/site';
import {FlaggedText} from './flagged-text';
import {LocaleSwitch} from './locale-switch';
import {Wordmark} from './wordmark';

// Footer (§4.8): © line, repeated contact links, locale switch, and the quiet
// "Designed and built by me" note. The View-source link appears only once the
// repo is public (§10.12); no Impressum/cookie banner — no cookies, no tracking.
export function Footer({contact}: {contact: Content['contact']}) {
  const t = useTranslations('footer');
  const ta = useTranslations('actions');

  const emailReal = !hasPlaceholder(contact.email);
  const linkedinReal = !hasPlaceholder(contact.linkedin);
  const sourceNote = t('sourceNote');
  const sourceReal = !hasPlaceholder(sourceNote);

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-10 py-14 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Wordmark />
          <LocaleSwitch />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            <li>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow link-underline text-muted hover:text-fg"
              >
                {ta('github')}
              </a>
            </li>
            <li>
              {linkedinReal ? (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow link-underline text-muted hover:text-fg"
                >
                  {ta('linkedin')}
                </a>
              ) : (
                <span className="eyebrow text-muted">
                  {ta('linkedin')}: <FlaggedText text={contact.linkedin} />
                </span>
              )}
            </li>
            <li>
              {emailReal ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="eyebrow link-underline text-muted hover:text-fg"
                >
                  {ta('email')}
                </a>
              ) : (
                <span className="eyebrow text-muted">
                  {ta('email')}: <FlaggedText text={contact.email} />
                </span>
              )}
            </li>
          </ul>

          <p className="eyebrow text-muted">© 2026 Nils Wyser</p>
        </div>

        <p className="eyebrow text-muted">
          {t('builtBy')}{' '}
          {sourceReal ? (
            <a
              href={sourceNote}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-fg"
            >
              {t('viewSource')}
            </a>
          ) : (
            <FlaggedText text={sourceNote} />
          )}
        </p>
      </div>
    </footer>
  );
}

import {useTranslations} from 'next-intl';
import {Wordmark} from './wordmark';
import {LocaleSwitch} from './locale-switch';

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'] as const;

// Fixed nav (§4.1) — a server component; all behavior (scroll-spy aria-current,
// mobile overlay, focus trap, Esc) comes from the inline enhancement script via
// the data hooks below. Without JS: desktop anchors work as-is; on mobile the
// useless menu button is hidden by CSS and the <noscript> anchor row shows.
export function Nav({locale}: {locale: string}) {
  const t = useTranslations('nav');
  const items = SECTION_IDS.map((id) => ({id, label: t(id)}));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md">
        <nav
          aria-label={t('primaryLabel')}
          className="shell flex h-16 items-center justify-between gap-4"
        >
          <a href="#top" className="rounded-sm py-2" aria-label="Nils Wyser">
            <Wordmark />
          </a>

          {/* Desktop anchors — scroll-spy toggles aria-current */}
          <ul data-nav="" className="hidden items-center gap-7 md:flex">
            {items.map(({id, label}) => (
              <li key={id}>
                <a href={`#${id}`} className="eyebrow inline-block py-2">
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LocaleSwitch locale={locale} />
            </div>
            <button
              type="button"
              data-menu-open=""
              aria-expanded="false"
              aria-controls="mobile-menu"
              className="eyebrow -mr-1 flex min-h-11 items-center gap-2 px-1 py-2 text-fg md:hidden"
            >
              {t('openMenu')}
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </nav>

        {/* No-JS mobile fallback: a plain anchor row (§2 — everything usable
            without JavaScript). Hidden whenever JS is available. */}
        <noscript>
          <ul className="shell flex flex-wrap gap-x-5 gap-y-1 pb-3 md:hidden">
            {items.map(({id, label}) => (
              <li key={id}>
                <a href={`#${id}`} className="eyebrow inline-block py-2 text-muted">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <div className="inline-block">
                <LocaleSwitch locale={locale} />
              </div>
            </li>
          </ul>
        </noscript>
      </div>

      {/* Mobile overlay menu — server-rendered, hidden until the script opens
          it. role=dialog + focus trap + Esc handled by the script. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t('sectionsLabel')}
        hidden
        className="fixed inset-0 z-40 flex flex-col bg-[var(--bg)] md:hidden"
      >
        <div className="shell flex h-16 items-center justify-between">
          <Wordmark />
          <button
            type="button"
            data-menu-close=""
            className="eyebrow min-h-11 px-1 py-2 text-fg"
          >
            {t('closeMenu')}
          </button>
        </div>
        <div className="shell flex flex-1 flex-col justify-center gap-2 pb-24">
          <ul className="flex flex-col gap-1">
            {items.map(({id, label}) => (
              <li key={id}>
                <a href={`#${id}`} className="display-3 block py-3 text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <LocaleSwitch locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}

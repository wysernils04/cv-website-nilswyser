import {Fragment} from 'react';
import {routing} from '@/i18n/routing';

// DE | EN switch (§4.1) — a server component with plain anchors: on a
// one-pager the target path IS the locale, so no client router is needed.
// The enhancement script stashes scroll position on click (data-locale-switch)
// and restores it after the language switch.
export function LocaleSwitch({locale}: {locale: string}) {
  return (
    <div className="eyebrow flex items-center">
      {routing.locales.map((loc, i) => {
        const isActive = loc === locale;
        return (
          <Fragment key={loc}>
            {i > 0 && (
              <span aria-hidden style={{color: 'var(--border)'}}>
                |
              </span>
            )}
            {/* min 44×44 hit area (§7); the box provides the spacing, so
                adjacent targets never overlap. */}
            <a
              href={`/${loc}`}
              hrefLang={loc}
              data-locale-switch=""
              aria-current={isActive ? 'true' : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center ${
                isActive ? 'text-fg' : 'text-muted transition-colors hover:text-fg'
              }`}
            >
              <span className={isActive ? undefined : 'link-underline'}>
                {loc.toUpperCase()}
              </span>
            </a>
          </Fragment>
        );
      })}
    </div>
  );
}

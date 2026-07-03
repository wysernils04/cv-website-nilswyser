'use client';

import {Fragment} from 'react';
import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

// DE | EN switch (§4.1). Same pathname, other locale, hreflang-annotated. Stashes
// scroll position so <ScrollRestore> keeps the visitor in place across the switch.
export function LocaleSwitch() {
  const pathname = usePathname();
  const active = useLocale();

  const stashScroll = () => {
    try {
      sessionStorage.setItem('nw:scroll', String(window.scrollY));
    } catch {
      /* private mode — ignore */
    }
  };

  return (
    <div className="eyebrow flex items-center gap-2">
      {routing.locales.map((loc, i) => {
        const isActive = loc === active;
        return (
          <Fragment key={loc}>
            {i > 0 && (
              <span aria-hidden style={{color: 'var(--border)'}}>
                |
              </span>
            )}
            <Link
              href={pathname}
              locale={loc}
              hrefLang={loc}
              scroll={false}
              onClick={stashScroll}
              aria-current={isActive ? 'true' : undefined}
              className={
                isActive
                  ? 'text-fg'
                  : 'text-muted link-underline transition-colors hover:text-fg'
              }
            >
              {loc.toUpperCase()}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}

'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {AnimatePresence, m, useReducedMotion} from 'motion/react';
import {Wordmark} from './wordmark';
import {LocaleSwitch} from './locale-switch';

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'] as const;

export function Nav() {
  const t = useTranslations('nav');
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const items = SECTION_IDS.map((id) => ({id, label: t(id)}));

  // Scroll spy — highlight the section crossing the upper third of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      {rootMargin: '-45% 0px -50% 0px', threshold: 0}
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Body scroll lock + focus management while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Esc to close + a minimal focus trap inside the dialog.
  const onPanelKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [close]
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md">
        <nav
          aria-label={t('primaryLabel')}
          className="shell flex h-16 items-center justify-between gap-4"
        >
          <a
            href="#top"
            className="rounded-sm py-2"
            aria-label="Nils Wyser"
          >
            <Wordmark />
          </a>

          {/* Desktop anchors */}
          <ul className="hidden items-center gap-7 md:flex">
            {items.map(({id, label}) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`eyebrow py-2 transition-colors ${
                    active === id
                      ? 'text-fg'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  <span
                    className={
                      active === id
                        ? 'border-b pb-1'
                        : 'link-underline'
                    }
                    style={active === id ? {borderColor: 'var(--accent)'} : undefined}
                  >
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LocaleSwitch />
            </div>
            {/* Mobile menu trigger */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="eyebrow -mr-1 flex items-center gap-2 px-1 py-2 text-fg md:hidden"
            >
              {t('openMenu')}
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('sectionsLabel')}
            ref={panelRef}
            onKeyDown={onPanelKeyDown}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: reduce ? 0 : 0.2}}
            className="fixed inset-0 z-40 flex flex-col bg-[var(--bg)] md:hidden"
          >
            <div className="shell flex h-16 items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={close}
                className="eyebrow px-1 py-2 text-fg"
              >
                {t('closeMenu')}
              </button>
            </div>
            <div className="shell flex flex-1 flex-col justify-center gap-2 pb-24">
              <ul className="flex flex-col gap-1">
                {items.map(({id, label}) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={close}
                      className="display-3 block py-3 text-fg"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <LocaleSwitch />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

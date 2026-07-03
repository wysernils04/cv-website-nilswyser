'use client';

import {useRef, useState} from 'react';
import {useTranslations} from 'next-intl';

// Copy-to-clipboard for the email address (§4.7). Progressive enhancement: the
// address itself is a plain mailto link + selectable text; this button is extra.
// The status flip is announced politely to screen readers.
export function CopyEmail({email}: {email: string}) {
  const t = useTranslations('actions');
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — the address stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="eyebrow cursor-pointer border border-line px-3 py-2 text-fg transition-colors duration-150 hover:border-[var(--accent)]"
      aria-label={t('copyEmail')}
    >
      <span aria-live="polite">{copied ? t('copied') : t('copyEmail')}</span>
    </button>
  );
}

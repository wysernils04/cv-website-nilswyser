import {useTranslations} from 'next-intl';

// Copy-to-clipboard for the email address (§4.7) — server-rendered, hidden by
// default. The enhancement script unhides it and wires the clipboard call;
// without JS the address stays a plain selectable mailto link, so nothing is
// lost. The label span is a polite live region for the "Copied" confirmation.
export function CopyEmail({email}: {email: string}) {
  const t = useTranslations('actions');

  return (
    <button
      type="button"
      hidden
      data-copy={email}
      data-copied-label={t('copied')}
      className="eyebrow cursor-pointer border border-line px-3 py-2 text-fg transition-colors duration-150 hover:border-[var(--accent)]"
      aria-label={t('copyEmail')}
    >
      <span data-copy-label="" aria-live="polite">
        {t('copyEmail')}
      </span>
    </button>
  );
}

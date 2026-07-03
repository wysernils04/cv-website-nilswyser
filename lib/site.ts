import type {Locale} from '@/i18n/routing';

// Resolved at build time. On Vercel, VERCEL_PROJECT_PRODUCTION_URL is the
// stable production host; locally we fall back to the dev server. Override with
// NEXT_PUBLIC_SITE_URL once a custom domain is set.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

// Real, verified outbound links (§4). Placeholders that must NOT be invented
// (email, LinkedIn) live in the content files as visible [PLACEHOLDER: …].
export const social = {
  github: 'https://github.com/wysernils04'
} as const;

export const localeMeta: Record<
  Locale,
  {title: string; description: string; ogLocale: string}
> = {
  de: {
    title: 'Nils Wyser — IT-Spezialist, Basel',
    description:
      'IT-Spezialist in Basel. Ich baue zuverlässige Daten- und Reporting-Systeme — von Oracle-Reports bis Developer-Tooling in Python und TypeScript.',
    ogLocale: 'de_CH'
  },
  en: {
    title: 'Nils Wyser — IT Specialist, Basel',
    description:
      'IT specialist in Basel. I build reliable data and reporting systems — from Oracle-backed report pipelines to developer tooling in Python and TypeScript.',
    ogLocale: 'en_US'
  }
};

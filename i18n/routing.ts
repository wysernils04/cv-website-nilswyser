import {defineRouting} from 'next-intl/routing';

// Locales: German is the default and, per the brief, `/` redirects to `/de`.
// `localePrefix: 'always'` keeps both locales explicitly prefixed (/de, /en)
// and lets the proxy redirect the bare `/` to the default locale.
export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

import type {Metadata, Viewport} from 'next';
import {Archivo, Geist_Mono} from 'next/font/google';
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {localeMeta, siteUrl} from '@/lib/site';
import {MotionProvider} from '@/components/motion-provider';
import '../globals.css';

// Archivo (variable): the site's identity. wght is variable by default; we also
// request the wdth axis for the hero signature. Self-hosted by next/font.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap'
});

// Geist Mono: utility type — eyebrows, tags, dates, facts row.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const viewport: Viewport = {
  themeColor: '#0e0e0d',
  colorScheme: 'dark'
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: Pick<Props, 'params'>): Promise<Metadata> {
  const {locale} = await params;
  const active = (
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const meta = localeMeta[active];

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${active}`,
      languages: {
        de: '/de',
        en: '/en',
        'x-default': '/de'
      }
    },
    openGraph: {
      type: 'website',
      title: meta.title,
      description: meta.description,
      url: `/${active}`,
      siteName: 'Nils Wyser',
      locale: meta.ogLocale
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description
    },
    robots: {index: true, follow: true}
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enables static rendering for this locale (§6 rendering rule).
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${geistMono.variable}`}
    >
      <body>
        {/* No-JS fallback (§2): motion SSRs its hidden initial state as inline
            styles; when JS is disabled nothing would ever animate in. This
            override — active only without JS — forces every animated element
            visible. With JS on it never applies, so there is no flash. */}
        <noscript>
          <style>{`.anim{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

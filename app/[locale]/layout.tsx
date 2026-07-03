import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import type {Metadata, Viewport} from 'next';
import {Archivo, Geist_Mono} from 'next/font/google';
import {notFound} from 'next/navigation';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';
import {localeMeta, siteUrl} from '@/lib/site';
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

// The whole behavior layer (~2 KB): reveals, hero width axis, scroll-spy,
// mobile menu, locale-switch scroll restore, copy button. Read once at build
// time and inlined — the page ships zero framework JavaScript (§2 budget).
const enhanceJs = readFileSync(join(process.cwd(), 'lib/enhance.js'), 'utf8');

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
      locale: meta.ogLocale,
      images: [
        {
          url: `/og/og-${active}.png`,
          width: 1200,
          height: 630,
          alt: meta.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`/og/og-${active}.png`]
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
    <html lang={locale} className={`${archivo.variable} ${geistMono.variable}`}>
      <body>
        {/* Before first paint: mark JS availability. Hidden pre-animation
            states in CSS apply only under html.js — so without JavaScript the
            page is complete and visible by construction (§2). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')"
          }}
        />
        {children}
        {/* The entire behavior layer, inlined at build time. */}
        <script dangerouslySetInnerHTML={{__html: enhanceJs}} />
      </body>
    </html>
  );
}

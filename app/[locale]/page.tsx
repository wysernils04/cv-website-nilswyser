import {notFound} from 'next/navigation';
import {hasLocale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import {routing, type Locale} from '@/i18n/routing';
import {getContent} from '@/content';
import {hasPlaceholder} from '@/lib/placeholders';
import {siteUrl, social} from '@/lib/site';
import {Nav} from '@/components/nav';
import {Hero} from '@/components/hero';
import {About} from '@/components/about';
import {Experience} from '@/components/experience';
import {Projects} from '@/components/projects';
import {Skills} from '@/components/skills';
import {Contact} from '@/components/contact';
import {Footer} from '@/components/footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

function SkipLink() {
  const t = useTranslations('a11y');
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-100 -translate-y-20 border border-line bg-surface px-4 py-2 text-fg transition-transform focus-visible:translate-y-0"
    >
      {t('skipToContent')}
    </a>
  );
}

export default function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = use(params);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const content = getContent(locale as Locale);

  // JSON-LD Person (§7). `sameAs` includes only real URLs — the LinkedIn
  // placeholder is excluded until §10.3 is answered.
  const sameAs: string[] = [social.github];
  if (!hasPlaceholder(content.contact.linkedin)) {
    sameAs.push(content.contact.linkedin);
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nils Wyser',
    jobTitle: locale === 'de' ? 'IT-Spezialist' : 'IT Specialist',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Basel',
      addressCountry: 'CH'
    },
    url: `${siteUrl}/${locale}`,
    sameAs
  };

  return (
    <>
      <SkipLink />
      <div id="top" />
      <Nav locale={locale} />
      <main id="main">
        <Hero {...content.hero} />
        <About content={content.about} />
        <Experience content={content.experience} />
        <Projects content={content.projects} />
        <Skills content={content.skills} />
        <Contact content={content.contact} />
      </main>
      <Footer contact={content.contact} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </>
  );
}

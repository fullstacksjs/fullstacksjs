import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { i18nComponents as tc } from '@/i18n/i18nComponents';
import { routing } from '@/i18n/routing';

import { ContributorList } from './+components/Contributors/ContributorList';
import { Hero } from './+components/Hero';
import { DocSection, DocSectionText } from './+components/landing/DocSection';

const values = ['ethics', 'validity', 'professionalism'] as const;

export default async function Home({
  params,
}: SafeLocale<PageProps<'/[locale]'>>) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'main' });

  return (
    <div className="min-h-full">
      <Hero />

      <DocSection id="about" comment="01 - about.md" title={t('about.title')}>
        <DocSectionText>{t.rich('about.content', tc)}</DocSectionText>
      </DocSection>

      <DocSection
        id="motivation"
        comment="02 - motivation.md"
        title={t('motivation.title')}
        sunken
      >
        <DocSectionText>{t.rich('motivation.content', tc)}</DocSectionText>
      </DocSection>

      <DocSection
        id="values"
        comment="03 - values.config.ts"
        title={t('values.title')}
      >
        <div className="grid grid-cols-1 gap-10 border-border">
          {values.map((value) => (
            <div key={value}>
              <h3 className="text-lg font-semibold">
                {t(`values.cards.${value}.title`)}
              </h3>
              <DocSectionText>{t(`values.cards.${value}.body`)}</DocSectionText>
            </div>
          ))}
        </div>
      </DocSection>

      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <DocSection
            id="contributors"
            comment="04 - git shortlog -sn"
            title={t('contributors.title')}
          >
            <ContributorList />
          </DocSection>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

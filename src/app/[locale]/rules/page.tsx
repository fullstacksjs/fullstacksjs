import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { FocusProvider } from '@/components/FocusItemList/FocusProvider';
import {
  FocusStep,
  FocusStepsSkeleton,
} from '@/components/FocusItemList/FocusStep';
import { generatePageOG } from '@/components/SEO/meta';
import { i18nComponents as tc } from '@/i18n/i18nComponents';
import { routing } from '@/i18n/routing';

import { PageHeader } from '../+components/PageHeader';
import { guidelines } from './guidelines';
import { rules } from './rules';

export const metadata = generatePageOG({
  title: 'FullstacksJS Community Rules: A Guide to Respectful Conduct',
  description:
    'The FullstacksJS community is committed to creating a safe and welcoming environment for everyone. These rules outline the behaviors that are considered harassment and unacceptable within our community. By following these rules, we can all help to create a positive and productive environment for learning and collaboration.',
});

export default async function RulesPage({
  params,
}: SafeLocale<PageProps<'/[locale]/rules'>>) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'rules' });

  return (
    <NextIntlClientProvider>
      <div className="container flex flex-col gap-12">
        <PageHeader
          command={t('eyebrow')}
          title={t('title')}
          description={t.rich('desc', tc)}
        />

        <Suspense
          fallback={
            <FocusStepsSkeleton
              className="h-24"
              lines={rules.length + guidelines.length}
            />
          }
        >
          <FocusProvider>
            <ol className="border-t border-border">
              {rules.map((rule, index) => (
                <FocusStep
                  key={rule}
                  number={index + 1}
                  target={rule}
                  title={t(`items.${rule}.title`)}
                >
                  <p className="mt-3 max-w-prose text-base/relaxed text-fg-1/80">
                    {t.rich(`items.${rule}.desc`, tc)}
                  </p>
                </FocusStep>
              ))}
            </ol>

            <section className="flex flex-col gap-20">
              <h2 className="text-3xl/none font-bold tracking-tight">
                {t('guidelines.title')}
              </h2>

              <ol className="border-t border-border">
                {guidelines.map((guide, index) => (
                  <FocusStep
                    key={guide}
                    number={index + 1}
                    target={guide}
                    title={t(`guidelines.items.${guide}.title`)}
                  >
                    <p className="mt-3 max-w-prose text-base/relaxed text-fg-1/80">
                      {t.rich(`guidelines.items.${guide}.desc`, tc)}
                    </p>
                  </FocusStep>
                ))}
              </ol>
            </section>
          </FocusProvider>
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

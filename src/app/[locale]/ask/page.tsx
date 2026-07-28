import type { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { FocusProvider } from '@/components/FocusItemList/FocusProvider';
import { generatePageOG } from '@/components/SEO/meta';
import { routing } from '@/i18n/routing';

import { PageHeader } from '../+components/PageHeader';
import { AskStep, AskStepsSkeleton } from './+components/AskStep';
import { asks } from './asks';

interface MetaDataProps {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata(
  props: MetaDataProps,
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams(searchParams);

  return generatePageOG({
    title:
      'How to Ask a Programming Question: A Guide to Getting the Help You Need',
    description:
      'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.',
    images: searchParams['focus']
      ? `/api/og/ask?${params.toString()}`
      : '/og/og.png',
  });
}

export default async function AskPage({
  params,
}: SafeLocale<PageProps<'/[locale]/ask'>>) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ask' });

  return (
    <NextIntlClientProvider>
      <div className="container flex flex-col gap-12">
        <PageHeader
          command={t('eyebrow')}
          title={t('title')}
          description={t('intro')}
        />

        <Suspense fallback={<AskStepsSkeleton lines={asks.length} />}>
          <FocusProvider>
            <ol className="border-t border-border">
              {asks.map((ask, index) => (
                <AskStep
                  desc={t(`guides.${ask}.desc`)}
                  key={ask}
                  number={index + 1}
                  target={ask}
                  title={t(`guides.${ask}.title`)}
                />
              ))}
            </ol>
          </FocusProvider>
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

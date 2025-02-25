import type { Metadata } from 'next';

import { Article } from '@/components/Article';
import { Articles } from '@/components/Articles';
import { FocusItem } from '@/components/FocusItemList/FocusItem';
import { FocusItemList } from '@/components/FocusItemList/FocusItemList';
import { FocusItemListSkeleton } from '@/components/FocusItemList/FocusItemListSkeleton';
import { generatePageOG } from '@/components/SEO';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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

export default async function AskPage({ params }: PageProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('ask');

  return (
    <NextIntlClientProvider>
      <Articles>
        <Article title={t('title')}>
          <FocusItemList
            fallback={
              <FocusItemListSkeleton className="h-44" lines={asks.length} />
            }
          >
            {asks.map((ask) => (
              <FocusItem key={ask} target={ask}>
                <p className="mb-2 text-accent-1">{t(`guides.${ask}.title`)}</p>
                <p className="text-light-0">{t(`guides.${ask}.desc`)}</p>
                <br />
              </FocusItem>
            ))}
          </FocusItemList>
        </Article>
      </Articles>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

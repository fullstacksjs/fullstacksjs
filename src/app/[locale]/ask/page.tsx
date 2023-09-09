import type { Metadata } from 'next';
import { NextIntlClientProvider, useLocale } from 'next-intl';

import { ogImage } from '@/components/SEO';
import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import AskContent from './AskContent';

const defaultTitle =
  'How to Ask a Programming Question: A Guide to Getting the Help You Need';
const description =
  'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.';

interface MetaDataProps {
  searchParams: Record<string, string>;
}

export function generateMetadata({ searchParams }: MetaDataProps): Metadata {
  const params = new URLSearchParams(searchParams);
  const images = {
    url: searchParams['focus']
      ? `/api/og/ask?${params.toString()}`
      : ogImage.url,
    alt: defaultTitle,
  };

  return {
    title: defaultTitle,
    description,
    openGraph: {
      title: defaultTitle,
      description,
      images,
    },
    twitter: {
      title: defaultTitle,
      description,
      images,
      card: 'summary_large_image',
    },
  };
}

export default async function AskPage() {
  const locale = useLocale() as Locales;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.ask}>
      <AskContent />
    </NextIntlClientProvider>
  );
}

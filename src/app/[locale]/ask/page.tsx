import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import AskContent from './AskContent';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const title =
  'How to Ask a Programming Question: A Guide to Getting the Help You Need';
const description =
  'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.';
const ogImage: OpenGraph['images'] = {
  url: '/og/og.png',
  alt: title,
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ogImage,
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
};

export default async function AskPage() {
  const locale = useLocale() as Locales;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.ask}>
      <AskContent />
    </NextIntlClientProvider>
  );
}

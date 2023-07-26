import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import RulesContent from './RulesContent';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const title = 'FullstacksJS Community Rules: A Guide to Respectful Conduct';
const description =
  'The FullstacksJS community is committed to creating a safe and welcoming environment for everyone. These rules outline the behaviors that are considered harassment and unacceptable within our community. By following these rules, we can all help to create a positive and productive environment for learning and collaboration.';
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

export default async function RulesPage() {
  const locale = useLocale() as Locales;
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.rules}>
      <RulesContent />
    </NextIntlClientProvider>
  );
}

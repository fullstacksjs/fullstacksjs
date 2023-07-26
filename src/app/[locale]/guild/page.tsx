import { NextIntlClientProvider, useLocale } from 'next-intl';

import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import { GuildContent } from './GuildContent';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const title = 'FullstacksJS - TypeScript Guild';

const description = 'We Grow together';
const ogImage: OpenGraph['images'] = {
  url: '/og/guild.png',
  alt: 'FullstacksJS - TypeScript Guild',
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

export default async function GuildPage() {
  const locale = useLocale();
  const messages = await getMessages(locale as Locales);

  return (
    <NextIntlClientProvider locale={locale} messages={messages.guild}>
      <GuildContent />
    </NextIntlClientProvider>
  );
}

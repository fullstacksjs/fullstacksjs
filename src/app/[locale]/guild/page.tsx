import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { NextIntlClientProvider, useLocale } from 'next-intl';

import {
  getSession,
  getSubscription,
} from '@/data-layer/supabase/SupabaseServer';
import type { Locales } from '@/i18n';
import { getMessages } from '@/i18n';

import { GuildContent } from './GuildContent';

const title = 'FullstacksJS - TypeScript Guild';

const description =
  "The TypeScript Guild is a community of TypeScript enthusiasts who are dedicated to mastering the language. We solve daily code challenges from the Type Challenge GitHub repository, and we collaborate to help each other learn and grow. If you're ready to take your TypeScript skills to the next level, join us today!";
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
  const session = await getSession();
  const isSubscribed = await getSubscription();

  return (
    <NextIntlClientProvider locale={locale} messages={messages.guild}>
      <GuildContent isSubscribed={isSubscribed} user={session?.user} />
    </NextIntlClientProvider>
  );
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO';
import { getSubscription } from '@/data-layer/supabase/getSubscription';
import { getSession } from '@/data-layer/supabase/SupabaseServer';

import { GuildContent } from './GuildContent';

export const metadata = generatePageOG({
  title: 'FullstacksJS - TypeScript Guild',
  description:
    "The TypeScript Guild is a community of TypeScript enthusiasts who are dedicated to mastering the language. We solve daily code challenges from the Type Challenge GitHub repository, and we collaborate to help each other learn and grow. If you're ready to take your TypeScript skills to the next level, join us today!",
  images: '/og/guild.png',
});

export default async function GuildPage() {
  const messages = await getMessages();
  const session = await getSession();
  const isSubscribed = await getSubscription();

  return (
    <NextIntlClientProvider messages={pick(messages, ['guild'])}>
      <GuildContent isSubscribed={isSubscribed} user={session?.user} />
    </NextIntlClientProvider>
  );
}

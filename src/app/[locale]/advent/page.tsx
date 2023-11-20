import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO';

import AdventContent from './AdventContent';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function AdventOfCodePage() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['advent'])}>
      <AdventContent />
    </NextIntlClientProvider>
  );
}

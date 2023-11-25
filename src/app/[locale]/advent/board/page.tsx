import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO';
import { getAdventLeaderboard } from '@/data-layer/advent';

import { Leaderboard } from './+components/Leaderboard';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS Board',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function WarPage() {
  const messages = await getMessages();
  const leaderboard = await getAdventLeaderboard();

  return (
    <NextIntlClientProvider messages={pick(messages, ['war'])}>
      <div
        dir="ltr"
        className="max-h-[500px] w-full overflow-y-auto rounded-3xl bg-advent-1 pe-10 ps-4"
      >
        <Leaderboard leaderboard={leaderboard} />
      </div>
    </NextIntlClientProvider>
  );
}

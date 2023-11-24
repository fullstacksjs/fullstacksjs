import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO';

import { AdventOfCodeClient } from '../+components/AdventOfCodeClient';
import { Leaderboard } from './+components/Leaderboard';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS Board',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function WarPage() {
  const messages = await getMessages();
  const leaderboard = AdventOfCodeClient.getLeaderboard();

  return (
    <NextIntlClientProvider messages={pick(messages, ['war'])}>
      <div dir="ltr" className="flex flex-col items-center gap-20">
        <div className="w-full rounded-3xl bg-[#262222] px-2 pt-8">
          <div className="max-h-[500px] overflow-y-auto">
            <Leaderboard leaderboard={leaderboard} />
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}

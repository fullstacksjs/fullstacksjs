import { generatePageOG } from '@/components/SEO';
import { getAdventLeaderboard } from '@/data-layer/advent';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { pick } from 'radash';

import { Leaderboard } from './+components/Leaderboard';

export const metadata = generatePageOG({
  title: 'Advent of Code: FullstacksJS Board',
  description: 'Join the FullstacksJS Advent of Code leaderboard',
  images: '/og/advent.png',
});

export default async function WarPage() {
  const messages = await getMessages();
  const t = await getTranslations();
  const leaderboard = await getAdventLeaderboard();

  return (
    <div className="flex flex-col gap-4">
      <NextIntlClientProvider messages={pick(messages, ['advent'])}>
        <div
          dir="ltr"
          className="max-h-[500px] overflow-y-auto rounded-3xl bg-advent-1 pe-10 ps-4"
        >
          <Leaderboard leaderboard={leaderboard} />
        </div>
        <div className="overflow-y-auto rounded-3xl bg-advent-1 px-10 py-12 text-center text-advent-2">
          {t('advent.update-delay')}
        </div>
      </NextIntlClientProvider>
    </div>
  );
}

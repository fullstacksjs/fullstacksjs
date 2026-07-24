import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO/meta';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { getReportWithCache } from '@/data-layer/wakatime/getReport';

import { Leaderboard } from './+components/Leaderboard';
import { StatStrip } from './+components/StatStrip';
import { Title } from './+components/Title';

export const metadata = generatePageOG({
  title:
    'FullstacksJS Leaderboards: Track Your Progress and See How You Stack Up Against Your Peers',
  description:
    'The FullstacksJS Leaderboards track the top coders, contributors, and learners in the FullstacksJS community. See how you stack up against your peers and track your progress over time.',
});

export default async function WakatimePage() {
  const feature = getServerFeature('wakatime');
  if (!feature) return notFound();

  const messages = await getMessages();
  const { day, year, usages, winners } = await getReportWithCache(50);

  return (
    <NextIntlClientProvider messages={pick(messages, ['wakatime'])}>
      <div className="container flex flex-col items-center gap-24 py-24">
        <Title day={day} year={year} />
        <StatStrip usages={usages} winners={winners} />
        <Leaderboard usages={usages} winners={winners} />
      </div>
    </NextIntlClientProvider>
  );
}

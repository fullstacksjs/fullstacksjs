import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { pick } from 'radash';

import { generatePageOG } from '@/components/SEO/meta';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { getReportWithCache } from '@/data-layer/wakatime/getReport';

import { PageHeader } from '../+components/PageHeader';
import { Leaderboard } from './+components/Leaderboard';

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
      <div className="container flex flex-col gap-16">
        <PageHeader
          command={`$ ${messages.wakatime.command}`}
          title={messages.wakatime.title}
          description={messages.wakatime.description}
        />
        <Leaderboard day={day} year={year} usages={usages} winners={winners} />
      </div>
    </NextIntlClientProvider>
  );
}

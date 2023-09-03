import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

import { Separator } from '@/components/Separator';
import { getReport } from '@/data-layer/wakatime/getReport';

import { Banner } from '../components/Banner';
import { Title } from './+components/Title';
import { UserTable } from './+components/UserTable';
import { WakatimeButton } from './+components/WakatimeButton';
import { Winner } from './+components/Winner';

const title =
  'FullstacksJS Leaderboards: Track Your Progress and See How You Stack Up Against Your Peers';
const description =
  'The FullstacksJS Leaderboards track the top coders, contributors, and learners in the FullstacksJS community. See how you stack up against your peers and track your progress over time.';
const ogImage: OpenGraph['images'] = {
  url: '/og/og.png',
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

export default async function WakatimePage() {
  const { day, year, usages, winners } = await getReport(50);

  return (
    <>
      <Banner
        cta={<WakatimeButton />}
        title={
          <div>
            FullstacksJS
            <br />
            Leaderboards
          </div>
        }
      />
      <Separator />
      <div className="flex flex-col items-center gap-20">
        <Title year={year} day={day} />

        <div className="hidden w-full items-center justify-center gap-12 rounded-3xl bg-bg-darker py-20 desktop:flex">
          <Winner className="rank-1 order-2" usage={winners[0]!} rank={1} />
          <Winner className="rank-2 order-1" usage={winners[1]!} rank={2} />
          <Winner className="rank-3 order-3" usage={winners[2]!} rank={3} />
        </div>

        <div className="w-full rounded-3xl bg-bg-darker px-2 pt-8">
          <div className="max-h-[500px] overflow-y-auto">
            <UserTable winners={winners} usages={usages} />
          </div>
        </div>
      </div>
    </>
  );
}

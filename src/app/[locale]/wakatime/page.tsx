import { generatePageOG } from '@/components/SEO';
import { Separator } from '@/components/Separator';
import { getReport } from '@/data-layer/wakatime/getReport';

import { Banner } from '../+components/Banner';
import { Title } from './+components/Title';
import { UserTable } from './+components/UserTable';
import { WakatimeButton } from './+components/WakatimeButton';
import { Winner } from './+components/Winner';

export const metadata = generatePageOG({
  title:
    'FullstacksJS Leaderboards: Track Your Progress and See How You Stack Up Against Your Peers',
  description:
    'The FullstacksJS Leaderboards track the top coders, contributors, and learners in the FullstacksJS community. See how you stack up against your peers and track your progress over time.',
  images: '/og/og.png',
});

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
        <Title day={day} year={year} />

        <div className="hidden w-full items-center justify-center gap-12 rounded-3xl bg-bg-darker py-20 desktop:flex">
          <Winner className="rank-1 order-2" rank={1} usage={winners[0]!} />
          <Winner className="rank-2 order-1" rank={2} usage={winners[1]!} />
          <Winner className="rank-3 order-3" rank={3} usage={winners[2]!} />
        </div>

        <div className="w-full rounded-3xl bg-bg-darker px-2 pt-8">
          <div className="max-h-[500px] overflow-y-auto">
            <UserTable usages={usages} winners={winners} />
          </div>
        </div>
      </div>
    </>
  );
}

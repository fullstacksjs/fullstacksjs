import { getReport } from '@/data-layer/getReport';

import Logo from './Logo.svg';
import { User } from './User';
import { Winner } from './Winner';

export default async function WakatimePage() {
  const { title, usages, winners } = await getReport(7);

  return (
    <div className="flex flex-col items-center gap-20 p-20">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <p className="w-[384px] text-center text-4xl font-bold leading-tight">
          FullstacksJS Wakatime Leaderboard
        </p>
        <p className="text-2xl font-bold text-accent-0">{title}</p>
      </div>

      <div className="flex items-end gap-8">
        <Winner className="rank-1 order-2" usage={winners[0]!} rank={1} />
        <Winner className="rank-2 order-1" usage={winners[1]!} rank={2} />
        <Winner className="rank-3 order-3" usage={winners[2]!} rank={3} />
      </div>

      <div className="flex flex-col gap-8">
        {usages.map((usage) => (
          <User key={usage.rank} usage={usage} />
        ))}
      </div>

      <div id="social-media" className="text-xsm font-bold text-accent-0">
        FullstacksJS.com
      </div>
    </div>
  );
}

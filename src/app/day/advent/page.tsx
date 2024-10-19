import { getAdventLeaderboard } from '@/data-layer/advent';
import Image from 'next/image';

import Banner from '../../[locale]/advent/+components/Advent.png';
import { Leaderboard } from '../../[locale]/advent/board/+components/Leaderboard';

export default async function WakatimeDay() {
  const leaderboard = (await getAdventLeaderboard()).slice(0, 10);

  return (
    <body className="container flex min-h-screen w-full flex-col items-center gap-12 overflow-x-hidden bg-advent-0 py-12 font-rajdhani text-base text-fg-0">
      <Image
        height={Banner.height}
        width={500}
        alt="FullstacksJS Advent of Code"
        className="self-center"
        src={Banner.src}
      />
      <div className="overflow-y-auto rounded-3xl bg-advent-1 pe-10 ps-4">
        <Leaderboard leaderboard={leaderboard} />
      </div>

      <div className="text-xsm font-bold text-accent-0" id="social-media">
        FullstacksJS.com
      </div>
    </body>
  );
}

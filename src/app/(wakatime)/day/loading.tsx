import { Skeleton } from '@/components/Skeleton';

import Logo from './Logo.svg';

export default function Loading() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <p className="text-2xl font-bold">Loading Leaderboard</p>
      </div>

      <div className="rounded-3xl flex flex-col gap-10 mb-10">
        <Skeleton
          style={{
            height: '400px',
            width: '900px',
          }}
        />
      </div>
      <div
        className="rounded-3xl flex flex-col gap-10"
        style={{ width: '900px' }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton
            className="relative w-full"
            key={i}
            style={{ height: '64px' }}
          />
        ))}
      </div>
    </div>
  );
}

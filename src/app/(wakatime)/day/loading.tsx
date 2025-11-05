import { UserTableSkeleton } from '@/app/[locale]/wakatime/+components/UserTable';
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
        <Skeleton height={400} width={900} />
      </div>
      <UserTableSkeleton rows={7} />
    </div>
  );
}

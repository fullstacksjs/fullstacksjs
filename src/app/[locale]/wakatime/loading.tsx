import { range } from '@fullstacksjs/toolbox';

import { Skeleton } from '@/components/Skeleton';

import { PageHeaderSkeleton } from '../+components/PageHeader';

export default function Loading() {
  return (
    <div className="container flex flex-col items-center gap-24 py-24">
      <PageHeaderSkeleton />

      <div className="flex w-full flex-wrap gap-12">
        {range(3).map((key) => (
          <Skeleton className="h-22.5 min-w-45 flex-1 rounded-lg" key={key} />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-16 desktop:grid-cols-3">
        {range(3).map((key) => (
          <Skeleton className="h-55 rounded-xl" key={key} />
        ))}
      </div>

      <div className="w-full">
        <Skeleton className="mb-8 h-24 w-55 rounded-md" />
        <Skeleton className="h-105 w-full rounded-lg" />
      </div>
    </div>
  );
}

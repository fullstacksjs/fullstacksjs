import { Skeleton } from '@/components/Skeleton';

import { TitleSkeleton } from './+components/Title';
import { UserTableSkeleton } from './+components/UserTable';

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-20">
      <TitleSkeleton />
      <Skeleton height={340} width="100%" className="rounded-md" />
      <UserTableSkeleton rows={10} />
    </div>
  );
}

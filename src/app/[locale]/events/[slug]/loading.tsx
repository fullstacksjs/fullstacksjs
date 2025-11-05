import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div dir="rtl" className="flex flex-col gap-16">
      <Skeleton className="w-full aspect-video" />
      <div className="flex flex-col items-start gap-16">
        <Skeleton className="h-16 w-1/3" />
        <div className="flex flex-col gap-8 w-full">
          <Skeleton width="100%" className="h-8 w-full" />
          <Skeleton width="100%" className="h-8 w-full" />
          <Skeleton width="90%" className="h-8 w-full" />
          <Skeleton width="40%" className="h-8 w-full" />
        </div>
        <Skeleton height={40} width={120} />
      </div>
    </div>
  );
}

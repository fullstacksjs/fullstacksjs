import { Skeleton } from '@/components/Skeleton';

export function ContributorsSkeleton() {
  const skeletonArray = Array(36)
    .fill(0)
    .map((_, index) => ({ id: index }));

  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      {skeletonArray.map((item) => (
        <Skeleton
          className="w-[80px] h-[80px] rounded-full bg-white/70 animate-pulse"
          key={item.id}
        />
      ))}
    </div>
  );
}

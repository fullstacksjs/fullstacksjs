import { Skeleton } from '@/components/Skeleton';

export const EventPageSkeleton = () => {
  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse gap-16 font-fa desktop:flex-row"
    >
      <article className="flex flex-col gap-16 wide:min-w-[600px] min-h-[300px] w-full">
        <Skeleton height="40px" width="40%" />
        <div className="flex flex-col gap-8">
          <Skeleton height="20px" width="100%" />
          <Skeleton height="20px" width="100%" />
          <Skeleton height="20px" width="80%" />
        </div>
        <div className="flex gap-6">
          <Skeleton height="40px" width="120px" />
          <Skeleton height="40px" width="120px" />
        </div>
      </article>
      <div className="desktop:min-w-[450px]">
        <Skeleton height="100%" width="100%" />
      </div>
    </div>
  );
};

import { Skeleton } from '@/components/Skeleton';

export const EventPageSkeleton = () => {
  return (
    <div
      dir="rtl"
      className="flex flex-col-reverse gap-16 font-fa desktop:flex-row"
    >
      <article className="flex flex-col gap-16 wide:min-w-[600px] min-h-[300px] w-full">
        <Skeleton style={{ width: '40%', height: '40px' }} />
        <div className="flex flex-col gap-8">
          <Skeleton style={{ width: '100%', height: '20px' }} />
          <Skeleton style={{ width: '100%', height: '20px' }} />
          <Skeleton style={{ width: '80%', height: '20px' }} />
        </div>
        <div className="flex gap-6">
          <Skeleton style={{ width: '120px', height: '40px' }} />
          <Skeleton style={{ width: '120px', height: '40px' }} />
        </div>
      </article>
      <div className="desktop:min-w-[450px]">
        <Skeleton style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

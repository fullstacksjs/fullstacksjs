import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl/none font-bold tracking-tight">
          Wakatime
        </h1>
        <p className="mt-2 mb-8">
          <Skeleton height={40} width={300} />
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-10 rounded-3xl">
        <Skeleton height={700} width={900} />
      </div>
    </div>
  );
}

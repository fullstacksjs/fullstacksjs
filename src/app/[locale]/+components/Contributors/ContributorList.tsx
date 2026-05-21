import { range } from '@fullstacksjs/toolbox';
import Image from 'next/image';

import { Skeleton } from '@/components/Skeleton';
import { getContributors } from '@/data-layer/github/getContributors';

export async function ContributorList() {
  const contributors = await getContributors();

  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {contributors.map(({ url, avatar, username }) => (
        <a
          className="group rounded-full"
          href={url}
          key={username}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            height={80}
            width={80}
            alt={username}
            className="inline-block size-20 rounded-full grayscale-100 transition-all duration-300 group-focus-within:grayscale-0 hover:scale-110 hover:grayscale-0 tablet:size-24"
            src={avatar}
            title={username}
          />
        </a>
      ))}
    </div>
  );
}

export function ContributorListSkeleton() {
  const items = range(42);

  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {items.map((item) => (
        <Skeleton
          className="size-32 animate-pulse rounded-full bg-white/70"
          key={item}
        />
      ))}
    </div>
  );
}

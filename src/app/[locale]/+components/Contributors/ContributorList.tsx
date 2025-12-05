import { range } from '@fullstacksjs/toolbox';
import Image from 'next/image';

import { Skeleton } from '@/components/Skeleton';
import { getContributors } from '@/data-layer/github/getContributors';

export async function ContributorList() {
  const contributors = await getContributors();

  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      {contributors.map(({ url, avatar, username }) => (
        <a
          className="rounded-full group"
          href={url}
          key={username}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            height={80}
            width={80}
            alt={username}
            className="rounded-full size-20 tablet:size-24 hover:scale-110 inline-block grayscale-100 group-focus-within:grayscale-0 hover:grayscale-0 transition-all duration-300"
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
    <div className="flex gap-5 flex-wrap justify-center items-center">
      {items.map((item) => (
        <Skeleton
          className="size-32 rounded-full bg-white/70 animate-pulse"
          key={item}
        />
      ))}
    </div>
  );
}

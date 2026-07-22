import Image from 'next/image';

import { ExternalLink } from '@/components/Link';
import { getContributors } from '@/data-layer/github/getContributors';

export async function ContributorList() {
  const contributors = await getContributors();

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center-safe gap-5">
      {contributors.map(({ url, avatar, username }) => (
        <ExternalLink className="group rounded-full" href={url} key={username}>
          <Image
            height={80}
            width={80}
            alt={username}
            className="size-20 rounded-full grayscale-100 transition-all duration-300 group-focus-within:grayscale-0 hover:scale-110 hover:grayscale-0"
            src={avatar}
            title={username}
          />
        </ExternalLink>
      ))}
    </div>
  );
}

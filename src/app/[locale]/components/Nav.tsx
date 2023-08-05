'use client';
import { comparePaths } from '@fullstacksjs/toolbox';
import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next-intl/link';

import type { Direction } from '@/hooks/useDirection';

import { Badge } from './Badge';

interface Props {
  href: string;
  children: React.ReactNode;
  direction: Direction;
  isNew?: boolean;
}

export default function Nav({ href, isNew, children, direction }: Props) {
  const selected = useSelectedLayoutSegment() ?? '';
  const isActive = comparePaths(selected, href) === 0;
  const isRtl = direction === 'rtl';

  return (
    <li
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'relative scroll-m-9 list-none uppercase transition-colors after:absolute after:bottom-[-3px] after:h-[3px] after:bg-current after:transition-[width]',
        {
          'after:w-8 text-fg-0': isActive,
          'after:w-0 hover:after:w-8 text-light-muted hover:text-fg-1':
            !isActive,
          'after:left-0': !isRtl,
          'after:right-0': isRtl,
        },
      )}
    >
      <Link
        href={href}
        className="flex items-center gap-2 rounded-sm text-base focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-accent-0 tablet:text-md"
      >
        {children}
        {isNew ? (
          <Badge
            className={clsx('desktop:absolute desktop:top-10', {
              'desktop:right-0': !isRtl,
              'desktop:left-0': isRtl,
            })}
          >
            New
          </Badge>
        ) : null}
      </Link>
    </li>
  );
}

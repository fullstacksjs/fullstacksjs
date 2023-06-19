'use client';
import { comparePaths } from '@fullstacksjs/toolbox';
import clsx from 'clsx';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import type { Direction } from '@/hooks/useDirection';

interface Props {
  href: string;
  children: React.ReactNode;
  direction: Direction;
}

export default function Nav({ href, children, direction }: Props) {
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
        className="rounded-sm text-base focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-accent-0 tablet:text-md"
      >
        {children}
      </Link>
    </li>
  );
}

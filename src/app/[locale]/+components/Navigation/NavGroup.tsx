'use client';

import { comparePaths } from '@fullstacksjs/toolbox';
import { useSelectedLayoutSegment } from 'next/navigation';

import { CircleBadge } from '@/components/CircleBadge';
import ChevronDownIcon from '@/components/Icons/ChevronDown.svg';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/cn';

import type { Nav } from './Navs';

import { NavLink } from './NavLink';

const isPathActive = (selected: string, href: string) =>
  comparePaths(selected, href) === 0;

interface Props {
  text: string;
  href?: string;
  subNavs?: Nav[];
  isNew?: boolean;
}

export const NavGroup = ({ text, href, subNavs, isNew }: Props) => {
  const segment = useSelectedLayoutSegment() ?? '';
  const isActive = href
    ? isPathActive(segment, href)
    : Boolean(subNavs?.find((n) => isPathActive(segment, n.href)));

  return (
    <div className="group relative">
      <Link
        href={href ?? '#'}
        type="button"
        className={cn(
          'flex min-w-[100px] items-center justify-between gap-4 uppercase rtl:text-xl whitespace-nowrap',
          {
            'text-fg-0': isActive,
            'text-light-muted': !isActive,
            'desktop:indent-8': isNew,
          },
        )}
      >
        {isNew ? (
          <CircleBadge className="hidden desktop:block absolute" />
        ) : null}
        {text}
        {!href ? <ChevronDownIcon /> : null}
      </Link>
      <div className="static top-full flex w-full flex-col gap-4 py-4 ps-2 desktop:absolute desktop:hidden desktop:ps-0 desktop:group-hover:flex rtl:ps-4 z-10">
        {subNavs?.map((c) => (
          <NavLink key={c.href} {...c}>
            {c.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

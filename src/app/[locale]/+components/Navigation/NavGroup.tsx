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
    <div className="group relative en:font-mono">
      <Link
        href={href ?? '#'}
        type="button"
        className={cn(
          'flex min-w-40 items-center justify-between gap-6 px-6 py-4 text-sm whitespace-nowrap lowercase transition-colors',
          'desktop:group-hover:bg-bg-raised desktop:hover:text-fg-0 rtl:text-md',
          {
            'text-fg-0': isActive,
            'rounded-t-md': subNavs,
            'rounded-md': !subNavs,
            'text-fg-1': !isActive,
            'desktop:indent-8': isNew,
          },
        )}
      >
        {isNew ? (
          <CircleBadge className="absolute hidden desktop:block" />
        ) : null}
        {text}
        {!href ? (
          <ChevronDownIcon
            width="16"
            className="transition-transform duration-200 desktop:group-hover:rotate-180"
          />
        ) : null}
      </Link>
      {subNavs && (
        <div className="static top-full z-10 flex w-full flex-col gap-2 desktop:absolute desktop:hidden desktop:w-max desktop:min-w-full desktop:gap-0 desktop:rounded-b-md desktop:bg-bg-raised desktop:shadow-lg desktop:group-hover:flex">
          {subNavs?.map((c) => (
            <NavLink className="lowercase" key={c.href} {...c}>
              {c.text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

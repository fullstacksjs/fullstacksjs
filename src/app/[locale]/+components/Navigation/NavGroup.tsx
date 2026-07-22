'use client';

import { comparePaths, isNullOrEmptyArray } from '@fullstacksjs/toolbox';

import { CircleBadge } from '@/components/CircleBadge';
import ChevronDownIcon from '@/components/Icons/ChevronDown.svg';
import { Link, usePathname } from '@/i18n/routing';
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
  const segment = usePathname();
  const isActive = href
    ? isPathActive(segment, href)
    : Boolean(subNavs?.find((n) => isPathActive(segment, n.href)));
  const isGroup = !isNullOrEmptyArray(subNavs);

  return (
    <div className="group relative border-bg-muted max-desktop:not-last:border-b en:font-mono">
      <Link
        href={href ?? '#'}
        type="button"
        className={cn(
          'flex min-w-40 items-center justify-between gap-4 px-4 py-6 transition-colors desktop:p-6',
          'text-sm whitespace-nowrap text-fg-1 lowercase rtl:text-md',
          'desktop:group-hover:bg-bg-raised',
          {
            'desktop:text-fg-0': isActive,
            'rounded-t-md desktop:hover:text-fg-0': isGroup,
            'rounded-md hover:text-fg-0': !isGroup,
            'desktop:indent-8': isNew,
          },
        )}
      >
        {isNew ? (
          <CircleBadge className="absolute hidden desktop:block" />
        ) : null}
        <span>
          {text}
          <span className={cn('desktop:hidden', { hidden: !isGroup })}>/</span>
        </span>
        {isGroup ? (
          <ChevronDownIcon
            width="16"
            className="hidden transition-transform duration-200 desktop:inline desktop:group-hover:rotate-180"
          />
        ) : null}
      </Link>
      {isGroup && (
        <div className="top-full z-10 flex w-full flex-col gap-2 overflow-clip px-0 desktop:absolute desktop:hidden desktop:w-max desktop:min-w-full desktop:gap-0 desktop:rounded-b-md desktop:bg-bg-raised desktop:p-0 desktop:shadow-lg desktop:group-hover:flex">
          {subNavs?.map((c) => (
            <NavLink
              className="lowercase max-desktop:last:pb-6"
              key={c.href}
              {...c}
            >
              {c.text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

'use client';

import type { MessageKeys, NestedKeyOf } from 'next-intl';

import { CircleBadge } from '@/components/CircleBadge';
import ChevronDownIcon from '@/components/Icons/ChevronDown.svg';
import { cn } from '@/utils/cn';
import { comparePaths } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';
import { useSelectedLayoutSegment } from 'next/navigation';

import { NavLink } from './NavLink';

type Keys = MessageKeys<
  IntlMessages['header']['navigation'],
  NestedKeyOf<IntlMessages['header']['navigation']>
>;

interface Props {
  text: Keys;
  children?: any[];
}

export const NavGroup = ({ text, children }: Props) => {
  const t = useTranslations('header.navigation');
  const selected = useSelectedLayoutSegment() ?? '';
  const activeChild = children?.find(
    (c) => comparePaths(selected, c.href) === 0,
  );
  const isNew = children?.some((c) => c.isNew);

  return (
    <div className="group relative" key={text}>
      <button
        type="button"
        className={cn(
          'flex min-w-[100px] items-center justify-between gap-4 uppercase rtl:text-xl',
          {
            'text-fg-0': activeChild,
            'text-light-muted': !activeChild,
          },
        )}
      >
        {isNew ? <CircleBadge className="hidden desktop:block" /> : null}
        {t(text)}
        <ChevronDownIcon />
      </button>
      <div className="static top-full flex w-full flex-col gap-4 py-4 ps-2 desktop:absolute desktop:hidden desktop:ps-0 desktop:group-hover:flex rtl:ps-4 z-10">
        {children?.map((c) => (
          <NavLink key={c.href} {...c}>
            {t(c.text)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

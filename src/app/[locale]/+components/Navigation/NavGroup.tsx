'use client';

import { comparePaths } from '@fullstacksjs/toolbox';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { MessageKeys, NestedKeyOf } from 'next-intl';
import { useTranslations } from 'next-intl';

import { CircleBadge } from '@/components/CircleBadge';
import ChevronDownIcon from '@/components/Icons/ChevronDown.svg';
import { cn } from '@/utils/cn';

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
    <div key={text} className="group relative">
      <button
        type="button"
        className={cn(
          'flex gap-4 rtl:text-xl items-center justify-between uppercase min-w-[100px]',
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
      <div className="static top-full flex w-full flex-col gap-4 py-4 ps-2 rtl:gap-6 rtl:py-8 rtl:ps-4 desktop:absolute desktop:hidden desktop:ps-0 desktop:group-hover:flex">
        {children?.map((c) => (
          <NavLink key={c.href} {...c}>
            {t(c.text)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

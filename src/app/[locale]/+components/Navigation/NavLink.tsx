'use client';

import { comparePaths } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';
import { useSelectedLayoutSegments } from 'next/navigation';

import { TextBadge } from '@/components/TextBadge';
import { useIsRTL } from '@/i18n/direction';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/cn';

interface Props {
  href: string;
  children: React.ReactNode;
  isNew?: boolean;
}

export function NavLink({ href, isNew, children }: Props) {
  const t = useTranslations('header.navigation');

  const selected = useSelectedLayoutSegments().join('/');
  const isActive = comparePaths(selected, href) === 0;
  const isRtl = useIsRTL();

  return (
    <li
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'relative scroll-m-9 list-none uppercase transition-colors after:absolute after:bottom-[-3px] after:h-[3px] after:bg-current after:transition-[width]',
        {
          'text-fg-0 after:w-8': isActive,
          'text-light-muted after:w-0 hover:text-fg-1 hover:after:w-8':
            !isActive,
          'after:left-0': !isRtl,
          'after:right-0': isRtl,
        },
      )}
    >
      <Link
        className="flex items-center gap-4 whitespace-nowrap rounded-sm text-base focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-accent-0 rtl:text-md"
        href={href}
      >
        {children} {isNew ? <TextBadge>{t('new')}</TextBadge> : null}
      </Link>
    </li>
  );
}

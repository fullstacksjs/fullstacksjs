'use client';

import { TextBadge } from '@/components/TextBadge';
import { useIsRTL } from '@/hooks/useDirection';
import { Link } from '@/navigation';
import { cn } from '@/utils/cn';
import { comparePaths } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';
import { useSelectedLayoutSegments } from 'next/navigation';

interface Props {
  href: string;
  children: React.ReactNode;
  isNew?: boolean;
}

export function NavLink({ href, isNew, children }: Props) {
  const t = useTranslations();
  const selected = useSelectedLayoutSegments().join('/');
  const isActive = comparePaths(selected, href) === 0;
  const isRtl = useIsRTL();

  return (
    <li
      aria-current={isActive ? 'page' : undefined}
      className={cn(
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
        className="flex items-center gap-4 whitespace-nowrap rounded-sm text-base focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-accent-0 rtl:text-md"
        href={href}
      >
        {children}{' '}
        {isNew ? <TextBadge>{t('header.navigation.new')}</TextBadge> : null}
      </Link>
    </li>
  );
}

'use client';

import { comparePaths } from '@fullstacksjs/toolbox';
import { useTranslations } from 'next-intl';

import { TextBadge } from '@/components/TextBadge';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/utils/cn';

interface Props {
  href: string;
  children: React.ReactNode;
  isNew?: boolean;
  className?: string;
}

export function NavLink({ href, isNew, children, className }: Props) {
  const t = useTranslations('header.navigation');

  const selected = usePathname();
  const isActive = comparePaths(selected, href) === 0;

  return (
    <li
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'list-none transition-colors',
        { 'text-fg-0': isActive },
        className,
      )}
    >
      <Link
        className={cn(
          [
            'flex items-center gap-6 p-6 text-sm whitespace-nowrap transition-colors',
            'focus-visible:outline-1 focus-visible:outline-accent-0 desktop:hover:bg-bg-muted desktop:hover:text-fg-0',
          ],
          isActive ? 'text-fg-0' : 'text-fg-1',
        )}
        href={href}
      >
        <span>{children}</span>
        {isNew ? <TextBadge>{t('new')}</TextBadge> : null}
      </Link>
    </li>
  );
}

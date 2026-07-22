'use client';

import type { Locale } from '@/i18n/locales';

import { Button } from '@/components/Button';
import { Link, usePathname } from '@/i18n/routing';

import GlobeIcon from './Globe.svg';

export const LocaleSelect = ({ locale }: { locale: Locale }) => {
  const otherLocale = locale === 'en' ? 'fa' : 'en';
  const pathname = usePathname();

  return (
    <Button className="gap-4" variant="outline" size="sm" asChild>
      <Link href={pathname} locale={otherLocale}>
        <GlobeIcon />
        <span className="font-mono uppercase">{otherLocale}</span>
      </Link>
    </Button>
  );
};

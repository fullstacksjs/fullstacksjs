import type { Locale } from '@/i18n/locales';

import { getDirection } from '@/i18n/direction';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { AuthBtnSkeleton } from './Auth/AuthButtonSkeleton';
import { Authentication } from './Auth/Authentication';
import { LocaleSelect } from './LocaleSelect';
import { DesktopNavs } from './Navigation/DesktopNavs';
import { MobileNavs } from './Navigation/MobileNavs';
import { Navs } from './Navigation/Navs';

export async function Header() {
  const locale = (await getLocale()) as Locale;
  const direction = getDirection(locale);

  return (
    <div className="flex items-center justify-between">
      <DesktopNavs />
      <MobileNavs direction={direction}>
        <Navs />
      </MobileNavs>
      <div className="flex items-center gap-4 wide:gap-16">
        <NextIntlClientProvider>
          <LocaleSelect locale={locale} />
        </NextIntlClientProvider>
        <Suspense fallback={<AuthBtnSkeleton />}>
          <Authentication />
        </Suspense>
      </div>
    </div>
  );
}

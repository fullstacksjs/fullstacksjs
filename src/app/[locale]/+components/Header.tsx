import { useLocale } from 'next-intl';
import { Suspense } from 'react';

import type { Locales } from '@/locales';

import { AuthBtnSkeleton } from './Auth/AuthButtonSkeleton';
import { Authentication } from './Auth/Authentication';
import { LocaleSelect } from './LocaleSelect';
import { DesktopNavs } from './Navigation/DesktopNavs';
import { MobileNavs } from './Navigation/MobileNavs';
import { Navs } from './Navigation/Navs';

export function Header(): React.JSX.Element {
  const locale = useLocale() as Locales;

  return (
    <div className="flex items-center justify-between">
      <DesktopNavs />
      <MobileNavs>
        <Navs />
      </MobileNavs>
      <div className="flex items-center gap-4 wide:gap-16">
        <LocaleSelect locale={locale} />
        <Suspense fallback={<AuthBtnSkeleton />}>
          <Authentication />
        </Suspense>
      </div>
    </div>
  );
}

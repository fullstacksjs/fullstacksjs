import { useLocale } from 'next-intl';
import { Suspense } from 'react';

import { useDirection } from '@/hooks/useDirection';
import type { Locales } from '@/i18n';

import { AuthBtnSkeleton } from './Auth/AuthButtonSkeleton';
import { Authentication } from './Auth/Authentication';
import { LocaleSelect } from './LocaleSelect';
import { MobileNavs } from './MobileNavs';
import Navs from './Navs';

export function Header(): React.JSX.Element {
  const direction = useDirection() === 'ltr' ? 'left' : 'right';
  const locale = useLocale() as Locales;

  return (
    <div className="flex items-center justify-between">
      <ul className="hidden gap-8 text-md font-bold leading-tight tablet:gap-16 desktop:inline-flex">
        <Navs />
      </ul>
      <MobileNavs direction={direction}>
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

import { useLocale, useTranslations } from 'next-intl';

import { useDirection } from '@/hooks/useDirection';
import type { Locales } from '@/i18n';

import { Authentication } from './Authentication';
import { LocaleSelect } from './LocaleSelect';
import { MobileNavs } from './MobileNavs';
import Navs from './Navs';

export function Header(): React.JSX.Element {
  const t = useTranslations('header');
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
        <Authentication loginText={t('auth.login')} />
      </div>
    </div>
  );
}

import { useTranslations } from 'next-intl';

import { Authentication } from './Authentication';
import { MobileNavs } from './MobileNavs';
import Navs from './Navs';

export default function Header(): React.JSX.Element {
  const t = useTranslations('header');

  return (
    <div className="flex items-center justify-between">
      <ul className="hidden gap-8 text-md font-bold leading-tight tablet:inline-flex tablet:gap-16">
        <Navs />
      </ul>
      <MobileNavs>
        <Navs />
      </MobileNavs>
      <div className="flex items-center gap-16">
        <Authentication loginText={t('auth.login')} />
      </div>
    </div>
  );
}

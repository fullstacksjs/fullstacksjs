import { useTranslations } from 'next-intl';

import { Authentication } from './Authentication';
import Navs from './Navs';

export default function Header(): React.JSX.Element {
  const t = useTranslations('header');

  return (
    <div className="flex items-center justify-between">
      <Navs />
      <div className="flex items-center gap-16">
        <Authentication loginText={t('auth.login')} />
      </div>
    </div>
  );
}

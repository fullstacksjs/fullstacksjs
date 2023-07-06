import { useTranslations } from 'next-intl';

import JoinButton from './JoinButton';
import Logo from './Logo.svg';

export default function Banner(): JSX.Element {
  const t = useTranslations('hero');

  return (
    <header className="flex flex-col items-center justify-between gap-12 desktop:flex-row">
      <div className="flex flex-col items-center gap-16 desktop:items-start">
        <div className="flex flex-col items-center gap-2 desktop:items-start">
          <h1 className="text-4xl font-bold leading-tight desktop:text-5xl">
            FullstacksJS
          </h1>
          <p className="text-sm uppercase text-fg-1 desktop:text-md">
            {t('vision')}
          </p>
        </div>

        <JoinButton />
      </div>
      <Logo className="-order-1 w-[20rem] desktop:order-none desktop:w-[40rem] wide:w-[47rem]" />
    </header>
  );
}

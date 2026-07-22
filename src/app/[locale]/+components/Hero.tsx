import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button';
import { C2AButton } from '@/components/C2AButton';
import Telegram from '@/components/Icons/Telegram.svg';
import { ExternalLink } from '@/components/Link';

import Logo from './Logo.svg';

export const Hero = () => {
  const t = useTranslations('main');

  return (
    <section id="join" className="pt-20 pb-30">
      <div className="container flex flex-col items-center justify-between gap-16 text-center desktop:flex-row desktop:text-start">
        <div>
          <h1 className="text-4xl/none font-bold tracking-tight desktop:text-5xl/none">
            Fullstacks<span className="text-accent-0">JS</span>
          </h1>
          <div className="mb-8 inline-flex items-center gap-4">
            <span className="hidden h-1 w-8 bg-current desktop:inline-block" />
            <span className="text-xl font-semibold tracking-tight lowercase">
              {t('slogan')}
            </span>
          </div>
          <p className="mb-10 max-w-200 text-md/normal text-fg-1">
            {t('hero.lead')}
          </p>

          <div className="flex justify-center gap-4 desktop:justify-start">
            <C2AButton asChild>
              <ExternalLink
                className="inline-flex gap-2 ps-9"
                href="https://t.me/fullstacksjs"
              >
                <Telegram width="24" />
                {t('hero.join')}
              </ExternalLink>
            </C2AButton>
            <Button asChild variant="outline">
              <ExternalLink
                className="inline-flex flex-1 gap-2 break-keep whitespace-nowrap desktop:flex-0"
                href="https://t.me/fullstacks_academy"
              >
                {t('hero.academy')}
              </ExternalLink>
            </Button>
          </div>
        </div>
        <Logo className="-order-1 mx-auto w-100 transition-all desktop:order-0 desktop:mx-0 desktop:w-130 wide:w-160" />
      </div>
    </section>
  );
};

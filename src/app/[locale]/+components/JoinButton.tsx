import { useTranslations } from 'next-intl';

import { Button } from '@/components/Button';

export const JoinButton = () => {
  const t = useTranslations('hero');

  return (
    <Button
      asChild
      className="uppercase outline-1 outline-offset-4 outline-accent-0 ring-4 ring-accent-0/30 hover:ring-[6px] hover:ring-accent-0/40 focus:outline"
    >
      <a
        href="https://t.me/fullstacksjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('join')}
      </a>
    </Button>
  );
};

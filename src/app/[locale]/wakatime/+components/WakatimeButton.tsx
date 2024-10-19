import { Button } from '@/components/Button';
import { useTranslations } from 'next-intl';

export const WakatimeButton = () => {
  const t = useTranslations('wakatime');

  return (
    <Button
      asChild
      className="uppercase outline-1 outline-offset-4 outline-accent-0 ring-4 ring-accent-0/30 hover:ring-[6px] hover:ring-accent-0/40 focus:outline"
    >
      <a
        href="https://kutt.it/fsk-waka"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('join')}
      </a>
    </Button>
  );
};

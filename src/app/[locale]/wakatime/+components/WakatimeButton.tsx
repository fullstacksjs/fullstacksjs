import { C2AButton } from '@/components/C2AButton';
import { useTranslations } from 'next-intl';

export const WakatimeButton = () => {
  const t = useTranslations('wakatime');

  return (
    <C2AButton asChild>
      <a
        href="https://kutt.it/fsk-waka"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('join')}
      </a>
    </C2AButton>
  );
};

import { useTranslations } from 'next-intl';

import { C2AButton } from '@/components/C2AButton';

export const WakatimeButton = () => {
  const t = useTranslations('wakatime');

  return (
    <C2AButton asChild>
      <a
        href="https://wakatime.com/leaders/sec/bf50f418-a6b5-4d3f-8147-6115d95ac4c6/join/oaajrudaay"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('join')}
      </a>
    </C2AButton>
  );
};

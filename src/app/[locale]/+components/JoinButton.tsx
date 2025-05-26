import { useTranslations } from 'next-intl';

import { C2AButton } from '@/components/C2AButton';

export const JoinButton = () => {
  const t = useTranslations('hero');

  return (
    <C2AButton asChild>
      <a
        href="https://t.me/fullstacksjs"
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('join')}
      </a>
    </C2AButton>
  );
};

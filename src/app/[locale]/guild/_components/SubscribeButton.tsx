import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { subscribe } from '@/data-layer/supabase/subscribe';
import { useServerActions } from '@/hooks/useServerActions';

import { SpaceButton } from './SpaceButton';

export const SubscribeButton = () => {
  const t = useTranslations();
  const { mutate, loading } = useServerActions(subscribe, {
    keepLoading: true,
  });

  return (
    <SpaceButton
      className={clsx({ 'w-60': !loading, 'w-14': loading })}
      loading={loading}
      onClick={mutate}
    >
      {t('join')}
    </SpaceButton>
  );
};

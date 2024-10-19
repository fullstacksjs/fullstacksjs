import { unsubscribe } from '@/data-layer/supabase/unsubscribe';
import { useServerActions } from '@/hooks/useServerActions';
import { useTranslations } from 'next-intl';

import { SpaceButton } from './SpaceButton';

export const Unsubscribe = () => {
  const t = useTranslations('guild');
  const { loading, mutate } = useServerActions(unsubscribe, {
    keepLoading: true,
  });

  return loading ? (
    <SpaceButton loading={loading} />
  ) : (
    <div className="text-center">
      <div className="mb-4">
        {t.rich('subscribed', {
          a: (chunk) => (
            <a
              className="text-accent-0"
              href="https://t.me/fullstacksjs/163219"
            >
              {chunk}
            </a>
          ),
        })}
      </div>
      <button className="text-sm text-red-400" type="button" onClick={mutate}>
        {t('unsubscribe')}
      </button>
    </div>
  );
};

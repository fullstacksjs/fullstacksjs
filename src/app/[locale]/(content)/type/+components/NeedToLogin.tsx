import { useTranslations } from 'next-intl';

import { signIn } from '@/data-layer/supabase/signIn';

export const NeedToLogin = () => {
  const t = useTranslations('type');

  return (
    <p className="text-fg-1">
      {t.rich('sign-in', {
        join: (chunk) => (
          <button className="text-accent-0" type="button" onClick={signIn}>
            {chunk}
          </button>
        ),
      })}
    </p>
  );
};

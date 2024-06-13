import { useTranslations } from 'next-intl';

import { useSignIn } from '@/data-layer/supabase/useSignIn';

export const NeedToLogin = () => {
  const { signIn } = useSignIn();
  const t = useTranslations('type');

  return (
    <p className="text-fg-1">
      {t.rich('sign-in', {
        join: (chunk) => (
          <button type="button" className="text-accent-0" onClick={signIn}>
            {chunk}
          </button>
        ),
      })}
    </p>
  );
};

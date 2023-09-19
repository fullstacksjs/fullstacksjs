import { useTranslations } from 'next-intl';

import { useSignIn } from '@/data-layer/supabase/useSignIn';

export const NeedToLogin = () => {
  const t = useTranslations<'guild'>();
  const { signIn } = useSignIn();

  return (
    <p className="text-fg-1">
      {t.rich('sign-in', {
        join: (chunk) => (
          <button className="text-accent-0" onClick={signIn}>
            {chunk}
          </button>
        ),
      })}
    </p>
  );
};

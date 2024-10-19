import { useSignIn } from '@/data-layer/supabase/useSignIn';
import { useTranslations } from 'next-intl';

export const NeedToLogin = () => {
  const { signIn } = useSignIn();
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

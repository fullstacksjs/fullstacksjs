import { useSignIn } from '@/data-layer/supabase/useSignIn';

export const NeedToLogin = () => {
  const { signIn } = useSignIn();

  return (
    <p className="text-fg-1">
      <button className="text-accent-0" onClick={signIn}>
        Log in
      </button>{' '}
      to submit your record
    </p>
  );
};

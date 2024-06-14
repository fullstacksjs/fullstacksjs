import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useSupabase } from './SupabaseProvider';

export const useSignIn = () => {
  const { supabase } = useSupabase();
  const router = useRouter();

  const signIn = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.toString() },
    });
    router.refresh();
  }, [router, supabase.auth]);

  return { signIn };
};

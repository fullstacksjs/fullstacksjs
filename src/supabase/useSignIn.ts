import { useCallback } from 'react';

import { useSupabase } from './SupabaseProvider';

export const useSignIn = () => {
  const { supabase } = useSupabase();

  const signIn = useCallback(async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
    // router.refresh();
  }, [supabase.auth]);

  return { signIn, status: 'success' };
};

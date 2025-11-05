import { createBrowserSupabaseClient } from './createBrowserSupabaseClient';

export const signIn = async () => {
  const supabase = createBrowserSupabaseClient();
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: window.location.toString() },
  });
};

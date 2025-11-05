'use client';

import LogoutIcon from '@/components/Logout.svg';
import { SecondaryButton } from '@/components/SecondaryButton';
import { createBrowserSupabaseClient } from '@/data-layer/supabase/createBrowserSupabaseClient';

import { LoginButton } from './LoginButton';

interface Props {
  children: string;
  avatar: string;
}

export const ProfileButton = ({ children, avatar }: Props) => {
  const signOut = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
  };

  return (
    <div className="flex gap-2">
      <LoginButton disabled avatar={avatar}>
        {children}
      </LoginButton>
      <SecondaryButton
        aria-label="logout"
        className="aspect-square justify-center"
        type="submit"
        onClick={signOut}
      >
        <LogoutIcon className="size-10" />
      </SecondaryButton>
    </div>
  );
};

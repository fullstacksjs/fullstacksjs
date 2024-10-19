'use client';

import LogoutIcon from '@/components/Logout.svg';
import { SecondaryButton } from '@/components/SecondaryButton';
import { useSupabase } from '@/data-layer/supabase/SupabaseProvider';

import { LoginButton } from './LoginButton';

interface Props {
  children: string;
  avatar: string;
}

export const ProfileButton = ({ children, avatar }: Props) => {
  const { supabase } = useSupabase();

  return (
    <div className="flex gap-2">
      <LoginButton avatar={avatar}>{children}</LoginButton>
      <SecondaryButton
        className="aspect-square justify-center"
        type="submit"
        onClick={() => supabase.auth.signOut()}
      >
        <LogoutIcon className="size-10" />
      </SecondaryButton>
    </div>
  );
};

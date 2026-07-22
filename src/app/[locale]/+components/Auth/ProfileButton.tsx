'use client';

import LogoutIcon from '@/components/Logout.svg';
import { createBrowserSupabaseClient } from '@/data-layer/supabase/createBrowserSupabaseClient';

import { BaseAuthButton } from './BaseAuthButton';

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
    <BaseAuthButton onClick={signOut} avatar={avatar}>
      <div className="flex flex-row items-center gap-4">
        <span className="text-trim-both leading-0">{children}</span>
        <span className="text-fg-muted">|</span>{' '}
        <LogoutIcon className="size-10" />
      </div>
    </BaseAuthButton>
  );
};

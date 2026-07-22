'use client';

import { signIn } from '@/data-layer/supabase/signIn';

import { BaseAuthButton } from './BaseAuthButton';

interface Props {
  children: React.ReactNode;
  avatar: string;
}

export function LoginButton({ avatar, children }: Props) {
  return (
    <BaseAuthButton size={22} avatar={avatar} onClick={signIn}>
      {children}
    </BaseAuthButton>
  );
}

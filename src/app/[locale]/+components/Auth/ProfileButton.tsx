'use client';

import LogoutIcon from '@/components/Logout.svg';
import { SecondaryButton } from '@/components/SecondaryButton';

import { LoginButton } from './LoginButton';

interface Props {
  children: string;
  avatar: string;
}

export const ProfileButton = ({ children, avatar }: Props) => {
  return (
    <div className="flex gap-2">
      <LoginButton avatar={avatar}>{children}</LoginButton>
      <form action="/api/auth/sign-out" method="POST">
        <SecondaryButton type="submit" className="aspect-square justify-center">
          <LogoutIcon className="size-10" />
        </SecondaryButton>
      </form>
    </div>
  );
};

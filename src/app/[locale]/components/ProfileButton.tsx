'use client';

import LogoutIcon from '@/components/Logout.svg';
import SecondaryButton from '@/components/SecondaryButton';
import { firebaseAuth } from '@/firebase/firebase';

import LoginButton from './LoginButton';

interface Props {
  children: string;
  avatar: string;
}

export const ProfileButton = ({ children, avatar }: Props) => {
  const logout = () => firebaseAuth.signOut();

  return (
    <div className="flex gap-2">
      <LoginButton avatar={avatar}>{children}</LoginButton>
      <SecondaryButton
        className="aspect-square justify-center"
        onClick={logout}
      >
        <LogoutIcon className="h-10 w-10" />
      </SecondaryButton>
    </div>
  );
};

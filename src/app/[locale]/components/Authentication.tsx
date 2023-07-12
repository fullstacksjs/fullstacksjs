'use client';
import { useAuthState, useSignInWithGithub } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '@/firebase/firebase';

import AuthBtnSkeleton from './AuthButtonSkeleton';
import GithubOutlineIcon from './GithubIcon.svg?url';
import LoginButton from './LoginButton';
import { ProfileButton } from './ProfileButton';

interface Props {
  loginText: string;
}

export const Authentication = ({ loginText }: Props): JSX.Element => {
  const [user, isLoading] = useAuthState(firebaseAuth);
  const [login] = useSignInWithGithub(firebaseAuth);

  if (isLoading) return <AuthBtnSkeleton />;

  if (user != null)
    return (
      <ProfileButton avatar={user.photoURL!}>{user.displayName!}</ProfileButton>
    );

  return (
    <LoginButton
      avatar={GithubOutlineIcon.src}
      alt="Github Logo"
      width={16}
      height={16}
      onClick={() => login()}
    >
      {loginText}
    </LoginButton>
  );
};

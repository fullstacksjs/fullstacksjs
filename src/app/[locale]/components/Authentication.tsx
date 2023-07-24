'use client';
import { useAuthState, useSignInWithGithub } from 'react-firebase-hooks/auth';
import { useAuth } from 'reactfire';

import AuthBtnSkeleton from './AuthButtonSkeleton';
import GithubOutlineIcon from './GithubIcon.svg?url';
import LoginButton from './LoginButton';
import { ProfileButton } from './ProfileButton';

interface Props {
  loginText: string;
}

export const Authentication = ({ loginText }: Props) => {
  const auth = useAuth();
  const [user, isLoading] = useAuthState(auth);
  const [login, _, isSigningIn] = useSignInWithGithub(auth);

  if (isLoading || isSigningIn) return <AuthBtnSkeleton />;

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
      onClick={() => login().catch(console.error)}
    >
      {loginText}
    </LoginButton>
  );
};

'use client';
import { useUser } from 'reactfire';

import { useSignIn } from '@/firebase/useSignIn';

import AuthBtnSkeleton from './AuthButtonSkeleton';
import GithubOutlineIcon from './GithubIcon.svg?url';
import LoginButton from './LoginButton';
import { ProfileButton } from './ProfileButton';

interface Props {
  loginText: string;
}

export const Authentication = ({ loginText }: Props) => {
  const { data: user, status: userStatus } = useUser();
  const { signIn, status: signInStatus } = useSignIn();
  const isLoading = signInStatus === 'loading' || userStatus === 'loading';

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
      onClick={() => signIn().catch(console.error)}
    >
      {loginText}
    </LoginButton>
  );
};

'use client';
import { signIn, useSession } from 'next-auth/react';

import AuthBtnSkeleton from './AuthButtonSkeleton';
import GithubOutlineIcon from './GithubIcon.svg?url';
import LoginButton from './LoginButton';
import { ProfileButton } from './ProfileButton';

interface Props {
  loginText: string;
}

export const Authentication = ({ loginText }: Props): JSX.Element => {
  const { data, status } = useSession();
  const isLoading = status === 'loading';
  const login = () => signIn('github');

  if (isLoading) return <AuthBtnSkeleton />;

  if (data?.user)
    return (
      <ProfileButton avatar={data.user.image!}>{data.user.name!}</ProfileButton>
    );

  return (
    <LoginButton
      avatar={GithubOutlineIcon.src}
      alt="Github Logo"
      width={16}
      height={16}
      onClick={login}
    >
      {loginText}
    </LoginButton>
  );
};

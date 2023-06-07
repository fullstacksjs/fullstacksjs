'use client';
import { useSession } from 'next-auth/react';

import LoginButton from '@/app/[locale]/components/LoginButton';

import AuthBtnSkeleton from './AuthButtonSkeleton';
import ProfileBtn from './ProfileButton';

export const Authentication = (): JSX.Element => {
  const { data, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  if (isLoading) return <AuthBtnSkeleton />;
  if (isAuthenticated && data?.user)
    return <ProfileBtn name={data.user.name!} avatar={data.user.image!} />;

  return <LoginButton />;
};

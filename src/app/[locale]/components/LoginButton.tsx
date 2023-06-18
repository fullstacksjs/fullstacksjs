'use client';
import { signIn } from 'next-auth/react';

import SecondaryButton from '@/components/SecondaryButton';

import GithubOutlineIcon from './GithubIcon.svg';

function LoginButton() {
  const handleLogin = () => {
    void signIn('github');
  };

  return (
    <SecondaryButton onClick={handleLogin}>
      <div className="rounded-full border border-fg-0 bg-bg-0 p-3.5">
        <GithubOutlineIcon />
      </div>
      <p className="hidden tablet:mr-2 tablet:block">Login with Github</p>
    </SecondaryButton>
  );
}

export default LoginButton;

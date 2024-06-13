'use client';
import Image from 'next/image';

import { SecondaryButton } from '@/components/SecondaryButton';
import { useSignIn } from '@/data-layer/supabase/useSignIn';

import { AuthBtnSkeleton } from './AuthButtonSkeleton';

interface Props {
  children: string;
  avatar: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function LoginButton({
  avatar,
  children,
  width = 35,
  height = 35,
  alt = `${children}'s avatar`,
}: Props) {
  const { signIn } = useSignIn();

  return (
    <SecondaryButton onClick={signIn}>
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-fg-0 bg-dark-0 tablet:size-14">
        <Image src={avatar} width={width} height={height} alt={alt} />
      </div>
      <p className="hidden tablet:me-2 tablet:block desktop:hidden wide:block">
        {children}
      </p>
    </SecondaryButton>
  );
}

export default LoginButton;

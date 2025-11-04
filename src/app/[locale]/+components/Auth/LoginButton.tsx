'use client';
import Image from 'next/image';
import React from 'react';

import { SecondaryButton } from '@/components/SecondaryButton';
import { useSignIn } from '@/data-layer/supabase/useSignIn';

interface Props {
  children: string;
  avatar: string | React.ReactNode;
  alt?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}

export function LoginButton({
  avatar,
  children,
  width = 24,   // کاهش اندازه پیش‌فرض
  height = 24,  // کاهش اندازه پیش‌فرض
  alt = `${children}'s avatar`,
  disabled,
}: Props) {
  const { signIn } = useSignIn();

  return (
    <SecondaryButton disabled={disabled} onClick={signIn}>
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-fg-0 bg-dark-0 tablet:size-14">
        {typeof avatar === 'string' ? (
          <Image height={height} width={width} alt={alt} src={avatar} />
        ) : (
          <div className={`w-[${width}px] h-[${height}px]`}>{avatar}</div>
        )}
      </div>
      <p className="hidden tablet:me-2 tablet:block desktop:hidden wide:block">
        {children}
      </p>
    </SecondaryButton>
  );
}

'use client';

import { SecondaryButton } from '@/components/SecondaryButton';
import { signIn } from '@/data-layer/supabase/signIn';

interface Props {
  children: string;
  avatar: string;
  alt?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}

export function LoginButton({
  avatar,
  children,
  width = 35,
  height = 35,
  alt = `${children}'s avatar`,
  disabled,
}: Props) {
  return (
    <SecondaryButton disabled={disabled} onClick={signIn}>
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-fg-0 bg-dark-0 tablet:size-14">
        <img height={height} width={width} alt={alt} src={avatar} />
      </div>
      <p className="hidden tablet:me-2 tablet:block desktop:hidden wide:block">
        {children}
      </p>
    </SecondaryButton>
  );
}

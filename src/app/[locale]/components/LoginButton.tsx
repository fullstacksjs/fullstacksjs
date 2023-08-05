'use client';
import Image from 'next/image';

import SecondaryButton from '@/components/SecondaryButton';

interface Props {
  children: string;
  avatar: string;
  onClick?: () => void;
  alt?: string;
  width?: number;
  height?: number;
}

function LoginButton({
  onClick,
  avatar,
  children,
  width = 35,
  height = 35,
  alt = `${children}'s avatar`,
}: Props) {
  return (
    <SecondaryButton onClick={onClick}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-fg-0 bg-dark-0 tablet:h-14 tablet:w-14">
        <Image src={avatar} width={width} height={height} alt={alt} />
      </div>
      <p className="hidden tablet:me-2 tablet:block desktop:hidden wide:block">
        {children}
      </p>
    </SecondaryButton>
  );
}

export default LoginButton;

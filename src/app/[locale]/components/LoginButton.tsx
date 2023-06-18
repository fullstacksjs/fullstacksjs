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
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-fg-0">
        <Image src={avatar} width={width} height={height} alt={alt} />
      </div>
      <p className="hidden tablet:me-2 tablet:block">{children}</p>
    </SecondaryButton>
  );
}

export default LoginButton;

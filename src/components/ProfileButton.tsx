'use client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useMediaQuery } from 'usehooks-ts';

import LogoutIcon from './Logout.svg';
import SecondaryButton from './SecondaryButton';

export default function ProfileBtn({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}) {
  const isMobile = useMediaQuery('(max-width: 700px)');

  const handleLogout = () => {
    void signOut();
  };

  return (
    <div className="flex gap-2">
      <SecondaryButton>
        <Image
          src={avatar}
          className="rounded-full border border-white"
          width={32}
          height={32}
          alt={`${name}'s avatar`}
        />
        <p className={isMobile ? 'hidden' : 'mr-2'}>{name}</p>
      </SecondaryButton>
      <SecondaryButton
        className="aspect-square justify-center"
        onClick={handleLogout}
      >
        <LogoutIcon className="h-10 w-10" />
      </SecondaryButton>
    </div>
  );
}

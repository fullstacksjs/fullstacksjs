'use client';

import { Button } from '@/components/Button';

interface Props {
  children: React.ReactNode;
  avatar: string;
  alt?: string;
  size?: number | string;
  disabled?: boolean;
  onClick?: () => void;
}

export function BaseAuthButton({
  onClick,
  avatar,
  children,
  size = 35,
  alt,
  disabled,
}: Props) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="gap-4"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex size-12 shrink-0 justify-center overflow-hidden">
        <img
          height={size}
          className="aspect-square rounded-full"
          width={size}
          alt={alt}
          src={avatar}
        />
      </div>
      <span className="hidden tablet:me-2 tablet:inline-block">{children}</span>
    </Button>
  );
}

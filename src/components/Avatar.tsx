import Image from 'next/image';

import { cn } from '@/utils/cn';

type Size = 'lg' | 'md' | 'sm';

interface Props {
  src: string;
  alt: string;
  size?: Size;
  className?: string;
}

const sizeMap: Record<Size, number> = {
  sm: 44,
  md: 70,
  lg: 100,
};

export function Avatar({ src, alt, size = 'md', className }: Props) {
  return (
    <Image
      height={sizeMap[size]}
      width={sizeMap[size]}
      alt={alt}
      className={cn('rounded-full border-2 border-fg-0 bg-fg-0', className)}
      src={`${src}?s=420`}
    />
  );
}

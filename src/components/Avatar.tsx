import { cn } from '@/utils/cn';
import Image from 'next/image';

type Size = 'lg' | 'md' | 'sm';

interface Props {
  src: string;
  alt: string;
  size?: Size;
}

const sizeMap: Record<Size, number> = {
  sm: 44,
  md: 70,
  lg: 100,
};

export function Avatar({ src, alt, size = 'md' }: Props) {
  return (
    <Image
      height={sizeMap[size]}
      width={sizeMap[size]}
      alt={alt}
      className={cn('rounded-full border-2 border-fg-0 bg-fg-0')}
      src={`${src}?s=420`}
    />
  );
}

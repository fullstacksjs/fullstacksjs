import Image from 'next/image';

import { Separator } from '@/components/Separator';

import Banner from './+components/Advent.png';
import { AdventOfCodeLoader } from './+components/AdventOfCodeLoader';

export default function WarLayout({ children }: LayoutProps) {
  return (
    <AdventOfCodeLoader>
      <Image
        height={Banner.height}
        width={500}
        alt="FullstacksJS Advent of Code"
        className="self-center"
        src={Banner.src}
      />
      <Separator />
      {children}
    </AdventOfCodeLoader>
  );
}

import Image from 'next/image';

import { Separator } from '@/components/Separator';

import Banner from './+components/Advent.png';
import { AdventOfCodeLoader } from './+components/AdventOfCodeLoader';

interface Props {
  children: React.ReactNode;
}

export default function WarLayout({ children }: Props) {
  return (
    <AdventOfCodeLoader>
      <Image
        className="self-center"
        src={Banner.src}
        height={Banner.height}
        width={500}
        alt="FullstacksJS Advent of Code"
      />
      <Separator />
      {children}
    </AdventOfCodeLoader>
  );
}

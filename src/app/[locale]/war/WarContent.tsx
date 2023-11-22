'use client';
import Image from 'next/image';
import { useEffect } from 'react';

import { Separator } from '@/components/Separator';

import Banner from './+components/Advent.png';
import { AdventTable } from './+components/AdventTable';

export function WarContent() {
  useEffect(() => {
    document.body.classList.add('aoc-bg');

    return () => {
      document.body.classList.remove('aoc-bg');
    };
  }, []);

  return (
    <>
      <Image
        className="self-center"
        src={Banner.src}
        height={Banner.height}
        width={500}
        alt="FullstacksJS Advent of Code"
      />

      <Separator />

      <AdventTable />
    </>
  );
}

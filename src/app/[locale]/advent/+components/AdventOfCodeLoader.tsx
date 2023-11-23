'use client';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export function AdventOfCodeLoader({ children }: Props) {
  useEffect(() => {
    document.body.classList.add('aoc-bg');

    return () => {
      document.body.classList.remove('aoc-bg');
    };
  }, []);

  return children;
}

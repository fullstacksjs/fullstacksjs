import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getServerFeature } from '@/config/features/getServerFeatures';

const title = 'FullstacksJS AlphaType: Alphabet Typing Speed Competition';
const description =
  'FullstacksJS AlphaType: Challenge yourself by typing the alphabet as fast as you can!';
const ogImage = {
  url: '/og/type.png',
  alt: 'FullstacksJS - AlphaType',
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ogImage,
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
};

interface Props {
  children: React.ReactNode;
}

export default function TypeLayout({ children }: Props) {
  const feature = getServerFeature('type');
  if (!feature) return notFound();

  return (
    <main className="flex w-full flex-col justify-center overflow-x-hidden">
      {children}
    </main>
  );
}

import { generatePageOG } from '@/components/SEO';
import { getServerFeature } from '@/config/features/getServerFeatures';
import { notFound } from 'next/navigation';

export const metadata = generatePageOG({
  title: 'FullstacksJS AlphaType: Alphabet Typing Speed Competition',
  description:
    'FullstacksJS AlphaType: Challenge yourself by typing the alphabet as fast as you can!',
  images: '/og/type.png',
});

export default function TypeLayout({ children }: LayoutProps) {
  const feature = getServerFeature('type');
  if (!feature) return notFound();

  return (
    <main className="flex w-full flex-col justify-center overflow-x-hidden">
      {children}
    </main>
  );
}

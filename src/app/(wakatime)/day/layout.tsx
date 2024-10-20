import type { Metadata } from 'next';

import { icons, keywords } from '@/components/SEO';
import { Rajdhani } from 'next/font/google';

const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'FullstacksJS',
  description: 'We Grow together',
  manifest: '/manifest.json',
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

export default function WakatimeLayout({ children }: Props) {
  return (
    <html lang="en" className={rajdhani.variable}>
      {children}
    </html>
  );
}

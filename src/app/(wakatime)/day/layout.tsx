import type { Metadata } from 'next';

import { Rajdhani } from 'next/font/google';

import { icons, keywords } from '@/components/SEO';

const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

export const metadata: Metadata = {
  title: 'FullstacksJS',
  description: 'We Grow together',
  manifest: '/manifest.json',
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

export default function WakatimeLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={rajdhani.variable}>
      {children}
    </html>
  );
}

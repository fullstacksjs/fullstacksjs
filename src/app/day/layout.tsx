import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';

import { icons, keywords } from '@/components/SEO';

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
  themeColor: '#F39F47',
  manifest: '/manifest.json',
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

export default function WakatimeLayout({ children }: Props) {
  return (
    <html lang="en" className={`${rajdhani.variable}`}>
      <body className="flex min-h-screen flex-col items-center overflow-x-hidden bg-bg-0 font-rajdhani text-base text-fg-0">
        {children}
      </body>
    </html>
  );
}

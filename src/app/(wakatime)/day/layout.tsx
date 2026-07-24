import type { Metadata } from 'next';

import { Rajdhani } from 'next/font/google';

import { icons, keywords } from '@/components/SEO/meta';

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

export default function WakatimeLayout({ children }: LayoutProps<'/day'>) {
  return (
    <html lang="en" className={rajdhani.variable}>
      <body className="flex min-h-screen flex-col items-center overflow-x-hidden bg-bg-0 font-rajdhani text-base text-fg-0">
        <div className="flex w-[1000px] flex-col items-center gap-20 p-20">
          {children}
          <div className="text-xsm font-semibold" id="social-media">
            <span className="rounded-full border border-border px-14 py-7 font-mono text-sm text-fg-1">
              FullstacksJS.com
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}

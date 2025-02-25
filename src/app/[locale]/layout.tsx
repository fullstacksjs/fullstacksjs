import type { Metadata } from 'next';

import { generatePageOG, icons, JsonLd, keywords } from '@/components/SEO';
import { Separator } from '@/components/Separator';
import { Socials } from '@/components/Socials';
import { serverConfig } from '@/config/serverConfig';
import { SupabaseProvider } from '@/data-layer/supabase/SupabaseProvider';
import { getDirection } from '@/i18n/direction';
import { JotaiProvider } from '@/store/JotaiProvider';
import { cn } from '@/utils/cn';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { setRequestLocale } from 'next-intl/server';
import { Rajdhani, Vazirmatn } from 'next/font/google';

import { Header } from './+components/Header';
import { Tracking } from './+components/Tracking';

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

const vazir = Vazirmatn({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  ...generatePageOG({
    title: 'FullstacksJS',
    description: 'We Grow together',
    images: '/og/og.png',
  }),
  manifest: '/manifest.json',
  metadataBase: new URL('https://fullstacksjs.com'),
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

export default async function LocaleLayout({ params, children }: LayoutProps) {
  const { locale } = await params;

  const direction = getDirection(locale);
  setRequestLocale(locale);

  const { containerId, trackingId } = serverConfig.get('analytics');
  const isAnalyticsActive = containerId && trackingId;

  return (
    <html
      dir={direction}
      lang={locale}
      className={`bg-dark-0 ${rajdhani.variable} ${vazir.variable}`}
    >
      <head>
        <JsonLd />
        {isAnalyticsActive ? (
          <Tracking trackingId={trackingId} containerId={containerId} />
        ) : null}
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'leading-normal text-light-0 transition-colors duration-1000',
          { 'font-fa': locale === 'fa' },
          { 'font-sans': locale !== 'fa' },
        )}
      >
        <JotaiProvider>
          <SupabaseProvider>
            <div className="container flex w-full flex-col gap-24 py-8 text-base mobile:gap-44 desktop:py-40">
              <Header />
              {children}
              <Separator />
              <Socials />
            </div>
          </SupabaseProvider>
        </JotaiProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

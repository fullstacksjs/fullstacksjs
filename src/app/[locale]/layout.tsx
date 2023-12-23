import type { Metadata } from 'next';
import { Rajdhani, Vazirmatn } from 'next/font/google';
import { notFound } from 'next/navigation';

import { generatePageOG, icons, JsonLd, keywords } from '@/components/SEO';
import { Separator } from '@/components/Separator';
import { Socials } from '@/components/Socials';
import { serverConfig } from '@/config/serverConfig';
import { SupabaseProvider } from '@/data-layer/supabase/SupabaseProvider';
import { useDirection } from '@/hooks/useDirection';
import { locales } from '@/locales';
import { JotaiProvider } from '@/store/JotaiProvider';
import { cn } from '@/utils/cn';

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

type Local = 'en' | 'fa';

interface Props {
  children: React.ReactNode;
  params: { locale: Local };
}

export default function LocaleLayout({ children, params }: Props) {
  const direction = useDirection();
  const { containerId, trackingId } = serverConfig.analytics;
  const isAnalyticsActive = containerId && trackingId;

  if (!locales.includes(params.locale)) notFound();

  return (
    <html
      lang={params.locale}
      dir={direction}
      className={`${rajdhani.variable} ${vazir.variable}`}
    >
      <head>
        <JsonLd />
        {isAnalyticsActive ? (
          <Tracking containerId={containerId} trackingId={trackingId} />
        ) : null}
      </head>
      <body
        className={cn(
          'bg-dark-0 leading-normal text-light-0 transition-colors duration-1000',
          { 'font-fa': params.locale === 'fa' },
        )}
      >
        <JotaiProvider>
          <SupabaseProvider>
            <div className="container flex w-full flex-col gap-24 py-8 text-base mobile:gap-40 desktop:py-40">
              <Header />
              {children}
              <Separator />
              <Socials />
            </div>
          </SupabaseProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { setRequestLocale } from 'next-intl/server';
import { Rajdhani, Ubuntu_Mono, Vazirmatn } from 'next/font/google';

import { JsonLd } from '@/components/SEO/JsonLd';
import { generatePageOG, icons, keywords } from '@/components/SEO/meta';
import { Separator } from '@/components/Separator';
import { SupabaseProvider } from '@/data-layer/supabase/SupabaseProvider';
import { getDirection } from '@/i18n/direction';
import { JotaiProvider } from '@/store/JotaiProvider';
import { cn } from '@/utils/cn';

import { Header } from './+components/Header';
import { Footer } from './+components/landing/Footer';

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

const monospace = Ubuntu_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-monospace',
});

export const metadata: Metadata = {
  ...generatePageOG({
    title: 'FullstacksJS',
    description: 'We Grow together',
  }),
  manifest: '/manifest.json',
  metadataBase: new URL('https://fullstacksjs.com'),
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

export default async function LocaleLayout({
  params,
  children,
}: SafeLocaleLayout<LayoutProps<'/[locale]'>>) {
  const { locale } = await params;

  const direction = getDirection(locale);
  setRequestLocale(locale);

  return (
    <html
      dir={direction}
      lang={locale}
      className={`${rajdhani.variable} ${vazir.variable} ${monospace.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'flex min-h-screen flex-col pb-10 leading-normal',
          { 'font-fa': locale === 'fa' },
          { 'font-sans': locale !== 'fa' },
        )}
      >
        <JotaiProvider>
          <SupabaseProvider>
            <Header />
            {children}
            <Separator />
            <Footer />
          </SupabaseProvider>
        </JotaiProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Rajdhani, Vazirmatn } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { useLocale } from 'next-intl';

import Socials from '@/components/Socials';

import { AuthProvider } from './AuhProviders';
import Header from './components/Header';
import Hero from './components/Hero';
import { description, icons, JsonLd, keywords, ogImage, title } from './SEO';

export const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

export const vazir = Vazirmatn({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  title,
  description,
  themeColor: '#F39F47',
  manifest: '/manifest.json',
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
  icons,
  keywords,
  authors: [{ name: 'ASafaeirad', url: 'https://github.com/ASafaeirad/' }],
};

type Local = 'en' | 'fa';

interface Props {
  children: React.ReactNode;
  params: { locale: Local };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = useLocale();

  const session = await getServerSession();
  if (params.locale !== locale) notFound();

  return (
    <html
      lang={locale}
      className={`bg-dark-0 leading-normal text-light-0 ${rajdhani.variable} ${vazir.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body>
        <AuthProvider session={session!}>
          <div className="container flex w-full flex-col gap-24 py-8 text-base mobile:gap-40 tablet:py-40">
            <Header />
            <Hero />
            {children}
            <Socials />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fa' }];
}

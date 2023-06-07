import { Rajdhani } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { useLocale } from 'next-intl';

import Socials from '@/components/Socials';

import { AuthProvider } from './AuhProviders';
import Header from './components/Header';
import Hero from './components/Hero';

const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

export const metadata = {
  title: 'FullstacksJS',
  description: 'We Grow together',
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
      className={`bg-dark-0 leading-normal text-light-0 ${rajdhani.variable}`}
    >
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

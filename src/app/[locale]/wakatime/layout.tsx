import type { Metadata } from 'next';

import { generatePageOG } from '@/components/SEO';
import { Separator } from '@/components/Separator';

import { Banner } from '../+components/Banner';
import { WakatimeButton } from './+components/WakatimeButton';

export const metadata: Metadata = generatePageOG({
  title: 'FullstacksJS Leaderboards - WakaTime Coding Stats',
  description: 'FullstacksJS WakaTime coding leaderboards',
});

export default function Layout({
  children,
}: LayoutProps<'/[locale]/wakatime'>) {
  return (
    <>
      <Banner
        cta={<WakatimeButton />}
        title={
          <div>
            FullstacksJS
            <br />
            Leaderboards
          </div>
        }
      />
      <Separator />
      {children}
    </>
  );
}

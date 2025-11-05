import { Separator } from '@/components/Separator';

import { Banner } from '../+components/Banner';
import { WakatimeButton } from './+components/WakatimeButton';

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

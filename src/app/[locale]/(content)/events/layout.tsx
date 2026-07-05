import type { Metadata } from 'next';

import { generatePageOG } from '@/components/SEO';

export const metadata: Metadata = generatePageOG({
  title: 'FullstacksJS Events',
  description: 'Discover and join FullstacksJS events and community gatherings',
});

export default function Layout({
  modal,
  children,
}: LayoutProps<'/[locale]/events'>) {
  return (
    <div className="font-fa">
      {modal}
      {children}
    </div>
  );
}

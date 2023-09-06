import { notFound } from 'next/navigation';

import { getServerFeature } from '@/config/features/getServerFeatures';

interface Props {
  children: React.ReactNode;
}

export default function TypeLayout({ children }: Props) {
  const feature = getServerFeature('type');
  if (!feature) return notFound();

  return (
    <main className="flex w-full flex-col justify-center gap-4 overflow-x-hidden">
      {children}
    </main>
  );
}

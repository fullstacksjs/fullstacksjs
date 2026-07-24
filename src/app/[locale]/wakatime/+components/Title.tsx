import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/Skeleton';

export const Title = () => {
  const t = useTranslations('wakatime');

  return (
    <div className="flex w-full flex-col items-start gap-12 tablet:flex-row tablet:items-end tablet:justify-between">
      <div className="flex max-w-248 flex-col gap-2">
        <p className="mb-6 font-mono text-xs text-accent-0">
          <span className="text-fg-1">$</span> {t('command')}
        </p>
        <h1 className="mb-2 text-4xl/none font-bold tracking-tight desktop:text-5xl/none fa:text-3xl">
          {t('title')}
        </h1>
        <p className="text-md/normal text-fg-1">{t('description')}</p>
      </div>
    </div>
  );
};

export const TitleSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-start gap-12 tablet:flex-row tablet:items-end tablet:justify-between">
      <div className="flex flex-col gap-6">
        <Skeleton width={280} className="h-8 rounded-md" />
        <Skeleton width={420} className="h-10 rounded-md" />
      </div>
      <Skeleton width={160} className="h-8 rounded-md" />
    </div>
  );
};

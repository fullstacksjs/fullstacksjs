import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/Skeleton';

interface Props {
  day: number;
  year: number;
}

export const Title = ({ day, year }: Props) => {
  const t = useTranslations('wakatime');

  return (
    <div className="flex flex-col items-center">
      <p className="w-[384px] text-center text-2xl font-bold leading-snug">
        {t('title')}
      </p>
      <p className="text-md font-bold text-accent-0">
        {t('day', { day, year })}
      </p>
    </div>
  );
};

export const TitleSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton width={350} className="h-12 rounded-md" />
      <Skeleton width={200} className="h-8 rounded-md" />
    </div>
  );
};

import { useTranslations } from 'next-intl';

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

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { C2AButton } from '@/components/C2AButton';
import Telegram from '@/components/Icons/Telegram.svg';

import { ContributorList, ContributorListSkeleton } from './ContributorList';

export const Contributors = async () => {
  const t = await getTranslations('main.contributors');

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <h2 className="text-xl font-bold" id="contributors">
        {t('title')}
      </h2>
      <Suspense fallback={<ContributorListSkeleton />}>
        <ContributorList />
      </Suspense>
      <C2AButton asChild>
        <a
          href="https://t.me/fullstacksjs/163197"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('c2a')}
          <Telegram />
        </a>
      </C2AButton>
    </div>
  );
};

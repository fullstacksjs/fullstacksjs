import { useTranslations } from 'next-intl';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import * as Table from '@/components/Table';
import { cn } from '@/utils/cn';

import { Diff } from './Diff';
import { LanguageBadge, Member } from './Member';

interface Props {
  usages: readonly WakatimeUsage[];
}

const RANK_COLOR: Partial<Record<number, string>> = {
  1: 'text-medal-gold',
  2: 'text-medal-silver',
  3: 'text-medal-bronze',
};

export function RankingTable({ usages }: Props) {
  const t = useTranslations('wakatime');

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row className="border-b border-border">
          <Table.Head className="px-14">{t('rank')}</Table.Head>
          <Table.Head>{t('member')}</Table.Head>
          <Table.Head className="hidden tablet:table-cell">
            {t('language')}
          </Table.Head>
          <Table.Head>{t('today')}</Table.Head>
          <Table.Head className="hidden pe-14 text-end tablet:table-cell">
            ±
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {usages.map((usage) => (
          <Table.Row key={usage.user.id}>
            <Table.Cell
              className={cn(
                'px-14 text-lg font-bold',
                RANK_COLOR[usage.rank] ?? 'text-fg-1',
              )}
            >
              {usage.user.ordinalRank}
            </Table.Cell>
            <Table.Cell>
              <Member user={usage.user} />
            </Table.Cell>
            <Table.Cell className="hidden tablet:table-cell">
              <LanguageBadge language={usage.user.languages[0]} />
            </Table.Cell>
            <Table.Cell className="text-md font-bold bidi-plain">
              {usage.humanReadableTotalSeconds}
            </Table.Cell>
            <Table.Cell className="hidden pe-14 text-end tablet:table-cell">
              <Diff className="justify-end" diff={usage.user.diff} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

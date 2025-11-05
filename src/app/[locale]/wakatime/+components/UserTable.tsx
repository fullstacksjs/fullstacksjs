import { range } from '@fullstacksjs/toolbox';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { Skeleton } from '@/components/Skeleton';
import * as Table from '@/components/Table';

import { UserRow } from './UserRow';

interface Props {
  usages: WakatimeUsage[];
  winners: WakatimeUsage[];
}

export const UserTable = ({ usages, winners }: Props): React.JSX.Element => {
  return (
    <Table.Root className="relative">
      <Table.Header>
        <Table.Row className="border-none">
          <Table.Head className="sticky top-0 bg-bg-darker px-8 tablet:px-14">
            Rank
          </Table.Head>
          <Table.Head className="sticky top-0 bg-bg-darker">User</Table.Head>
          <Table.Head className="sticky top-0 bg-bg-darker">Total</Table.Head>
          <Table.Head className="sticky top-0 bg-bg-darker">Daily</Table.Head>
          <Table.Head className="sticky top-0 hidden bg-bg-darker pe-8 tablet:table-cell tablet:pe-14">
            Progress
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {winners.map((winner) => (
          <UserRow
            className="table-row desktop:hidden"
            key={winner.rank}
            usage={winner}
          />
        ))}
        {usages.map((usage) => (
          <UserRow key={usage.rank} usage={usage} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const UserTableSkeleton = ({ rows }: { rows: number }) => {
  return (
    <Table.Root className="relative">
      <Table.Body>
        {range(rows).map((key) => (
          <Table.Row className="animate-pulse" key={key}>
            <Table.Cell>
              <Skeleton height={20} width={20} rounded />
            </Table.Cell>
            <Table.Cell className="flex gap-4 items-center">
              <Skeleton circle width={40} />
              <Skeleton height={20} width={220} rounded />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height={20} width={40} rounded />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height={20} width={40} rounded />
            </Table.Cell>
            <Table.Cell className="text-end">
              <Skeleton height={20} width={20} rounded />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

import * as Table from '@/components/Table';
import type { WakatimeUsage } from '@/data-layer/domain';

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
          <Table.Head className="sticky top-0 hidden bg-bg-darker tablet:table-cell">
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

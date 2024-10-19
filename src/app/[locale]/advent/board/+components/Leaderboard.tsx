import type { AdventOfCodeUser } from '@/data-layer/advent';

import * as Table from '@/components/Table';
import { cn } from '@/utils/cn';

import { UserRow } from './UserRow';

interface Props {
  leaderboard: AdventOfCodeUser[];
}

const Head = ({
  className,
  ...props
}: React.ComponentProps<typeof Table.Head>) => (
  <Table.Head
    className={cn('bg-advent-1 pt-8 top-0 sticky', className)}
    {...props}
  />
);

export const Leaderboard = ({ leaderboard }: Props) => {
  return (
    <Table.Root className="relative">
      <Table.Header>
        <Table.Row className="border-none">
          <Head className="min-w-[50px] text-center">Rank</Head>
          <Head>User</Head>
          <Head className="hidden tablet:table-cell">Score</Head>
          <Head className="min-w-[60px] text-center">Point</Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {leaderboard.map((user, rank) => (
          <UserRow key={user.id} rank={rank + 1} user={user} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

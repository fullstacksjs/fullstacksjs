import * as Table from '@/components/Table';

import type { AdventOfCodeUser } from '../../+components/AdventOfCodeClient';
import { UserRow } from './UserRow';

interface Props {
  leaderboard: AdventOfCodeUser[];
}

export const Leaderboard = ({ leaderboard }: Props) => {
  return (
    <Table.Root className="relative">
      <Table.Header>
        <Table.Row className="border-none">
          <Table.Head className="sticky top-0 px-8 tablet:px-14">
            Rank
          </Table.Head>
          <Table.Head className="sticky top-0">User</Table.Head>
          <Table.Head className="sticky top-0 hidden tablet:table-cell">
            Score
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {leaderboard.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

import type { AdventOfCodeUser } from './AdventOfCodeClient';
import { AdventOfCodeClient } from './AdventOfCodeClient';
import { UserTable } from './UserTable';

export function AdventTable() {
  const { members } = AdventOfCodeClient.getLeaderboard();

  const membersList: AdventOfCodeUser[] = Object.values(
    members,
  ) as AdventOfCodeUser[];

  const sortedMembers = membersList.toSorted(
    (a, b) => a.local_score - b.local_score,
  );

  return (
    <div className="flex flex-col items-center gap-20">
      <div className="w-full rounded-3xl bg-[#262222] px-2 pt-8">
        <div className="max-h-[500px] overflow-y-auto">
          <UserTable users={sortedMembers} />
        </div>
      </div>
    </div>
  );
}

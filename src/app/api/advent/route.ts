import { isObject } from '@fullstacksjs/toolbox';
import { NextResponse } from 'next/server';

import { getAdventLeaderboard } from '@/data-layer/advent/getAdventLeaderboard';

export async function GET() {
  try {
    const leaderboard = await getAdventLeaderboard();
    return NextResponse.json(leaderboard);
  } catch (e) {
    return NextResponse.json(
      { message: isObject(e) && 'message' in e ? e['message'] : 'unknown' },
      { status: 500 },
    );
  }
}

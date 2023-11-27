import { isObject } from '@fullstacksjs/toolbox';
import { NextResponse } from 'next/server';

import { serverConfig } from '@/config/serverConfig';
import { syncLeaderboard } from '@/data-layer/advent/getAdventLeaderboard';

export async function POST(request: Request) {
  const token = serverConfig.advent.token;
  const auth = request.headers.get('Authorization');

  if (auth !== token)
    return NextResponse.json({ message: 'not.authorized' }, { status: 401 });

  try {
    await syncLeaderboard();
    return NextResponse.json({ message: 'done' });
  } catch (e) {
    return NextResponse.json(
      { message: isObject(e) && 'message' in e ? e['message'] : 'unknown' },
      { status: 500 },
    );
  }
}

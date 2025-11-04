import type { NextRequest } from 'next/server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { serverConfig } from '@/config/serverConfig';

export function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const page = request.nextUrl.searchParams.get('page');
  const authorization = request.headers.get('authorization');
  const authValue = authorization?.split(' ')[1];

  if (!authValue) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [username, password] = atob(authValue).split(':');

  if (
    username !== serverConfig.get('revalidation.username') ||
    password !== serverConfig.get('revalidation.password')
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (tag) revalidateTag(tag, 'max');
  if (page) revalidatePath(page);

  return NextResponse.json({
    revalidated: tag ?? page,
    now: Date.now(),
  });
}

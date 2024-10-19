import type { NextRequest } from 'next/server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const page = request.nextUrl.searchParams.get('page');

  if (tag) revalidateTag(tag);
  if (page) revalidatePath(page);

  return NextResponse.json({
    revalidated: Boolean(tag ?? page),
    now: Date.now(),
  });
}

import { revalidatePath, revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const page = request.nextUrl.searchParams.get('page');
  console.log('Revalidating', { tag, page });

  if (tag) revalidateTag(tag);
  if (page) revalidatePath(page);

  return NextResponse.json({
    revalidated: Boolean(tag ?? page),
    now: Date.now(),
  });
}

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const referer = request.headers.get('referer');
  const origin = new URL(request.url).origin;

  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signOut();

  return NextResponse.redirect(referer ?? origin, { status: 301 });
}

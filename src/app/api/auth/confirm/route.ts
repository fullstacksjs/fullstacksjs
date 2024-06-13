import type { EmailOtpType } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createServerSupabaseClient } from '@/data-layer/supabase/SupabaseServer';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');

  if (token_hash && type) {
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect(redirectTo);
    }
  }

  redirectTo.pathname = '/error';
  return NextResponse.redirect(redirectTo);
}

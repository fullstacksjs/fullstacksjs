import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { clientConfig } from '@/config/clientConfig';

export async function updateSession(request: NextRequest) {
  // eslint-disable-next-line fp/no-let
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    clientConfig.supabase.url,
    clientConfig.supabase.key,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

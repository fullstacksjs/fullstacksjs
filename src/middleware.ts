import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const i18nMiddleware = createMiddleware({
  locales: ['en', 'fa'],
  defaultLocale: 'fa',
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return i18nMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|favicon|day|_next|.*\\..*).*)'],
};

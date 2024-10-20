import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { updateSession } from './data-layer/supabase/updateSession';

const i18nMiddleware = createMiddleware({
  locales: ['en', 'fa'],
  defaultLocale: 'fa',
});

export async function middleware(req: NextRequest) {
  await updateSession(req);
  return i18nMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|favicon|day|wus/calendar|wus/live|_next|.*\\..*).*)'],
};

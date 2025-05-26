import type { Locale } from 'next-intl';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { updateSession } from './data-layer/supabase/updateSession';
import { routing } from './i18n/routing';

export async function middleware(req: NextRequest) {
  await updateSession(req);
  const locale = req.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale;
  const i18nMiddleware = createMiddleware({
    ...routing,
    defaultLocale: locale as Locale,
  });
  return i18nMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|favicon|day|wus/calendar|wus/live|mob/calendar|mob/live|stage/calendar|stage/live|_next|.*\\..*).*)',
  ],
};

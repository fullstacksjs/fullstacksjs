import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { updateSession } from './data-layer/supabase/updateSession';
import { routing } from './i18n/routing';

const i18nMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  await updateSession(req);
  return i18nMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|favicon|day|wus/calendar|wus/live|mob/calendar|mob/live|_next|.*\\..*).*)',
  ],
};

import type { Locale } from 'next-intl';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { updateSession } from './data-layer/supabase/updateSession';
import { routing } from './i18n/routing';

const isFaOnly = (pathname: string) => {
  return pathname.startsWith('/en/blog');
};

export async function middleware(req: NextRequest) {
  await updateSession(req);
  const locale = req.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale;

  if (isFaOnly(req.nextUrl.pathname)) {
    const newUrl = req.url.replace('en', 'fa');
    return NextResponse.redirect(newUrl);
  }

  const i18nMiddleware = createMiddleware({
    ...routing,
    defaultLocale: locale as Locale,
  });
  return i18nMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|favicon|day|wus/calendar|wus/live|mob/calendar|mob/live|ingest|stage/calendar|stage/live|_next|.*\\..*).*)',
  ],
};

import type { Locale } from 'next-intl';
import type { NextRequest } from 'next/server';

import LinkHeader from 'http-link-header';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { updateSession } from './data-layer/supabase/updateSession';
import { routing } from './i18n/routing';

const isFaOnly = (pathname: string) => {
  return pathname.startsWith('/en/blog');
};

export async function proxy(req: NextRequest) {
  await updateSession(req);
  const locale = req.cookies.get('NEXT_LOCALE')?.value ?? routing.defaultLocale;

  if (isFaOnly(req.nextUrl.pathname)) {
    const newUrl = req.url.replace('en', 'fa');
    return NextResponse.redirect(newUrl, 301);
  }

  const i18nMiddleware = createMiddleware({
    ...routing,
    defaultLocale: locale as Locale,
  });
  const response = i18nMiddleware(req);

  const linkHeader = response.headers.get('link');
  if (linkHeader == null) return response;

  const link = LinkHeader.parse(linkHeader);
  const defaultLinks = link.refs.find((entry) => entry.hreflang === locale);

  link.refs = link.refs.map((entry) => {
    if (entry.hreflang !== 'x-default') return entry;
    return { ...entry, uri: defaultLinks?.uri ?? entry.uri };
  });

  response.headers.set('link', link.toString());
  return response;
}

export const config = {
  matcher: [
    '/((?!api|favicon|day|wus/calendar|wus/live|mob/calendar|mob/live|ingest|stage/calendar|stage/live|_next|.*\\..*).*)',
  ],
};

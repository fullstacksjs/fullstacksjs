import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fa'],
  defaultLocale: 'fa',
});

export const config = {
  matcher: ['/((?!api|favicon|_next|.*\\..*).*)'],
};

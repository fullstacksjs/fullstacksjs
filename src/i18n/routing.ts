import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fa'] as ('en' | 'fa')[],
  defaultLocale: 'fa',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

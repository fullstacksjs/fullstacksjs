/// <reference types="@total-typescript/ts-reset" />

declare module '*.svg?url' {
  const content: import('next/image').StaticImageData;
  export default content;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface SafeLocale<T extends PageProps> {
  params: Promise<{
    [K in keyof UnwrapPromise<T['params']>]: K extends 'locale'
      ? import('next-intl').Locale
      : UnwrapPromise<T['params']>[K];
  }>;
  searchParams: T['searchParams'];
}

interface SafeLocaleLayout<T extends LayoutProps> {
  params: Promise<{
    [K in keyof UnwrapPromise<T['params']>]: K extends 'locale'
      ? import('next-intl').Locale
      : UnwrapPromise<T['params']>[K];
  }>;
  children: T['children'];
}

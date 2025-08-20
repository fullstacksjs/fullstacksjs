/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="@total-typescript/ts-reset" />

declare module '*.svg?url' {
  const content: import('next/image').StaticImageData;
  export default content;
}

type PageProps<TParams extends Record<string, string> = {}> = {
  params: Promise<TParams & { locale: import('next-intl').Locale }>;
};

type LayoutProps<TParams extends Record<string, string> = {}> = {
  children: React.ReactNode;
  params: Promise<TParams & { locale: import('next-intl').Locale }>;
};

/// <reference types="@total-typescript/ts-reset" />

declare module '*.svg?url' {
  const content: import('next/image').StaticImageData;
  export default content;
}

type Messages = typeof import('../messages/en.json');
declare interface IntlMessages extends Messages {}

interface PageProps<TParams extends Record<string, string> = {}> {
  params: Promise<TParams & { locale: string }>;
}

interface LayoutProps<TParams extends Record<string, string> = {}> {
  children: React.ReactNode;
  params: Promise<TParams & { locale: Locale }>;
}

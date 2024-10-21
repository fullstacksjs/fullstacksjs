/// <reference types="@total-typescript/ts-reset" />

declare module '*.svg?url' {
  const content: import('next/image').StaticImageData;
  export default content;
}

type Messages = typeof import('../messages/en.json');
declare interface IntlMessages extends Messages {}

interface PageProps {
  params: {
    locale: string;
  };
}

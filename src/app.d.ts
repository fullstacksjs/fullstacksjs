import '@total-typescript/ts-reset';

declare module '*.svg?url' {
  const content: import('next/image').StaticImageData;
  export default content;
}

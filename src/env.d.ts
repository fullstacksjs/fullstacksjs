/// <reference types="astro/client" />
/// <reference types="gtag.js" />

// eslint-disable-next-line no-var
declare var dataLayer: any[];

interface ImportMetaEnv {
  readonly PUBLIC_AUTH0_DOMAIN: string;
  readonly PUBLIC_AUTH0_CLIENT_ID?: string;
  readonly PUBLIC_GA_TRACKING_ID?: string;
  readonly PUBLIC_GTM_CONTAINER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

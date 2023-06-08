declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_AUTH0_CLIENT_ID?: string;
    NEXT_PUBLIC_AUTH0_DOMAIN?: string;
    NEXT_PUBLIC_FEATURES?: string;
    NEXT_PUBLIC_GA_TRACKING_ID?: string;
    NEXT_PUBLIC_GTM_CONTAINER?: string;
    GITHUB_ID?: string;
    GITHUB_SECRET?: string;
    DATO_TOKEN: string;
    DATO_ENDPOINT: string;
  }
}

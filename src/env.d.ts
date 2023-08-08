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
    METADATA_BASE: string;
    WAKATIME_ENDPOINT: string;

    NEXT_PUBLIC_FIREBASE_API_KEY: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_FIREBASE_APP_ID: string;
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
  }
}
declare module '*.svg?url' {
  const content: import('next/image').StaticImageData;
  export default content;
}

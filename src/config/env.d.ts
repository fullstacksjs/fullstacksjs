declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_AUTH0_CLIENT_ID?: string;
    NEXT_PUBLIC_AUTH0_DOMAIN?: string;
    NEXT_PUBLIC_FEATURES?: string;
    NEXT_PUBLIC_GA_TRACKING_ID?: string;
    NEXT_PUBLIC_GTM_CONTAINER?: string;
    GITHUB_ID?: string;
    GITHUB_SECRET?: string;
    DATO_TOKEN?: string;
    DATO_ENDPOINT?: string;
    METADATA_BASE?: string;
    WAKATIME_ENDPOINT?: string;

    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;

    ADVENT_OF_CODE_SESSION?: string;
  }
}

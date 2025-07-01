declare namespace NodeJS {
  export interface ProcessEnv {
    CRON_SECRET?: string;

    NEXT_PUBLIC_FEATURES?: string;
    DATO_TOKEN?: string;
    DATO_ENDPOINT?: string;
    METADATA_BASE?: string;
    WAKATIME_ENDPOINT?: string;

    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;

    ADVENT_OF_CODE_SESSION?: string;

    REVALIDATE_AUTH_USERNAME?: string;
    REVALIDATE_AUTH_PASSWORD?: string;

    NEXT_PUBLIC_POSTHOG_KEY?: string;
  }
}

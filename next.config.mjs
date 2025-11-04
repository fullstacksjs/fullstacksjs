import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const secondsInDay = 60 * 60 * 24;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // swcPlugins: [['@swc-jotai/react-refresh', {}]], // <- Enable when turbopack+swc-jotai is ready
    turbopackFileSystemCacheForDev: true,
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'wakatime.com',
        pathname: '/photo/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/Tarikul-Islam-Anik/**',
      },
    ],
    minimumCacheTTL: secondsInDay,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {
    rules: {
      '*.svg': {
        condition: {
          all: [{ path: /\.svg$/ }, { not: { path: /\.asset\.svg$/ } }],
        },
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  rewrites() {
    return Promise.resolve([
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://eu.i.posthog.com/decide',
      },
    ]);
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withNextIntl(nextConfig);

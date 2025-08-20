import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const secondsInDay = 60 * 60 * 24;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // swcPlugins: [['@swc-jotai/react-refresh', {}]], <- Enable when turbopack is ready
    ppr: true,
    useCache: true,
  },
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    addSvgr(config);
    return config;
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

function addSvgr(config) {
  const fileLoaderRule = config.module.rules.find((rule) =>
    rule.test?.test?.('.svg'),
  );

  config.module.rules.push(
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    },
    {
      test: /\.svg$/i,
      issuer: { not: /\.(css|sass|scss)$/ },
      resourceQuery: { not: /url/ },
      loader: '@svgr/webpack',
    },
  );

  fileLoaderRule.exclude = /\.svg$/i;
}

export default withNextIntl(nextConfig);

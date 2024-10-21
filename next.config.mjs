import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const secondsInDay = 60 * 60 * 24;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
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
  webpack(config) {
    addSvgr(config);
    return config;
  },
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
      issuer: { not: /\.(css|scss|sass)$/ },
      resourceQuery: { not: /url/ },
      loader: '@svgr/webpack',
    },
  );

  fileLoaderRule.exclude = /\.svg$/i;
}

export default withNextIntl(nextConfig);

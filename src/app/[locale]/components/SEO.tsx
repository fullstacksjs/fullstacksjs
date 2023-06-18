import type { Organization, WithContext } from 'schema-dts';

export const title = 'FullstacksJS';
export const description = 'We Grow together';
export const ogImage = {
  url: 'https://fullstacksjs.com/og.png',
  alt: 'FullstacksJS Community',
} as const;

export const icons = [
  {
    rel: 'icon',
    url: '/favicon-16x16.png',
    sizes: '16x16',
    type: 'image/png',
  },
  {
    rel: 'icon',
    url: '/favicon-32x32.png',
    sizes: '32x32',
    type: 'image/png',
  },
  { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
  { rel: 'mask-icon', url: '/safari-pinned-tab.svg' },
];

export const keywords = [
  'community',
  'telegram',
  'کانال برنامه نویسی',
  'کانال تلگرام',
  'فول‌استکس',
];

export const jsonLd: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  legalName: 'FullstacksJS',
  url: 'https://fullstacksjs.com',
  logo: 'https://fullstacksjs.com/maskable_icon_x512.png',
  funder: {
    '@type': 'Person',
    email: 'frontendmonster@gmail.com',
    givenName: 'Alireza',
    familyName: 'Safaeirad',
  },
};

export const JsonLd = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

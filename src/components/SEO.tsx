import type { Metadata } from 'next';
import type { Organization, WithContext } from 'schema-dts';

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
  'wakatime',
  'واکاتایم',
];

export interface OGProps {
  title: string;
  description: string;
  images?: string;
}

export function generatePageOG({
  description,
  images = '/og/og.png',
  title,
}: OGProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      description,
      images: {
        url: images,
        alt: title,
      },
      title,
    },
    twitter: {
      images: {
        url: images,
        alt: title,
      },
      title,
      card: 'summary_large_image',
    },
  };
}

const jsonLd: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  legalName: 'FullstacksJS',
  url: 'https://fullstacksjs.com',
  logo: 'https://fullstacksjs.com/maskable_icon_x512.png',
  founder: {
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

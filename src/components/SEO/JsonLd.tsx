import type { Organization, WithContext } from 'schema-dts';

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

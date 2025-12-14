import { defineConfig } from '@fullstacksjs/eslint-config';

export default defineConfig(
  {
    ignores: ['src/data-layer/supabase/models/Database.ts'],
  },
  {
    files: ['src/**/*.tsx'],
    ignores: [
      'src/**/page.tsx',
      'src/**/layout.tsx',
      'src/**/error.tsx',
      'src/**/loading.tsx',
      'src/**/not-found.tsx',
      'src/**/default.tsx',
    ],
    rules: {
      'no-restricted-exports': [
        'error',
        { restrictDefaultExports: { direct: true } },
      ],
      'next/no-img-element': 'off',
    },
  },
);

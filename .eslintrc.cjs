const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    react: false,
    typescript: true,
  },
  plugins: ['tailwindcss'],
  extends: ['plugin:astro/recommended', 'plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: ['./tsconfig.json'],
          },
        },
      },
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: ['./tsconfig.json'],
          },
        },
      },
    },
  ],
});

const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  modules: {
    auto: true,
    react: false,
    typescript: true,
  },
  extends: ['plugin:astro/recommended'],
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
  root: true,
});

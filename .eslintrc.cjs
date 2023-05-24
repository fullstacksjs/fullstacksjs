const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    react: false,
    typescript: true,
  },
  plugins: ['tailwindcss'],
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'import/no-unresolved': 'off',
    'import/newline-after-import': 'off',
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
      rules: {
        'import/no-unresolved': 'error',
        'import/newline-after-import': 'warn',
      },
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      extends: ['plugin:astro/recommended'],
      settings: {
        'import/resolver': {
          typescript: {
            project: ['./tsconfig.json'],
          },
        },
      },
      rules: {
        'prettier/prettier': 'off',
        'import/newline-after-import': 'off',
        'import/no-unresolved': 'error',
      },
    },
  ],
});

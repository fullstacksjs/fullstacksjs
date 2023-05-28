const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    react: false,
    typescript: {
      parserProject: ['./tsconfig.eslint.json'],
      resolverProject: ['./tsconfig.json'],
    },
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
      rules: {
        'import/no-unresolved': 'error',
        'import/newline-after-import': 'warn',
      },
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      extends: ['plugin:astro/recommended'],
      rules: {
        'prettier/prettier': 'off',
        'import/newline-after-import': 'off',
        'import/no-unresolved': 'error',
      },
    },
  ],
});

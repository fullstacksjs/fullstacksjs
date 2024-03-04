const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    react: true,
    next: true,
    cspell: false,
    typescript: {
      parserProject: './tsconfig.json',
      resolverProject: './tsconfig.json',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': ['warn', { whitelist: ['size\\-.*'] }],
    'default-case': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
  },
});

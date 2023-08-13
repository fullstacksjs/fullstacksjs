const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    react: true,
    next: true,
    typescript: {
      parserProject: './tsconfig.json',
      resolverProject: './tsconfig.json',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': 'warn',
    'default-case': 'off',
  },
});

const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  modules: {
    typescript: {
      parserProject: './tsconfig.json',
      resolverProject: './tsconfig.json',
    },
  },
});

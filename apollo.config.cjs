require('dotenv');

module.exports = {
  client: {
    service: {
      name: 'dato-cms',
      url: process.env.PUBLIC_DATO_ENDPOINT,
      headers: {
        authorization: process.env.PUBLIC_DATO_TOKEN,
      },
    },
    includes: ['./src/data-layer/*.ts'],
  },
};

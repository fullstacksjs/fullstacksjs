require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'dato-cms',
      url: process.env.DATO_ENDPOINT,
      headers: {
        authorization: process.env.DATO_TOKEN,
      },
    },
    includes: ['./src/data-layer/*.ts'],
  },
};

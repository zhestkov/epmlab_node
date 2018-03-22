const uuid = require('uuid/v4');
module.exports = {
  FETCHING_BASE_URI: 'https://jsonplaceholder.typicode.com',
  DATABASE_URI: 'mongodb://localhost/testUserDB1',
  PORT: 8000,
  isFetchingRequired: true,
  credentials: {
    id: uuid(),
    username: 'admin',
    password: 'password',
    token: `TOKEN-${uuid()}`,
  }
};

// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      port: '3306',
      host: 'localhost',
      database: 'test_db',
      user: 'root',
      password: 'Aa123456',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: 'app/db/migrations',
    },
    seeds: {
      directory: 'app/db/seeds',
    },
  },

};

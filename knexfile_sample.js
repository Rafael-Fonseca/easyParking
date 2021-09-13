// rename file to knexfile.js
// Update with your config settings.

module.exports = {
    client: 'postgresql',
        connection: {
            database: 'dbName',
            user:     'yourUsername',
            password: 'yourPassword'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    };
  
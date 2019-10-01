// Update with your config settings.

module.exports = {


    client: 'postgresql',
    connection: {
      database: 'testando',
      user:     'postgres',
      password: 'Vibelife420@'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }



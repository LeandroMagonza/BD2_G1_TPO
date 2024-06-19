const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'tienda_online',
  password: 'password',
  port: 5432
});

module.exports = pool;

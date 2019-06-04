// connecting with postgres through PG
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 30,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillos: 2000,
});

if (!pool) {
  console.log('connection error...');
} else {
  console.log('connected to postgresql to database:', pool.options.database);
}

const dbcon = pool;
module.exports = dbcon;
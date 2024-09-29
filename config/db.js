const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.end.DATABASE_URL
});

module.exports = pool;
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: '',
   port: process.env.DB_PORT,
   dialect: 'postgres',
   AllowExitOnIdle: true,
});

const getDate = async () => {
   const query = 'SELECT NOW()';
   const { rows } = await pool.query(query);
   console.log(rows);
   return rows;
};

// getDate();

module.exports = pool;

import mysql, { Pool } from 'mysql2/promise';

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool: Pool;

if (process.env.DATABASE_URL) {
  pool = mysql.createPool(process.env.DATABASE_URL);
} else {
  pool = mysql.createPool(DEFAULT_CONFIG);
}

export default pool;
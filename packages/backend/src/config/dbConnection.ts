import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
// Log connection details
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'lingo-prep',
  password: process.env.DB_PASSWORD || '661',
  port: Number(process.env.DB_PORT || 5432)
};

console.log('🔌 Database configuration:', {
  ...dbConfig,
  password: '***' // Hide password in logs
});

const pool = new Pool(dbConfig);

// Test the connection
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Database connection successful'))
  .catch(err => console.error('❌ Database connection failed:', err));

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
});
export {pool}

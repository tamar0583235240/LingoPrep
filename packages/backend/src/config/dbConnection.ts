import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
// Log connection details
const dbConfig = {
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'lingo-prep',
  password: process.env.PGPASSWORD || 'huser',
  port: Number(process.env.PGPORT || 5432)
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

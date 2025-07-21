import { Pool } from 'pg';
<<<<<<< HEAD
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
=======
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config();
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

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

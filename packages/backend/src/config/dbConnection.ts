// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();
// console.log('Database user:', process.env.PGUSER);
// console.log('Database host:', process.env.PGHOST);
// console.log('Database name:', process.env.PGDATABASE);
// console.log('Database password:', process.env.PGPASSWORD);
// console.log('Database port:', process.env.PGPORT);
// const pool = new Pool({

//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: Number(process.env.PGPORT),
//  });
// console.log('Database connection pool created');
// export {pool}



import { Pool } from 'pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config();


export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
 });
console.log('Database connection pool created');

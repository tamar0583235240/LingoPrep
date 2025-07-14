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
dotenv.config();
import { createClient } from '@supabase/supabase-js';


console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// export const pool = new Pool({
//   host: process.env.PGHOST,
//   port: Number(process.env.PGPORT),
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//  });


export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log('Database connection pool created');

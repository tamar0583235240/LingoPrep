import { pool } from './config/dbConnection';
import * as fs from 'fs';
import * as path from 'path';

async function fixAnswersTable() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'fix_answers_table.sql'), 'utf8');
        await pool.query(sql);
        console.log('✅ Successfully added missing columns to answers table');
    } catch (error) {
        console.error('❌ Error fixing answers table:', error);
        process.exit(1);
    }
}

fixAnswersTable();

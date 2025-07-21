import { promises } from "dns";
import { Categories } from "../interfaces/entities/Categories";
import { pool } from "../config/dbConnection";


const getAllCategories = async (): Promise<Categories[]> => {
    try {
        console.log('📊 Executing categories query...');
        const query = `
            SELECT id, name
            FROM categories
            ORDER BY name
        `;
        console.log('Query:', query);
        
        const result = await pool.query(query);
        console.log('✅ Query executed successfully, rows:', result.rowCount);
        
        return result.rows as Categories[];
    } catch (error: any) {
        console.error("❌ Error fetching categories:", {
            message: error.message,
            stack: error.stack,
            detail: error.detail,
            code: error.code
        });
        throw new Error(`Failed to fetch categories: ${error.message}`);
    }
};

export default { getAllCategories };
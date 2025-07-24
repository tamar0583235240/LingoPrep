import { promises } from "dns";
import { Categories } from "../interfaces/entities/Categories";
import { pool } from "../config/dbConnection";


const getAllCategories = async (): Promise<Categories[]> => {
    try {
        const query = `
            SELECT id, name
            FROM "categories"
        `
        const result = await pool.query(query);
        return result.rows as Categories[];
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        throw error;
    }
};

export default { getAllCategories };
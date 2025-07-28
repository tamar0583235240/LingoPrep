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

const addQuestionToCategory = async (questionId: string, categoryId: string): Promise<void> => {
    try {
        const query = `
            INSERT INTO "question_categories" ( question_id , category_id) VALUES ($1, $2)`;
        await pool.query(query, [questionId, categoryId]);
    } catch (error) {
        console.error("❌ Error adding question to category:", error);
        throw error;
    }
}

const getCategoryForQuestions = async (id_question: string): Promise<Categories | null> => {
    try {
        const query = `
        SELECT c.id, c.name FROM "categories" c 
        JOIN "question_categories" qc ON c.id = qc.category_id
        WHERE qc.question_id = $1 `;
        
        const { rows } = await pool.query(query, [id_question]);
        
        if (rows.length === 0) {
            console.warn(`No categories found for question id: ${id_question}`);
            return null; 
        }

        return rows[0] as Categories; 
    } catch (error) {
        console.error("❌ Error fetching category for questions:", error);
        throw new Error('Failed to fetch category'); 
    }
}



export default { getAllCategories, addQuestionToCategory, getCategoryForQuestions };
import { pool } from '../config/dbConnection';
export const getReminders = async () => {
    const query = `
    SELECT id, suggestion_for_improvement, treatment_status
    FROM feedback_to_system
    WHERE treatment_status = 'In treatment'
    ORDER BY createdat DESC
  `;
  
   console.log("🔍 מריץ שאילתה:", query);
    const { rows } = await pool.query(query);


    console.log("🔁 rows:", rows);
    return rows.map(row => ({
        id: row.id,
        subject: row.suggestion_for_improvement,
        status: row.treatment_status === 'In treatment' ? 'pending' : 'done',
    }));
};

// עדכון סטטוס ל-'Treated'
export const markReminderAsDone = async (id: string) => {
    const query = `UPDATE feedback_to_system SET treatment_status = 'Treated' WHERE id = $1`;
    await pool.query(query, [id]);
};

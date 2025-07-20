// import { pool } from '../config/dbConnection'; 
// import { exampleInterface } from "../interfaces/entities/";

// const getAllExamples = async (): Promise<exampleInterface[]> => {
//   try {
//     const query = `
//       SELECT exampleField1, exampleField2, exampleField3
//       FROM examples
//     `;

//     const result = await pool.query(query);
//     return result.rows as exampleInterface[];

//   } catch (error) {
//     console.error("Error fetching examples from PostgreSQL:", error);
//     throw error;
//   }
// };

// export default { getAllExamples };

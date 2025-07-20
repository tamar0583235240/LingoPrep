// import { Request, Response } from 'express';
// import exampleRepository from '../reposioty/exampleReposioty';

// export const exampleController = async (req: Request, res: Response): Promise<void> => {
//   console.log('exampleController called');
//   try {
//     const items = await exampleRepository.getAllExamples();
//     res.json(items);
//   } catch (error) {
//     console.error('Error in exampleController:', error);
//     res.status(500).json({ error });
//   }
// };
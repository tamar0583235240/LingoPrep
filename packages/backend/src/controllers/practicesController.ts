import { Request, Response } from 'express';
import practiceRepository from '../reposioty/practiceRepository';
import { Practices } from '../interfaces/entities/Practices';

const addPractice = async (req: Request, res: Response): Promise<Practices | void> => {
    try {
        const practice: Practices = req.body;
        console.log(practice);

        const result = await practiceRepository.addPractice(practice);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding practice:', error);
        res.status(500).json({ error: 'Internal Server Error', details: (error as Error).message });
    }
};

export { addPractice };

export const adminPracticeController = async (req: Request, res: Response): Promise<void> => {
    console.log('adminPracticeController called');
    try {
        const items = await practiceRepository.getAllPractices();
        res.json(items);
    } catch (error) {
        console.error('Error in adminPracticeController:', error);
        res.status(500).json({ error: 'GET_ALL_PRACTICES_FAILED', details: (error as Error).message });
    }
};

export const updatePracticeController = async (req: Request, res: Response): Promise<void> => {
    console.log('updatePracticeController called');
    try {
        const updates = req.body;
        console.log('Received updates:', updates);
        const updatedPractice = await practiceRepository.updatePracticeById(updates);
        res.json(updatedPractice);
    } catch (error) {
        console.error('Error in updatePracticeController:', error);
        res.status(400).json({ error: 'Failed to update practice', details: (error as Error).message });
    }
};

export const deletePracticeController = async (req: Request, res: Response): Promise<void> => {
    console.log('deletePracticeController called');
    try {
        const practiceId = req.params.practice_id;
        await practiceRepository.deletePracticeById(practiceId);
        res.status(200).send({ message: 'Practice deleted successfully' });
    } catch (error) {
        console.error('Error in deletePracticeController:', error);
        res.status(500).json({ error: 'DELETE_PRACTICE_FAILED', details: (error as Error).message });
    }
};

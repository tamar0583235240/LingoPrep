import { Request, Response } from 'express';
import questionRepository from '../reposioty/questionRepository';
import { Questions } from '../interfaces/entities/Questions';
const addQuestion = async (req: Request, res: Response):Promise<Questions | void> => {
  try {
    const question: Questions = req.body;
    console.log(question);
    
    const result = await questionRepository.addQustion(question);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { addQuestion };

export const questionController = async (req: Request, res: Response): Promise<void> => {

  console.log('questionController called');
    try {
    const items = await questionRepository.getAllQuestionById(req.params.question_id);
    res.json(items);
  } catch (error) {
    console.error('Error in questionController:', error);
    res.status(500).json({ error });
  }
};

export const adminqQuestionController = async (req: Request, res: Response): Promise<void> => {

  console.log('adminQuestionController called');
    try {
    const items = await questionRepository.getAllQuestions();
    res.json(items);
  } catch (error) {
    console.error('Error in questionController:', error);
    res.status(500).json({ error });
  }
};

export const updateQuestionController = async (req: Request, res: Response): Promise<void> => {
  console.log('updateQuestionController called');
  try {
    const updates = req.body;
    console.log('Received updates:', updates);
    const updatedQuestion = await questionRepository.updateQuestionById(updates);
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Error in updateQuestionController:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};


export const deleteQuestionController = async (req: Request, res: Response): Promise<void> => {
  console.log('deleteQuestionController called');
  try {
    const questionId = req.params.question_id;
    const is_active = false;
    await questionRepository.deleteQuestionById(questionId,is_active);
    res.status(200).send("Question deleted successfully"); 
  } catch (error) {
    console.error('Error in deleteQuestionController:', error);
    res.status(500).json({ error });
  }
};


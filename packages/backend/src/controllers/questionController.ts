import { Request, Response } from 'express';
import questionRepository from '../repository/questionRepository';
import { Questions } from '../interfaces/entities/Questions';

const addQuestion = async (req: Request, res: Response): Promise<Questions | void> => {
  try {
    const { question, id_category } = req.body; 
    const result = await questionRepository.addQuestion(question, id_category);
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
    const {data,category} = req.body;
    console.log('Received updates:', data);
    const updatedQuestion = await questionRepository.updateQuestionById(data,category);
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


export const getAllQuestionsController = async (req: Request, res: Response): Promise<void> => {
  console.log('getAllQuestionsController called');
  try {
    const questions = await questionRepository.getAllQuestions();
    console.log(':white_check_mark: Questions fetched successfully:', questions.length);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const getQuestionsByCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const questions = await questionRepository.getQuestionsByCategory(categoryId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

import { Request, Response } from 'express';
import questionRepository from '../reposioty/questionRepository';
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
<<<<<<< HEAD
};
=======
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

>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

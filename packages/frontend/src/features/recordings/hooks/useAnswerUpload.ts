import { createAnswer, analyzeAnswer } from '../../interview/services/answerService';
import { useCallback } from 'react';
import { useToast } from '../../../shared/hooks/useToast';

export const useAnswerUpload = () => {
  const { toast } = useToast();

  const uploadAndAnalyze = useCallback(async (
    questionId: string,
    userId: string,
    audioBlob: Blob,
    answerFileName: string
  ) => {
    try {
      // שלב 1: העלאת התשובה
      const answer = await createAnswer(questionId, userId, audioBlob, answerFileName);
      
      // שלב 2: ניתוח התשובה
      const analysis = await analyzeAnswer(answer.id);
      
      return { answer, analysis };
    } catch (error) {
      toast({
        title: "שגיאה",
        description: error instanceof Error ? error.message : "שגיאה בהעלאת או ניתוח התשובה",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  return { uploadAndAnalyze };
};

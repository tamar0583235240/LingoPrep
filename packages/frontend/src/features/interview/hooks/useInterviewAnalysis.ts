import { useState } from 'react';
import { InterviewAnalysis } from '../types/interviewAnalysis.types';
import { analyzeInterview } from '../services/analyze.service';

export const useInterviewAnalysis = () => {
  const [analysis, setAnalysis] = useState<InterviewAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (file: File, answerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeInterview(file, answerId);
      setAnalysis(result);
    } catch (err) {
      setError('אירעה שגיאה בעת ניתוח ההקלטה');
    } finally {
      setLoading(false);
    }
  };

  return { analyze, analysis, loading, error };
};

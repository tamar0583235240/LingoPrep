import { useEffect, useState } from "react";
import { fetchFeedback } from "../services/feedbackService";

export const useFeedbackAnalysis = (answerId: string) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchFeedback(answerId);
        setAnalysis(result);
      } catch (err) {
        setAnalysis("שגיאה בקבלת ניתוח");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [answerId]);

  return { analysis, loading };
};
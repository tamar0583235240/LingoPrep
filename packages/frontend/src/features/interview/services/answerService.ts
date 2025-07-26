import { AnswerResponse } from "../types/answer";

export const createAnswer = async (
  questionId: string,
  userId: string,
  audioBlob: Blob,
  answerFileName: string
): Promise<AnswerResponse> => {
  const formData = new FormData();
  formData.append("file", audioBlob, answerFileName);
  formData.append("questionId", questionId);
  formData.append("userId", userId);

  const response = await fetch("http://localhost:5000/api/answers", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "שגיאה ביצירת תשובה");
  }

  return response.json();
};

export const analyzeAnswer = async (answerId: string): Promise<any> => {
  const response = await fetch(`http://localhost:5000/api/ai-insights/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answerId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "שגיאה בניתוח התשובה");
  }

  return response.json();
};

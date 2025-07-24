import { FeedbackResponse } from "../types/feedback";
export const fetchFeedback = async (answerId: string): Promise<string> => {
  const response = await fetch(`http://localhost:5000/api/insights/${answerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("שגיאה בשרת");
  }
  const data: FeedbackResponse = await response.json();
  console.log(":mag: תשובת AI:", data);
  return (
    `:star: דירוג כללי: ${data.rating}/5\n\n` +
    `:bulb: סיכום: ${data.summary}\n\n` +
    `:white_check_mark: חוזקות:\n${data.strengths.split('\n').map(s => `• ${s}`).join('\n')}\n\n` +
    `:hammer_and_wrench: לשיפור:\n${data.improvements.split('\n').map(s => `• ${s}`).join('\n')}`
  );
};
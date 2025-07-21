import { FeedbackResponse } from "../types/feedback";

export const fetchFeedback = async (answerId: string): Promise<string> => {
  const response = await fetch(`http://localhost:5000/api/ai-insights/${answerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("שגיאה בשרת");
  }

  const data: FeedbackResponse = await response.json();
  console.log("🔍 תשובת AI:", data);

  return (
    `⭐ דירוג כללי: ${data.rating}/5\n\n` +
    `💡 סיכום: ${data.summary}\n\n` +
    `✅ חוזקות:\n${data.strengths.split('\n').map(s => `• ${s}`).join('\n')}\n\n` +
    `🛠️ לשיפור:\n${data.improvements.split('\n').map(s => `• ${s}`).join('\n')}`
  );
};

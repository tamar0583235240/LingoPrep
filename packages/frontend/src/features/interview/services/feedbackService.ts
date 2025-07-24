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
  console.log("🔍 API response:", data);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    `⭐ דירוג כללי: ${data.rating}/5\n` +
    `💡 סיכום: ${data.summary}\n\n` +
    `✅ חוזקות: ${data.strengths}\n` +
    `🛠️ לשיפור: ${data.improvements}`
  );
};
import { FeedbackResponse } from "../types/feedback";

export const fetchFeedback = async (answerId: string): Promise<string> => {
<<<<<<< HEAD
  const response = await fetch(`http://localhost:5000/api/ai-insights/${answerId}`, {
=======
  const response = await fetch(`http://localhost:5000/api/insights/${answerId}`, {
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("שגיאה בשרת");
  }

  const data: FeedbackResponse = await response.json();
<<<<<<< HEAD
  console.log("🔍 תשובת AI:", data);

  return (
    `⭐ דירוג כללי: ${data.rating}/5\n\n` +
    `💡 סיכום: ${data.summary}\n\n` +
    `✅ חוזקות:\n${data.strengths.split('\n').map(s => `• ${s}`).join('\n')}\n\n` +
    `🛠️ לשיפור:\n${data.improvements.split('\n').map(s => `• ${s}`).join('\n')}`
  );
};
=======
  console.log("🔍 API response:", data);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    `⭐ דירוג כללי: ${data.rating}/5\n` +
    `💡 סיכום: ${data.summary}\n\n` +
    `✅ חוזקות: ${data.strengths}\n` +
    `🛠️ לשיפור: ${data.improvements}`
  );
};
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

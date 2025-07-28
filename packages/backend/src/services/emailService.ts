// src/services/emailService.ts



import { ReminderType } from "@interfaces/reminderInterfaces";
import { getUserEmailById } from "../reposioty/userRepository2";
import sendEmail from "../utils/sendEmail";

export async function sendReminderEmail(userId: string, type: ReminderType, content: string): Promise<boolean> {
  const email = await getUserEmailById(userId);
  if (!email) return false;

  const env = process.env.NODE_ENV;
  const isProduction = env === "production";

  if (!isProduction && email !== "t0527146247@gmail.com") return false;

  const subject = type === "tip" ? "\uD83D\uDCA1 טיפ יומי" : "\uD83D\uDCD8 שאלה לתרגול";

  await sendEmail({
    to: email,
    subject,
    html: `<p>${content}</p>`,
  });
  return true;
}

//
// src/services/emailService.ts

// import { ReminderType } from "../interfaces/reminderInterfaces";
// import { getUserEmailById } from "../repository/userRepository2";
// import sendEmail from "../utils/sendEmail";

// /**
//  * שולח מייל תזכורת למשתמש בהתאם לסוג (טיפ / שאלה).
//  * בפיתוח שולח רק למייל הספציפי, בפרודקשן שולח לכולם.
//  */
// export async function sendReminderEmail(
//   userId: string,
//   type: ReminderType,
//   content: string
// ): Promise<boolean> {
//   const email = await getUserEmailById(userId);
//   if (!email) return false;

//   const env = process.env.NODE_ENV;
//   const isProduction = env === "production";

//   // בפיתוח – שולח רק למייל מסוים
//   if (!isProduction && email !== "tehila@example.com") return false;

//   const subject =
//     type === "tip" ? "💡 טיפ יומי" : "📘 שאלה לתרגול";

//   return await sendEmail({
//     to: email,
//     subject,
//     text: content,
//     html: `<p>${content}</p>`,
//   });
// }




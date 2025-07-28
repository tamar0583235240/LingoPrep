// src/services/emailService.ts



import { ReminderType } from "@interfaces/reminderInterfaces";
import { getUserEmailById } from "../reposioty/userRepository2";
import sendEmail from "../utils/sendEmail";

// export async function sendReminderEmail(userId: string, type: ReminderType, content: string): Promise<boolean> {
//   const email = await getUserEmailById(userId);
//   if (!email) return false;

//   const env = process.env.NODE_ENV;
//   const isProduction = env === "production";

//   if (!isProduction && email !== "sh0548572701@gmail.com") return false;

//   const subject = type === "tip" ? "\uD83D\uDCA1 טיפ יומי" : "\uD83D\uDCD8 שאלה לתרגול";

//   await sendEmail({
//     to: email,
//     subject,
//     html: `<p>${content}</p>`,
//   });
//   return true;
// }





// export async function sendReminderEmail(userId: string, type: ReminderType, content: string): Promise<boolean> {
//   const email = await getUserEmailById(userId);
//   if (!email) return false;

//   const env = process.env.NODE_ENV;
//   const isProduction = env === "production";

//   if (!isProduction && email !== "sh0548572701@gmail.com") return false;

//   const subject = type === "tip" ? "📌 טיפ יומי" : "💡 שאלה לתרגול";

//   const emoji = type === "tip" ? "📌" : "💡";
//   const title = type === "tip" ? "טיפ יומי" : "שאלה לתרגול";


//   const htmlContent = `
//     <div dir="rtl" style="
//       font-family: Arial, sans-serif;
//       max-width: 600px;
//       margin: auto;
//       border: 1px solid #00D6AD; /* primary */
//       padding: 20px;
//       background-color: #F7FAFC; /* muted / background */
//       border-radius: 12px;
//       color: #1F2937; /* text-main */
//     ">
//       <h2 style="
//         color: #00D6AD; /* primary */
//         font-weight: 700;
//         font-size: 1.5rem;
//         margin-bottom: 8px;
//       ">${emoji} ${title}</h2>

//       <hr style="border: none; border-bottom: 1px solid #00B894; margin: 10px 0;" />

//       <p style="
//         font-size: 1rem;
//         line-height: 1.5;
//         color: #34495e;
//         margin-bottom: 20px;
//       ">${content}</p>

//       <footer style="
//         font-size: 0.875rem;
//         color: #64748B; /* secondary-text */
//         text-align: center;
//         border-top: 1px solid #E5E7EB; /* border */
//         padding-top: 15px;
//       ">
//         ניתן לבטל או לשנות את התזכורות בכל שלב דרך מסך ההגדרות
//       </footer>
//     </div>
//   `;

//   await sendEmail({
//     to: email,
//     subject,
//     html: htmlContent,
//   });

//   return true;
// }



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


export async function sendReminderEmail(userId: string, type: ReminderType, content: string): Promise<boolean> {
  const email = await getUserEmailById(userId);
  if (!email) return false;

  const env = process.env.NODE_ENV;
  const isProduction = env === "production";

  if (!isProduction && email !== "sh0548572701@gmail.com") return false;

 const subject = type === "tip" ? "💡 טיפ יומי" : "📌 שאלה לתרגול";

  const emoji = type === "tip" ? "" : "";
  const title = type === "tip" ? "טיפ יומי" : "שאלה לתרגול";

  // הערה: כדי להשתמש ב-Tailwind בתוך מיילים, בדרך כלל צריך להמיר ל-inline styles
  // כאן אני משתמש ב-style inline לפי הצבעים שלך ועם כיוון rtl

  const htmlContent = `
    <div dir="rtl" style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      border: 1px solid #00D6AD; /* primary */
      padding: 20px;
      background-color: #F7FAFC; /* muted / background */
      border-radius: 12px;
      color: #1F2937; /* text-main */
    ">
      <h2 style="
        color: #00D6AD; /* primary */
        font-weight: 700;
        font-size: 1.5rem;
        margin-bottom: 8px;
      ">${emoji} ${title}</h2>

      <hr style="border: none; border-bottom: 1px solid #00B894; margin: 10px 0;" />

      <p style="
        font-size: 1rem;
        line-height: 1.5;
        color: #34495e;
        margin-bottom: 20px;
      ">${content}</p>

      <footer style="
        font-size: 0.875rem;
        color: #64748B; /* secondary-text */
        text-align: center;
        border-top: 1px solid #E5E7EB; /* border */
        padding-top: 15px;
      ">
        ניתן לבטל או לשנות את התזכורות בכל שלב דרך מסך ההגדרות
      </footer>
    </div>
  `;

  await sendEmail({
    to: email,
    subject,
    html: htmlContent,
  });

  return true;
}


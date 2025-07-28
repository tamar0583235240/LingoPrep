// // backend/src/jobs/reminderJob.ts
// import nodemailer from "nodemailer";

// export const sendEmail = async (to: string, subject: string, html: string) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.SMTP_EMAIL,
//     to,
//     subject,
//     html,
//   });
// };
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailParams): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"LingoPrep" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
}
// packages/backend/src/utils/isProduction.ts

import nodemailer from "nodemailer";

const devMode = process.env.NODE_ENV === "development";
const DEV_EMAIL = "test@example.com"; // כתובת לבדיקה בסביבת פיתוח

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendReminderEmail(to: string, subject: string, html: string) {
  const recipient = devMode ? DEV_EMAIL : to;

  await transporter.sendMail({
    from: `"תזכורת חכמה" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject,
    html,
  });
}

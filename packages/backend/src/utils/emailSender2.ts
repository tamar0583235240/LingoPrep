// packages/backend/src/utils/isProduction.ts

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
      from: `"LingoPrep" <${process.env.EMAIL_USER}>`,
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

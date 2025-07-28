import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email: string, token: string): Promise<void> => {
  const resetUrl = `http://localhost:${process.env.PGPORT}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"LingoPrep" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "איפוס סיסמה - LingoPrep",
    text: `קישור לאיפוס הסיסמה שלך: ${resetUrl}`,
    html: `<p>קישור לאיפוס הסיסמה שלך:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};


export const sendVerificationCodeEmail = async (to: string, text: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.Email_USER,
      pass: process.env.Email_PASS,
    },
  });

  await transporter.sendMail({
    from: `"DiversiTech LingoPrep" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'קוד אימות',
    text,
  });
};

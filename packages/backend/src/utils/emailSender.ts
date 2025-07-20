import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(email: string, token: string) {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
  const mailOptions = {
    from: `"DiversiTech LingoPrep" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'איפוס סיסמה',
    text: ` קישור לאיפוס הסיסמה שלך: ${resetUrl}`,
    html: `<p> קישור לאיפוס הסיסמה שלך:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendVerificationCodeEmail(to: string, text: string): Promise<void> {
    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, 
        auth: {
            user: process.env.Email_USER,
            pass: process.env.Email_PASS,
        },
    });
    console.log('SMTP_HOST:', process.env.SMTP_HOST);

    await transporter.sendMail({
        from: `"DiversiTech LingoPrep" <${process.env.EMAIL_USER}>`,
        to: to, 
        subject: 'קוד אימות',
        text: text,
    });
}

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ✅ Load environment variables
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,               // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT),       // 587
  secure: false,                              // false for STARTTLS (587)
  auth: {
    user: process.env.EMAIL_USER,             // your Gmail
    pass: process.env.EMAIL_PASS,             // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,                // helps avoid cert issues
  },
  debug: true,                                // logs SMTP communication
});

// Optional: verify connection before sending
transporter.verify((err, success) => {
  if (err) {
    console.error('SMTP connection failed:', err);
  } else {
    console.log('SMTP connection successful');
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Dickson Ngari" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Email sending failed:', err);
    throw new Error(`Email could not be sent: ${err.message}`);
  }
};

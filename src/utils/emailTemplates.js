export const contactConfirmationTemplate = ({ name }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You!</title>
    <style>
      body { font-family: 'Poppins', sans-serif; background-color: #f0f4f8; margin: 0; padding: 0; color: #1f2937; }
      .container { max-width: 600px; margin: 50px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(135deg, #6D5BBA, #8D58BF); color: #ffffff; padding: 40px; text-align: center; font-size: 28px; font-weight: 700; }
      .content { padding: 30px; line-height: 1.7; font-size: 16px; }
      .content p { margin-bottom: 20px; }
      .button { display: inline-block; margin-top: 15px; padding: 14px 28px; background-color: #F59E0B; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; }
      .button:hover { background-color: #D97706; }
      .footer { text-align: center; font-size: 12px; color: #9CA3AF; padding: 25px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Thank You, ${name}!</div>
      <div class="content">
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
        <p>Meanwhile, feel free to check my <a href="https://portfolio-frontend-is8u-hpbqu2r84-alexrider187s-projects.vercel.app" style="color:#6D5BBA; font-weight:600;">portfolio</a> or connect with me on social media.</p>
        <a href="https://portfolio-frontend-is8u-hpbqu2r84-alexrider187s-projects.vercel.app" class="button">Visit Portfolio</a>
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} Your Name. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
};

export const contactNotificationTemplate = ({ name, email, message, allMessages = [] }) => {
  // Build previous messages HTML if any
  const messagesHtml = allMessages.length
    ? `<h3 style="color:#EF4444;">Previous Messages:</h3>
       <ul style="padding-left: 20px;">${allMessages
         .map(msg => `<li>${msg.text} <span style="color:#9CA3AF; font-size:12px;">(${new Date(msg.createdAt).toLocaleString()})</span></li>`)
         .join('')}</ul>`
    : '';

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
    <style>
      body { font-family: 'Poppins', sans-serif; background-color: #f9fafb; margin: 0; padding: 0; color: #1f2937; }
      .container { max-width: 650px; margin: 50px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
      .header { background: linear-gradient(135deg, #10B981, #3B82F6); color: #ffffff; padding: 40px; text-align: center; font-size: 26px; font-weight: 700; }
      .content { padding: 30px; line-height: 1.7; font-size: 16px; }
      .highlight { font-weight: 700; color: #2563EB; }
      .message-box { background-color: #F3F4F6; padding: 15px 20px; border-radius: 12px; margin: 15px 0; }
      .footer { text-align: center; font-size: 12px; color: #9CA3AF; padding: 25px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">New Contact Message</div>
      <div class="content">
        <p><span class="highlight">Name:</span> ${name}</p>
        <p><span class="highlight">Email:</span> ${email}</p>
        <p><span class="highlight">Message:</span></p>
        <div class="message-box">${message}</div>
        ${messagesHtml}
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} Your Portfolio. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
};

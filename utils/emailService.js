// emailService.js

const nodemailer = require('nodemailer');
const {
  EMAIL,
  PASSWORD
} = process.env
// Create a transporter object with your email provider configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook'
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:EMAIL,
    pass:PASSWORD
  },
});

// Function to send a verification code to a user's email
const sendVerificationCode = (email, verificationCode) => {
  // Email content
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = {
  sendVerificationCode,
};

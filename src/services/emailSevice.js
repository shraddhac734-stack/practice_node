const nodemailer = require("nodemailer");



// 1. Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS  // app password (not normal password)
  }
});
// 2. Send Email Function
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

  } catch (error) {
    console.error("Email error:", error);
  }
 };
module.exports = { sendEmail };
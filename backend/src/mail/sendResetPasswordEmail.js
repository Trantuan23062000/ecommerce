import nodemailer from "nodemailer"
const sendResetPasswordEmail = async (email, resetToken) => {
    try {
      // Tạo một transporter để gửi email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'trantuan135798@gmail.com',
          pass: 'myvsgawxlgllvxnm'
        }
      });
  
      // Thiết lập nội dung email
      const mailOptions = {
        from: 'your_email@gmail.com', // Địa chỉ email gửi
        to: email, // Địa chỉ email nhận
        subject: 'Reset Your Password', // Tiêu đề email
        html: `<p>Please click the following link to reset your password:</p>
               <p><a href="http://localhost:3000/reset-password">Reset Password</a></p>` // Nội dung email (có thể là HTML)
      }
  
      // Gửi email
      await transporter.sendMail(mailOptions);
  
      console.log('Email sent successfully');
    } catch (error) {
      console.log('Error sending email:', error);
    }
  };
  
  module.exports = { sendResetPasswordEmail };
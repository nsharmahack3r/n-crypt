import nodemailer from "nodemailer";


const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  }
  const transporter = nodemailer.createTransport(MAIL_SETTINGS);
  
  export const sendMail = async (params:any) => {
    try {
      return transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to, 
        subject: `Welcome to N-CRYPT ✔`,
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the N-CRYPT .</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
      });
     
    } catch (error) {
      console.log(error);
      return false;
    }
  };


// src/utils/email.js
import nodemailer from "nodemailer";
import appConfig from "#src/config/index.js";

const transporter = nodemailer.createTransport({
  service: "Gmail", // or any other email service
  auth: {
    user: appConfig.email.user,
    pass: appConfig.email.pass,
  },
});

const sendEmail = async ({to, subject, text, html, attachments=null}) => {
  try {
    const options = {
      from: appConfig.email.user,
      to,
      subject,
      text,
      html,
    }

    if (attachments) {
      options.attachments = attachments;
    }

    const info = await transporter.sendMail(options);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


export { sendEmail };

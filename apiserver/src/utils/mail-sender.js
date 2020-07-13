import nodemailer from "nodemailer";

const mailHost = process.env.MAIL_HOST || "localhost";
const port = process.env.MAIL_PORT || 1025;
const userName = process.env.MAIL_USER_NAME || "";
const password = process.env.MAIL_PASSWORD || "";

const mailSender = async (email) => {
  const senderTransport = nodemailer.createTransport({
    host: mailHost,
    port: port,
    auth: {
      user: userName,
      pass: password,
    },
  });
  const message = {
    from: '"DigsUp" <no-reply@digsup.com>',
    to: email,
    subject: "DigsUp Subscription",
    text: "Your subscription to DigsUp is successfully processed.",
    html:
      "<p>Your subscription to <b>DigsUp</b> is successfully processed.</p>",
  };
  return senderTransport.sendMail(message);
};
export default mailSender;

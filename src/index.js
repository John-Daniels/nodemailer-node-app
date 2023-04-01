const { config } = require("dotenv");
const nodemailer = require("nodemailer");
config();

// initailize nodemailer transport
const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// verify connection configuration
// mailer.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

const sendWelcomeMail = async (email) => {
  try {
    const result = await mailer.sendMail({
      from: "My Node App",
      to: email,
      subject: "Welcome Onboard! ",
      text: "Welcome to my Node App!", // this will used for mail clients that dont support rendering html
      html: `<h1>Welcome to my Node App!</h1>`,
    });

    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
};

sendWelcomeMail("example@gmail.com")
  .then((data) => console.log(data))
  .catch((e) => console.log(e));

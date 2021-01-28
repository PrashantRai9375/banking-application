const nodemailer = require('nodemailer');
const path = require("path");
const fs = require("fs");
const {mailCreds} = require("../config/config");


const getEmailContent =  (params) => {
  params.filePath = path.join(__dirname, '../../views/transaction.html');
  let data = (fs.readFileSync(params.filePath)).toString();
  let final = data
  .replace("-user_name-", params.user_name)
  .replace("-transaction_type-", params.transaction_type)
  .replace("-amount-", params.amount)
  .replace("-updated_balance-", params.updated_balance);
  return final;
}


const sendEmail = async (params) => {
  let content = getEmailContent(params);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailCreds.email,
      pass: mailCreds.password
    }
  });
  const mailOptions = {
    from:`"Bank"${mailCreds.email}`, // sender address
    to: params.email, // list of receivers
    subject: params.subject, // Subject line
    html: content// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}


module.exports = { sendEmail };   
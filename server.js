const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const { firstName, lastName, email, phone, zipCode, state, income, householdSize, insuranceType, dob } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Use the correct SMTP host for Outlook
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'testforbri@outlook.com', // Change to your receiving email address
    subject: 'Insurance Application Form Submission',
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone: ${phone}
      Zip Code: ${zipCode}
      State: ${state}
      Income: ${income}
      Household Size: ${householdSize}
      Insurance Type: ${insuranceType}
      Date of Birth: ${dob}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async (event, context) => {
  const { firstName, lastName, email, phone, zipCode, state, income, householdSize, insuranceType, dob } = JSON.parse(event.body);

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
    to: 'octavianohealth@outlook.com', // Change to your receiving email address
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

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent: ' + info.response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};

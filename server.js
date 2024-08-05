const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'outlook', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'octavianohealth@outlook.com', // Replace with your actual email
    subject: 'Insurance Application Form Submission',
    text: `
      First Name: ${data.firstName}
      Last Name: ${data.lastName}
      Email: ${data.email}
      Phone: ${data.phone}
      Zip Code: ${data.zipCode}
      State: ${data.state}
      Income: ${data.income}
      Household Size: ${data.householdSize}
      Insurance Type: ${data.insuranceType}
      Date of Birth: ${data.dob}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email sent successfully',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.toString()}`,
    };
  }
};
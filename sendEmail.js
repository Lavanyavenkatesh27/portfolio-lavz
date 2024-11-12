document.querySelector('.contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };
  
    try {
      const response = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); // 'Email sent successfully!' message from the server
      } else {
        alert(result.message); // Error message from the server
      }
    } catch (error) {
      alert('Error sending message: ' + error.message);
    }
  });
  const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace 'gmail' with your email provider if different
  auth: {
    user: process.env.EMAIL, // The email you're sending from
    pass: process.env.PASSWORD, // The email password or app password
  },
});

exports.handler = async (event) => {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    }

    // Parse form data
    const { name, email, message } = JSON.parse(event.body);

    // Validate form data
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Please fill in all fields' }),
      };
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL, // Sender email address (from EMAIL environment variable)
      to: process.env.RECEIVER_EMAIL, // Your email address (from RECEIVER_EMAIL environment variable)
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success if email was sent successfully
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);

    // Respond with error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };
  }
};

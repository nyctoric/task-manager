const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'neil@basilleaftech.com',
    subject: 'Thanks for joining the system',
    text: `Welcome to the club, ${name}. We're glad you're here.`
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'neil@basilleaftech.com',
    subject: 'Sorry to see you go',
    text: `Sorry to see you go ${name}. Please tell us why.`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};

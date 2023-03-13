const nodemailer = require('nodemailer');
const crypt = require('./crypt');

const encPassword = 'jD52hdT+dLoOp8wNiwS3mw==';
const encMail = 'ki9pj97kdLMfs5lTzUSVkBvyhAJQDAtv';

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: crypt.decrypt(encMail),
        pass: crypt.decrypt(encPassword)
    }
});

module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: crypt.decrypt(encMail),
        to,
        subject,
        html: message, 
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'greenideas1640@gmail.com',
        pass: 'yczodsdlpgdhrpbl'
    }
});

module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'greenideas1640@gmail.com',
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
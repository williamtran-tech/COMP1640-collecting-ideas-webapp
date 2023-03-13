const sendMail = require('./sendMail');
const template = require('../mail-template/mail-templates.js');

sendMail("ducbalor@gmail.com", "Registration template", template.registration("waht"));
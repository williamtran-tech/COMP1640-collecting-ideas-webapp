const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = 'bf3c199c2470cb477d907b1e0917c17b'; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = '5183666c72eec9e4';

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, IV_LENGTH);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function decrypt(text) {
    let decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, IV_LENGTH);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
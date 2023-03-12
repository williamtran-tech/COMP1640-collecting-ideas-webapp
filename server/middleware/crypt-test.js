const crypt = require('./crypt.js');
const encPassword = crypt.encrypt('yczodsdlpgdhrpbl');
console.log(encPassword);
console.log(crypt.decrypt(encPassword));
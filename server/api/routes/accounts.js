const express = require('express');
const router = express.Router();
var userList = require('../../controllers/userController.js');

router.post('/register', userList.create_user);

module.exports = router;
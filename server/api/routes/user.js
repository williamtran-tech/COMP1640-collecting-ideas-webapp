const express = require('express');
const router = express.Router();
const user = require('../../controllers/userController.js');
const checkAuth = require('./../../middleware/checkAuth.js');

router.get('/profile/:id', checkAuth, user.personal_info);

module.exports = router;
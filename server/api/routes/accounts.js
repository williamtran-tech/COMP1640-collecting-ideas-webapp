const express = require('express');
const router = express.Router();
const user = require('../../controllers/userController.js');
const verifyEmail = require('./../../middleware/verifyEmail.js');

router.post('/register', user.create_user);
// Verify is done, but for easy to test the system, this will added later
// router.post('/login', verifyEmail, user.login_user);
router.post('/login', user.login_user);

router.post('/verify/:token', verifyEmail, user.verify);
// router.post('/verify', verifyEmail, user.verify);

module.exports = router;
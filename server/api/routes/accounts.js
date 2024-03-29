const express = require('express');
const router = express.Router();
const user = require('../../controllers/userController.js');

router.post('/register', user.create_user_root);
// Verify is done, but for easy to test the system, this will added later
// router.post('/login', verifyEmail, user.login_user);
router.post('/login', user.login_user);

router.get('/verify', user.verify);

// Forgot password function
router.post('/forgot-password', user.forgot_password);
router.get('/reset-password', user.verifyTokenReset);
router.post('/reset-password', user.reset_password);

// router.post('/verify', verifyEmail, user.verify);

module.exports = router;
const express = require('express');
const router = express.Router();
var validate = require('../../controllers/authController.js');

router.get('/', validate.test);
router.post('/', validate.validate_login_inf);

module.exports = router;
const express = require('express');
const router = express.Router();
const user = require('../../controllers/userController.js');
const checkAuth = require('./../../middleware/checkAuth.js');
const uploadImg = require('./../../middleware/uploadImg.js');

router.get('/profile/:id', checkAuth, user.personal_info);
router.put('/update-avatar/:id', checkAuth, uploadImg, user.update_avatar);

module.exports = router;
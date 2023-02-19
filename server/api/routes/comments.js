const express = require('express');
const router = express.Router();

var comment = require('../../controllers/commentController.js');
const checkAuth = require('./../../middleware/checkAuth');

router.post('/', checkAuth, comment.create_comment);

module.exports = router;
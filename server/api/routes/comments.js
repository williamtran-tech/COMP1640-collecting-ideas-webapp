const express = require('express');
const router = express.Router();

var comment = require('../../controllers/commentController.js');

router.post('/', comment.create_comment);

module.exports = router;
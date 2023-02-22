const express = require('express');
const router = express.Router();

var comment = require('../../controllers/commentController.js');
const checkAuth = require('./../../middleware/checkAuth');

router.post('/', checkAuth, comment.create_comment);
router.put('/:id', checkAuth, comment.update_comment);

module.exports = router;
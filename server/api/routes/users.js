const express = require('express');
const router = express.Router();
var userList = require('./../../controllers/userController.js');

router.get('/', userList.list_all_users);

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;

    res.status(200).json({
        message: 'Updated user: ' + id,
    });
});

module.exports = router;
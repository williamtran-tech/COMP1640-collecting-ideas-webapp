const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'May thang users ne'
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;

    res.status(200).json({
        message: 'Updated user: ' + id,
    });
});

module.exports = router;
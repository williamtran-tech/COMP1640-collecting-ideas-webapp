const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');
const moment = require('moment-timezone');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];

            decoded = jwt.verify(token, config.env.JWT_key);
            req.userData = decoded;
            console.log(decoded);
            next();
        }
        else {
            console.log(error);
            res.render('accounts/login'); 
            res.status(401).json({
            error: "Auth failed"
        });
        }
    }
    catch (error) {
        console.log(error);

        const utcDate = new Date(error.expiredAt);
        const ictDate = moment.utc(utcDate).tz('Asia/Bangkok');
        res.status(401).json({
            error: "Expire section",
            expiredAt: ictDate.toLocaleString(),
            isExpire: true
        });
        
    }
}
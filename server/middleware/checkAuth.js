const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token);
            decoded = jwt.verify(token, config.env.JWT_key);
            req.userData = decoded;
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
        res.status(401).json({
            error: "Auth failed"
        });
        
    }
}
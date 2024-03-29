const db = require('./../db/models');
const User = db.User;
const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {
            "email": req.body.email
        }});
        console.log(req.params.token)
        if (req.params.token) {
            const token = req.params.token;

            decoded = jwt.verify(token, config.env.JWT_key);
            next();
        }
        else if (!req.params.token){
            if(user.isVerified) {
                next();
            } else {
                // res.status(401).json({
                //     err: "Error Access System"
                // });
                res.redirect('/login');
            }
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
            error: "Expire section",
        });
        
    }
}
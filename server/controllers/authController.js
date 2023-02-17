'use strict';

const { sendStatus } = require("express/lib/response");

exports.validate_login_inf = function(req, res) {
    console.log(req.body)
    if (err) {
        res.send(err);
    }
    res.status(200).json({
        message: 'cak',
    });
    //handles null error
};
exports.test = function(req, res) {
    sendStatus
    console.log("dddd")
    //handles null error
};
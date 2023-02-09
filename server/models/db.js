'use strict';

var mysql = require('mysql2');
const config = require('../config/default.json');

//local mysql db connection
var connection = mysql.createConnection({
    host     : config.server.host,
    user     : config.server.user,
    password : config.server.password,
    database : config.server.database
});
// connect to database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected");
});

module.exports = connection;

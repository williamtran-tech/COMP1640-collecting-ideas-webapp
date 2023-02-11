'use strict';

var Topic = require('../models/topics.js');

exports.list_all_topics = function(req, res) {
    Topic.getAllTopics((err, topics) => {
        if (err) {
            res.send(err);
        }
        // console.log('res', task);
        res.status(200).json({
            message: 'Hay lam thang nhoc 2',
            topics: topics
        });
    });
};
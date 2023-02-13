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

exports.list_all_ideas_by_topic = function(req, res) {
    const message = 'Successfully Get All Ideas By Topic';

    // Topic.getTopicInfo((err, info) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     topicInfo = info;
    // }, req.params.topicId);

    Topic.getAllIdeasByTopic((err, topicInfo) => {
        if (err) {
            res.send(err);
        }
        
        res.status(200).json({
            message: message,
            info: topicInfo[0],
            ideas: topicInfo[1]
        });
    }, req.params.topicId);

   
    // res.status(200).json({
    //     message: message,
    //     info: topicInfo,
    //     ideas: ideaList
    // })

};
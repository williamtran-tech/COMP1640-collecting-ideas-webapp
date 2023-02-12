'use strict';
var sql = require('./db.js');

//Task object constructor
var Topic = function(topic){
    console.log(topic);
    this.id = topic.id;
    this.topic = topic.topic;
    this.closure_date = topic.closure_date;
    this.final_closure_date = topic.final_closure_date;
};

Topic.getAllTopics = (result) => {
    let query = `SELECT topic.id, topic, closure_date, final_closure_date, count(idea) as idea_quantity 
    FROM topic 
    INNER JOIN idea ON idea.topic_id = topic.id 
    GROUP BY topic.id`
    sql.query(query, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('a: ', res);
            result(null, res);
        }
    });
};

module.exports = Topic;
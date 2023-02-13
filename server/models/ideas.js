'use strict';
var sql = require('./db.js');

//Task object constructor
var Idea = function(idea){
    console.log(idea);
    this.id = idea.id;
    this.idea = idea.idea;
    this.topic = idea.topic;
    this.category = idea.category;
    this.created_at = task.created_at;
};

// Add a method to an object (Task)

/**
 * Parameter Rules
JavaScript function definitions do not specify data types for parameters.
JavaScript functions do not perform type checking on the passed arguments.
JavaScript functions do not check the number of arguments received.
 */

Idea.getAllIdeas = (result) => {
    let query = `SELECT idea.id, idea.idea, idea.created_at, idea.file_path, category.category, 
    topic.topic, topic.closure_date, topic.final_closure_date FROM idea 
    INNER JOIN category ON category.id=idea.category_id
    INNER JOIN topic ON topic.id=idea.topic_id`
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

Idea.createIdea = (idea, result) => {
    // var query = "INSERT INTO tasks (id, task, status, created_at) VALUES ?;";
    let query = "INSERT INTO idea(idea, topic_id, category_id) VALUES (?,?,?)";
    sql.query(query, Object.values(idea), function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res);
        }
    });
};

Idea.getIdeaById = (result, ideaId) => {
    let query = `SELECT idea.id, idea.idea, idea.created_at, category.category, topic.topic FROM idea
            INNER JOIN category ON idea.category_id = category.id
            INNER JOIN topic ON idea.topic_id = topic.id
            WHERE idea.id = ` + ideaId;
    sql.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("Successfully get idea by ID");
            result(null, res);
        }
    });  
}

module.exports = Idea;

// Task.getTaskById = function createUser(taskId, result) {
//     sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             result(null, res);

//         }
//     });
// };



// Task.updateById = function(id, task, result){
//     sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else{
//             result(null, res);
//         }
//     });
// };

// Task.remove = function(id, result){
//     sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

//         if(err) {
//             console.log("error: ", err);
//             result(null, err);
//         }
//         else{

//             result(null, res);
//         }
//     });
// };


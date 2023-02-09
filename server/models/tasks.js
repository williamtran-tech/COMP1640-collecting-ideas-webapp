'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    console.log(task);
    this.id = task.id;
    this.task = task.task;
    this.status = task.status;
    this.created_at = task.created_at;
};

// Add a method to an object (Task)

/**
 * Parameter Rules
JavaScript function definitions do not specify data types for parameters.
JavaScript functions do not perform type checking on the passed arguments.
JavaScript functions do not check the number of arguments received.
 */

Task.getAllTask = (result) => {
    sql.query("Select * from tasks", function (err, res) {
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

Task.test = (idea) => {
    console.log('Whatht the fuckl', idea);
    // result(null, "asd");
};

Task.createTask = (idea, result) => {
    // var query = "INSERT INTO tasks (id, task, status, created_at) VALUES ?;";
    var query = "INSERT INTO tasks(id, task, status, created_at) VALUES (?,?,?,?)";
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

module.exports = Task;

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


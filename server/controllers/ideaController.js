'use strict';

var Idea = require('../models/ideas.js');

exports.list_all_ideas = function(req, res) {
    Idea.getAllIdeas((err, ideas) => {
        if (err) {
            res.send(err);
        }
        // console.log('res', task);
        res.status(200).json({
            message: 'Hay lam thang nhoc',
            ideas: ideas
        });
    });
};

exports.create_an_idea = function(req, res) {
    var new_idea = new Idea(req.body);

    //handles null error
    if(!new_idea.idea || !new_idea.created_at){
        res.status(400).send({ error:true, message: 'Please provide task/created_at' });
    }
    else{
        Idea.createIdea(new_idea, function(err, idea) {
            if (err)
                res.send(err);
            res.send(idea);
            console.log("Successfully inserted");
        });
    }
};


// exports.read_a_task = function(req, res) {
//     Task.getTaskById(req.params.taskId, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };


// exports.update_a_task = function(req, res) {
//     Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
//         if (err)
//             res.send(err);
//         res.json(task);
//     });
// };


// exports.delete_a_task = function(req, res) {


//     Task.remove( req.params.taskId, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task successfully deleted' });
//     });
// };

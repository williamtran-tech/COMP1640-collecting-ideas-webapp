'use strict';



const db = require('./../db/models');
const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;

exports.all_ideas = async (req, res) => {
    try {
        const ideas = await Idea.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'CategoryId', 'UserId', 'TopicId','categoryId', 'userId', 'topicId' ]
            },
            include: [
                {
                model: User, as: "User",
                attributes:['id','fullName']
                },
                {
                model: Topic, as: "Topic",
                attributes:['id','name', 'closureDate', 'finalClosureDate']
                },
                {
                model: Category, as: "Category",
                attributes:['id','name']
                }
            ]
        });
        res.json({
            message: "Successfully get all ideas",
            ideas: ideas
          });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}



// THIS IS FOR BACKUP FUNCTIONS USING NORMAL QUERY
// var Idea = require('../models/ideas.js');
// exports.list_all_ideas = function(req, res) {
//     Idea.getAllIdeas((err, ideas) => {
//         if (err) {
//             res.send(err);
//         }
//         // console.log('res', task);
//         res.status(200).json({
//             message: 'Successfully get all ideas',
//             ideas: ideas
//         });
//     });
// };

// exports.get_idea_by_id = function(req, res) {
//     Idea.getIdeaById((err, idea) => {
//         if (err) {
//             res.send(err);
//         }
//         res.status(200).json({
//             message: 'Successfully get idea by ID',
//             idea: idea
//         })
//     }, req.params.ideaId);
// }

// exports.create_an_idea = function(req, res) {
//     var new_idea = new Idea(req.body);

//     //handles null error
//     if(!new_idea.idea || !new_idea.created_at){
//         res.status(400).send({ error:true, message: 'Please provide task/created_at' });
//     }
//     else{
//         Idea.createIdea(new_idea, function(err, idea) {
//             if (err)
//                 res.send(err);
//             res.send(idea);
//             console.log("Successfully inserted");
//         });
//     }
// };


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

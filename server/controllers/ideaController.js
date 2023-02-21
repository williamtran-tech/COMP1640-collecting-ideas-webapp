'use strict';

const db = require('./../db/models');
const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;
const React = db.React;

exports.all_ideas = async (req, res) => {
    try {
        const ideas = await Idea.findAll({
            attributes: {
                exclude: ['CategoryId', 'UserId', 'TopicId','categoryId', 'userId', 'topicId' ]
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

exports.get_idea_by_id = async (req, res) => {
    try{
        const idea = await Idea.findAll({
            attributes: {
                exclude: ['CategoryId', 'UserId', 'TopicId','categoryId', 'userId', 'topicId' ]
            },
            where: {id: req.params.id},
            include: [
                {
                    model: User, as: "User",
                    attributes:['id','fullName'],
                    require: true
                },
                {
                    model: Topic, as: "Topic",
                    attributes:['id','name', 'closureDate', 'finalClosureDate'],
                    require: true
                },
                {
                    model: Category, as: "Category",
                    attributes:['id','name'],
                    require: true
                }
            ]
        });
        const comments = await Comment.findAll({
            attributes: [[db.Sequelize.literal('User.fullName'), 'owner'],'content', 'createdAt', 'updatedAt'],
            where: {'ideaId': req.params.id},
            include: {
                model: User, 
                as: "User",
                attributes:[],
                required: true
            }
        });

        res.status(200).json({
            message: "Successfully get all comments by idea id " + idea[0].id,
            idea: idea,
            comments: comments
        });
    } catch (error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.react = async (req, res) => {
    try {
        console.log("enter here");
        if (req.body.isLike === 1) {
            // Function increase like in db
            // 1. Check react of userID is existed or not
            // 1.1. If existed -> put/ update data of the like
            // 1.1.1. If userId already liked -> return user has already like the idea
            // 1.1.2. Increase nLike in the React table with the record of userId and decrease the dislike of idea
            // 1.2. If not -> create a row contains the userId with the ideaId -> Increase nLike by 1.
            const [react, created] = await React.findOrCreate({
                where: {
                    ideaId: req.body.ideaId, 
                    userId: req.body.userId    
                },
                defaults: {
                    ideaId: req.body.id,
                    userId: req.body.userId,
                    nLike: db.Sequelize.literal('nLike + 1')
                }
            });
            if (!created){
                if (react.nDislike === 1) {
                    console.log("ĐỂ TAO LIKE");
                    const update = await React.update({
                        nDislike: db.Sequelize.literal('nDislike - 1'),
                        nLike: db.Sequelize.literal('nLike + 1')},{
                        where: { 
                            ideaId: req.body.ideaId,
                            userId: req.body.userId
                            }
                        }
                    ); 
                    res.status(200).json({
                        msg: "Successfully like the idea"
                    })
                } else {
                    console.log("Like rồi dcmmmm");
                    res.status(200).json({
                        msg: "Successfully like the idea"
                    })
                }
            } else {
                res.status(200).json({
                    msg: "Successfully like the idea"
                })
            }
        }
        else if (req.body.isLike === 0) {
            console.log("TAO DISLIKE HẾT");
            // Function decrease like in db
            const [react, created] = await React.findOrCreate({
                where: {
                    ideaId: req.body.ideaId, 
                    userId: req.body.userId    
                },
                defaults: {
                    ideaId: req.body.id,
                    userId: req.body.userId,
                    nDislike: db.Sequelize.literal('nDislike + 1')
                }
            });
            if (!created) {
                if (react.nLike === 1) {
                    console.log("ĐỂ TAO DISLIKE");
                    const update = await React.update({
                        nDislike: db.Sequelize.literal('nDislike + 1'),
                        nLike: db.Sequelize.literal('nLike - 1')},{
                        where: { 
                            ideaId: req.body.ideaId,
                            userId: req.body.userId
                            }
                        }
                    );
                    res.status(200).json({
                        msg: "Successfully dislike the idea",
                        update: update
                    });
                }else {
                    console.log("Dislike rồi DCMM");
                    res.status(200).json({
                        msg: "Successfully dislike the idea"
                    })
                }
            } else {
                res.status(200).json({
                    msg: "Successfully dislike the idea"
                })
            }
    
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Server Error"
        })
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

'use strict';

const db = require('./../db/models');
const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;
const React = db.React;
const View = db.View;

const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');

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

        const page = req.param('page'); // current page number
        const limit = 5; // number of items per page
        const offset = (page - 1) * limit; // offset to skip previous items

        const ideasReact = await db.sequelize.query(
                `SELECT 
                    topics.name AS Topic, 
                    ideas.name AS Idea, 
                    users.fullName AS OwnerName, 
                    users.email AS Owner, 
                    SUM(reacts.nLike) AS Likes, 
                    SUM(reacts.nDislike) AS Dislikes,
                    SUM(views.views) AS Views,
                    categories.name AS Category,
                    ideas.createdAt, 
                    ideas.updatedAt,
                    ideas.id as ideaId,
                    users.id as userId,
                    categories.id as categoryId
                FROM reacts
                INNER JOIN ideas ON reacts.ideaId = ideas.id
                JOIN categories ON ideas.categoryId = categories.id
                JOIN topics ON ideas.topicId = topics.id
                JOIN users ON ideas.userId = users.id
                JOIN views ON ideas.id = views.ideaId
                GROUP BY reacts.ideaId ORDER BY ideas.name
                LIMIT ${limit} OFFSET ${offset};
                `);

        // The sequelize returns 2 items in an array - 1st is result set - 2nd is metadata about the query
        // => Get the [0] of array
        res.json({
            message: "Successfully get all ideas",
            reactIdeas: ideasReact[0]
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

        const react = await React.findAll({
            where: {ideaId: req.params.id},
            attributes: [
                [db.Sequelize.fn('sum', db.sequelize.col('nLike')), 'Likes'],
                [db.Sequelize.fn('sum', db.sequelize.col('nDislike')), 'Dislikes']
            ]
        });

        const reactPeople = await React.findAll({
            where: {ideaId: req.params.id}, 
            attributes: [[db.Sequelize.literal("User.fullName"), "user"]],
            include: [{
                model: User,
                as: "User",
                attributes: [],
                nested: true
            }]
        })

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

        const views = await View.findAll({
            where: {
                "ideaId": req.params.id
            },
            attributes: [[db.Sequelize.fn('sum', db.sequelize.col('views')), 'views']]
        });

        // The code above need to refactor because of the repeated code - Separated Code for readability
        let token="";
        let decoded
        
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            decoded = jwt.verify(token, config.env.JWT_key);
        }
        // Update Views when access to the idea detail page
        if(decoded != null){
            const [view, created] = await View.findOrCreate({
                where: {
                ideaId: req.params.id, 
                userId: decoded.userId
            },
            defaults: {
                ideaId: req.body.id,
                userId: decoded.userId,
                views: db.Sequelize.literal('views + 1')
            }
            });
            if (!created){
                View.increment('views', {by: 1, 
                    where: {
                        "ideaId": req.params.id,
                        "userId": decoded.userId
                    }
                });
            } else {
                console.log("Successfully created new ideaId with userId");
            }
        } else {
            View.increment('views', {by: 1, 
                where: {
                    "ideaId": req.params.id,
                    "userId": null
                }
            });
        }

        res.status(200).json({
            message: "Successfully get all comments by idea id " + idea[0].id,
            idea: idea,
            views: views[0].views,
            comments: comments,
            react: react,
            reactBy: reactPeople
        });
        
    } catch (error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.react = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, config.env.JWT_key);

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
                    userId: decoded.userId
                },
                defaults: {
                    ideaId: req.body.id,
                    userId: decoded.userId,
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
                            userId: decoded.userId
                            }
                        }
                    ); 
                    res.status(200).json({
                        msg: "Successfully like the idea"
                    })
                } else {
                    await React.destroy({
                        where: { 
                            ideaId: req.body.ideaId,
                            userId: decoded.userId
                            }
                    }
                    ); 
                    res.status(200).json({
                        msg: "Successfully remove react the idea"
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
                    userId: decoded.userId  
                },
                defaults: {
                    ideaId: req.body.id,
                    userId: decoded.userId,
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
                            userId: decoded.userId
                            }
                        }
                    );
                    res.status(200).json({
                        msg: "Successfully dislike the idea",
                        update: update
                    });
                }else {
                    await React.destroy({
                        where: { 
                            ideaId: req.body.ideaId,
                            userId: decoded.userId
                            }
                    }
                    ); 
                    res.status(200).json({
                        msg: "Successfully remove react the idea"
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
        });
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

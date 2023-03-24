'use strict';

const db = require('./../db/models');
const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;
const React = db.React;
const View = db.View;
const validate = require('./../middleware/validateInput.js');
const sendEmail = require('./../middleware/sendMail.js');
const htmlMail = require('../mail-template/mail-templates.js');
const fs = require('fs');
const path = require('path');

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
                attributes:['id','fullName', 'profileImage']
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
                    attributes:['id','fullName', 'profileImage'],
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

        const likedBy = await React.findAll({
            where: {
                ideaId: req.params.id,
                nLike: 1
            },
            attributes: [
                'createdAt', 'updatedAt'
            ],
            include: [{
                model: User,
                as: "User",
                attributes: ['id','fullName', 'profileImage']
            }]
        });

        const dislikedBy = await React.findAll({
            where: {
                ideaId: req.params.id,
                nDislike: 1
            },
            attributes: [
                'createdAt', 'updatedAt'
            ],
            include: [{
                model: User,
                as: "User",
                attributes: ['id','fullName', 'profileImage']
            }]
        });

        // const reactPeople = await React.findAll({
        //     where: {ideaId: req.params.id}, 
        //     attributes: [[db.Sequelize.literal("User.fullName"), "user"], [db.Sequelize.literal("User.id"), "id"]],
        //     include: [{
        //         model: User,
        //         as: "User",
        //         attributes: [],
        //         nested: true
        //     }]
        // })

        const comments = await Comment.findAll({
            attributes: [[db.Sequelize.literal('User.fullName'), 'owner'],[db.Sequelize.literal('User.profileImage'), 'imagePath'],'content', 'isAnonymous', 'createdAt', 'updatedAt'],
            where: {
                'ideaId': req.params.id,
                'isAnonymous': false
            },
            include: {
                model: User, 
                as: "User",
                attributes:[],
                required: true
            }
        });

        const anoComments = await Comment.findAll({
            attributes: ['content', 'isAnonymous', 'createdAt', 'updatedAt'],
            where: {
                'ideaId': req.params.id,
                'isAnonymous': true
            },
        })

        const numComments = await Comment.findAll({
            where: {
                "ideaId": req.params.id
            },
            attributes: [[db.Sequelize.fn('count', db.sequelize.col('id')), 'quantity']],
            raw: true
        })

        const views = await View.findAll({
            where: {
                "ideaId": req.params.id
            },
            attributes: [[db.Sequelize.fn('sum', db.sequelize.col('views')), 'views']]
        });

        const viewedBy = await View.findAll({
            where: {
                ideaId: req.params.id,
                views: 1
            },
            attributes: [
                'createdAt', 'updatedAt'
            ],
            include: [{
                model: User,
                as: "User",
                attributes: ['id','fullName', 'profileImage']
            }]
        })

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

            if (created) {
                console.log("Successfully add userId to view ideaId");
            }
        }

        res.status(200).json({
            message: "Successfully get all comments by idea id " + idea[0].id,
            idea: idea,
            likedBy: likedBy,
            dislikedBy: dislikedBy,
            views: views[0].views,
            viewedBy: viewedBy,
            comments: comments,
            anoComments: anoComments,
            nComments: numComments[0].quantity,
            react: react
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
                    ideaId: req.params.id, 
                    userId: decoded.userId
                },
                defaults: {
                    ideaId: req.params.id,
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
                            ideaId: req.params.id,
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
                            ideaId: req.params.id,
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
                    ideaId: req.params.id, 
                    userId: decoded.userId  
                },
                defaults: {
                    ideaId: req.params.id,
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
                            ideaId: req.params.id,
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
                            ideaId: req.params.id,
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

exports.create_idea = async (req, res) => {
    try {
        let result = false;
        var createdIdea = {};
        if (req.file) {
            const [newIdea, created] = await Idea.findOrCreate({
                where: {
                    "name": req.body.name,
                    "categoryId": req.body.categoryId,
                    "topicId": req.params.topicId,
                    "userId": req.body.userId,
                    "isAnonymous": req.body.isAnonymous
                },
                defaults: {
                    "name": req.body.name,
                    "filePath": req.file.path,
                    "categoryId": req.body.categoryId,
                    "topicId": req.params.id,
                    "userId": req.body.userId,
                    "isAnonymous": req.body.isAnonymous,
                    "nLike": 0,
                    "nDislike": 0,
                    "nView": 0
                }
            });

            if (created) {
                result = true;
                createdIdea = newIdea;
            }
        } else {
            const [newIdea, created] = await Idea.findOrCreate({
                where: {
                    "name": req.body.name,
                    "categoryId": req.body.categoryId,
                    "topicId": req.params.topicId,
                    "userId": req.body.userId,
                    "isAnonymous": req.body.isAnonymous
                },
                defaults: {
                    "name": req.body.name,
                    "filePath": null,
                    "categoryId": req.body.categoryId,
                    "topicId": req.params.id,
                    "userId": req.body.userId,
                    "isAnonymous": req.body.isAnonymous,
                    "nLike": 0,
                    "nDislike": 0,
                    "nView": 0
                }
            });
            if (created) {
                result = true;
                createdIdea = newIdea;
            }
        }
        
        if (!result) {
            // Delete the file -> from the uploaded files - temporary file

            //
            res.status(406).json({
                msg:"Your idea is exists"
            })
        } else {
            // The following code used to set init value for comment and views of the new idea
            const setView = await View.create({
                "ideaId": createdIdea.id,
            });
            const setReact = await React.create({
                "ideaId": createdIdea.id,
            });

            // Getting all manager-mails to send notify - Role id 2 is manager
            const managers = await User.findAll({
                where: {
                    roleId: 2
                },
                attributes: ['email']
            })
            const managerMails = managers.map(manager => manager.email);

            const ideaCreator = await User.findOne({where: {
                "id": createdIdea.userId
                }},
                {attributes: ['email', 'fullName']
            });

            const topicInfo = await Topic.findOne({where: {
                "id": createdIdea.topicId
            }}, 
            {attributes: ["name"]});

            // sendEmail(managerMails, "[GRE IDEAS] NEW IDEA WAS SUBMITTED", htmlMail.ideaSubmit(createdIdea, ideaCreator, topicInfo));
            sendEmail(managerMails, "[GRE IDEAS] NEW IDEA WAS SUBMITTED", htmlMail.ideaSubmit(createdIdea, ideaCreator, topicInfo));
            
            const topic = await Topic.findOne({
                where: {
                    id: req.params.topicId
                }
            });
            console.log(path.basename(req.file.path));
            // Move the file from temp folder to the right directory
            const dir = `./uploaded_files/uploads/${topic.name}`
            fs.mkdirSync(`${dir}/${createdIdea.name}`, {recursive: true});
            const dest = `${dir}/${createdIdea.name}/${path.basename(req.file.path)}`;
            fs.rename(createdIdea.filePath, dest, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Move file successfully");
                }
            });
            const moveFileIdea = await Idea.update({
                "filePath": dest.slice(2)
            },
            {
                where: {
                    id: createdIdea.id
                }
            });

            const idea = await Idea.findOne({
                where: {
                    id: createdIdea.id
                }
            });
            res.status(200).json({
                msg: "Successfully create new idea",
                idea: idea
            });
        }
    }
    catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError") {
            res.status(401).json({
                err: "Topic not found",
                err: err
            })
        } else {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

exports.update_idea = async (req, res) => {
    try {
        // Get the idea
        const oldIdea = await Idea.findOne({
            where: {
                "id": req.params.id
            }
        });
        // Check file exist or not
        if (!req.file) {
            validate.checkFilePath(oldIdea);
            const updated = await oldIdea.update({
                "name": req.body.name,
                "categoryId": req.body.categoryId,
                "isAnonymous": req.body.isAnonymous,
                "filePath": null,
                "userId": req.body.userId
            });
            if (updated) {
                res.status(200).json({
                    msg: "Successfully update idea"
                })
            } else {
                res.status(401).json({
                    err: "Update idea failed"
                })
            }
        } else {
            validate.checkFilePath(oldIdea);
            const updated = await oldIdea.update({
                "name": req.body.name,
                "categoryId": req.body.categoryId,
                "isAnonymous": req.body.isAnonymous,
                "filePath": req.file.path,
                "userId": req.body.userId
            });
            if (updated) {
                res.status(200).json({
                    msg: "Successfully update idea"
                })
            } else {
                res.status(401).json({
                    err: "Update idea failed"
                })
            }
        }
    } catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError"){
            res.status(401).json({
                err: "Invalid input"
            })
        } else {
            console.log(err);
            res.status(500).json({
                err: "Server error"
            })
        }
    }
}

exports.delete_idea = async (req, res) => {
    try {
        // Get the idea 
        const idea = await Idea.findOne({
            where: {
                "id": req.params.id
            }
        });
        if (idea) {
            // Remove file associated with the idea
            const infoRemove = await this.removeAssociate(idea);

            res.status(infoRemove.code).json({
                msg: infoRemove.msg,
                idea: infoRemove.idea
            })
        } else {
            res.status(404).json({
                err: "Not Found Idea"
            });
        }
        
    } catch (err){
        console.log(err);
        res.status(500).json({
            err: "Server error"
        })
    }
}

exports.removeAssociate = async(idea) =>{
        validate.checkFilePath(idea);
        // Remove view, react, comment
        View.destroy({
            where: {
                "ideaId": idea.id
            }
        });
        React.destroy({
            where: {
                "ideaId": idea.id
            }
        });
        Comment.destroy({
            where: {
                "ideaId": idea.id
            }
        });
        
        // Delete idea
        const rmIdea = Idea.destroy({
            where: {
                "id": idea.id
            }
        });

        if (rmIdea) {
            return {
                code: 200,
                msg: "Successfully delete idea",
                idea: idea
            };
        } else {
            return {
                code: 401,
                msg: "Delete idea failed"
            };
        }
}

 //     if (idea.filePath) {

        //         console.log(idea.filePath);
        //         fs.unlink(idea.filePath, function(err) {
        //             if(err && err.code == 'ENOENT') {
        //                 // file doens't exist
        //                 console.info("File doesn't exist, won't remove it.");
        //             } else if (err) {
        //                 // other errors, e.g. maybe we don't have enough permission
        //                 console.error("Error occurred while trying to remove file");
        //             } else {
        //                 console.info(`File removed`);
        //             }
        //         });
        //     }
        //     // Remove view, react, comment
        //     await View.destroy({
        //         where: {
        //             "ideaId": idea.id
        //         }
        //     });
        //     await React.destroy({
        //         where: {
        //             "ideaId": idea.id
        //         }
        //     });
        //     await Comment.destroy({
        //         where: {
        //             "ideaId": idea.id
        //         }
        //     });
            
        //     // Delete idea
        //     const rmIdea = await Idea.destroy({
        //         where: {
        //             "id": idea.id
        //         }
        //     });

        //     if (rmIdea) {
        //         res.status(200).json({
        //             msg: "Successfully delete idea",
        //             idea: idea
        //         });
        //     } else {
        //         res.status(401).json({
        //             msg: "Delete idea failed"
        //         })
        //     }
        // } else {
        //     res.status(404).json({
        //         err: "Not Found Idea"
        //     })
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

'use strict';

const db = require('./../db/models');

const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;
const sendEmail = require('./../middleware/sendMail.js');
const htmlMail = require('../mail-template/mail-templates.js');
const validate = require('../middleware/validateInput.js');

exports.create_comment = async (req, res) => {
    try {
        // get the topic's final date
        const idea = await Idea.findOne({
            where: {
                "id": req.body.ideaId
            },
            attributes: ['topicId']
        });

        const topic = await Topic.findOne({
            where: {
                "id": idea.topicId
            },
            attributes: ['finalClosureDate']
        });

        if (validate.checkFinalClosureDate(topic.finalClosureDate)){
            res.status(401).json({
                msg: "This topic has been closed"
            })
        } else {
            const comment = await Comment.create({
                content: req.body.content,
                isAnonymous: req.body.isAnonymous,
                userId: req.body.userId,
                ideaId: req.body.ideaId
            });

            // Using another instance because the date retrieving is ICT date, instead of the Date in the Comment.create function (UTC)
            const commentLatest = await Comment.findOne({
                attributes: [[db.Sequelize.literal('User.fullName'), 'owner'],'content', 'isAnonymous','createdAt', 'updatedAt'],
                where: {'id': comment.id },
                include: {
                    model: User, 
                    as: "User",
                    attributes:[],
                    required: true
                }
            })

            const idea = await Idea.findOne({
                where: {
                    "id": req.body.ideaId
                },
                include: {
                    model: User, 
                    as: "User",
                    attributes: ['email', 'fullName']
                }
            });

            const creator = await User.findOne({
                where: {
                    "id": req.body.userId
                }
            })

            sendEmail(idea.User.email, '[GRE IDEAS] Your awesome idea has new comment', htmlMail.commentIdea(idea, commentLatest, creator));
            res.status(200).json({
                message: "Successfully created comment",
                comment: commentLatest,
                idea: idea
            });
        }   
    } catch (error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.update_comment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                "id": req.params.id
            }
        });

        if (comment) {
            const ownedComment = await this.check_ownership_and_exist(req);
            if (ownedComment.code === 401) {
                res.status(401).json({
                    msg: "You are not authorized to update this comment"
                })
            } else if (validate.checkInput(req) || req.body.content == null){
                res.status(401).json({
                    msg: "Please enter a valid comment"
                })
            } else {
                await Comment.update({ 
                    content: req.body.content
                },
                {
                    where: { id: req.params.id }
                }        
                );
        
                const updatedCommentInfo = await Comment.findOne({
                    where: { id: req.params.id },
                    attributes: ['id', 'content', 'updatedAt', 'createdAt'],
                });
        
                res.status(200).json({
                    msg: "Successfully updated comment",
                    updatedComment: updatedCommentInfo
                });
            }
        } else {
            res.status(404).json({
                msg: "Comment not Found"
            })
        } 
    } catch(err) {
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

exports.delete_comment = async (req, res) => { 
    try {
        const comment = await Comment.findOne({
            where: {
                "id": req.params.id
            }
        });
        const ownedComment = await this.check_ownership_and_exist(req);
        if (ownedComment.code === 401) {
            res.status(401).json({
                msg: "You are not authorized to delete this comment"
            })
        } else if (comment) {
            const deletedComment = await Comment.destroy({
                where: { id: req.params.id }
            });
    
            res.status(200).json({
                msg: "Successfully deleted comment",
                deletedComment: deletedComment
            });
        } else {
            res.status(404).json({
                msg: "Comment not Found"
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}

 // Check the ownership and existing of the comment
exports.check_ownership_and_exist = async (req) => {
    // if the comment is not owned by the user, return 401
    const comment = await Comment.findOne({
        where: {
            "id": req.params.id
        },
        attributes: ['userId']
    });
    if (!comment) {
        return {
            code: 404
        }
    } else if (req.userData.userId !== comment.userId) {
        return {
            code: 401
        }
    } else {
        return {
            code: 200
        }
    }
}
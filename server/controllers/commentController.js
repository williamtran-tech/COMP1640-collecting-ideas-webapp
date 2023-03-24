'use strict';

const db = require('./../db/models');

const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;
const sendEmail = require('./../middleware/sendMail.js');
const htmlMail = require('../mail-template/mail-templates.js');

exports.create_comment = async (req, res) => {
    try {
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
    } catch (error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.update_comment = async (req, res) => {
    try {
        const updatedComment = await Comment.update({ 
            content: "Updated comm a asdent"
        },
        {
            where: { id: req.body.id }
        }        
        );

        const updatedCommentInfo = await Comment.findOne({
            where: { id: req.body.id },
            attributes: ['id', 'content', 'updatedAt', 'createdAt'],
        });

        res.status(200).json({
            msg: "Updated comment",
            numRowsUpdated: updatedComment,
            updatedRows: updatedCommentInfo
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}
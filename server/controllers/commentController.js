'use strict';

const db = require('./../db/models');

const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;

exports.create_comment = async (req, res) => {
    try {
        // No need the following code bc the timezone set in config file instead of default
        // const utcTime = new Date();
        // const ictTime = new Date(utcTime.getTime() + (7 * 60 * 60 * 1000));

        const comment = await Comment.create({
            content: req.body.content,
            userId: req.body.userId,
            ideaId: req.body.ideaId
        });

        res.status(200).json({
            message: "Successfully created comment",
            comment: comment
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
'use strict';

const db = require('./../db/models');
const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;

exports.create_comment = async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            userId: req.body.userId,
            ideaId: req.body.ideaId,
            createdAt: new Date(),
            updatedAt: new Date()
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
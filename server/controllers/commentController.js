'use strict';

const db = require('./../db/models');

const User = db.User;
const Category = db.Category;
const Topic = db.Topic;
const Idea = db.Idea;
const Comment = db.Comment;

exports.create_comment = async (req, res) => {
    try {
        const utcTime = new Date();
        const ictTime = new Date(utcTime.getTime() + (7 * 60 * 60 * 1000));

        const comment = await Comment.create({
            content: req.body.content,
            userId: req.body.userId,
            ideaId: req.body.ideaId,
            createdAt: ictTime
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
        const utcTime = new Date();
        const ictTime = new Date(utcTime.getTime() + (7 * 60 * 60 * 1000));
        const [numRowsUpdated, updatedRows] = await Comment.update({ 
            content: "Updaasd comment",
            updatedAt: ictTime
        },
        {
            where: { id: 54 }, 
            returning: true,
            attributes: ['id', 'content', 'updatedAt']
        }        
        );
        
            res.status(200).json({
                msg: "Updated asda comment",
                numRowsUpdated: numRowsUpdated,
                updatedRows: ictTime
            });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            err: err
        });
    }
}
'use strict';
const db = require('./../db/models/index.js');
const { QueryTypes } = require('sequelize');
const models = require('./../db/models');
const User = models.User;
const Category = models.Category;
const Topic = models.Topic;
const Idea = models.Idea;

exports.list_all_topics = async (req, res) => {
    try {
        // Adding attributes: [] inside the include -> the data will not including the joined table data
        const topics = await Topic.findAll({
            attributes: [
              'id',
              'name',
              'closureDate',
              'finalClosureDate',
              [db.sequelize.fn('count', db.sequelize.col('Ideas.id')), 'idea_quantity']
            ],
            include: [
              {
                model: Idea,
                attributes:[],
                require: true
              }
            ],
            group: ['id']
          });


        // THE CODE BELOW USING RAW QUERY

        // const topics = await db.sequelize.query(`SELECT topics.id, topics.name, closureDate, finalClosureDate, count(ideas.Id) as idea_quantity 
        // FROM topics 
        // INNER JOIN ideas ON ideas.topicId = topics.id 
        // GROUP BY topics.id`,{ type: QueryTypes.SELECT });
        res.status(200).json({
                message: "Successfully get all topics",
                topics: topics
              });
    } catch(error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.list_all_ideas_by_topic = async (req, res) => {
    try {
        const id = req.param("topicId");
        const topicInfo = await Topic.findAll({
            attributes: ['id', 'name', 'closureDate', 'finalClosureDate', [db.sequelize.fn('count', db.sequelize.col('Ideas.id')), 'idea_quantity']],
            where: {Id: id},
            include: {
                model: Idea,
                as: Idea,
                attributes: [],
                require: true
            },
            group: ['id']
        });
        // const ideas = await Idea.findAll({
        //     //Careful to name the alias in the attribute -> It can lead to god damn issue -> not showing the value 
        //     attributes: ['id', 'name', [db.Sequelize.literal('Category.name'), 'categoryName'], [db.Sequelize.literal('User.fullName'), 'userName'], 'createdAt', 'updatedAt'],
        //     where: {topicId: id},
        //     include: [
        //       {
        //         model: User, 
        //         as: "User",
        //         attributes:[],
        //         required: true
        //       },
        //       {
        //         model: Category, 
        //         as: "Category",
        //         attributes:[]
        //       }
        //     ]
        //   });

        const page = req.param('page'); // current page number
        const limit = 5; // number of items per page
        const offset = (page - 1) * limit; // offset to skip previous items

        const ideas = await db.sequelize.query(
                `SELECT  
                    ideas.name AS idea, 
                    users.fullName AS ownerName, 
                    users.email AS email, 
                    SUM(reacts.nLike) AS likes, 
                    SUM(reacts.nDislike) AS dislikes,
                    SUM(views.views) AS views,
                    categories.name AS category,
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
                WHERE topics.id = ${id}
                GROUP BY reacts.ideaId
                LIMIT ${limit} OFFSET ${offset};
                `);

            const categories = await Category.findAll({
                attributes: ['name']
            })
        
        res.status(200).json({
            message: "Get all ideas of topic " + req.params.topicId + " successfully",
            info: topicInfo,
            ideas: ideas[0],
            categories: categories,
            offset: offset
        })
    } catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

const query = `SELECT  
ideas.name AS idea, 
users.fullName AS ownerName, 
users.email AS email, 
SUM(reacts.nLike) AS likes, 
SUM(reacts.nDislike) AS dislikes,
SUM(views.views) AS views,
categories.name AS category,
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
WHERE topics.id = 2
GROUP BY reacts.ideaId;`

// exports.list_ideas_by_topic = async (req, res) => {
//     try {
//         const ideas = await Idea.findAll({
//             attributes: {exclude: ['createdAt', 'updatedAt', 'CategoryId', 'UserId', 'TopicId','categoryId', 'userId', 'topicId' ]},
//             include: [
//                 {
//                 model: User, as: "User",
//                 attributes:['id','fullName']
//                 },
//                 {
//                 model: Category, as: "Category",
//                 attributes:['id','name']
//                 }
//             ],
//             where: {
//                 TopicId = req.params.id
//             }
//         })
//     } catch (error){
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// }



// var Topic = require('../models/topics.js');

// exports.list_all_topics = function(req, res) {
//     Topic.getAllTopics((err, topics) => {
//         if (err) {
//             res.send(err);
//         }
//         // console.log('res', task);
//         res.status(200).json({
//             message: 'Hay lam thang nhoc 2',
//             topics: topics
//         });
//     });
// };

// exports.list_all_ideas_by_topic = function(req, res) {
//     const message = 'Successfully Get All Ideas By Topic';

//     Topic.getAllIdeasByTopic((err, topicInfo) => {
//         if (err) {
//             res.send(err);
//         }
        
//         res.status(200).json({
//             message: message,
//             info: topicInfo[0],
//             ideas: topicInfo[1]
//         });
//     }, req.params.topicId);
// };
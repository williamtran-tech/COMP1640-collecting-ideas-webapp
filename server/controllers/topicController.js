'use strict';
const db = require('./../db/models/index.js');
const models = require('./../db/models');
const User = models.User;
const Category = models.Category;
const Topic = models.Topic;
const Idea = models.Idea;
const React = models.React;
const Comment = models.Comment;
const View = models.View;
const validation = require('./../middleware/validateInput');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const jwt = require('jsonwebtoken');

const CsvParser = require('json2csv');

const { removeAssociate } = require('./ideaController.js');
const sendEmail = require('../middleware/sendMail.js');
const htmlMail = require('../mail-template/mail-templates.js');

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
        const id = req.params.topicId;
        const topicInfo = await Topic.findAll({
            attributes: ['id', 'name', 'description', 'closureDate', 'finalClosureDate', [db.sequelize.fn('count', db.sequelize.col('Ideas.id')), 'idea_quantity']],
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
        //       }
        //     ]
        //   });
        const ideas = await db.sequelize.query(
                `SELECT  
                ideas.name AS idea, 
                users.fullName AS ownerName, 
                users.email AS email,
                users.profileImage AS imagePath,
                ideas.isAnonymous,
                COALESCE(reacts.likes, 0) AS likes, 
                COALESCE(reacts.dislikes, 0) AS dislikes,
                SUM(views.views) AS views,
                COALESCE(c.comments, 0) as comments,
                categories.name AS category,
                ideas.createdAt, 
                ideas.updatedAt,
                ideas.id as ideaId,
                users.id as userId,
                categories.id as categoryId
            FROM ideas
            JOIN categories ON ideas.categoryId = categories.id
            JOIN topics ON ideas.topicId = topics.id
            JOIN users ON ideas.userId = users.id
            JOIN views ON ideas.id = views.ideaId
            LEFT JOIN (
                SELECT ideaId, SUM(nLike) as likes, SUM(nDislike) as dislikes
                FROM reacts
                GROUP BY ideaId
            ) reacts ON ideas.id = reacts.ideaId
            LEFT JOIN (
                SELECT ideaId, COUNT(id) as comments
                FROM comments
                GROUP BY ideaId
            ) c ON ideas.id = c.ideaId
            WHERE topics.id = ${id}
            GROUP BY ideas.id;
                `);

        const allCategories = await Category.findAll({
            attributes: ['id','name']
        })

        const categories = await Idea.findAll({
            where: {
                topicId: id
            },
            include: {
                model: Category,
                as: "Category",
                attributes: []
            },
            attributes:[[db.sequelize.fn('distinct', db.sequelize.col('Category.name')), 'name'], ["categoryId", "id"],],
            group: ["Category.name"],
            raw: true
        });

        const mostViewedIdeas = await Idea.findAll({
            attributes: [
                'id', 
                'name', 
                [db.Sequelize.literal('(SELECT SUM(`views`) FROM `Views` WHERE `Views`.`IdeaId` = `Idea`.`id`)'), 'views'],
                'createdAt', 
                'updatedAt'
            ],
            where: {topicId: id},
            include: [
                {
                    model: User,
                    as: "User",
                    attributes:[
                        'id',
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, profileImage)`), 'profileImage'], 
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, fullName)`), 'fullName'], 
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, email)`), 'email']
                    ],
                    require: true
                },
                {
                    model: Category,
                    as: "Category",
                    attributes:['id', 'name'],
                    require: true
                }
            ],
            group: ['id'],
            order: [['views', 'DESC']],
            limit: 5
        });

        // Have the most Like number
        // Using this [db.Sequelize.literal('(SELECT SUM(`nLike`) FROM `Reacts` WHERE `Reacts`.`IdeaId` = `Idea`.`id`)'), 'nLikes'],
        // to get the sum of nLike from Reacts table where IdeaId = Idea.id
        // Or the limit cannot perform - What a annoying Sequelize
        const mostPopularIdeas = await Idea.findAll({
            attributes: ['id', 
                'name', 
                [db.Sequelize.literal('(SELECT SUM(`nLike`) FROM `Reacts` WHERE `Reacts`.`IdeaId` = `Idea`.`id`)'), 'nLikes'], 
                'createdAt', 'updatedAt'],
            where: {topicId: id},
            include: [
                {
                    model: User,
                    as: "User",
                    attributes:[
                        'id',
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, profileImage)`), 'profileImage'], 
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, fullName)`), 'fullName'], 
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, email)`), 'email']
                    ],
                    require: true
                },
                {
                    model: Category,
                    as: "Category",
                    attributes:['id', 'name'],
                    require: true
                }
            ],
            group: ['Idea.id'],
            order: [[db.Sequelize.literal('nLikes'), 'DESC']],
            limit: 5
        });

        const latestIdeas = await Idea.findAll({
            attributes: ['id', 'name', 'createdAt', 'updatedAt'],
            where: {topicId: id},
            include: [
                {
                    model: User,
                    as: "User",
                    attributes:[
                        'id',
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, profileImage)`), 'profileImage'], 
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, fullName)`), 'fullName'], 
                        [db.Sequelize.literal(`IF(isAnonymous = 1, null, email)`), 'email']
                    ],
                    require: true
                },
                {
                    model: Category,
                    as: "Category",
                    attributes:['id', 'name'],
                    require: true
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: 5
        });

        const latestComments = await Comment.findAll({
            attributes: ['id', 'content', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    as: "User",
                    attributes:[
                        'id',
                        [db.Sequelize.literal(`IF(Comment.isAnonymous = 1, null, profileImage)`), 'profileImage'], 
                        [db.Sequelize.literal(`IF(Comment.isAnonymous = 1, null, fullName)`), 'fullName'], 
                        [db.Sequelize.literal(`IF(Comment.isAnonymous = 1, null, email)`), 'email']
                    ],
                    require: true
                },
                {
                    model: Idea,
                    as: "Idea",
                    attributes:['id', 'name'],
                    include: [
                        {
                            model: Topic,
                            as: "Topic",
                            attributes:['id'],
                        }
                    ],
                    where: {topicId: id},
                    require: true
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: 5
        });
        
        res.status(200).json({
            message: "Get all ideas of topic " + req.params.topicId + " successfully",
            info: topicInfo,
            ideas: ideas[0],
            allCategories: allCategories,
            categories: categories,
            mostViewedIdeas: mostViewedIdeas,
            mostPopularIdeas: mostPopularIdeas,
            latestIdeas: latestIdeas,
            latestComments: latestComments
        })
    } catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.create_topic = async (req, res) => {
    try {
        if (validation.checkInput(req)){
            res.status(401).json({
                msg: "Missing input"
            })
        }
        // Final date must be later than Closure date
        else if (validation.checkTime(req)){
            res.status(401).json({
                err: validation.checkTime(req)
            });
        }
        else {
            // Using .replace(/ +/g,' ') for remove all multiple space in string
            const [newTopic, created] = await Topic.findOrCreate({
                where: {
                    "name": req.body.name.trim().replace(/ +/g,' '),
                    "description": req.body.description.trim().replace(/ +/g,' '),
                    'departmentId': req.body.departmentId,
                    "closureDate": req.body.closureDate,
                    "finalClosureDate": req.body.finalClosureDate
                },
                defaults: {
                    "name": req.body.name.trim().replace(/ +/g,' '),
                    "description": req.body.description.trim().replace(/ +/g,' '),
                    'departmentId': req.body.departmentId,
                    "closureDate": req.body.closureDate,
                    "finalClosureDate": req.body.finalClosureDate,
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                }
            });
    
            if (!created){
                console.log("");
                res.status(406).json({
                    msg: "Topic exists"
                })
            }
            else {
                // get the email of QA Coordinator of the Department
                const coordinators = await User.findAll({
                    where: {
                        "departmentId": newTopic.departmentId,
                        "roleId": 2,
                    },
                    attributes: ['email']
                })

                const coordinatorMails = coordinators.map(coordinator => coordinator.email);

                sendEmail(coordinatorMails, "[GRE IDEAS] NEW TOPIC WAS CREATED", htmlMail.topicSubmit(newTopic));
                res.status(200).json({
                    msg: "Successfully create new topic",
                    topic: newTopic,
                    coordinators: coordinatorMails
                })
            }
        
        }
    } catch (err) {
        // Check input existed
        if (err.parent?.code === "ER_DUP_ENTRY") {
            res.status(500).json({
                msg: "Topic exists"
            });
        }
        // Check for wrong type input
        else if (err.parent?.code === "ER_WRONG_VALUE"){
            res.status(500).json({
                msg: "Wrong value type"
            });
        }
        else {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
}

exports.update_topic = async (req, res) => {
    try {
        const id = req.params.topicId;
        if (validation.checkInput(req)){
            res.status(401).send("Missing inputs");
        }
        // This is not check the appropriate date -> Final date must be later than Closure date
        else if (validation.checkTime(req)){
            res.status(401).send("Final closure date must later than Closure date");
        } else {
            const updateTopic = await Topic.update({
                    "name": req.body.name.trim().replace(/ +/g,' '),
                    "description": req.body.description,
                    "closureDate": req.body.closureDate,
                    "finalClosureDate": req.body.finalClosureDate,
                },
                {
                    where: {
                    "id": id
                    }
                }
            );
            if (updateTopic[0]){
                res.status(200).json({
                    "msg": "Update topic successfully"
                })
            } else {
                res.status(404).json({
                    "msg": "Not found topic"
                })
            }
        }
    } catch (err) {
        // Check input existed
        if (err.parent.code === "ER_DUP_ENTRY") {
            res.status(500).json({
                msg: "Topic exists"
            });
        // Check for wrong type input
        } else if (err.parent.code === "ER_TRUNCATED_WRONG_VALUE"){
            res.status(500).json({
                msg: "Wrong value type"
            });
        } 
        else {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
}

exports.delete_topic = async (req, res) => {
    try {
        const deleteTopic = await Topic.destroy({
            where: {
                "id": req.params.topicId
            }
        })
        if (deleteTopic){
            res.status(200).json({
                msg: "Successful delete topic " + req.params.topicId
            })
        }
        else {
            res.status(404).json({
                msg: "Not Found"
            })
        }
    } catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError"){
            res.status(401).json({
                msg: "Cannot delete topic exists idea references"
            })
        } else {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
}

exports.force_delete = async (req, res) => {
    try {
        const topic = await Topic.findOne({
            where: {
                "id": req.params.topicId
            }
        });
        
        if (!topic) {
            res.status(404).json({
                err: "Not Found topic"
            })
        } else {
            // Getting all ideas of a topic
            const ideas = await Idea.findAll({
                where: {
                    "topicId": req.params.topicId
                }
            });
            
            // Remove all selected ideas
            for (const idea of ideas) {
                // Remove all references of comments, views, react to ideas list
                const rm = await removeAssociate(idea);
                if (rm.code !== 200) {
                    console.log(idea.id);
                    throw new Error("Error deleting idea and associated data");
                }
                // Wait for 100 milliseconds before deleting the next idea -> solve problem of promise bc the result cannot immediately happens, need to settimeout
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            const delTopic = await Topic.destroy({
                where: {
                    "id": req.params.topicId
                }
            });
            if (delTopic) {
                res.status(200).json({
                    msg: "Successfully delete Topic " + topic.name
                });
            } else {
                res.status(404).json({
                    msg: "Not found topic"
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Server error"
        })
    }
}

exports.download_topic_csv = async (req, res) => {
    const id = req.params.id;

    const topic_info = await Topic.findOne({
        where: {
            "id": id
        }
    });

    const csvFields = ['id',
                     "idea",
                     "ownerName",
                     "email",
                     "likes",
                     "dislikes",
                     "views",
                     "comments",
                     "category",
                     "createdAt",
                     "updatedAt"
                    ];
    const topic_detail = await db.sequelize.query(
        `SELECT  
            ideas.id as id,
            ideas.name AS idea, 
            users.fullName AS ownerName, 
            users.email AS email, 
            COALESCE(reacts.likes, 0) AS likes, 
            COALESCE(reacts.dislikes, 0) AS dislikes,
            SUM(views.views) AS views,
            COALESCE(c.comments, 0) as comments,
            categories.name AS category
        FROM ideas
        JOIN categories ON ideas.categoryId = categories.id
        JOIN topics ON ideas.topicId = topics.id
        JOIN users ON ideas.userId = users.id
        JOIN views ON ideas.id = views.ideaId
        LEFT JOIN (
            SELECT ideaId, SUM(nLike) as likes, SUM(nDislike) as dislikes
            FROM reacts
            GROUP BY ideaId
        ) reacts ON ideas.id = reacts.ideaId
        LEFT JOIN (
            SELECT ideaId, COUNT(id) as comments
            FROM comments
            GROUP BY ideaId
        ) c ON ideas.id = c.ideaId
        WHERE topics.id = ${id}
        GROUP BY ideas.id;
        `);

    // The Date - will display ### in CSV file bc the field is not wide enough to show data 
    const csvParser = new CsvParser.Parser({ csvFields });
    const csvData = csvParser.parse(topic_detail[0]);

    res.setHeader('Content-Type', 'text/csv');
    var filename = "Topic_Detail_" + topic_info.name + ".csv";
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);;

    res.status(200).end(csvData);
}

// These functions used for statistical Data

// TOP topics having idea quantity
exports.insight = async (req, res) => {
    try {
        const department_ideas = await db.sequelize.query(
            `SELECT
                departments.id as id,
                departments.name as name,
                count(ideas.id) as idea_quantity
            FROM ideas
            JOIN users ON ideas.userId = users.id
            JOIN departments ON users.departmentId = departments.id
            GROUP BY users.departmentId;`
        );

        // Way to get the unique count
        const department_contributors = await db.sequelize.query(
            `SELECT
                departments.id as id,
                departments.name as name,
                count(distinct users.id) as contributors
            FROM ideas
            JOIN users ON ideas.userId = users.id
            JOIN departments ON users.departmentId = departments.id
            GROUP BY users.departmentId;
            `
        );

        // Get the top staff contribution top 10 over the system
        const top_contributors = await db.sequelize.query(
            `SELECT 
                users.departmentId,
                departments.name as departmentName,
                users.id,
                users.fullName,
                users.email,
                users.profileImage,
                count(ideas.id) as contributions
            FROM ideas
            JOIN users ON ideas.userId = users.id
            JOIN departments ON users.departmentId = departments.id
            GROUP BY users.id
            ORDER BY contributions DESC
            LIMIT 10;`
        );

        const top_like_ideas = await db.sequelize.query(
            `SELECT 
                users.departmentId,
                departments.name as departmentName,
                users.id,
                users.fullName,
                users.email,
                users.profileImage,
                ideas.id as ideaId,
                ideas.name as idea,
                sum(reacts.nLike) as likes
            FROM ideas
            JOIN users ON ideas.userId = users.id
            JOIN departments ON users.departmentId = departments.id
            JOIN reacts ON ideas.id = reacts.ideaId
            GROUP BY ideas.id
            ORDER BY likes DESC
            LIMIT 10;
            `
        );

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
            group: ['id'],
            order: [['idea_quantity', "DESC"]]
          });
        
        const categories = await Category.findAll({
            attributes: [
                'id',
                'name',
                [db.sequelize.fn('count', db.sequelize.col('Ideas.id')), 'idea_quantity']
              ],
              include: [
                {
                  model: Idea,
                  attributes:[],
                  require: true
                }
              ],
              group: ['id'],
              order: [['idea_quantity', "DESC"]]
        })

        // Get all ideas without comment
        const ideaWithoutComment = await Idea.findAll({
            attributes: [
                'id',
                'name',
                'createdAt',
                'updatedAt',
                [db.Sequelize.literal('(SELECT COUNT(`id`) FROM `comments` WHERE `comments`.`IdeaId` = `Idea`.`id`)'), 'comment_quantity'],
            ],
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ['id', 'fullName', 'email', 'profileImage']
                },
                {
                    model: Topic,
                    as: "Topic",
                    attributes: ['id', 'name']
                },
                {
                    model: Category,
                    as: "Category",
                    attributes: ['id', 'name']
                }
            ],
            having: db.Sequelize.literal('comment_quantity = 0'),
            group: ['Idea.id']
        });

        // Get al anonymous ideas
        const anonymousIdeas = await Idea.findAll({
            attributes: [
                'id',
                'name',
                'createdAt',
                'updatedAt',
                'isAnonymous',
            ],
            include: [
                {
                    model: User,
                    as: "User",
                    attributes: ['id', 'fullName', 'email', 'profileImage']
                },
                {
                    model: Topic,
                    as: "Topic",
                    attributes: ['id', 'name']
                },
                {
                    model: Category,
                    as: "Category",
                    attributes: ['id', 'name']
                }
            ],
            where: {
                'isAnonymous': true
            }
        });

        res.status(200).json({
            msg: "Successfully get insight",
            department_ideas: department_ideas[0],
            department_contributors: department_contributors[0],
            top_contributors: top_contributors[0],
            top_like_ideas: top_like_ideas[0],
            topics: topics,
            categories: categories,
            ideaWithoutComment: ideaWithoutComment,
            anonymousIdeas: anonymousIdeas,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            err: err
        })
    }
}

// MOST Viewed ideas of a topic
exports.most_viewed_ideas = async (req, res) => {
    try {
        const id = req.params.id;
        const ideas = await db.sequelize.query(
        `SELECT  
            ideas.name AS idea, 
            users.fullName AS ownerName, 
            users.email AS email, 
            COALESCE(reacts.likes, 0) AS likes, 
            COALESCE(reacts.dislikes, 0) AS dislikes,
            SUM(views.views) AS views,
            COALESCE(c.comments, 0) as comments,
            categories.name AS category,
            ideas.createdAt, 
            ideas.updatedAt,
            ideas.id as ideaId,
            users.id as userId,
            categories.id as categoryId
        FROM ideas
        JOIN categories ON ideas.categoryId = categories.id
        JOIN topics ON ideas.topicId = topics.id
        JOIN users ON ideas.userId = users.id
        JOIN views ON ideas.id = views.ideaId
        LEFT JOIN (
            SELECT ideaId, SUM(nLike) as likes, SUM(nDislike) as dislikes
            FROM reacts
            GROUP BY ideaId
        ) reacts ON ideas.id = reacts.ideaId
        LEFT JOIN (
            SELECT ideaId, COUNT(id) as comments
            FROM comments
            GROUP BY ideaId
        ) c ON ideas.id = c.ideaId
        WHERE topics.id = ${id}
        GROUP BY ideas.id
        ORDER BY views DESC;
            `);

        res.status(200).json({
            msg: "Successfully get statistical data",
            mostView: ideas[0]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: "Server error"
        })
    }
}

// Function for download ZIP file of Topic
exports.zip_topic = async (req, res) => {
    try {
        const topic = await Topic.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!topic) {
            res.status(404).json({
                msg: "Topic not found"
            })
        } else {
            // find the directory that contains the files
            const folderPath = path.join(process.cwd(), 'uploaded_files', 'uploads', `${topic.name}`);
            // console.log(folderPath);
            // Create a new Archiver object
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });
            const zipFileName = `${topic.name}.zip`;
            const output = fs.createWriteStream(zipFileName);

            // console.log(path.basename(output.path));
            // Pipe the output stream to the archive
            archive.pipe(output);

            // Add the folder and its contents to the archive
            archive.directory(folderPath, false);

            // Finalize the archive
            archive.finalize();
            const file = topic.name.replace(/\s/g, '') + '.zip';
            // Once the archive is finished, send it to the client as a download
            output.on('close', () => {
                try {
                    res.set('Content-Type', 'application/octet-stream');
                    res.set('Content-Disposition', `attachment; filename=${file}`);
                    res.set('Content-Length', archive.pointer());
                    fs.createReadStream(output.path).pipe(res);
                    // Delete the temporary zip file after the response has ended
                    res.on('finish', () => {
                        if (output.path !== null) {
                            fs.unlink(output.path, (err) => {
                                if (err) console.error(err);
                            });
                        }
                    });
                } catch(err) {
                    console.log(err);
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: "Server Error"
        })
    }
}

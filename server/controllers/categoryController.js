'use strict';
const db = require('./../db/models/index.js');
const models = require('./../db/models');
const validation = require('../middleware/validateInput.js');
const { removeAssociate } = require('./ideaController.js');
const Category = models.Category;
const Idea = models.Idea;
const React = models.React;
const Comment = models.Comment;
const View = models.View;


exports.list_all_categories = async (req, res) => {
    try {
        // Adding attributes: [] inside the include -> the data will not including the joined table data
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
            group: ['id']
          });
        res.status(200).json({
                message: "Successfully get all categories",
                categories: categories
              });
    } catch(error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.create_category = async (req, res) => {
    try {
        if (validation.checkInput(req)){
            res.status(401).json({
                msg: "Missing input"
            })
        }
        else {
            // Using .replace(/ +/g,' ') for remove all multiple space in string
            const [newCategory, created] = await Category.findOrCreate({
                where: {
                    "name": req.body.name.trim().replace(/ +/g,' '),
                },
                defaults: {
                    "name": req.body.name.trim().replace(/ +/g,' '),
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                }
            });
    
            if (!created){
                console.log("");
                res.status(406).json({
                    msg: "Category exists"
                })
            }
            else {
                res.status(200).json({
                    msg: "Successfully create new category",
                    category: newCategory
                })
            }
        
        }
    } catch (err) {
        // Check input existed
        if (err.parent.code === "ER_DUP_ENTRY") {
            res.status(500).json({
                msg: "Category exists"
            });
        }
        // Check for wrong type input
        else if (err.parent.code === "ER_WRONG_VALUE"){
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

exports.update_category = async (req, res) => {
    try {
        if (validation.checkInput(req)) {
            res.status(401).json({
                msg: "Missing input"
            })
        } else {
            const updateCate = await Category.update({
                "name": req.body.name.trim().replace(/ +/g,' ')},
                {where: {
                    "Id": req.params.categoryId
                }
            });

            if (updateCate[0]) {
                res.status(200).json({
                    msg: "Successfully update Category"
                })
            } else {
                res.status(404).json({
                    "msg": "Not found topic"
                })
            }
        } 
    } catch(err) {
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

exports.delete_category = async (req, res) => {
    try {
        const deleteCate = await Category.destroy({
            where: {
                "id": req.params.categoryId
            }
        });
        if (deleteCate){
            res.status(200).json({
                msg: "Successful delete Category " + req.params.categoryId
            });
        }
        else {
            res.status(404).json({
                msg: "Not Found"
            });
        }
    } catch (err){
        if (err.name === "SequelizeForeignKeyConstraintError"){
            res.status(401).json({
                msg: "Cannot delete category exists idea references"
            });
        } else {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
}

exports.force_delete = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                "id": req.params.categoryId
            }
        });
        
        if (!category) {
            res.status(404).json({
                err: "Not Found category"
            })
        } else {
            
            // Getting all ideas of a category
            const ideas = await Idea.findAll({
                where: {
                    "categoryId": req.params.categoryId
                }
            });
            
            // Remove all references of comments, views, react to ideas list
            for (const idea of ideas) {
                // Remove all references of comments, views, react to ideas list
                const rm = await removeAssociate(idea);
                if (rm.code !== 200) {
                    console.log(idea.id);
                    throw new Error("Error deleting idea and associated data");
                  }

                // Wait for 100 milliseconds before deleting the next idea
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            const delCategory = await Category.destroy({
                where: {
                    "id": req.params.categoryId
                }
            });
            if (delCategory) {
                res.status(200).json({
                    msg: "Successfully delete Topic " + category.name
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
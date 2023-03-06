'use strict';
const db = require('./../db/models/index.js');
const models = require('./../db/models');
const validation = require('../middleware/validateInput.js');
const Category = models.Category;
const Idea = models.Idea;


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
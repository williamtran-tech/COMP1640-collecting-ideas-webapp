'use strict';
const db = require('./../db/models/index.js');
const models = require('./../db/models');
const User = models.User;
const Department = models.Department;
const Role = models.Role;
const validation = require('./../middleware/validateInput');

exports.list_all_departments = async (req, res) => {
    try {
        // Adding attributes: [] inside the include -> the data will not including the joined table data
        const departments = await Department.findAll({
            attributes: [
              'id',
              'name',
              [db.sequelize.fn('count', db.sequelize.col('Users.id')), 'user_quantity']
            ],
            include: [
              {
                model: User,
                attributes:[],
                require: true
              }
            ],
            group: ['id']
          });

        res.status(200).json({
                message: "Successfully get all departments",
                departments: departments
              });
    } catch(error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.list_all_users_by_department = async (req, res) => {
    try {
        const id = req.params.id;
        const info = await Department.findAll({
            attributes: ['id', 'name', [db.sequelize.fn('count', db.sequelize.col('Users.id')), 'user_quantity']],
            where: {"id": id},
            include: {
                model: User,
                as: User,
                attributes: [],
                require: true
            },
            group: ['id']
        });
        const users = await db.sequelize.query(`SELECT
            users.id, 
            users.fullName, 
            users.profileImage, 
            roles.name as role,
            users.email
            FROM users
            JOIN roles ON roles.id = users.roleId
            WHERE departmentId = ${id};`);

        const allRole = await Role.findAll({
            attributes: ['id','name']
        });

        const roles = await User.findAll({
            where: {
                departmentId: id
            },
            include: {
                model: Role,
                as: "Role",
                attributes: []
            },
            attributes:[[db.sequelize.fn('distinct', db.sequelize.col('Role.name')), 'name'], ["roleId", "id"],],
            group: ["Role.name"],
            raw: true
        });
        
        res.status(200).json({
            message: "Get all users of department " + req.params.id + " successfully",
            info: info,
            users: users[0],
            allRoles: allRole,
            roles: roles
        })
    } catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.create_department = async (req, res) => {
    try {
        if (validation.checkInput(req)){
            res.status(401).json({
                msg: "Missing input"
            })
        }
        else {
            // Using .replace(/ +/g,' ') for remove all multiple space in string
            const [newDepart, created] = await Department.findOrCreate({
                where: {
                    "name": req.body.name.trim().replace(/ +/g,' '),
                },
                defaults: {
                    "name": req.body.name.trim().replace(/ +/g,' '),
                    "finalClosureDate": req.body.finalClosureDate,
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                }
            });
    
            if (!created){
                console.log("");
                res.status(406).json({
                    msg: "Departments exists"
                })
            }
            else {
                res.status(200).json({
                    msg: "Successfully create new Department",
                    topic: newDepart
                })
            }
        
        }
    } catch (err) {
        // Check input existed
        if (err.parent.code === "ER_DUP_ENTRY") {
            res.status(500).json({
                msg: "Department exists"
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

exports.update_department = async (req, res) => {
    try {
        const id = req.params.id;
        if (validation.checkInput(req)){
            res.status(401).send("Missing inputs");
        }else {
            const updateDepart = await Department.update({
                    "name": req.body.name.trim().replace(/ +/g,' '),
                },
                {
                    where: {
                    "id": id
                    }
                }
            );
            if (updateDepart[0]){
                res.status(200).json({
                    "msg": "Update Department successfully"
                })
            } else {
                res.status(404).json({
                    "msg": "Not found Department"
                })
            }
        }
    } catch (err) {
        // Check input existed
        if (err.parent.code === "ER_DUP_ENTRY") {
            res.status(500).json({
                msg: "Department exists"
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

exports.delete_department = async (req, res) => {
    try {
        const deleteDepart = await Department.destroy({
            where: {
                "id": req.params.id
            }
        })
        if (deleteDepart){
            res.status(200).json({
                msg: "Successful delete Department " + req.params.id
            })
        }
        else {
            res.status(404).json({
                msg: "Not Found Department"
            })
        }
    } catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError"){
            res.status(401).json({
                msg: "Cannot delete Department exists users references"
            })
        } else {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
}

// Insight for QA Manager
exports.insight = async (req, res) => {
    try {
        // Number of ideas each department
        
        // Number of contributors each department weekly, ..
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err: "Server error"
        })
    }
}

'use strict';

const db = require('./../db/models');
const User = db.User;
const Department = db.Department;
const Role = db.Role;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');
const validate = require('./../middleware/validateInput.js');
const sendEmail = require('./../middleware/sendMail.js');
const htmlMail = require('../mail-template/mail-templates.js');

// Using salt in bcrypt hash to make the password hash cant be leak if hacker get the database in the dictionary table
exports.create_user = async (req, res) => {
  try {
    const fUser = await User.findOne({
      where: {'email': req.body.email}
    });
    if (fUser) {
      res.status(409).json({
        message: "Email exists"
      })
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);

      const user = {
        fullName: req.body.fullName,
        roleId: req.body.roleId,
        departmentId: req.body.departmentId,
        email: req.body.email,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      // If the hash successfully created then the following code will be executed
      User.create(user).then(createdUser => {
        
        sendEmail(user.email, "[GRE IDEAS] Confirm Letter - Registration", htmlMail.registration(user));
        res.status(200).json({
          message: "Successfully added user"
        });
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

exports.update_user = async (req, res) => {
  try {
    // Get the idea
    const oldUser = await User.findOne({
      where: {
          "id": req.params.id
      }
    });
    // Check file exist or not
    if (!req.file) {
      validate.checkFilePath(oldUser);
      const updated = await oldUser.update({
          "fullName": req.body.name?req.body.name:oldUser.fullName,
          "profileImage": null,
          "email": req.body.email?req.body.email:oldUser.email,
          "password": req.body.password?req.body.password:oldUser.password,
          "departmentId": req.body.departmentId?req.body.departmentId:oldUser.departmentId,
          "roleId": req.body.roleId?req.body.roleId:oldUser.roleId
      });
      if (updated) {
          res.status(200).json({
              msg: "Successfully update User"
          })
      } else {
          res.status(401).json({
              err: "Update User failed"
          })
      }
    } else {
      validate.checkFilePath(oldUser);
      const updated = await oldUser.update({
        "fullName": req.body.name?req.body.name:oldUser.fullName,
        "profileImage": req.file.path,
        "email": req.body.email?req.body.email:oldUser.email,
        "password": req.body.password?req.body.password:oldUser.password,
        "departmentId": req.body.departmentId?req.body.departmentId:oldUser.departmentId,
        "roleId": req.body.roleId?req.body.roleId:oldUser.roleId
      });
      if (updated) {
          res.status(200).json({
              msg: "Successfully update user"
          })
      } else {
          res.status(401).json({
              err: "Update user failed"
          })
      }
    }
    } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError"){
      res.status(401).json({
          err: "Invalid input"
      })
    } else {
      console.log(err);
      res.status(500).json({
          err: "Server error"
      })
    }
    }
}

exports.delete_user = async (req, res) => {
  try {
    const deleteUser = await User.destroy({
        where: {
            "id": req.params.id
        }
    });
    if (deleteUser){
        res.status(200).json({
            msg: "Successful delete User " + req.params.id
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
            msg: "Cannot delete user exists idea references"
        });
    } else {
        console.log(err);
        res.status(500).send("Server Error");
    }
}
}

exports.login_user = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        "email": req.body.email
      }
    });

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user.email,
            name: user.fullName,
            userId: user.id,
            roleId: user.roleId
          }, config.env.JWT_key, 
          {
            expiresIn: "1h"
          });
          return res.status(200).json({
            message: "Auth successfully",
            token: token,
            userId: user.id,
            email: user.email,
            name: user.fullName,
            roleId: user.roleId
          });
        }
        return res.status(404).json({
          message: "Auth failed"
        });
      });
    } else {
      res.status(404).json({
        message: "Auth failed mail"
      });
    }
  } catch (error){
    console.log(error);
    res.status(500).send("Server Error");
  }
}

exports.list_all_users = async (req, res) =>{
    try {
        const users = await User.findAll({
          attributes: {
              exclude: ['createdAt', 'updatedAt', 'DepartmentId', 'RoleId', 'roleId', 'departmentId']
          },
          include: [{
              model: Department, as: "Department",
              attributes:['id','name']
          },
          {
            model: Role, as: "Role",
            attributes: {exclude: ["createdAt", "updatedAt"]}
          }]
        });
        // User.findAll({ include: 'Instruments' }); // Also works
        // User.findAll({ include: { association: 'Instruments' } }); // Also works
        const departments = await Department.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        })
        res.json({
          message: "Successfully get all users",
          users: users,
          departments: departments
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
}
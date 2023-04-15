'use strict';

const db = require('./../db/models');
const User = db.User;
const Department = db.Department;
const Role = db.Role;
const View = db.View;
const React = db.React;
const Idea = db.Idea;
const Category = db.Category;
const Topic = db.Topic;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/default.json');
const validate = require('./../middleware/validateInput.js');
const sendEmail = require('./../middleware/sendMail.js');
const htmlMail = require('../mail-template/mail-templates.js');
const csv = require('csv-parser');
const fs = require('fs');
const validator = require('validator');
const ideaController = require('./../controllers/ideaController.js');

const { v4: uuidv4 } = require('uuid');
const usedTokenIdentifiers = [];


const CsvParser = require('json2csv');
const path = require('path');

function generatePassword() {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let password = '';

  // Add at least one uppercase character
  password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];

  // Add at least one number
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Add the remaining characters
  for (let i = 0; i < 6; i++) {
    const characters = lowercaseLetters + uppercaseLetters + numbers;
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  return password;
}
// This is for USER FUNCTIONS
// Using salt in bcrypt hash to make the password hash cant be leak if hacker get the database in the dictionary table
// This function used for verification user email -> Accept login
exports.verify = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, config.env.JWT_key);

    const user = await User.findOne({
      where: {
        "email": decoded.email
      }
    });
    
    if (!user) {
      res.status(404).json({
        err: "User not found"
      });
    } else {
      if (!user.isVerified) {
        user.update({isVerified: true});
        res.status(200).json({
          msg: "Verify successfully"
        })
      } else {
        res.status(401).json({
          msg: "Verify already"
        })
      }    
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server Error"
    });
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
      if (!user.isVerified) {
        res.status(406).json({
          err: "Mail not verified"
        })
      } else {
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
              roleId: user.roleId,
              imagePath: user.profileImage,
              departmentId: user.departmentId
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
      }
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

// This function used for getting email address of user -> send reset-password mail
exports.forgot_password = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        "email": req.body.email
      }
    });

    if (user) {
      // Generate token - using uuidv4 for identifier
      const token = jwt.sign({
        email: user.email,
        name: user.fullName,
        tokenIdentifier: uuidv4()
      }, config.env.JWT_key, 
      {
        expiresIn: "15m"
      });

      sendEmail(user.email, "[GRE IDEAS] RESET YOUR PASSWORD", htmlMail.reset_password(user, token));
      res.status(200).json({
        msg: "Mail sent"
      })
    } else {
      res.status(404).json({
        err: "Not found user"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server Error"
    });
  }
}

exports.verifyTokenReset = (req, res) => {
  try {
      // Verify token 
      if (req.query.token) {
          const token = req.query.token;
          const decoded = jwt.verify(token, config.env.JWT_key);
      
          if (decoded) {
            res.status(200).json({
              email: decoded.email
            })
          } else {
            res.status(404).json({
              err: "Error"
            })
          }
      } else {
          res.status(404).json({
              err: "Not accessible"
          });
      }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server Error"
    })
  }
}

// This function used for reset password
exports.reset_password = async (req, res) => {
  try {
    if (req.query.token) {
      const token = req.query.token;
      const decoded = jwt.verify(token, config.env.JWT_key);

      // Check token used 
      if (usedTokenIdentifiers.includes(decoded.tokenIdentifier)) {
        return res.status(400).json({ message: 'Token already used' });
      }
    
      if (decoded && validate.checkPassword(req)) {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.update({"password": hash}, {
          where: {
            "email": decoded.email
          }
        });
        usedTokenIdentifiers.push(decoded.tokenIdentifier);
        res.status(200).json({
          msg: "Successfully reset password"
        });
      } else {
        res.status(406).json({
          msg: "Invalid input"
        })
      }
    } else {
      res.status(404).json({
        err: "Invalid token"
      })
    }
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      res.status(500).json({
        err: "Invalid token"
      })
    } else {
      res.status(500).json({
        err: "Server Error"
      })
    }
  }
}

// This is for easy to test
exports.create_user_root = async (req, res) => {
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
        isVerified: req.body.isVerified,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Generate a token for verifying email of user
      const token = jwt.sign({
        email: user.email,
        name: user.fullName,
      }, config.env.JWT_key, 
      {
        expiresIn: "3d"
      });
      
      // If the hash successfully created then the following code will be executed
      User.create(user).then(createdUser => {
        // sendEmail(user.email, "[GRE IDEAS] Confirm Letter - Registration", htmlMail.registration(user, token));
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

exports.personal_info = async (req, res) => {
  try {
    // if (req.userData.userId == req.params.id) {
    // Get information of user
    const info = await User.findOne({
      where: {
        "id": req.params.id
      },
      attributes: {
          exclude: ['createdAt', 'updatedAt', 'DepartmentId', 'RoleId', 'roleId', 'departmentId', 'password']
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

    if (!info) {
      return res.status(404).json({
        message: "Not found user"
      })
    } else {
      // Get all ideas that user viewed
      const viewHistory = await View.findAll({
        where: {
          "userId": req.params.id
        },
        include: [{
          model: Idea,
          as: 'Idea',
          attributes: { exclude: ['createdAt', 'updatedAt', 'topicId', 'categoryId', 'userId','TopicId', 'CategoryId', 'UserId'] },
          include: [
            {
              model: User,
              as: 'User',
              attributes: [
                'id',
                [db.Sequelize.literal(`IF(Idea.isAnonymous = 1, 'Anonymous', fullName)`), 'fullName'], 
                [db.Sequelize.literal(`IF(Idea.isAnonymous = 1, 'Anonymous', email)`), 'email']
              ]
            },
            {
              model: Category,
              as: 'Category',
              attributes: ['name', 'id']
            },
            {
              model: Topic,
              as: 'Topic',
              attributes: ['name', 'id']
            }
          ]
        }],
        attributes: ['createdAt']
      })

      // Get all ideas that user reacted
      const reactHistory = await React.findAll({
        where: {
          "userId": req.params.id
        },
        include: [{
          model: Idea,
          as: 'Idea',
          attributes: { exclude: ['createdAt', 'updatedAt', 'topicId', 'categoryId', 'userId','TopicId', 'CategoryId', 'UserId'] },
          include: [
            {
              model: User,
              as: 'User',
              attributes: [
                'id',
                [db.Sequelize.literal(`IF(Idea.isAnonymous = 1, 'Anonymous', fullName)`), 'fullName'], 
                [db.Sequelize.literal(`IF(Idea.isAnonymous = 1, 'Anonymous', email)`), 'email']
              ]
            },
            {
              model: Category,
              as: 'Category',
              attributes: ['name', 'id']
            },
            {
              model: Topic,
              as: 'Topic',
              attributes: ['name', 'id']
            }
          ]
        }],
        attributes: ['createdAt']
      })

      // Get all contributions of user
      // const ideas = await Idea.findAll({
      //   where: {
      //     'userId': req.params.id
      //   },
      //   attributes: { exclude: ['updatedAt', 'topicId', 'categoryId', 'userId','TopicId', 'CategoryId', 'UserId'] },
      //     include: [
      //       {
      //         model: Category,
      //         as: 'Category',
      //         attributes: ['name', 'id']
      //       },
      //       {
      //         model: Topic,
      //         as: 'Topic',
      //         attributes: ['name', 'id']
      //       }
      //     ]
      // })

      let activities = {};
      // If user view their own profile
      if (req.userData.userId == req.params.id) {
        const contributions = await db.sequelize.query(
          `SELECT  
              ideas.id as ideaId,
              ideas.name AS idea,  
              COALESCE(reacts.likes, 0) AS likes, 
              COALESCE(reacts.dislikes, 0) AS dislikes,
              SUM(views.views) AS views,
              COALESCE(c.comments, 0) as comments,
              categories.id as categoryId,
              categories.name as category,
              topics.id as topicId,
              topics.name as topic,
              ideas.createdAt, 
              ideas.updatedAt
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
          WHERE ideas.userId = ${req.params.id}
          GROUP BY ideas.id;
          `);
        activities = contributions[0];
      } else {
        const contributions = await db.sequelize.query(
          `SELECT  
              ideas.id as ideaId,
              ideas.name AS idea,  
              COALESCE(reacts.likes, 0) AS likes, 
              COALESCE(reacts.dislikes, 0) AS dislikes,
              SUM(views.views) AS views,
              COALESCE(c.comments, 0) as comments,
              categories.id as categoryId,
              categories.name as category,
              topics.id as topicId,
              topics.name as topic,
              ideas.createdAt, 
              ideas.updatedAt
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
          WHERE ideas.userId = ${req.params.id} AND ideas.isAnonymous = 0
          GROUP BY ideas.id;
          `);
          activities = contributions[0];
      }
      
      res.status(200).json({
        info: info,
        contributions: activities,
        viewHistory: viewHistory,
        reactHistory: reactHistory
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server Error"
    })
  }
}

exports.update_avatar = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, config.env.JWT_key);
    if (req.file && decoded.userId == req.params.id) {
      const oldUser = await User.findOne({
        where: {
            "id": req.params.id
        }
      });
      validate.checkFilePath(oldUser);

      const updated = await oldUser.update({
        "profileImage": req.file.path,
      });

      if (updated) {
          res.status(200).json({
              msg: "Successfully update avatar"
          })
      } else {
          res.status(401).json({
              err: "Update avatar failed"
          })
      }
    } else {
      res.status(406).json({
        err: "File not found"
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server error"
    })
  }
}
// 
// ADMIN PANEL FUNCTIONS
//
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
      const password = generatePassword();
      const hash = await bcrypt.hash(password, 10);

      const user = {
        fullName: req.body.fullName,
        roleId: req.body.roleId,
        departmentId: req.body.departmentId,
        email: req.body.email,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Generate a token for verifying email of user
      const token = jwt.sign({
        email: user.email,
        name: user.fullName,
      }, config.env.JWT_key, 
      {
        expiresIn: "3d"
      });
      
      // If the hash successfully created then the following code will be executed
      User.create(user).then(createdUser => {
        sendEmail(user.email, "[GRE IDEAS] Confirm Letter - Registration", htmlMail.registration(user, password, token));
        res.status(200).json({
          message: "Successfully added user"
        });
      });
    }
  } catch(error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
}

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
      const hash = await bcrypt.hash(req.body.password, 10);
      const updated = await oldUser.update({
          "fullName": req.body.name?req.body.name:oldUser.fullName,
          "profileImage": null,
          "email": req.body.email?req.body.email:oldUser.email,
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

exports.list_all_users = async (req, res) =>{
  try {
      const users = await User.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'DepartmentId', 'RoleId', 'roleId', 'departmentId', 'password']
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
      });
      const roles = await Role.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      res.json({
        message: "Successfully get all users",
        users: users,
        departments: departments,
        roles: roles
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
}

// This function for QA Coordinators
exports.list_all_users_by_department = async (req, res) =>{
    try {
      const token = req.headers.authorization.split(' ')[1];
      decoded = jwt.verify(token, config.env.JWT_key);

      const users = await User.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'DepartmentId', 'RoleId', 'roleId', 'departmentId', 'password']
        },
        include: [{
          model: Role, as: "Role",
          attributes: {exclude: ["createdAt", "updatedAt"]}
        }],
        where: {
          "departmentId": decoded.departmentId,
          "roleId": [2, 1]
        }
      });
      
      res.status(200).json({
        message: "Successfully get all users of departments",
        users: users
      })
    } catch (err) {
        console.log(err);
        res.status(500).json({
          err: "Server Error"
        });
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

exports.force_delete_user = async(req, res) => {
  try {
    const user = await User.findOne({
      where: {
          "id": req.params.id
      }
    });
    
    if (!user) {
        res.status(404).json({
            err: "Not Found user"
        })
    } else {
      // Getting all ideas created by this user
      const ideas = await Idea.findAll({
        where: {
            "userId": req.params.id
        }
      });

      for (const idea of ideas) {
        // Remove all references of comments, views, react to ideas list
        const rm = await ideaController.removeAssociate(idea);
        if (rm.code !== 200) {
            console.log(idea.id);
            throw new Error("Error deleting idea and associated data");
        }
        // Wait for 100 milliseconds before deleting the next idea -> solve problem of promise bc the result cannot immediately happens, need to settimeout
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      const delUser = await User.destroy({
        where: {
            "id": req.params.id
        }
      });
      if (delUser) {
          res.status(200).json({
              msg: "Successfully delete User " + user.fullName
          });
      } else {
          res.status(404).json({
              msg: "Not found user"
          });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server error"
    })
  }
}

// These functions used for admin to bulkInsert new user
// This function used for downloading csv template to import massive users
exports.download_template = async (req, res) => {
  try {
    const json2csv = require('json2csv').parse;

    // Create an array of objects with the fields for the CSV file
    const data = [
      {email: 'sample@gmail.com', fullName: 'Sample name', role: 'Staff', department: 'IT Department'}
    ];


    // Create the CSV fields array
    const csvFields = ['email', 'fullName', 'role', 'department'];

    // Convert the data array to a CSV string
    const csv = json2csv(data, { fields: csvFields });

    // Set the response headers to download the CSV file and role/department CSV files
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Insert_Massive_User_Template.csv"');
    res.status(200).send(csv);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server Error"
    })
  }
}

exports.bulk_insert = async (req, res) => {
  try {
    if (req.file) { 
      const userData = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
          userData.push(data);
        })
        .on('end', async () => {
          console.log('CSV file Successfully processed');

          const [emailExist, email, notValidMail, existMailRow, duplicate, duplicateMail, duplicateRow] = await checkEmail(userData);
          const [invalidDepartment, invalidRole, departmentRow, roleRow] = await checkRoleDepartment(userData);

          if (emailExist) {
            res.status(406).json({
              'err': "Not acceptable input",
              'existedEmail': email,
              "At row": existMailRow
            });
          } else if (validate.checkInputCSV(userData)){
            res.status(406).json({
              err: "Missing input from CSV file"
            })
          } else if (notValidMail != 0){
            res.status(406).json({
              err: "Wrong type email from CSV file - Row " + notValidMail
            })
          } else if (invalidRole) {
            res.status(406).json({
              err: "Role value is not accepted",
              "At row": roleRow
            })
          } else if (invalidDepartment) {
            res.status(406).json({
              err: "Department value is not accepted",
              "At row": departmentRow
            })
          } else if (duplicate) {
            res.status(406).json({
              err: "Duplicate entry",
              "Duplicate email": duplicateMail,
              "At row": duplicateRow
            })
          } else {
            // The following code will bulk insert user account -> users table

            const departments = await Department.findAll({
              attributes: ['id', 'name']
            });
          
            const roles = await Role.findAll({
              attributes: ['id', 'name']
            });

            for (const user in userData) {
              const userRoleId = roles.find(role => role.name === userData[user].role).id;
              const userDepartmentId = departments.find(department => department.name === userData[user].department).id;

              const password = generatePassword();
              const hash = await bcrypt.hash(password, 10);
              
              const creUser = {
                fullName: userData[user].fullName,
                roleId: userRoleId,
                departmentId: userDepartmentId,
                email: userData[user].email,
                password: hash,
                createdAt: new Date(),
                updatedAt: new Date()
              };

              // Generate a token for verifying email of user
              const token = jwt.sign({
                email: creUser.email,
                name: creUser.fullName,
              }, config.env.JWT_key, 
              {
                expiresIn: "3d"
              });
              
              // If the hash successfully created then the following code will be executed
              User.create(creUser).then(createdUser => {
                sendEmail(creUser.email, "[GRE IDEAS] Confirm Letter - Registration", htmlMail.registration(creUser, password, token));
              });
            }
            
            res.status(200).json({
              msg: "Bulk insert users users successfully"
            })
          }
        });
    } else {
      res.status(404).json({
        err: "File not found"
      })
    }
  } catch (err) {
    res.status(500).json({
      err: "Server Error"
    })
  }
}

async function checkRoleDepartment(userData) {
  let departmentId = 0;
  let roleId = 0;
  let roleRow = [];
  let departmentRow = [];
  let invalidRole = false;
  let invalidDepartment = false;

  const departments = await Department.findAll({
    attributes: ['id', 'name']
  });

  const roles = await Role.findAll({
    attributes: ['id', 'name']
  });
  for (const user in userData) {
    let rowNum = parseInt(user) + 2;
    for (const role in roles) {
      if (userData[user].role == roles[role].name) {
        roleId = roles[role].id;
      }
    }
    if (roleId == 0) {
      invalidRole = true;
      roleRow.push(rowNum);
    }

    for (const department in departments) {
      if (userData[user].department == departments[department].name) {
        departmentId = departments[department].id;
      }
    }
    if (departmentId == 0) {
      invalidDepartment = true;
      departmentRow.push(rowNum);
    }
    // for (const user in userData) {
    //   switch(userData[user].role) {
    //     case "QA Manager":
    //       roleId = 4;
    //       break;
    //     case "Administrator": 
    //       roleId = 3;
    //       break;
    //     case "QA Coordinator":
    //       roleId = 2;
    //       break;
    //     case "Staff":
    //       roleId = 1;
    //       break;
    //     default: 
    //       roleId = 0;
    //   }
    // switch(userData[user].department) {
    //   case "IT": 
    //     departmentId = 1;
    //     break;
    //   case "BA":
    //     departmentId = 2;
    //     break;
    //   case "GD":
    //     departmentId = 3;
    //     break;
    //   default: 
    //     departmentId = 0;
    // }
  }
 
  return [invalidDepartment, invalidRole, departmentRow, roleRow];
}

async function checkEmail(users) {
  let emailExist = false;
  let duplicate = false;
  let duplicateRow = [];
  let duplicateMail = [];
  let email = [];
  let notValidMail = [];
  let existMailRow = [];
  // Check duplicate entry
  for (const user in users) {
    let rowNum = parseInt(user) + 2;
    for (let i = 0; i < users.length; i++) {
      if (users[user].email == users[i].email && user != i) {
        duplicateMail.push(users[user].email);
        duplicateRow.push(rowNum);
        duplicate = true;
      }
    }
  }
  for (let i = 0; i < users.length; i++) {
    let rowNum = i + 2;
    const checkUserMail = await User.findOne({
      where: {
        'email': users[i].email
      }
    });
    if (checkUserMail) {
      email.push(users[i].email);
      existMailRow.push(rowNum);
      emailExist = true;
    }
    if (!validator.isEmail(users[i].email)) {
      notValidMail.push(rowNum);
    }
  }
  
  return [emailExist, email, notValidMail, existMailRow, duplicate, duplicateMail, duplicateRow]
}
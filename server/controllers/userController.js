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
const csv = require('csv-parser');
const fs = require('fs');
const validator = require('validator');

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
};

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

// This function used for verification user email -> Accept login
exports.verify = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token);
    const decoded = jwt.verify(token, config.env.JWT_key);

    const user = await User.findOne({
      where: {
        "email": decoded.email
      }
    });
    
    if (!user) {
      throw new Error("User not found");
    }
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Server Error"
    });
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
        expiresIn: "3d"
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

// These functions used for admin to bulkInsert new user
// This function used for downloading csv template to import massive users
exports.download_template = async (req, res) => {
  try {
    const json2csv = require('json2csv').parse;

    // Create an array of objects with the fields for the CSV file
    const data = [
      {email: 'sample@gmail.com', fullName: 'Sample name', role: 'Administrator', department: 'IT'}
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

          const [emailExist, email, notValidMail] = await checkEmail(userData);
          const [roleId, departmentId] = checkRoleDepartment(userData);

          if (emailExist) {
            res.status(406).json({
              'err': "Not acceptable input",
              'existedEmail': email
            });
          } else if (validate.checkInputCSV(userData)){
            res.status(406).json({
              err: "Missing input from CSV file"
            })
          } else if (notValidMail != 0){
            res.status(406).json({
              err: "Wrong type email from CSV file - Row " + notValidMail
            })
          } else if (roleId == 0) {
            res.status(406).json({
              err: "Role value is not accepted"
            })
          } else if (departmentId == 0) {
            res.status(406).json({
              err: "Department value is not accepted"
            })
          } else {
            // The following code will bulk insert user account -> users table
            for (const user in userData) {
              const password = generatePassword();
              const hash = await bcrypt.hash(password, 10);
              
              const creUser = {
                fullName: userData[user].fullName,
                roleId: roleId,
                departmentId: departmentId,
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
        err: "Find not found"
      })
    }
  } catch (err) {
    res.status(500).json({
      err: "Server Error"
    })
  }
}

function checkRoleDepartment(userData) {
  let roleId = 0;
  let departmentId = 0;
  for (const user in userData) {
    switch(userData[user].role) {
      case "Administrator": 
        roleId = 3;
        break;
      case "QA Manager":
        roleId = 2;
        break;
      case "Staff":
        roleId = 1;
        break;
      default: 
        roleId = 0;
    }

    switch(userData[user].department) {
      case "IT": 
        departmentId = 1;
        break;
      case "BA":
        departmentId = 2;
        break;
      case "GD":
        departmentId = 3;
        break;
      default: 
        departmentId = 0;
    }
  }
 
  return [roleId, departmentId];
}

async function checkEmail(users) {
  let emailExist = false;
  let email = [];
  let notValidMail = [];
  for (let i = 0; i < users.length; i++) {
    let rowNum = i + 2;
    const checkUserMail = await User.findOne({
      where: {
        'email': users[i].email
      }
    });
    if (checkUserMail) {
      email.push(users[i].email);
      emailExist = true;
    }
    if (!validator.isEmail(users[i].email)) {
      notValidMail.push(rowNum);
    }
  }
  
  return [emailExist, email, notValidMail]
}
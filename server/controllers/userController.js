'use strict';

const db = require('./../db/models');
const User = db.User;
const Department = db.Department;
const Role = db.Role;
const Idea = db.Idea;
const bcrypt = require('bcrypt');

// Using salt in bcrypt hash to make the password hash cant be leak if hacker get the database in the dictionary table
exports.create_user = async (req, res) => {
  try {
    const fUser = await User.findOne({
      where: {'email': req.body.email}
    });
    if (fUser) {
      console.log(fUser);
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
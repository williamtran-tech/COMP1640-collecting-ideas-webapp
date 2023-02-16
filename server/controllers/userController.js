'use strict';

const db = require('./../db/models');
const User = db.User;
const Department = db.Department;
const Role = db.Role;
const Idea = db.Idea;

exports.list_all_users = async (req, res) =>{
    try {
        // const users = await User.findAll({attributes: ['id', 'fullName', 'profileImage', 'roleId'] });
        //  where: {
        //   DairyId: req.query.dairyid
        // },
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
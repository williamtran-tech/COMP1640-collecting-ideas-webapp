'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Department, {foreignKey: 'departmentId', as: "Department"})
      User.belongsTo(models.Role, {foreignKey: 'roleId', as: 'Role'})
      User.hasMany(models.Idea);
      User.hasMany(models.Comment);
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
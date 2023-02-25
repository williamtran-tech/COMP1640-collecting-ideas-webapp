'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "userId", as: "User"});
      this.belongsTo(models.Idea, {foreignKey: "ideaId", as: "Idea"});
    }
  }
  View.init({
    views: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    ideaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'View',
  });
  return View;
};
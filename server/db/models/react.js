'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class React extends Model {
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "userId", as: "User"});
      this.belongsTo(models.Idea, {foreignKey: "ideaId", as: "Idea"});
    }
  }
  React.init({
    nLike: DataTypes.INTEGER,
    nDislike: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    ideaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'React',
  });
  return React;
};
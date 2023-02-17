'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
        Comment.belongsTo(models.User, {foreignKey: "userId", as: "User"});
        Comment.belongsTo(models.Idea, {foreignKey: "ideaId", as: "Idea"});
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
    ideaId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
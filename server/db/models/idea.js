'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Idea extends Model {
    static associate(models) {
      Idea.belongsTo(models.Topic, {foreignKey: 'topicId', as: 'Topic'});
      Idea.belongsTo(models.Category, {foreignKey: 'categoryId', as: 'Category'});
      Idea.belongsTo(models.User, {foreignKey: 'userId', as: 'User'});
      Idea.hasMany(models.Comment);
      Idea.hasMany(models.React);
      Idea.hasMany(models.View);
    }
  }
  Idea.init({
    name: DataTypes.STRING,
    filePath: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isAnonymous: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Idea',
  });
  return Idea;
};
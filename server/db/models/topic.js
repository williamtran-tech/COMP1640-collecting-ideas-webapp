'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.hasMany(models.Idea);
    }
  }
  Topic.init({
    name: DataTypes.STRING,
    closureDate: DataTypes.DATE,
    finalClosureDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};
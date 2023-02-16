'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
        Category.hasMany(models.Idea);
    }
  }
  Category.init({
    name: DataTypes.STRING,
    closureDate: DataTypes.DATE,
    finalClosureDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
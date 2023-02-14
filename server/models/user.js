'use strict';

const  config = require('./../config/default.json');

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    config.server.database,
    config.server.user,
    config.server.password,
    {
        host: config.server.host,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
 });
 
 sequelize.sync().then(() => {
    console.log('User table created successfully!');
    User.drop();
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });


'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nLike: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      nDislike: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: 
        {
          model: "Users",
          key: "Id"
        }
      },
      ideaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: 
        {
          model: "Ideas",
          key: "Id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reacts');
  }
};
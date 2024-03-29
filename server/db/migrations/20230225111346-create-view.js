'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Views', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: 'Id'
        }
      },
      ideaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Ideas",
          key: 'Id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    },
    {
      uniqueKeys: {
        uniqueView: {
            fields: ['ideaId', 'userId']
        }
      }
    }
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Views');
  }
};
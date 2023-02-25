'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reacts', [
      {
        userId: 2,
        ideaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        ideaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        ideaId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        ideaId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userId: 2,
        ideaId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reacts', null, {});
  }
};

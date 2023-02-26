'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reacts', [
      {
        ideaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
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

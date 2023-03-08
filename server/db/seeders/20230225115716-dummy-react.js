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
        ideaId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ideaId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reacts', null, {});
  }
};

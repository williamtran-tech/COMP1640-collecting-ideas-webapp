'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        content: `There are many variationst anything embarrassing hidden in the middle of text.`,
        isAnonymous: false,
        userId: 2,
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Lorem ipsum dolor sit amet, consec accumsan turpis dapibus id.`,
        isAnonymous: false,
        userId: 1,
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Lorem ipsum d dapibus id.`,
        isAnonymous: false,
        userId: 3,
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};

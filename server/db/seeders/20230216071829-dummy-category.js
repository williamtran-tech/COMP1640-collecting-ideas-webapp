'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
        {
          name: 'Indoor Activities',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Outdoor Activities",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Workshop",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

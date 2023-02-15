'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      {
        name: 'IT Department',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BA Department',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'GD Department',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Bing Chilling',
        roleId: 1,
        departmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bing Chilling Chilling',
        roleId: 2,
        departmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bing Bing Chilling',
        roleId: 3,
        departmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'John Xhina',
        roleId: 1,
        departmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Randy',
        roleId: 1,
        departmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

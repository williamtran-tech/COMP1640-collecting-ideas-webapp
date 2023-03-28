'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Bing Chilling',
        roleId: 1,
        departmentId: 1,
        email: "test1@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bing Chilling Chilling',
        roleId: 2,
        departmentId: 1,
        email: "test2@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bing Bing Chilling',
        roleId: 3,
        departmentId: 1,
        email: "test3@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'John Xhina',
        roleId: 1,
        departmentId: 2,
        email: "test4@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Randy',
        roleId: 1,
        departmentId: 3,
        email: "test5@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'IT - QA Coordinator', 
        roleId: 2,
        departmentId: 1,
        email: "ducbalor@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'BA - QA Coordinator',
        roleId: 1,
        departmentId: 2,
        email: "test7@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'GD - QA Coordinator',
        roleId: 1,
        departmentId: 3,
        email: "test8@gmail.com",
        isVerified: true,
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

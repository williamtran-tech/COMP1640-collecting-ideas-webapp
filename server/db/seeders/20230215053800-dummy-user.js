'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = await bcrypt.hash('Asdfgh123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Bing Chilling',
        roleId: 1,
        departmentId: 1,
        email: "staff_01@test.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bing Chilling Chilling',
        roleId: 1,
        departmentId: 1,
        email: "test2@gmail.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Bing Bing Chilling',
        roleId: 1,
        departmentId: 1,
        email: "test3@gmail.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'John Xhina',
        roleId: 1,
        departmentId: 2,
        email: "staff_02@test.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Randy',
        roleId: 1,
        departmentId: 3,
        email: "test5@gmail.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'IT - QA Coordinator', 
        roleId: 2,
        departmentId: 1,
        email: "ducbalor@gmail.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'BA - QA Coordinator',
        roleId: 2,
        departmentId: 2,
        email: "test7@gmail.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'GD - QA Coordinator',
        roleId: 2,
        departmentId: 3,
        email: "test8@gmail.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'QA Manager',
        roleId: 4,
        departmentId: 1,
        email: "manager@test.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Administrator',
        roleId: 3,
        departmentId: 1,
        email: "admin@test.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'QA Coordinator',
        roleId: 2,
        departmentId: 1,
        email: "coordinator@test.com",
        isVerified: true,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

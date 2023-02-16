'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Topics', [
      {
        name: 'UK Visit',
        closureDate: "2022-04-10 23:50:40",
        finalClosureDate: "2023-05-10 23:50:40",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Graduation Ceremony',
        closureDate: "2022-04-10 23:50:40",
        finalClosureDate: "2023-05-10 23:50:40",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Honor Ceremony",
        closureDate: "2023-05-10 23:50:40",
        finalClosureDate: "2023-06-10 23:50:40",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Company Visit",
        closureDate: "2023-06-10 23:50:40",
        finalClosureDate: "2023-07-10 23:50:40",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};

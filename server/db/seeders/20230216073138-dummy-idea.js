'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ideas', [
        {
          name: 'Idea 1',
          categoryId: 3,
          topicId: 2,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Idea 2',
          categoryId: 1,
          topicId: 2,
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Idea 3',
          categoryId: 2,
          topicId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Idea 4',
          categoryId: 1,
          topicId: 1,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Idea 5',
          topicId: 3,
          categoryId: 1,
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Idea 6',
          categoryId: 1,
          topicId: 4,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Idea 7',
          categoryId: 2,
          topicId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ideas', null, {});
  }
};
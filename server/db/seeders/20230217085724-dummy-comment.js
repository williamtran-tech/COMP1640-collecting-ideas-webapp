'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        content: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
        userId: 2,
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed leo fringilla, aliquet sem eu, rhoncus diam. Vestibulum ac urna hendrerit neque vulputate pulvinar eget vitae lacus. Sed maximus vulputate felis ac tincidunt. Etiam metus nisl, elementum venenatis leo ut, dignissim pharetra sem. Phasellus vitae dui id metus condimentum volutpat. Praesent pretium egestas arcu, ac convallis est mollis eget. Sed id tellus quis nibh laoreet interdum id et ex. Integer ut mi vitae tellus ornare mattis sed at sem. Aliquam vel molestie ligula. Ut lobortis nibh erat, sed accumsan turpis dapibus id.`,
        userId: 1,
        ideaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed leo fringilla, aliquet sem eu, rhoncus diam. Vestibulum ac urna hendrerit neque vulputate pulvinar eget vitae lacus. Sed maximus vulputate felis ac tincidunt. Etiam metus nisl, elementum venenatis leo ut, dignissim pharetra sem. Phasellus vitae dui id metus condimentum volutpat. Praesent pretium egestas arcu, ac convallis est mollis eget. Sed id tellus quis nibh laoreet interdum id et ex. Integer ut mi vitae tellus ornare mattis sed at sem. Aliquam vel molestie ligula. Ut lobortis nibh erat, sed accumsan turpis dapibus id.`,
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

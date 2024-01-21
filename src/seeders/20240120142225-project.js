'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
        name: 'Website Matematika',
        year: '2024',
        start_date: '2024-01-04',
        end_date: '2024-01-06',
        duration: '2 Hari',
        description: 'Ini adalah website pinjaman onlline amanah',
        tech: ['angular', 'js'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};

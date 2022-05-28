'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Projects',
      [
        {
          name: 'Yamaha Capacity Planning',
          departmentId: 2,
          locationId: 1,
          startDate: '2022-01-10',
          endDate: '2022-12-22',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Assignments',
      [
        {
          projectId: 1,
          employeeId: 1,
          workHours: 50,
          month: 0,
          year: 2022,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Assignments', null, {});
  },
};

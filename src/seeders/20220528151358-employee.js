'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Employees',
      [
        {
          name: 'Ana',
          email: 'ana@example.com',
          roleId: 1,
          departmentId: 1,
          locationId: 1,
          customWorkload: 80,
          isOutsourced: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bia',
          email: 'bia@example.com',
          roleId: 2,
          departmentId: 2,
          locationId: 2,
          isOutsourced: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Moisés',
          email: 'moises@example.com',
          roleId: 3,
          departmentId: 3,
          locationId: 1,
          isOutsourced: false,
          customWorkload: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  },
};

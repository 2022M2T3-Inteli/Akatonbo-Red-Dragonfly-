'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Departments',
      [
        {
          name: 'Governança',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sistemas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Infraestrutura',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Segurança da Informação',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  },
};

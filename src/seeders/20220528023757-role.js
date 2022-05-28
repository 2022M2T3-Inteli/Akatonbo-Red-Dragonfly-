'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Analista de Governança',
          defaultWorkload: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Analista de Sistemas Oracle',
          defaultWorkload: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Analista de Infraestrutura',
          defaultWorkload: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};

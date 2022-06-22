'use strict';

// Arquivo de seed (para popular um banco de dados vazio) da tabela Locations

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Locations',
      [
        {
          name: 'SP',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'AM',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'SP/AM',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {});
  },
};

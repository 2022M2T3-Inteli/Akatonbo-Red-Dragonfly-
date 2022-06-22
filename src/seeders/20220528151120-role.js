'use strict';

// Arquivo de seed (para popular um banco de dados vazio) da tabela Roles

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Gerente de Projetos 1',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 2',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 3',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 4',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 5',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 6',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 7',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 8',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 9',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 10',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 11',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 12',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 13',
          defaultWorkload: 176,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gerente de Projetos 14',
          defaultWorkload: 176,
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

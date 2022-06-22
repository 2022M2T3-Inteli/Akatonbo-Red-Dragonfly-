'use strict';

// Arquivo de seed (para popular um banco de dados vazio) da tabela Departments

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Departments',
      [
        {
          name: 'Corporate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'CX',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'It Systems',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Commercial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'PCPM',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Information Security',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Engineering',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Audit',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tax',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Accounting',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IT Infrastructure',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Quality Assurance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Marketing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Yamalog',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Parts',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'YMC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Privacy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Human Resources',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Financial',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IT Governance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Logistic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Information Systems',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Process',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Purchase',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Legal',
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

'use strict';
const { Model } = require('sequelize');

// Modelo de Departments, gerencia a tabela de departamentos no banco de dados
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    // Define as relações/cardinalidade (associações) entre tabelas do DB
    static associate(models) {
      Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
      Department.hasMany(models.Project, { foreignKey: 'departmentId' });
    }
  }
  // Inicializa um modelo espelhado na tabela do DB
  Department.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Nome não pode estar vazio',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Department',
    }
  );
  return Department;
};

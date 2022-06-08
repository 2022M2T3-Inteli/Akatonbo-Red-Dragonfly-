'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    // Define a associação/cardinalidade entre as tabelas/entidades
    static associate(models) {
      Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
      Department.hasMany(models.Project, { foreignKey: 'departmentId' });
    }
  }
  // Inicializa um modelo espelhado na tabela do DB
  Department.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Department',
    }
  );
  return Department;
};

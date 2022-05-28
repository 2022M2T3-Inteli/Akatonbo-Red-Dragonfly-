'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.Employee, { foreignKey: 'departmentId' });
      Department.hasMany(models.Project, { foreignKey: 'departmentId' });
    }
  }
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

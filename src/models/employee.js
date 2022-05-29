'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.Assignment, { foreignKey: 'employeeId' });
      Employee.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Employee.belongsTo(models.Location, { foreignKey: 'locationId' });
      Employee.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  Employee.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      isOutsourced: DataTypes.BOOLEAN,
      customWorkload: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  );
  return Employee;
};

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Employee extends Model {}

Employee.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    customWorkload: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'employee',
    timestamps: false,
  }
);

module.exports = Employee;

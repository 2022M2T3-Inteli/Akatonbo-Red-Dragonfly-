const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Department extends Model {}

Department.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'department',
    timestamps: false,
  }
);

module.exports = Department;

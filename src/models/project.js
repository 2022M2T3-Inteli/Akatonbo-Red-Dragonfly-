const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Project extends Model {}

Project.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: 'project',
    timestamps: false,
  }
);

module.exports = Project;

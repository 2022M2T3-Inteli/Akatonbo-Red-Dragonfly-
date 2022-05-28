'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.Employee, {
        through: models.Assignment,
        foreignKey: 'projectId',
      });
      Project.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Project.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Assignment, { foreignKey: 'projectId' });
      Project.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Project.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O nome do projeto não pode ser vazio',
          },
          notNull: {
            msg: 'O nome do projeto não pode ser nulo',
          },
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A data de início do projeto não pode ser vazia',
          },
          isDate: {
            msg: 'A data de início do projeto deve ser uma data válida',
          },
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A data de término do projeto não pode ser vazia',
          },
          isDate: {
            msg: 'A data de início do projeto deve ser uma data válida',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};

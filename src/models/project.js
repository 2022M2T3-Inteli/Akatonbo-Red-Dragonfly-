'use strict';
const { Model } = require('sequelize');

// Modelo de Projects, gerencia a tabela de projetos no banco de dados
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    // Define as relações/cardinalidade (associações) entre tabelas do DB
    static associate(models) {
      Project.hasMany(models.Assignment, {
        foreignKey: 'projectId',
        onDelete: 'cascade',
      });
      Project.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Project.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  }
  // Inicializa um modelo espelhado na tabela do banco de dados
  Project.init(
    // Define os campos da tabela
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
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Departamento não pode estar vazio',
          },
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Localização não pode estar vazio',
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
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A data de término do projeto não pode ser vazia',
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

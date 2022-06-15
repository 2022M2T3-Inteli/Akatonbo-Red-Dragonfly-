'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    static associate(models) {
      Assignment.belongsTo(models.Employee, { foreignKey: 'employeeId' });
      Assignment.belongsTo(models.Project, { foreignKey: 'projectId' });
    }
  }
  Assignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      workHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Horas de trabalho não pode estar vazio',
          },
          isInt: {
            msg: 'Horas de trabalho mensais deve ser um número inteiro',
          },
          min: {
            args: [0],
            msg: 'Horas de trabalho mensais não pode ser menor que 0',
          },
          max: {
            args: [744], // maximo de horas em um mês (24*31=744)
            msg: 'Horas de trabalho mensais não pode ser maior que 744',
          },
        },
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Mês não pode estar vazio',
          },
          isInt: { msg: 'O mês deve ser um número inteiro' },
          min: {
            args: [0], // 0 = Janeiro
            msg: 'O mês deve ser um número inteiro maior que zero e menor que 11',
          },
          max: {
            args: [11], // 11 = Dezembro
            msg: 'O mês deve ser um número inteiro maior que zero e menor que 11',
          },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Ano não pode estar vazio',
          },
          isInt: { msg: 'O ano deve ser um número inteiro' },
          min: {
            msg: 'O ano deve ser maior ou igual a 1900',
            args: 1900,
          },
          max: {
            msg: 'O ano deve ser menor ou igual a 9999',
            args: 9999,
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Assignment',
    }
  );
  return Assignment;
};

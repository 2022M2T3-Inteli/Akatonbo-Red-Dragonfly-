'use strict';
const { Model } = require('sequelize');

// Modelo de Employees, gerencia a tabela de funcionários no banco de dados
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    // Define as relações/cardinalidade (associações) entre tabelas do DB
    static associate(models) {
      Employee.hasMany(models.Assignment, {
        foreignKey: 'employeeId',
        onDelete: 'cascade',
      });
      Employee.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Employee.belongsTo(models.Location, { foreignKey: 'locationId' });
      Employee.belongsTo(models.Role, { foreignKey: 'roleId' });
    }
  }
  Employee.init(
    {
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
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Cargo não pode estar vazio',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O nome do funcionário não pode estar vazio',
          },
          notNull: {
            msg: 'O nome do funcionário não pode estar vazio',
          },
        },
      },
      email: DataTypes.STRING,
      isOutsourced: DataTypes.BOOLEAN,
      customWorkload: {
        type: DataTypes.INTEGER,
        allowNull: true, // pode ser nulo, caso seja serão aplicadas as horas padrão da função do funcionário
        validate: {
          isInt: {
            msg: 'A carga horária mensal do funcionário deve ser um número inteiro',
          },
          min: {
            args: [0],
            msg: 'A carga horária mensal do funcionário não pode ser menor que 0 horas',
          },
          max: {
            args: [744], // 744 horas em um mês
            msg: 'A carga horária mensal do funcionário não pode ser maior que 744 horas',
          },
        },
      },
      contractedHours: {
        type: DataTypes.INTEGER,
        allowNull: false, // não pode ser nulo, o funcionário deve ter horas contratuais (CLT ou PJ)
        validate: {
          isInt: {
            msg: 'As horas contratuais do funcionário devem ser um número inteiro',
          },
          min: {
            args: [0],
            msg: 'As horas contratuais do funcionário não podem ser menores que 0 horas',
          },
          max: {
            args: [744], // 744 horas em um mês
            msg: 'As horas contratuais do funcionário não podem exceder 744 horas',
          },
          notNull: {
            msg: 'As horas contratuais do funcionário não podem estar vazias',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Employee',
    }
  );
  return Employee;
};

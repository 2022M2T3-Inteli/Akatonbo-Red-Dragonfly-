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
            msg: 'O nome do funcionário não pode ser vazio',
          },
          notNull: {
            msg: 'O nome do funcionário não pode ser nulo',
          },
        },
      },
      email: DataTypes.STRING,
      isOutsourced: DataTypes.BOOLEAN,
      customWorkload: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: 'O workload do funcionário não pode ser menor que 0',
          },
          max: {
            args: [744], // 744 horas em um mês
            msg: 'O workload do funcionário não pode ser maior que 744',
          },
        },
      },
      contractedHours: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: 'As horas contratadas do funcionário não pode ser menor que 0',
          },
          max: {
            args: [744], // 744 horas em um mês
            msg: 'As horas contratadas do funcionário não pode ser maior que 744',
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

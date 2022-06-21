'use strict';
// Declara o uso do Sequelize
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    // Define as relações/cadinalidade (associações) entre tabelas do DB
    static associate(models) {
      Role.hasMany(models.Employee, { foreignKey: 'roleId' });
    }
  }
  // Inicializa um modelo espelhado na tabela do DB
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Nome não pode estar vazio',
          },
        },
      },
      defaultWorkload: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'A carga horária padrão deve ser um número inteiro',
          },
          min: {
            args: [0],
            msg: 'A carga horária padrão não pode ser menor que 0',
          },
          max: {
            args: [744], // maximo de horas em um mês (24*31=744)
            msg: 'A carga horária padrão não pode ser maior que 744',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};

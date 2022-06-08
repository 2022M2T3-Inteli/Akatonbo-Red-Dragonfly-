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
      name: { type: DataTypes.STRING, allowNull: false },
      defaultWorkload: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: true },
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};

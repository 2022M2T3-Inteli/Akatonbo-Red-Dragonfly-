'use strict';
// Declara o uso do Sequelize
const { Model } = require('sequelize');

// Modelo de Locations, gerencia a tabela de locais no banco de dados
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    // Define as relações/cardinalidade (associações) entre tabelas do DB
    static associate(models) {
      Location.hasMany(models.Employee, { foreignKey: 'locationId' });
      Location.hasMany(models.Project, { foreignKey: 'locationId' });
    }
  }
  // Inicializa um modelo espelhado na tabela/entidade do DB
  Location.init(
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
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};

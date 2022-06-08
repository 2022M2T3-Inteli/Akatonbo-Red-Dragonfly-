'use strict';
// Declara o uso do Sequelize
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    // Define as relações/cardinalidade da tabela locations com as outras
    static associate(models) {
      Location.hasMany(models.Employee, { foreignKey: 'locationId' });
      Location.hasMany(models.Project, { foreignKey: 'locationId' });
    }
  }
  // Inicializa um modelo espelhado na tabela/entidade do DB 
  Location.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  );
  return Location;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.Employee, { foreignKey: 'locationId' });
      Location.hasMany(models.Project, { foreignKey: 'locationId' });
    }
  }
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

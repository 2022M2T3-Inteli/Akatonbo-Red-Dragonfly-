const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Location extends Model {}

Location.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'location',
    timestamps: false,
  }
);

module.exports = Location;

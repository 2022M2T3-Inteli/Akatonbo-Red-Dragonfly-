const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    defaultWorkload: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'role',
    timestamps: false,
  }
);

module.exports = Role;

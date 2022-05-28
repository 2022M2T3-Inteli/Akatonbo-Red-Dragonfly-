'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Employee, { foreignKey: 'roleId' });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      defaultWorkload: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};

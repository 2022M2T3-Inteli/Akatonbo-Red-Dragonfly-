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

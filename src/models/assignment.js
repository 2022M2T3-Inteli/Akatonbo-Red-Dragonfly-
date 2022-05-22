const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Assignment extends Model {}

Assignment.init(
  {
    monthlyHours: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: 'assignment',
    timestamps: false,
  }
);

module.exports = Assignment;

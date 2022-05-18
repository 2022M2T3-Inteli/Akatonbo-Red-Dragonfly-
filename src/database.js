const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my-db', 'user', 'pass', {
  dialect: 'sqlite',
  host: './dev.sqlite',
});

module.exports = sequelize;

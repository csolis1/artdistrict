
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'art_district_dev',      // database name
  'artdistrict_user',      // database username
  'ArtemRegio17',      // database password
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;

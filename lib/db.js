const { Sequelize } = require('sequelize');

// Replace these with your actual PostgreSQL credentials
const sequelize = new Sequelize(
  'art_district_dev',      // database name
  'artdistrict_user',      // database username
  'ArtemRegio17',      // database password
  {
    host: 'localhost',     // usually localhost
    dialect: 'postgres',   // using PostgreSQL
    logging: false         // set to true if you want SQL logs
  }
);

module.exports = sequelize;

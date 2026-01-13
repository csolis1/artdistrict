const sequelize = require('./src/lib/db');

sequelize.authenticate()
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

const sequelize = require('./src/lib/db');
const User = require('./src/models/User');

sequelize.sync({ alter: true }) // alter:true updates table if it exists
  .then(() => {
    console.log('Database synced!');
    process.exit(); // exit after syncing
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

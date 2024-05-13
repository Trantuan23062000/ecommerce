const { Sequelize } = require('sequelize');



// Initialize Sequelize with database connection
const sequelize = new Sequelize('Store_S', 'root', null, {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql', etc.
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
// Call the function to test the connection
export default testConnection

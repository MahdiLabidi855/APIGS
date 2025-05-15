const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Sync error:", err));

module.exports = { User, Product };
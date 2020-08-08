const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "my_db.db",
  logging: false,
});

module.exports = db;

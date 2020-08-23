const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class OrderItem extends Model {}

OrderItem.init(
  {},
  {
    sequelize: db,
  }
);

module.exports = OrderItem;

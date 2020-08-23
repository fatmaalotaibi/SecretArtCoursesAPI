const Course = require("./Course");
const Institute = require("./Institute");
const User = require("./User");
const Order = require("./Order");

// an institute has many courses
Institute.hasMany(Course, {
  as: "courses",
  foreignKey: "instituteId",
  allowNull: false,
});

User.hasOne(Institute, { as: "institute", foreignKey: "userId" });

Institute.belongsTo(User, { as: "user" });

Course.belongsTo(Institute, { as: "institute" });

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

module.exports = { Course, Institute, User, Order };

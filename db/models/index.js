const Course = require("./Course");
const Institute = require("./Institute");

// an institute has many courses
Institute.hasMany(Course, {
  as: "courses",
  foreignKey: "instituteId",
  allowNull: false,
});

Course.belongsTo(Institute, { as: "institute" });
module.exports = { Course, Institute };

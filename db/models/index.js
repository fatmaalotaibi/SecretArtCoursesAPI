const Course = require("./Course");
const Institute = require("./Institute");

// an institute has many courses
Institute.hasMany(Course, { foreignKey: "instituteId" });

module.exports = { Course, Institute };

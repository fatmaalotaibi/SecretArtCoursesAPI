const { DataTypes, Model, Sequelize } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const db = require("../db");
const slugify = require("slugify");
// const { import } = require("../db");

class Course extends Model {}

Course.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 25,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

// SequelizeSlugify.slugifyModle(Course, {
//   source: ["name"],
// });

module.exports = Course;

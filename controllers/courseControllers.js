const slugify = require("slugify");

//data
const { Course, Institute } = require("../db/models");

exports.fetchCourse = async (courseId, next) => {
  try {
    const course = await Course.findByPk(courseId);
    return course;
  } catch (error) {
    next(error);
  }
};

exports.courseList = async (req, res, next) => {
  try {
    const _courses = await Course.findAll({
      attributes: { exclude: ["createdAt", "instituteId", "updatedAt"] },
      include: {
        model: Institute,
        as: "institute",
        attributes: ["name"],
      },
    });
    res.json(_courses);
  } catch (error) {
    next(error);
  }
};

exports.courseUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.course.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.courseDelete = async (req, res, next) => {
  try {
    await req.course.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

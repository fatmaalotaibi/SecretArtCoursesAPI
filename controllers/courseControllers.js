const slugify = require("slugify");

//data
const { Course } = require("../db/models");

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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_courses);
  } catch (error) {
    next(error);
  }
};

exports.courseCreate = async (req, res, next) => {
  try {
    if (require.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
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

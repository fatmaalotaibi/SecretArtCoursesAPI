const slugify = require("slugify");

//data
let courses = require("../courses");
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
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

exports.courseUpdate = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(error);
  }
};

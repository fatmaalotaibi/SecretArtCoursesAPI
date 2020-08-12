const slugify = require("slugify");

//data
const { Course, Institute } = require("../db/models");

exports.fetchInstitute = async (instituteId, next) => {
  try {
    const institute = await Institute.findByPk(instituteId);
    return institute;
  } catch (error) {
    next(error);
  }
};

exports.instituteList = async (req, res, next) => {
  try {
    const _institutes = await Institute.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Course,
          as: "courses",
          attributes: ["id"],
        },
      ],
    });
    res.json(_institutes);
  } catch (error) {
    next(error);
  }
};

exports.instituteCreate = async (req, res, next) => {
  try {
    const foundInstitute = await Institute.findOne({
      where: { userId: req.user.id },
    });
    if (foundInstitute) {
      const err = new Error("You already have a institute");
      err.status = 400;
      next(err);
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newInstitute = await Institute.create(req.body);
    res.status(201).json(newInstitute);
  } catch (error) {
    next(error);
  }
};

exports.instituteUpdate = async (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.institute.userId) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.institute.update(req.body);
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};
exports.instituteDelete = async (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.institute.userId) {
    await req.institute.destroy();
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.courseCreate = async (req, res, next) => {
  if (req.user.id === req.institute.userId) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.instituteId = req.institute.id;
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

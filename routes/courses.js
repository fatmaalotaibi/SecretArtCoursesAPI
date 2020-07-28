const express = require("express");

//Controllers
const {
  courseCreate,
  courseList,
  courseUpdate,
  courseDelete,
} = require("../controllers/courseControllers");

const router = express.Router();

// Course List
router.get("/", courseList);

router.use((req, res, next) => {
  console.log("I'm third middleware method");
  next();
});

// create course
router.post("/", courseCreate);

// update course
router.put("/:courseId", courseUpdate);

//delete course
router.delete("/:courseId", courseDelete);

module.exports = router;

const express = require("express");

//Controllers
const {
  courseCreate,
  courseList,
  courseUpdate,
  courseDelete,
  fetchCourse,
} = require("../controllers/courseControllers");

// middleware
const upload = require("../middleware/storage");

const router = express.Router();

router.param("courseId", async (req, res, next, courseId) => {
  console.log(`The value of course's ID is ${courseId}`);
  const course = await fetchCourse(courseId, next);
  if (course) {
    req.course = course;
    next();
  } else {
    const err = new Error("Course not found");
    err.status = 404;
    next(err);
  }
});

// Course List
router.get("/", courseList);

// create course
router.post("/", upload.single("image"), courseCreate);

// update course
router.put("/:courseId", upload.single("image"), courseUpdate);

//delete course
router.delete("/:courseId", courseDelete);

module.exports = router;

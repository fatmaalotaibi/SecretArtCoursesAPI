const express = require("express");
const passport = require("passport");

//Controllers
const {
  courseCreate,
  instituteCreate,
  instituteList,
  instituteUpdate,
  instituteDelete,
  fetchInstitute,
} = require("../controllers/instituteControllers");

// middleware
const upload = require("../middleware/storage");

const router = express.Router();

router.param("instituteId", async (req, res, next, instituteId) => {
  console.log(`The value of institute's ID is ${instituteId}`);
  const institute = await fetchInstitute(instituteId, next);
  if (institute) {
    req.institute = institute;
    console.log(req.institute);
    next();
  } else {
    const err = new Error("Institute not found");
    err.status = 404;
    next(err);
  }
});

// institute List
router.get("/", instituteList);

// create institute
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  instituteCreate
);

// update institute
router.put(
  "/:instituteId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  instituteUpdate
);

//delete institute
router.delete(
  "/:instituteId",
  passport.authenticate("jwt", { session: false }),
  instituteDelete
);

// create course
router.post(
  "/:instituteId/courses",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  courseCreate
);

module.exports = router;

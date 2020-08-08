const express = require("express");

//Controllers
const {
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
    next();
  } else {
    const err = new Error("Institutenot found");
    err.status = 404;
    next(err);
  }
});

// institute List
router.get("/", instituteList);

// create institute
router.post("/", upload.single("image"), instituteCreate);

// update institute
router.put("/:instituteId", upload.single("image"), instituteUpdate);

//delete institute
router.delete("/:instituteId", instituteDelete);

module.exports = router;

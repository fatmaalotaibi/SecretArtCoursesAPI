const cors = require("cors");
const express = require("express");

//data
let courses = require("./courses");

//create express app instance
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.delete("/coueses/courseId", (req, res) => {
  const { courseId } = req.params;
  const foundCourse = courses.find((course) => course.id === +courseId);
  if (foundCourse) {
    courses = courses.filter((_course) => _course.id !== foundCourse);
    res.status(204).end();
  } else {
    res.status(404).jason({ message: "course not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

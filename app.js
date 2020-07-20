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

app.delete("/coueses/1", (req, res) => {
  courses = courses.filter((course) => course.id !== 1);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

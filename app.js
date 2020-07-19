const express = require("express");

const cors = require("cors");
const courses = require("./courses");
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

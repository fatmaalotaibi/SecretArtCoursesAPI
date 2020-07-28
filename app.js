const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//DB
const db = require("./db");
const { Course } = require("./db/models");

// Routes
const courseRoutes = require("./routes/courses");
//data
let courses = require("./courses");

//create express app instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("I'm a middleware method");
  next();
});

//Routers
app.use("/courses", courseRoutes);

const run = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("run -> error", error);
  }
};

run();

//Not Found Paths
app.use((req, res, next) => {
  res.status(404).json({ message: "path Found" });
});

//Error handeling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

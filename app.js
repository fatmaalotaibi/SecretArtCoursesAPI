const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;

//DB
const db = require("./db");
const { Course } = require("./db/models");

// Routes
const courseRoutes = require("./routes/courses");
const instituteRoutes = require("./routes/institutes");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

//data
let courses = require("./courses");

//create express app instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/courses", courseRoutes);
app.use("/institutes", instituteRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);
app.use(orderRoutes);

// Passport Strategies
const { localStrategy } = require("./middleware/passport");

//Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Error handeling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("run -> error", error);
  }
};

run();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

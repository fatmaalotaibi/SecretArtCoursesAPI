const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//db
const { User, Institute } = require("../db/models");

//config
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
  const institute = await Institute.findOne({ where: { userId: user.id } });
  const newUser = await User.create(req.body);
  const payload = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    role: newUser.role,
    instituteSlug: institute ? institute.slug : null,
    expires: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.status(201).json({ token });
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: newUser.role,
    instituteSlug: null,
    expires: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

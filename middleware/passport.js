const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Models
const User = require("../db/models/User");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username }, // equivalent to { username : username }
    });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    passwordsMatch ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});

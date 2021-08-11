const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({ id }, "kushagra rathore secret", {
    expiresIn: maxAge,
  });
}

module.exports.signup = async (req, res) => {
  const { email, username, name, password } = req.body;

  if (!password || password.length < 6)
    res.send({ properties: { message: "password minimum length 6" } });
  let pass = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, username, name, password: pass });
    if (user) {
      res.send(user);
    }
  } catch (err) {
    if (err.code == 11000) {
      if (err.keyValue.email)
        res.send({ properties: { message: "Email already Exists" } });
      else res.send({ properties: { message: "Email already Exists" } });
    } else if (err.errors.email) res.send(err.errors.email);
    else if (err.errors.name) res.send(err.errors.name);
    else if (err.errors.username) res.send(err.errors.username);
    else if (err.errors.password) res.send(err.errors.password);
    else {
      res.send(err);
    }
  }
};
module.exports.sign_in = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (user) {
    const isYes = await bcrypt.compare(password, user.password);

    if (isYes) {
      const token = createToken(user._id);
      const date = new Date();
      res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
      res.send({ message: "success", success: true, user: user });
    } else {
      res.send({ message: "Password did't Match", success: false });
    }
  } else {
    res.send({ message: "User not found please Register", succes: false });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
  res.send("Successfully Logout");
};

module.exports.verify = (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "kushagra rathore secret", (err, decored) => {
      if (!err) {
        res.send({ access: true, id: decored.id });
      } else {
        res.send({ access: false });
      }
    });
  } else {
    res.send({ access: false });
  }
};

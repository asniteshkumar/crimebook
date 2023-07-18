const bcrypt = require("bcrypt");

const User = require("../models/user");

const { createJSONToken } = require("../util/auth");

module.exports.signup = async (req, res) => {
  const userData = req.body;
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  userData.password = hashedPassword;
  const user = new User(userData);
  await user.save();
  res.send({ message: "Signup successful!" });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = createJSONToken();
    res.json({ token, userId: user._id, username });
  } else {
    res.send({ message: "Invalid username or password" });
  }
};

module.exports.reset = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  if (user) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    res.send({ message: "Password Changed!" });
  } else {
    res.send("Email does not exist!!");
  }
};

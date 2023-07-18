const jwt = require("jsonwebtoken");

module.exports.createJSONToken = (userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
    expiresIn: 1800,
  });
};

const validateJSONToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports.checkAuth = (req, res, next) => {
  const authFragments = req.headers.authorization.split(" ");
  const authToken = authFragments[1];
  const validatedToken = validateJSONToken(authToken);
  req.token = validatedToken;
  next();
};

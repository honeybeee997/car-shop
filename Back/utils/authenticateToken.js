const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const handleAsync = require("./handleAsync");

module.exports = handleAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split("Bearer ")[1];
  if (!authorization || !token) {
    res.status(401).json({
      status: "fail",
      message: "Please provide a token to post a car",
    });
    return;
  }
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      status: "failure",
      message: "Invalid Token. Please login again",
    });
  }

  const user = await users.findById(decoded.id);

  if (!user) {
    return res.status(401).json({
      status: "failure",
      message: "Invalid Token. Please login again",
    });
  }

  req.user = user;
  next();
});

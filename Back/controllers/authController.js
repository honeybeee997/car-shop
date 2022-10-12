const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const handleAsync = require("../utils/handleAsync");

const sendToken = (id, user, message, req, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);

  return res.status(200).json({
    status: "success",
    message,
    token,
    user,
  });
};

exports.signUp = handleAsync(async (req, res, next) => {
  const { fullName: name, email, password } = req.body;

  const duplicateUser = await users.findOne({ email });
  if (duplicateUser) {
    return res.status(400).json({
      status: "fail",
      message: "User with this email already exists",
    });
  }

  const newUser = await users.create({ name, email, password });

  const message = "Created account successully and logged you in";
  sendToken(newUser._id, newUser, message, req, res);
});

exports.login = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "This Email does not exist. Please Sign up first",
    });
  }

  if (!(await user.isCorrectPassword(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Password is incorrect",
    });
  }
  const message = "Logged you in successully";
  sendToken(user._id, user, message, req, res);
});

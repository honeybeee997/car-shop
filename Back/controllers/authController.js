const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

const sendToken = (id, user, req, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);

  return res.status(200).json({
    status: "success",
    token,
    user,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const { fullName: name, email, password } = req.body;

    const duplicateUser = await users.findOne({ email });
    if (duplicateUser) {
      return res.status(400).json({
        status: "fail",
        message: "User with this email already exists",
      });
    }

    const newUser = await users.create({ name, email, password });

    sendToken(newUser._id, newUser, req, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Unable to create account. Please try again",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
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

    sendToken(user._id, user, req, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Unable to Login. Please try again",
    });
  }
};

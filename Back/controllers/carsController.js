const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const cars = require("../models/carModel");
const users = require("../models/userModel");

exports.createCar = async (req, res, next) => {
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
      status: "fail",
      message: "Invalid Token",
    });
  }

  const user = await users.findById(decoded.id);

  const { model, price, phone, city } = req.body;

  const carImages = req.files.map((item) => item.path);

  const newCar = await cars.create({
    model,
    price,
    phone,
    city,
    images: carImages,
    owner: user._id,
  });

  res.status(201).json({
    status: "success",
    message: "Car Posted Successfully",
    car: newCar,
  });
};

exports.getAllCars = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split("Bearer ")[1];
  if (!authorization || !token) {
    res.status(401).json({
      status: "fail",
      message: "Please provide a token to view Cars",
    });
    return;
  }
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid Token",
    });
  }

  const user = await users.findById(decoded.id).populate("cars");
  res.status(200).json({
    status: "success",
    user,
  });
};

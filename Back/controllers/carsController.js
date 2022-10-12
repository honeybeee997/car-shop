const cars = require("../models/carModel");
const users = require("../models/userModel");
const handleAsync = require("../utils/handleAsync");

exports.createCar = handleAsync(async (req, res, next) => {
  const user = req.user;

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
});

exports.getAllCars = handleAsync(async (req, res, next) => {
  const user = await users.findById(req.user._id).populate("cars");
  res.status(200).json({
    status: "success",
    user,
  });
});

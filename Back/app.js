const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const carsRoutes = require("./routes/carsRoutes");

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRoutes);
app.use("/cars", carsRoutes);

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "Fail",
    message: "Not Found",
  });
});

module.exports = app;

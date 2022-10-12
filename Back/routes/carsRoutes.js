const router = require("express").Router();
const multer = require("multer");
const authenticateToken = require("../utils/authenticateToken");
const carsController = require("../controllers/carsController");
const { validate } = require("../utils/validator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.ceil(Math.random() * 999999999);
    cb(
      null,
      `${file.fieldname}-${randomNumber}-${Date.now()}.${
        file.mimetype.split("/")[1]
      }`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.use(authenticateToken);

router.get("/", carsController.getAllCars);

router.post(
  "/add-new",
  upload.array("images"),
  validate("car"),
  carsController.createCar
);

module.exports = router;

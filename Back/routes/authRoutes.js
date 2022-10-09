const router = require("express").Router();
const authController = require("../controllers/authController");
const { validate } = require("../utils/validator");

router.post("/sign-up", validate("signUp"), authController.signUp);
router.post("/login", validate("login"), authController.login);

module.exports = router;

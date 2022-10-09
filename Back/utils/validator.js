const { body, validationResult } = require("express-validator");

exports.validation = (method) => {
  switch (method) {
    case "signUp": {
      return [
        body("fullName")
          .exists()
          .withMessage("Please provide a Name")
          .isLength({ min: 3 })
          .withMessage("Name must be at least 3 characters"),
        body("email")
          .exists()
          .withMessage("Please provide an email")
          .isEmail()
          .withMessage("Email is invalid")
          .trim()
          .toLowerCase(),
        body("password")
          .exists()
          .withMessage("Please provide a password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters"),
      ];
    }
    case "login": {
      return [
        body("email")
          .exists()
          .withMessage("Please provide an email")
          .isEmail()
          .withMessage("Email is invalid"),
        body("password")
          .exists()
          .withMessage("Please provide a password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters"),
      ];
    }
    case "car": {
      return [
        body("model")
          .isLength({ min: 3 })
          .withMessage("model must be at least 3 characters"),
        body("phone")
          .exists()
          .withMessage("Please provide a phone Number")
          .isLength(11)
          .withMessage("Phone number can only be 11 digits"),
        body("price").exists().withMessage("Please enter a Price"),
        body("city").exists().withMessage("Please select a city"),
      ];
    }
  }
};

exports.checkResults = (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  if (hasErrors) {
    const plainErrors = errors.array().map((err) => {
      return err.msg;
    });

    res.status(401).json({
      status: "fail",
      message: plainErrors[0],
    });
    return;
  }

  next();
};

exports.validate = (method) => {
  return [this.validation(method), this.checkResults];
};

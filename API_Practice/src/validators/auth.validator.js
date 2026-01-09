const { body } = require("express-validator");

exports.register = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.login = [
  body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password required"),
];

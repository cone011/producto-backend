const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const userController = require("../Controllers/user");
const Users = require("../Models/Users");

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
    body("password", "The password has to be valid")
      .isLength({ min: 5 })
      .trim(),
  ],
  userController.login
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please a valid email")
      .custom(async (value, { req }) => {
        const userFind = await Users.findOne({ email: value });
        if (userFind)
          throw new Error(
            "This email is already existis, please pick a different one"
          );
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only number and text and at lease 5 characters"
    )
      .isLength({ min: 5 })
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("The passwords does not match");
        }
        return true;
      }),
  ],
  userController.signUp
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const orderController = require("../Controllers/order");
const isAuth = require("../middleware/isAuth");

router.post(
  "/order",
  isAuth,
  [
    body("items", "This order dont have any detail")
      .isArray()
      .isLength({ min: 1 }),
  ],
  orderController.insertOrder
);

module.exports = router;

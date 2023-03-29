const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const paymentController = require("../Controllers/payment");
const isAuth = require("../middleware/isAuth");

router.post(
  "/payment",
  isAuth,
  [
    body("name", "There is not name assignment to this payment")
      .trim()
      .isLength({ min: 5 }),
    body(
      "number",
      "There is no credit card number assignment to this payment"
    ).isNumeric(),
    body("expiry", "There is not expiry data assignment to this payment")
      .trim()
      .isLength({ min: 4 }),
    body("cvc", "There is not cvc data assignment to this payment")
      .trim()
      .isLength({ min: 3 }),
    body(
      "totalAmount",
      "There is not amount assignment to this payment"
    ).isNumeric(),
  ],
  paymentController.insertPayment
);

module.exports = router;

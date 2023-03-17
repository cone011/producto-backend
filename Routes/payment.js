const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const paymentController = require("../Controllers/payment");

router.post(
  "/payment",
  [
    body("name", "There is not name assignment to this payment")
      .trim()
      .isLength({ min: 5 }),
    body(
      "number",
      "There is no credit card number assignment to this payment"
    ).isNumeric(),
    body("name", "There is not expiry data assignment to this payment")
      .trim()
      .isLength({ min: 4 }),
    body("name", "There is not cvc data assignment to this payment")
      .trim()
      .isLength({ min: 3 }),
    body("name", "There is not amount assignment to this payment").isNumeric(),
  ],
  paymentController.insertPayment
);

module.exports = router;

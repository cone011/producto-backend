const { validationResult } = require("express-validator");
const Payment = require("../Models/payment");

exports.insertPayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const name = req.body.name;
    const number = req.body.number;
    const expiry = req.body.expiry;
    const cvc = req.body.cvc;
    const totalAmount = req.body.totalAmount;
    const payment = new Payment({
      name: name,
      number: number,
      expiry: expiry,
      cvc: cvc,
      totalAmount: totalAmount,
    });
    const result = await payment.save();
    res.status(201).json({ message: "OK", result: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

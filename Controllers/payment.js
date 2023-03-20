const { validationResult } = require("express-validator");
const Payment = require("../Models/payment");
const { errorHanlder } = require("../utils/errorHandler");

exports.insertPayment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    errorHanlder(errors);
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
    res.status(201).json({ message: "OK", result: result._id, isSaved: true });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

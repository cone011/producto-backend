const { validationResult } = require("express-validator");
const { errorHanlder } = require("../utils/errorHandler");
const Order = require("../Models/order");

exports.insertOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    errorHanlder(errors);
    const items = req.body.items;
    const total = req.body.totalAmount;
    const order = new Order({ products: items, totalAmount: total });
    const result = await order.save();
    res.status(200).json({ message: "OK", isSaved: true, orderId: result._id });
  } catch (err) {
    console.log(err);
  }
};

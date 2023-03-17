const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  name: { type: String, require: true },
  number: { type: Number, require: true },
  expiry: { type: String, require: true },
  cvc: { type: Number, require: true },
  totalAmount: { type: Number, require: true },
});

module.exports = mongoose.model("Payment", paymentSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      id: { type: String, require: true },
      name: { type: String, require: true },
      amount: { type: Number, require: true },
      price: { type: Number, require: true },
    },
  ],
  totalAmount: { type: Number, require: true },
  // user: {
  //   email: { type: String, require: true },
  //   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
  // },
});

module.exports = mongoose.model("Order", orderSchema);

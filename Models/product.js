const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productCode: { type: String, require: true },
  title: { type: String, require: true },
  imageUrl: { type: String, require: true },
  price: { type: Number, require: true },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   require: true,
  // },
});

module.exports = mongoose.model("Product", productSchema);

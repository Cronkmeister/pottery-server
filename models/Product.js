const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    color: { type: String },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);

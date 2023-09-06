const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    unit: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;

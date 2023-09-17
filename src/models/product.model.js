const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    cost: {
      type: Number,
    },
    unit: {
      type: String,
    },
    amount: {
      type: Number,
    },
    shop: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;

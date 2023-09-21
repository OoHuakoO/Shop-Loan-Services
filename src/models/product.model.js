const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productID: {
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
    sell1: {
      type: Number,
    },
    sell2: {
      type: Number,
    },
    sell3: {
      type: Number,
    },
    sell4: {
      type: Number,
    },
    sell5: {
      type: Number,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;

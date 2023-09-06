const mongoose = require("mongoose");

const ProductOrderSchema = new mongoose.Schema(
  {
    bill: {
      type: String,
      unique: true,
    },
    code: {
      type: String,
      unique: true,
    },
    manufacturer: {
      type: String,
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
    discount: {
      type: Number,
    },
    shop: {
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

const ProductOrder = mongoose.model("product", ProductOrderSchema);

module.exports = ProductOrder;

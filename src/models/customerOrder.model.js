const mongoose = require("mongoose");

const CustomerOrderSchema = new mongoose.Schema(
  {
    customerID: {
      type: String,
    },
    productID: {
      type: String,
    },
    productName: {
      type: String,
    },
    amount: {
      type: Number,
    },
    pricePerUnit: {
      type: Number,
    },
    profit: {
      type: Number,
    },
    totalProfit: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const customerOrder = mongoose.model("customerOrder", CustomerOrderSchema);

module.exports = customerOrder;

const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    customerID: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    district: {
      type: String,
    },
    province: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    subDistrict: {
      type: String,
    },
    address: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    creditLimit: {
      type: Number,
    },
    creditUse: {
      type: Number,
    },
    creditRemain: {
      type: Number,
    },
    sellType: {
      type: String,
    },
  },
  { versionKey: false }
);

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;

const mongoose = require("mongoose");

const CustomerProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const CustomerProfile = mongoose.model(
  "CustomerProfile",
  CustomerProfileSchema
);

module.exports = CustomerProfile;

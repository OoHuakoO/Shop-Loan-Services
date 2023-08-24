const mongoose = require("mongoose");

const CustomerProfileSchema = new mongoose.Schema(
  {
    IDCard: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    thaiIDAddress: {
      type: String,
      required: true,
    },
    thaiIDGoogleMap: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    currentGoogleMap: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    child: {
      type: Number,
      default: 0,
    },
    coupleName: {
      type: String,
    },
    coupleSurname: {
      type: String,
    },
    occupation: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    workPhone: {
      type: String,
    },
    workFax: {
      type: String,
    },
    workAddress: {
      type: String,
    },
    pathURLProfile: {
      type: String,
    },
    pathURLThaiID: {
      type: String,
    },
    isBorrower: {
      type: Boolean,
    },
    isGuarantor: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

const CustomerProfile = mongoose.model(
  "CustomerProfile",
  CustomerProfileSchema
);

module.exports = CustomerProfile;

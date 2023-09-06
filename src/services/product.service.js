const CustomerProfile = require("../models/customerProfile.model");

const { uploadFileFirebase } = require("../utils/uploadFile.utils");

async function createProduct(req) {
  try {
    console.log(
      "start createProduct.service create req body:",
      JSON.stringify(req?.body, null, 2)
    );

    const newCustomerProduct = new CustomerProfile({
      ...req?.body,
    });

    const savedProduct = await newCustomerProduct.save();

    console.log("save product successfully", savedProduct);

    return newCustomerProduct;
  } catch (error) {
    console.error(
      "customerProfile.service error while creating customer profile:",
      error
    );
    throw error;
  }
}

async function findByType(IDCard) {
  try {
    console.log("start product.service findByType IDCard:", IDCard);

    const product = await CustomerProfile.findOne({ type: IDCard });

    return product;
  } catch (error) {
    console.error("product.service error while findByType product :", error);
    throw error;
  }
}

module.exports = {
  createProduct,
  findByType,
};

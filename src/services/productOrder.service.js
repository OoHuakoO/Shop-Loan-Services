const { default: mongoose } = require("mongoose");
const ProductOrder = require("../models/productOrder.model");

async function create(products, options = {}) {
  try {
    console.log(
      "start productOrder.service createProductOrder products:",
      JSON.stringify(products, null, 2)
    );
    const session = options.session || null;

    const savedProductOrder = await ProductOrder.insertMany(products, {
      session,
    });

    console.log("insert productOrder successfully", savedProductOrder);

    return savedProductOrder;
  } catch (error) {
    console.error(
      " productOrder.service error while create productOrder:",
      error
    );
    throw error;
  }
}

module.exports = {
  create,
};

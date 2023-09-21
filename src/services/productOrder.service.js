const ProductOrder = require("../models/productOrder.model");

async function create(products, options = {}) {
  try {
    console.log(
      "start productOrder.service createProductOrder products:",
      JSON.stringify(products, null, 2)
    );
    const session = options.session || null;

    const productOrderModel = new ProductOrder(products);
    await productOrderModel.save({ session });

    console.log("save productOrder successfully");

    return;
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

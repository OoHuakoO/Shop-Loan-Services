const CustomerOrder = require("../models/customerOrder.model");

async function create(products, options = {}) {
  try {
    console.log(
      "start customerOrder.service createCustomerOrder products:",
      JSON.stringify(products, null, 2)
    );
    const session = options.session || null;

    const customerOrderModel = new CustomerOrder(products);
    await customerOrderModel.save({ session });
    console.log("save customerOrder successfully");

    return;
  } catch (error) {
    console.error(
      "customerOrder.service error while create customerOrder:",
      error
    );
    throw error;
  }
}

module.exports = {
  create,
};

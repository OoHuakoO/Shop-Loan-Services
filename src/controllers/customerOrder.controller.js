const customerOrderService = require("../services/customerOrder.service");

const productService = require("../services/product.service");
const mongoose = require("mongoose");

async function createCustomerOrder(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log(
      "start createCustomerOrder.controller req body:",
      JSON.stringify(req?.body?.products, null, 2)
    );

    let products = req?.body?.products;
    for (const item of products) {
      let product = await productService.findByProductID(item?.productID, {
        session,
      });
      const balanceAmount = product?.amount - item?.amount;
      await productService.buyProduct(product?.productID, balanceAmount, {
        session,
      });

      item.profit = item?.pricePerUnit - product?.cost;
      item.totalProfit = item?.profit * item?.amount;

      await customerOrderService.create(item, { session });
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ data: "", status: 200 });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(
      `createProductOrder.controller error while creating product`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createCustomerOrder,
};

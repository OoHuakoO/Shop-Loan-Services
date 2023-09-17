const productOrderService = require("../services/productOrder.service");

const productService = require("../services/product.service");
const mongoose = require("mongoose");

async function createProductOrder(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log(
      "start createProductOrder.controller req body:",
      JSON.stringify(req?.body?.products, null, 2)
    );

    let products = req?.body?.products;
    for (const item of products) {
      let product = await productService.findByCode(item?.code, { session });
      if (product) {
        await productService.updateByCode(item, product, { session });
        await productOrderService.create(item, { session });
      } else {
        await productService.create(item, { session });
        await productOrderService.create(item, { session });
      }
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
  createProductOrder,
};

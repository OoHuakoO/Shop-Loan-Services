const productOrderService = require("../services/productOrder.service");

const productService = require("../services/product.service");
const mongoose = require("mongoose");

async function getProducts(req, res, next) {
  try {
    console.log("start getProducts.controller req query search :", req?.query);

    let products = await productService.search(req?.query);

    res.json({
      data: products.data,
      total: products.total,
      status: 200,
    });
  } catch (err) {
    console.error(
      `getProducts.controller error while creating product`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  getProducts,
};

const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/search", productController.getProducts);

// router.get("/suggestion-product-name/:productName", productOrderController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const productOrderController = require("../controllers/productOrder.controller");

router.post("/create-upsert", productOrderController.createProductOrder);

// router.get("/suggestion-product-name/:productName", productOrderController.login);

module.exports = router;

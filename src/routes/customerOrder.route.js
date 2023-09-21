const express = require("express");
const router = express.Router();
const customerOrderController = require("../controllers/customerOrder.controller");

router.post("/create", customerOrderController.createCustomerOrder);

module.exports = router;

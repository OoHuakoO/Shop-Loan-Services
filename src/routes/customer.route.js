const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.post("/create-upsert", customerController.createCustomer);

router.get("/search", customerController.getCustomers);

module.exports = router;

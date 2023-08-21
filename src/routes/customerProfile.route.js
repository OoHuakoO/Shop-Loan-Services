const express = require("express");
const router = express.Router();
const customerProfileController = require("../controllers/customerProfile.controller");

router.post("/", customerProfileController.create);

module.exports = router;

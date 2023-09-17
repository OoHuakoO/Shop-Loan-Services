const express = require("express");
const router = express.Router();
const customerProfileController = require("../controllers/customerProfile.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const auth = require("../middlewares/auth.middleware");

router.get(
  "/find-by-id-card/:IDCard",
  auth,
  customerProfileController.getCustomerProfileByIDCard
);

router.post(
  "/create-upsert-borrower",
  upload.fields([{ name: "thaiID" }, { name: "profile" }]),
  customerProfileController.createCustomer
);

router.post(
  "/create-upsert-guarantor",
  upload.fields([{ name: "thaiID" }, { name: "profile" }]),
  customerProfileController.createCustomer
);

module.exports = router;

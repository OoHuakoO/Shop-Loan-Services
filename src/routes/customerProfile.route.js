const express = require("express");
const router = express.Router();
const customerProfileController = require("../controllers/customerProfile.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get(
  "/find-by-id-card/:IDCard",
  customerProfileController.getCustomerProfileByIDCard
);

router.post(
  "/create-upsert-borrower",
  upload.fields([{ name: "thaiID" }, { name: "profile" }]),
  customerProfileController.create
);

router.post(
  "/create-upsert-guarantor",
  upload.fields([{ name: "thaiID" }, { name: "profile" }]),
  customerProfileController.create
);

module.exports = router;

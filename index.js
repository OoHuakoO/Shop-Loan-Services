require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const customerProfile = require("./src/routes/customerProfile.route");
const user = require("./src/routes/user.route");
const productOrder = require("./src/routes/productOrder.route");
const product = require("./src/routes/product.route");
const customer = require("./src/routes/customer.route");
const customerOrder = require("./src/routes/customerOrder.route");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.USER_DB,
  pass: process.env.PASS_DB,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/customer-profile", customerProfile);
app.use("/user", user);
app.use("/product-order", productOrder);
app.use("/product", product);
app.use("/customer", customer);
app.use("/customer-order", customerOrder);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

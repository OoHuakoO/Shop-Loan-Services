const Customer = require("../models/customer.model");

async function create(req) {
  try {
    console.log(
      "start customer.service create req body:",
      JSON.stringify(req?.body, null, 2)
    );

    const newCustomer = new Customer(req?.body);
    await newCustomer.save();
    console.log("save customer successfully");

    return;
  } catch (error) {
    console.error("customer.service error while creating customer:", error);
    throw error;
  }
}

async function updateByCustomerID(req) {
  try {
    console.log(
      "start customer.service updateByCustomerID req body:",
      JSON.stringify(req?.body, null, 2)
    );

    await Customer.updateOne(
      { customerID: req?.body?.customerID },
      { $set: req?.body }
    );

    console.log("update customer successfully");

    return;
  } catch (error) {
    console.error("customer.service error while update customer:", error);
    throw error;
  }
}

async function findByCustomerID(customerID) {
  try {
    console.log(
      "start customer.service findByCustomerID customerID:",
      customerID
    );
    const customer = await Customer.findOne({ customerID: customerID });
    return customer;
  } catch (error) {
    console.error(
      "customer.service error while findByCustomerID customer:",
      error
    );
    throw error;
  }
}

async function search(query) {
  try {
    console.log("start customer.service search query:", query);
    const offset = parseInt(query?.offset || "0", 10);
    const limit = parseInt(query?.limit || "10", 10);
    const querySearch = {};

    if (query?.customerID !== "") {
      querySearch.customerID = new RegExp(`.*${query?.customerID}.*`, "i");
    }
    if (query?.name !== "") {
      querySearch.name = new RegExp(`.*${query?.name}.*`, "i");
    }

    const products = await Customer.find(querySearch).skip(offset).limit(limit);
    const total = await Customer.countDocuments(querySearch)
      .skip(offset)
      .limit(limit);

    return { data: products, total: total };
  } catch (error) {
    console.error("customer.service error while search products:", error);
    throw error;
  }
}

module.exports = {
  create,
  updateByCustomerID,
  findByCustomerID,
  search,
};

const customerService = require("../services/customer.service");

async function createCustomer(req, res, next) {
  try {
    console.log(
      "start createCustomer.controller req body:",
      JSON.stringify(req?.body, null, 2)
    );
    let customer = await customerService.findByCustomerID(
      req?.body?.customerID
    );
    if (customer) {
      await customerService.updateByCustomerID(req);
      res.json({ data: "", status: 200 });
    } else {
      await customerService.create(req);
      res.json({ data: "", status: 200 });
    }
  } catch (err) {
    console.error(
      `createCustomer.controller error while creating customer profile`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getCustomers(req, res, next) {
  try {
    console.log("start getProducts.controller req query search :", req?.query);

    let customers = await customerService.search(req?.query);

    res.json({
      data: customers.data,
      total: customers.total,
      status: 200,
    });
  } catch (err) {
    console.error(
      `getCustomers.controller error while find customers `,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createCustomer,
  getCustomers,
};

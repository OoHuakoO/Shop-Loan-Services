const customerProfileService = require("../services/customerProfile.service");

async function getProductAll(req, res, next) {
  try {
    console.log(
      "start getCustomerProfileByIDCard.controller  req params type :",
      req?.params?.type
    );

    let product = await customerProfileService.findByIDCard(req?.params?.type);

    res.json({
      data: product,
      status: 200,
    });
  } catch (err) {
    console.error(
      `createBorrower.controller error while creating customer profile`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    console.log(
      "start createProduct.controller req body:",
      JSON.stringify(req?.body, null, 2)
    );

    let customerCreate = await customerProfileService.create(req);
    res.json({ data: customerCreate, status: 200 });
  } catch (err) {
    console.error(
      `createProduct.controller error while creating customer profile`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  getProductAll,
  createProduct,
};

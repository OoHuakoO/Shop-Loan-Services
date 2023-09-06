const customerProfileService = require("../services/customerProfile.service");

async function getCustomerProfileByIDCard(req, res, next) {
  try {
    console.log(
      "start getCustomerProfileByIDCard.controller  req params IDCard :",
      req?.params?.IDCard
    );

    let customer = await customerProfileService.findByIDCard(
      req?.params?.IDCard
    );

    res.json({
      data: customer,
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

async function createCustomer(req, res, next) {
  try {
    console.log(
      "start createCustomer.controller req body:",
      JSON.stringify(req?.body, null, 2)
    );

    let customer = await customerProfileService.findByIDCard(req?.body?.IDCard);
    if (customer) {
      let customerUpdate = await customerProfileService.updateByIDCard(req);
      res.json({ data: customerUpdate, status: 200 });
    } else {
      let customerCreate = await customerProfileService.create(req);
      res.json({ data: customerCreate, status: 200 });
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

module.exports = {
  getCustomerProfileByIDCard,
  createCustomer,
};

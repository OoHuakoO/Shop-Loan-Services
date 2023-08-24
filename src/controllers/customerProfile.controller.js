const customerProfileService = require("../services/customerProfile.service");

async function getCustomerProfileByIDCard(req, res, next) {
  try {
    console.log(
      "start getCustomerProfileByIDCard.controller  req params IDCard :",
      req?.params?.IDCard
    );

    let response = await customerProfileService.findByIDCard(
      req?.params?.IDCard
    );
    res.json({
      data: {
        customerProfile: response?.customerProfile,
        countCustomerProfile: response?.countCustomerProfile,
      },
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

async function create(req, res, next) {
  try {
    console.log(
      "start create.controller req body:",
      JSON.stringify(req?.body, null, 2)
    );

    let responseFindByIDCard = await customerProfileService.findByIDCard(
      req?.body?.IDCard
    );
    if (responseFindByIDCard?.countCustomerProfile > 0) {
      let responseUpdate = await customerProfileService.updateByIDCard(req);
      res.json({ data: responseUpdate, status: 200 });
    } else {
      let responseCreate = await customerProfileService.create(req);
      res.json({ data: responseCreate, status: 200 });
    }
  } catch (err) {
    console.error(
      `create.controller error while creating customer profile`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  getCustomerProfileByIDCard,
  create,
};

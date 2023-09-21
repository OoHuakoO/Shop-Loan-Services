const CustomerProfile = require("../models/customerProfile.model");

const { uploadFileFirebase } = require("../utils/uploadFile.utils");

async function create(req) {
  try {
    console.log(
      "start customerProfile.service create req body:",
      JSON.stringify(req?.body, null, 2)
    );

    const partURLThaiID = await uploadFileFirebase(req.files["thaiID"][0]);
    const partURLProfile = await uploadFileFirebase(req.files["profile"][0]);

    const newCustomerProfile = new CustomerProfile({
      ...req?.body,
      ...{ pathURLProfile: partURLProfile, pathURLThaiID: partURLThaiID },
    });

    await newCustomerProfile.save();

    console.log("save customerProfile successfully");

    return;
  } catch (error) {
    console.error(
      "customerProfile.service error while creating customer profile:",
      error
    );
    throw error;
  }
}

async function updateByIDCard(req) {
  try {
    console.log(
      "start customerProfile.service updateByIDCard req body:",
      JSON.stringify(req?.body, null, 2)
    );

    const partURLThaiID = await uploadFileFirebase(req.files["thaiID"][0]);
    const partURLProfile = await uploadFileFirebase(req.files["profile"][0]);

    const newCustomerProfile = {
      ...req?.body,
      ...{ pathURLProfile: partURLProfile, pathURLThaiID: partURLThaiID },
    };

    await CustomerProfile.updateOne(
      { IDCard: req?.body?.IDCard },
      { $set: newCustomerProfile }
    );

    console.log("update customerProfile successfully");

    return;
  } catch (error) {
    console.error(
      "customerProfile.service error while update customer profile:",
      error
    );
    throw error;
  }
}

async function findByIDCard(IDCard) {
  try {
    console.log("start customerProfile.service findByIDCard IDCard:", IDCard);

    const customer = await CustomerProfile.findOne({ IDCard: IDCard });

    return customer;
  } catch (error) {
    console.error(
      "customerProfile.service error while findByIDCard customer profile:",
      error
    );
    throw error;
  }
}

module.exports = {
  create,
  updateByIDCard,
  findByIDCard,
};

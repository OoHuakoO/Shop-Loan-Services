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

    const savedProfile = await newCustomerProfile.save();

    console.log("save customerProfile successfully", savedProfile);

    return newCustomerProfile;
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

    await CustomerProfile.updateMany(
      { IDCard: req?.body?.IDCard },
      { $set: newCustomerProfile }
    );

    console.log("update customerProfile successfully ", newCustomerProfile);

    return newCustomerProfile;
  } catch (error) {
    console.error(
      "customerProfile.service error while creating customer profile:",
      error
    );
    throw error;
  }
}

async function findByIDCard(IDCard) {
  try {
    console.log("start customerProfile.service findByIDCard IDCard:", IDCard);

    const customerProfile = await CustomerProfile.findOne({ IDCard: IDCard });

    const countCustomerProfile = await CustomerProfile.countDocuments({
      IDCard: IDCard,
    });

    console.log("findByIDCard customer profile successfully", customerProfile);

    return {
      customerProfile: customerProfile,
      countCustomerProfile: countCustomerProfile,
    };
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

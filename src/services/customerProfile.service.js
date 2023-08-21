const CustomerProfile = require("../models/customerProfile.model");

async function create(body) {
  try {
    const newUser = await CustomerProfile.create({
      name: body?.name,
      age: body?.age,
    });
    console.log("User created:", newUser);
    return newUser; // You might want to return the created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

module.exports = {
  create,
};

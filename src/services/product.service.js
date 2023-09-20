const Product = require("../models/product.model");

async function create(product, options = {}) {
  try {
    console.log(
      "start product.service create product:",
      JSON.stringify(product, null, 2)
    );
    const session = options.session || null;

    const productModel = new Product(product);
    const savedProduct = await productModel.save({ session });

    console.log("insert product successfully");

    return savedProduct;
  } catch (error) {
    console.error("product.service error while creating product:", error);
    throw error;
  }
}

async function updateByCode(newProduct, oldProduct, options = {}) {
  try {
    console.log(
      "start product.service updateByCode newProduct:",
      JSON.stringify(newProduct, null, 2),
      "oldProduct :",
      JSON.stringify(oldProduct, null, 2)
    );
    const session = options.session || null;

    let updateProduct = {
      ...newProduct,
      amount: oldProduct?.amount + newProduct?.amount,
      cost:
        Math.round(
          ((oldProduct?.amount * oldProduct?.cost +
            newProduct?.amount * newProduct?.cost) /
            (oldProduct?.amount + newProduct?.amount) +
            Number.EPSILON) *
            100
        ) / 100,
    };

    await Product.updateOne(
      { code: oldProduct?.code },
      { $set: updateProduct },
      { session }
    );

    console.log("update product successfully");

    return updateProduct;
  } catch (error) {
    console.error("product.service error while update product:", error);
    throw error;
  }
}

async function findByCode(code, options = {}) {
  try {
    console.log("start product.service findByCode code:", code);
    const session = options.session || null;

    const product = await Product.findOne({ code: code }, null, { session });

    return product;
  } catch (error) {
    console.error("product.service error while findByCode product:", error);
    throw error;
  }
}

async function search(query) {
  try {
    console.log("start product.service search query:", query);
    const offset = parseInt(query?.offset || "0", 10);
    const limit = parseInt(query?.limit || "10", 10);
    const querySearch = {};

    if (query?.code !== "") {
      querySearch.code = new RegExp(`.*${query?.code}.*`, "i");
    }
    if (query?.name !== "") {
      querySearch.name = new RegExp(`.*${query?.name}.*`, "i");
    }
    if (querySearch?.manufacturer !== "") {
      querySearch.manufacturer = new RegExp(`.*${query?.manufacturer}.*`, "i");
    }
    if (querySearch?.type !== "") {
      querySearch.type = new RegExp(`.*${query?.type}.*`, "i");
    }

    const products = await Product.find(querySearch).skip(offset).limit(limit);
    const total = await Product.countDocuments(querySearch)
      .skip(offset)
      .limit(limit);

    return { data: products, total: total };
  } catch (error) {
    console.error("product.service error while search products:", error);
    throw error;
  }
}

module.exports = {
  create,
  updateByCode,
  findByCode,
  search,
};

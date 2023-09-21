const Product = require("../models/product.model");

async function create(product, options = {}) {
  try {
    console.log(
      "start product.service create product:",
      JSON.stringify(product, null, 2)
    );
    const session = options.session || null;

    const productModel = new Product(product);
    await productModel.save({ session });

    console.log("save product successfully");

    return;
  } catch (error) {
    console.error("product.service error while creating product:", error);
    throw error;
  }
}

async function updateByProductID(newProduct, oldProduct, options = {}) {
  try {
    console.log(
      "start product.service updateByProductID newProduct:",
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
      { productID: oldProduct?.productID },
      { $set: updateProduct },
      { session }
    );

    console.log("update product successfully");

    return;
  } catch (error) {
    console.error("product.service error while update product:", error);
    throw error;
  }
}

async function buyProduct(productID, amount, options = {}) {
  try {
    console.log(
      "start product.service buyProduct productID :",
      productID,
      "amount :",
      amount
    );
    const session = options.session || null;

    await Product.updateOne(
      { productID: productID },
      { $set: { amount: amount } },
      { session }
    );

    console.log("update product successfully");

    return;
  } catch (error) {
    console.error("product.service error while update product:", error);
    throw error;
  }
}

async function findByProductID(productID, options = {}) {
  try {
    console.log("start product.service findByProductID productID:", productID);
    const session = options.session || null;

    const product = await Product.findOne({ productID: productID }, null, {
      session,
    });

    return product;
  } catch (error) {
    console.error(
      "product.service error while  findByProductID  product:",
      error
    );
    throw error;
  }
}

async function search(query) {
  try {
    console.log("start product.service search query:", query);
    const offset = parseInt(query?.offset || "0", 10);
    const limit = parseInt(query?.limit || "10", 10);
    const querySearch = {};

    if (query?.productID !== "") {
      querySearch.productID = new RegExp(`.*${query?.productID}.*`, "i");
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
  updateByProductID,
  findByProductID,
  search,
  buyProduct,
};
